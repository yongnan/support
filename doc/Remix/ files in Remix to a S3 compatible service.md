# Uploading files in Remix to a S3 compatible service

https://dev.to/crypticai/uploading-files-in-remix-to-an-s3-compatible-service-35c9

[#remix](https://dev.to/t/remix)[#webdev](https://dev.to/t/webdev)[#react](https://dev.to/t/react)

Remix is a new react-based framework designed to be a full stack application. With many applications, you will need to be able to store files, sometimes in an S3 compatible service. Here is how I was able to accomplish this. I took heavy influence from [this dev.to article](https://dev.to/timvermaercke/uploading-files-to-google-cloud-storage-with-remixrun-3c5c).

Create a file named `uploader-handler.server.ts` with the following contents:

```
import { s3Client } from './s3.server';
import type { UploadHandler } from '@remix-run/node';
import type { PutObjectCommandInput } from '@aws-sdk/client-s3';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const uploadStreamToS3 = async (data: AsyncIterable<Uint8Array>, key: string, contentType: string) => {
  const BUCKET_NAME = "my_bucket_name";

  const params: PutObjectCommandInput = {
    Bucket: BUCKET_NAME,
    Key: key,
    Body: await convertToBuffer(data),
    ContentType: contentType,
  };

  await s3Client.send(new PutObjectCommand(params));

  let url = await getSignedUrl(s3Client, new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  }), { expiresIn: 15 * 60 });

  console.log(url);

  return key;
}

// The UploadHandler gives us an AsyncIterable<Uint8Array>, so we need to convert that to something the aws-sdk can use. 
// Here, we are going to convert that to a buffer to be consumed by the aws-sdk.
async function convertToBuffer(a: AsyncIterable<Uint8Array>) {
  const result = [];
  for await (const chunk of a) {
    result.push(chunk);
  }
  return Buffer.concat(result);
}

export const s3UploaderHandler: UploadHandler = async ({ filename, data, contentType }) => {
  return await uploadStreamToS3(data, filename!, contentType);
}
```



Next, you will need to create the actual route to be able to upload a file. I have the following file: `~/routes/api/storage/upload.tsx` with the following contents

```
import type { ActionFunction } from "@remix-run/node";
import { unstable_parseMultipartFormData } from "@remix-run/node";
import { auth } from "~/server/auth.server";
import { s3UploaderHandler } from "~/server/uploader-handler.server";

export const action: ActionFunction = async ({ request }) => {
  await auth.isAuthenticated(request, { failureRedirect: '/login' });

  const formData = await unstable_parseMultipartFormData(request, s3UploaderHandler);

  const fileName = formData.get('upload');

  return {
    filename: fileName,
  }
}
```



Now that you have the supporting files in place, let's upload a file.

```
<Form method="post" action={'/api/storage/upload'} encType="multipart/form-data">
    <Input type="file" name="upload" />
    <Button type="submit">Upload</Button>
</Form>
```



There you have it!

Version of sdks used:

- @remix-run/node: 1.6.5
- @remix-run/react: 1.6.5
- @aws-sdk/client-s3: 3.145.0
- @aws-sdk/s3-request-presigner: 3.145.0

## Top comments (4)



Subscribe

![pic](https://res.cloudinary.com/practicaldev/image/fetch/s--RmY55OKL--/c_limit,f_auto,fl_progressive,q_auto,w_256/https://practicaldev-herokuapp-com.freetls.fastly.net/assets/devlogo-pwa-512.png)



[![jondcallahan profile image](https://res.cloudinary.com/practicaldev/image/fetch/s--Cm1aACfP--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/775718/e232a62f-6811-4846-92c6-857bba8e231d.png)](https://dev.to/jondcallahan)

Jon Callahan

•[Dec 31 '22](https://dev.to/crypticai/uploading-files-in-remix-to-an-s3-compatible-service-35c9#comment-23n7l)



Very helpful, thank you. I am using a file input inside a bigger form so I needed to handle the other form fields as well. It was hard for me to figure out so if anyone finds this and sees the other form fields coming back undefined, it's because you need to return a serialized value from the upload handler for every form field. To do this I used a TextDecoder like this

```
export const uploadHandler = unstable_composeUploadHandlers(
  async (formField) => {
    if (formField.name === "attachments") {
      return await uploadStreamToR2(formField); // Returns the key
    }
    // We are uploading the attachment and returning the key for storage and retrieval. Everything else needs to be serialized using TextDecoder.
    return new TextDecoder().decode(await convertToBuffer(formField));
  }
);
```

Here is what I have in my `s3.server.ts` file

```
import { S3 } from '@aws-sdk/client-s3'

const s3Client = new S3({
  endpoint: process.env.S3_ENDPOINT,
  region: process.env.S3_REGION,
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.S3_KEY!,
    secretAccessKey: process.env.S3_SECRET!
  }
});

export { s3Client };
```