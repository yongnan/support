# AWS Static Web using S3 bucket

# Create a S3 Bucket 

S3 bucket names:

- Names must be unique across all bucket names in S3.
- Names cannot be changed after initial creation.

Let’s go ahead and create the S3 bucket for our static website.

1. Navigate to S3 in the AWS Console.
2. Click Create Bucket.
3. Enter the url of your static site for the name.
4. Click Create in the bottom left.

Or with the AWS CLI : 

```bash
aws s3api create-bucket --bucket 'www.my-awesome-site.com'
```

# Configuring S3 Bucket for Static Website Hosting

 in the AWS Console.

1. Navigate to S3 in the AWS Console.
2. Click into your bucket.
3. Click the “Properties” section.
4. Click the “Static website hosting” option.
5. Select “Use this bucket to host a website”.
6. Enter “index.html” as the Index document.

Or with AWS CLI :

```bash
aws s3 website s3://www.my-awesome-site.com/ --index-document index.html --error-document
error.html
```

 you now have an S3 website url:

```bash
www.my-awesome-site.com.s3-website-[aws region].amazonaws.com
```

## Anonymous access to the Bucket

To do this, you must update the Bucket Policy of your bucket to have public read access to anyone in the world. The steps to update the policy of your bucket in the AWS Console are as follows:

1. Navigate to S3 in the AWS Console.

2. Click into your bucket.

3. Click the “Permissions” section.

4. Select “Bucket Policy”.

5. Add the following Bucket Policy and then Save

   ```
   {
       "Version": "2008-10-17",
       "Statement": [
           {
               "Sid": "PublicReadGetObject",
               "Effect": "Allow",
               "Principal": {
                   "AWS": "*"
               },
               "Action": "s3:GetObject",
               "Resource": "arn:aws:s3:::www.my-awesome-site.com/*"
           }
       ]
   }
   ```

   Or for the command line fans out there, if policy.json is the above bucket policy, then use:

   ```bash
   aws s3api put-bucket-policy --bucket www.my-awesome-site.com --policy file://policy.json
   ```

# Configuring Naked Domain Redirect

 my-awesome-site.com. => www.my-awesome-site.com.

To create a bucket for the naked domain route and configure it to redirect requests to the www.my-awesome-site.com bucket.

1. Navigate to S3 in the AWS Console.
2. Click “Create Bucket”.

1. Enter “my-awesome-site.com” as the name.
2. Click through to “Create Bucket”.
3. Click into your new bucket.
4. Click the “Properties” section.
5. Click the “Redirect requests” option.
6. In “Target bucket or domain” enter “www.my-awesome-site.com”.
7. Click “Save”.

# DNS Records For Your Bucket Urls

This mapping is often referred to as a CNAME (Canonical Name) record inside of your Domain Name Servers (DNS) records.

within your DNS provider:

```
www.my-awesome-site.com
 --- maps to --- 
www.my-awesome-site.com.s3-website-us-east-1.amazonaws.com
```

- Create a record for a host like www

- The record type must be CNAME

- The value must be your S3 website url

  www.my-awesome-site.com.s3-website-us-east-1.amazonaws.com

```
my-awesome-site.com
 --- maps to --- 
my-awesome-site.com.s3-website-us-east-1.amazonaws.com
```

- Create a record for your naked domain (my-awesome-site.com)

- The record type will be A, ALIAS, or ANAME

- Configure the mapping to your naked domain S3 website url after the bucket name

  s3-website-us-east-1.amazonaws.com

# Upload content

1. Navigate to S3 in the AWS Console.
2. Click into your bucket.
3. Click the “Upload” button.
4. Drag and drop or select “Add files”, and add the entire static website directory.
5. Click “Next”.
6. Leave the default permissions S3 offers.
7. Click “Next”.
8. Leave the default permissions for “Set properties”.
9. Click “Next”.
10. Click “Upload”.

Or AWS CLI: 

```bash
aws s3 cp personal-blog/src/_site/ s3://www.my-awesome-site.com/ --recursive
```



