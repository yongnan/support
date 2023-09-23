April 28, 2022

# Build A Fullstack App with Remix, Prisma & MongoDB: Referential Integrity & Image Uploads

[SERIES](https://www.prisma.io/blog/series/fullstack-remix-prisma-mongodb-MaTVLuwpaICD)

[![sabinadams](https://github.com/sabinadams.png)Sabin Adams@sabinthedev](https://twitter.com/sabinthedev)

*12 min read*

Welcome to the fourth article of this series where you are learning how to build a full-stack application from the ground up using MongoDB, Prisma, and Remix! In this part, you will build the profile settings section of your application, including an image upload component, and configure your schema to provide referential integrity in your data.

![img](https://prisma-blog-ebon.vercel.app/blog/posts/fullstack-mongodb-4.svg)

[PART 1**Build A Fullstack App with Remix, Prisma & MongoDB: Project Setup**](https://www.prisma.io/blog/fullstack-remix-prisma-mongodb-1-7D0BfTXBmB6r)[PART 2**Build A Fullstack App with Remix, Prisma & MongoDB: Authentication**](https://www.prisma.io/blog/fullstack-remix-prisma-mongodb-2-ZTmOy58p4re8)[PART 3**Build A Fullstack App with Remix, Prisma & MongoDB: CRUD, Filtering & Sorting**](https://www.prisma.io/blog/fullstack-remix-prisma-mongodb-3-By5pmN5Nzo1v)

PART 4

(Currently reading)

**Build A Fullstack App with Remix, Prisma & MongoDB: Referential Integrity & Image Uploads**

[PART 5**Build A Fullstack App with Remix, Prisma & MongoDB: Deployment**](https://www.prisma.io/blog/fullstack-remix-prisma-mongodb-5-gOhQsnfUPXSx)

## Table Of Contents

- Introduction
  - [Development environment](https://www.prisma.io/blog/fullstack-remix-prisma-mongodb-4-l3MwEp4ZLIm2#development-environment)
- Build the profile settings modal
  - [Create the modal](https://www.prisma.io/blog/fullstack-remix-prisma-mongodb-4-l3MwEp4ZLIm2#create-the-modal)
  - [Build the form](https://www.prisma.io/blog/fullstack-remix-prisma-mongodb-4-l3MwEp4ZLIm2#build-the-form)
  - [Allow users to submit the form](https://www.prisma.io/blog/fullstack-remix-prisma-mongodb-4-l3MwEp4ZLIm2#allow-users-to-submit-the-form)
- Add an image upload component
  - [Set up an AWS account](https://www.prisma.io/blog/fullstack-remix-prisma-mongodb-4-l3MwEp4ZLIm2#set-up-an-aws-account)
  - [Create an IAM user](https://www.prisma.io/blog/fullstack-remix-prisma-mongodb-4-l3MwEp4ZLIm2#create-an-iam-user)
  - [Set up an S3 bucket](https://www.prisma.io/blog/fullstack-remix-prisma-mongodb-4-l3MwEp4ZLIm2#set-up-an-s3-bucket)
  - [Update your Prisma schema](https://www.prisma.io/blog/fullstack-remix-prisma-mongodb-4-l3MwEp4ZLIm2#update-your-prisma-schema)
  - [Build the image upload component](https://www.prisma.io/blog/fullstack-remix-prisma-mongodb-4-l3MwEp4ZLIm2#build-the-image-upload-component)
  - [Build the image upload service](https://www.prisma.io/blog/fullstack-remix-prisma-mongodb-4-l3MwEp4ZLIm2#build-the-image-upload-service)
  - [Put the component and service to user](https://www.prisma.io/blog/fullstack-remix-prisma-mongodb-4-l3MwEp4ZLIm2#put-the-component-and-service-to-use)
- [Display the profile pictures](https://www.prisma.io/blog/fullstack-remix-prisma-mongodb-4-l3MwEp4ZLIm2#display-the-profile-pictures)
- Add a delete account function
  - [Add the delete button](https://www.prisma.io/blog/fullstack-remix-prisma-mongodb-4-l3MwEp4ZLIm2#add-the-delete-button)
  - [Update the data model to add referential integrity](https://www.prisma.io/blog/fullstack-remix-prisma-mongodb-4-l3MwEp4ZLIm2#update-the-data-model-to-add-referential-integrity)
- [Add form validation](https://www.prisma.io/blog/fullstack-remix-prisma-mongodb-4-l3MwEp4ZLIm2#add-form-validation)
- [Summary & What's next](https://www.prisma.io/blog/fullstack-remix-prisma-mongodb-4-l3MwEp4ZLIm2#summary--whats-next)

<iframe frameborder="0" allowfullscreen="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" title="Build A Fullstack App with Remix, Prisma &amp; MongoDB: Referential Integrity and Image Uploads" width="100%" height="360" src="https://www.youtube.com/embed/ojatNgYa7Nw?rel=0&amp;showinfo=1&amp;modestbranding=1&amp;enablejsapi=1&amp;origin=https%3A%2F%2Fwww.prisma.io&amp;widgetid=19" id="widget20" style="box-sizing: inherit; margin-top: 32px; width: 740px;"></iframe>

## Introduction

In the [previous part](https://www.prisma.io/blog/fullstack-remix-prisma-mongodb-3-By5pmN5Nzo1v) of this series you built the main areas of this application, including the kudos feed, the user list, the recent kudos list, and the kudos-sending form.

In this part you will be wrapping up this application's development by building a way for users to update their profile information and upload a profile picture. You will also make a few changes to your schema that will give your database referential integrity.

> **Note**: The starting point for this project is available in the [part-3](https://github.com/sabinadams/kudos-remix-mongodb-prisma/tree/part-3) branch of the GitHub repository. If you'd like to see the final result of this part, head over to the [part-4](https://github.com/sabinadams/kudos-remix-mongodb-prisma/tree/part-4) branch.

### Development environment

In order to follow along with the examples provided, you will be expected to ...

- ... have [Node.js](https://nodejs.org/) installed.
- ... have [Git](https://git-scm.com/downloads) installed.
- ... have the [TailwindCSS VSCode Extension](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) installed. *(optional)*
- ... have the [Prisma VSCode Extension](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma) installed. *(optional)*

> **Note**: The optional extensions add some really nice intellisense and syntax highlighting for Tailwind and Prisma.

## Build the profile settings modal

The profile settings page of your application will be displayed in a modal that is accessed by clicking a profile settings button at the top right of the page.

In `app/components/search-bar.tsx`:

- Add a new prop to the exported component named `profile` that is of the `Profile` type generated by Prisma
- Import the `UserCircle` component.
- Render the `UserCircle` component at the very end of the `form`'s contents, passing it the new `profile` prop data. This will act as your profile settings button.

```tsx
// app/components/search-bar.tsx
// ...
+import { UserCircle } from "./user-circle"
+import type { Profile } from "@prisma/client"

+interface props {
+   profile: Profile
+}

-export function SearchBar() {
+export function SearchBar({ profile }: props) {
   // ...
   return (
      <form className="w-full px-6 flex items-center gap-x-4 border-b-4 border-b-blue-900 border-opacity-30 h-20">
         {/* ... */}
+         <UserCircle
+            className="h-14 w-14 transition duration-300 ease-in-out hover:scale-110 hover:border-2 hover:border-yellow-300"
+            profile={profile}
+         />
      </form>
   )
}
```

If your development server was already running, this will cause your home page to throw an error the `SearchBar` component is now expecting the profile data.

In the `app/routes/home.tsx` file, use the `getUser` function written in the [second part](https://www.prisma.io/blog/fullstack-remix-prisma-mongodb-2-ZTmOy58p4re8) of this series from `app/utils/auth.server.ts`. Use this function to load the logged in user's data inside of the `loader` function. Then provide that data to the `SearchBar` component.

```tsx
// app/routes/home.tsx
// ...
import {
  requireUserId,
+  getUser
} from '~/utils/auth.server'


export const loader: LoaderFunction = async ({ request }) => {
   // ...
+   const user = await getUser(request)
-   return json({ users, recentKudos, kudos })
+   return json({ users, recentKudos, kudos, user })
}


export default function Home() {
-   const { users, kudos, recentKudos } = useLoaderData()
+   const { users, kudos, recentKudos, user } = useLoaderData()
   // ...
   return <Layout>
      <Outlet />
      <div className="h-full flex">
         <UserPanel users={users} />
         <div className="flex-1 flex flex-col">
-            <SearchBar/>
+            <SearchBar profile={user.profile} />
            {/* ... */}
         </div>
      </div>
   </Layout>
}
```

Your `SearchBar` will now have access to the `profile` data it needs. If you had previously recieved an error because of the absence of this data, a refresh of the page in your browser should reveal the profile button rendering successfully in the top right corner of the page.

![img](https://prisma-blog-ebon.vercel.app/blog/posts/fullstack-mongodb-remix-prisma-4/usercircle-header.png)

### Create the modal

The goal is to open a profile settings *modal* when the profile settings button is clicked. Similar to the kudos modal built in the [previous section](https://www.prisma.io/blog/fullstack-remix-prisma-mongodb-3-By5pmN5Nzo1v) of this series, you will need to set up a *nested route* where you will render the new modal.

In `app/routes/home` add a new file named `profile.tsx` with the following contents to start it off:

```tsx
// app/routes/home/profile.tsx

import { json, LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { Modal } from "~/components/modal";
import { getUser } from "~/utils/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
    const user = await getUser(request)
    return json({ user })
}

export default function ProfileSettings() {
    const { user } = useLoaderData()

    return (
        <Modal isOpen={true} className="w-1/3">
            <div className="p-3">
                <h2 className="text-4xl font-semibold text-blue-600 text-center mb-4">Your Profile</h2>
            </div>
        </Modal>
    )
}
```

The snippet above ...

- ... renders a modal into a new `ProfileSettings` component.
- ... retrieves and returns the logged in user's data within a `loader` function.
- ... uses the `useLoaderData` hook to access the `user` data returned from the `loader` function.

To open this new modal, in `app/components/search-bar.tsx` add an `onClick` handler to the `UserCircle` component that navigates the user to the `/home/profile` sub-route using Remix's `useNavigate` hook.

```diff
// app/components/search-bar.tsx


// ...
<UserCircle
   className="h-14 w-14 transition duration-300 ease-in-out hover:scale-110 hover:border-2 hover:border-yellow-300"
   profile={profile}
+   onClick={() => navigate('profile')}
/>
// ...
```

If you now click on the profile settings button, you should see the new modal displayed on the screen.

![img](https://prisma-blog-ebon.vercel.app/blog/posts/fullstack-mongodb-remix-prisma-4/empty-profile-form.png)

### Build the form

The form you will build will have three fields that will allow the user to modify their profile details: first name, last name, and department.

Start building the form by adding the first and last name inputs:

```tsx
// app/routes/home/profile.tsx
// ...
// 1
+import { useState } from "react";
+import { FormField } from '~/components/form-field'

// loader ...

export default function ProfileSettings() {
   const { user } = useLoaderData()

   // 2
+   const [formData, setFormData] = useState({
+      firstName: user?.profile?.firstName,
+      lastName: user?.profile?.lastName,
+   })

   // 3
+   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
+      setFormData(form => ({ ...form, [field]: event.target.value }))
+   }

   // 4
   return (
      <Modal isOpen={true} className="w-1/3">
         <div className="p-3">
          <h2 className="text-4xl font-semibold text-blue-600 text-center mb-4">Your Profile</h2>
+          <div className="flex">
+            <div className="flex-1">
+              <form method="post">
+                <FormField htmlFor="firstName" label="First Name" value={formData.firstName} onChange={e => handleInputChange(e, 'firstName')} />
+                <FormField htmlFor="lastName" label="Last Name" value={formData.lastName} onChange={e => handleInputChange(e, 'lastName')} />
+                <div className="w-full text-right mt-4">
+                  <button className="rounded-xl bg-yellow-300 font-semibold text-blue-600 px-16 py-2 transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1">
+                    Save
+                   </button>
+                </div>
+             </form>
+          </div>
+        </div>
      </div>
    </Modal>
   )
}
```

Here's an overview of what was added above:

1. Added the imports needed in the changes made.
2. Created a `formData` object in state that holds the form's values. This defaults those values to the logged in user's existing profile data.
3. Created a function that takes in an HTML `change` event and a field name as parameters. Those are used to update the `formData` state as input fields' values change in the component.
4. Renders the basic layout of the form as well as the two input fields.

At this point, there is no error handling put in place and the form does not do anything. Before you add those pieces you will need to add the department dropdown.

In `app/utils/constants.ts` add a new `departments` constant to hold the possible options defined in your Prisma schema. Add the following export to that file:

```ts
// app/utils/constants.ts
// ...
export const departments = [
  { name: "HR", value: "HR" },
  { name: "Engineering", value: "ENGINEERING" },
  { name: "Sales", value: "SALES" },
  { name: "Marketing", value: "MARKETING" },
];
```

Import `departments` into your `app/routes/home/profile.tsx` file along with the `SelectBox` component and use them to add a new input to your form:

```tsx
// app/routes/home/profile.tsx
// ...
+import { departments } from "~/utils/constants";
+import { SelectBox } from "~/components/select-box";


// ...
export default function ProfileSettings() {
   // ...
   const [formData, setFormData] = useState({
      firstName: user?.profile?.firstName,
      lastName: user?.profile?.lastName,
+      department: (user?.profile?.department || 'MARKETING'),
   })
   // ...


   return (
      {/* ... */}
      <form method="post">
         {/* ... */}
+         <SelectBox
+             className="w-full rounded-xl px-3 py-2 text-gray-400"
+             id="department"
+             label="Department"
+             name="department"
+             options={departments}
+             value={formData.department}
+             onChange={e => handleInputChange(e, 'department')}
+          />
         {/* Save button div */}
      </form>
      {/* ... */}
   )
}
```

At this point, your form should render the correct inputs and their options. It will default their values to the current values associated with the logged in user's profile.

![img](https://prisma-blog-ebon.vercel.app/blog/posts/fullstack-mongodb-remix-prisma-4/profile-form-fields.png)

### Allow users to submit the form

The next piece you will build is the `action` function which will make this form functional.

In your `app/routes/home/profile.tsx`, add an `action` function that retrieves the form data from the `request` object and validates the `firstName`, `lastName` and `department` fields:

```ts
// app/routes/home/profile.tsx
// ...
import { validateName } from "~/utils/validators.server";
// Added the ActionFunction and redirect imports 👇
import { LoaderFunction, ActionFunction, redirect, json } from "@remix-run/node";


export const action: ActionFunction = async ({ request }) => {
   const form = await request.formData();
   // 1
   let firstName = form.get('firstName')
   let lastName = form.get('lastName')
   let department = form.get('department')

   // 2
   if (
      typeof firstName !== 'string'
      || typeof lastName !== 'string'
      || typeof department !== 'string'
   ) {
      return json({ error: `Invalid Form Data` }, { status: 400 });
   }

   // 3
   const errors = {
      firstName: validateName(firstName),
      lastName: validateName(lastName),
      department: validateName(department)
   }

   if (Object.values(errors).some(Boolean))
      return json({ errors, fields: { department, firstName, lastName } }, { status: 400 });


   // Update the user here...


   // 4
   return redirect('/home')
}
// ...
```

The `action` function above does the following:

1. Pulls out the form data points you need from the `request` object.
2. Ensures each piece of data you care about is of the `string` data type.
3. Validates the data using the `validateName` function written previously.
4. Redirects to the `/home` route, closing the settings modal.

The snippet above also throws relevent errors when the various validations fail. In order to put the validated data to use, write a function that allows you to update a user.

In `app/utils/user.server.ts`, export the following function:

```ts
// app/utils/user.server.ts
import { Profile } from "@prisma/client";
// ...
export const updateUser = async (userId: string, profile: Partial<Profile>) => {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      profile: {
        update: profile,
      },
    },
  });
};
```

This function will allow you to pass in any `profile` data and update a user whose `id` matches the provided `userId`.

Back in the `app/routes/home/profile.tsx` file, import that new function and use it to update the logged in user within the `action` function:

```tsx
// app/routes/home/profile.tsx
import {
  getUser,
+  requireUserId
} from "~/utils/auth.server";
import { updateUser } from "~/utils/user.server";
import type { Department } from "@prisma/client";


// ...
export const action: ActionFunction = async ({ request }) => {
+  const userId = await requireUserId(request);




  // ...


+  await updateUser(userId, {
+    firstName,
+    lastName,
+    department: department as Department
+  })


  return redirect('/home')
}
// ...


COPY 
```

Now when a user hits the **Save** button, their updated profile data will be stored and the modal will be closed.

## Add an image upload component

### Set up an AWS account

Your users now have the ability to update some key information in their profile, however one thing that would be nice to add is the ability to allow a user to set up a profile picture so other users might more easily identify them.

To do this, you will set up an [AWS S3](https://aws.amazon.com/s3/) file storage bucket to hold the uploaded images. If you don't already have an AWS account, you can sign up [here](https://portal.aws.amazon.com/billing/signup#/start/email).

> **Note**: Amazon offers a [free tier](https://aws.amazon.com/free) that gives you access to S3 for free.

### Create an IAM user

Once you have an account, you will need an [Identity Access Management](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users.html) (IAM) user set up in AWS so you can generate an *access key ID* and *secret key*, which are both needed to interact with S3.

> **Note**: If you already have an IAM user and its keys, feel free to skip ahead.

Head over to to the AWS console home page. On the top right corner of the page, click on the dropdown labeled with your user name and select **Security Credentials**.

![img](https://prisma-blog-ebon.vercel.app/blog/posts/fullstack-mongodb-remix-prisma-4/security-credentials.png)

Once inside that section, hit the **Users** option in the left-hand menu under *Access Management*.

![img](https://prisma-blog-ebon.vercel.app/blog/posts/fullstack-mongodb-remix-prisma-4/aws-user.png)

On this page, click the **Add users** button on the top right of the page.

![img](https://prisma-blog-ebon.vercel.app/blog/posts/fullstack-mongodb-remix-prisma-4/aws-add-user.png)

This will bring you through a short wizard that allows you to configure your user. Follow through the steps below:

![img](https://prisma-blog-ebon.vercel.app/blog/posts/fullstack-mongodb-remix-prisma-4/aws-details.png)

This first section asks for:

1. *Username*: Provide any user name.
2. *Select AWS access type*: Select the **Access key - Programmatic access** option, which enables the generation of an *access key ID* and *secret key*.

![img](https://prisma-blog-ebon.vercel.app/blog/posts/fullstack-mongodb-remix-prisma-4/aws-permissions.png)

On the second step of the wizard, make the following selections:

1. Select the "Attach existing policies directly" option.
2. Search for the term "S3".
3. Hit the checkmark next to an option labeled **AmazonS3FullAccess**.
4. Hit next at the bottom of the form.

![img](https://prisma-blog-ebon.vercel.app/blog/posts/fullstack-mongodb-remix-prisma-4/aws-tags.png)

If you would like to add tags to your user help make it easier to manage and organize the users in your account, add those here on the third step of the wizard. Hit **Next** when you are finished on this page.

![img](https://prisma-blog-ebon.vercel.app/blog/posts/fullstack-mongodb-remix-prisma-4/aws-overview.png)

If the summary on this page looks good, hit the **Create user** button at the bottom of the page.

After hitting that button, you will land on a page with your *access key ID* and *secret key*. Copy those and store them somewhere you can easily access as you will be using them shortly.

### Set up an S3 bucket

Now that you have a user and access keys, head over to the [AWS S3](https://s3.console.aws.amazon.com/s3/get-started) dashboard where you will set up the file storage bucket.

On the top right of this page, hit the **Create bucket** button.

![img](https://prisma-blog-ebon.vercel.app/blog/posts/fullstack-mongodb-remix-prisma-4/aws-s3.png)

You will be asked for a name and region for your bucket. Fill those details out and save the values you choose with the *access key ID* and *secret key* you previously saved. You will need these later as well.

After filling those out, hit **Create bucket** at the very bottom of the form.

When the bucket is done being created, you will be sent to the bucket's dashboard page on the *Objects* tab. Navigate to the **Permissions** tab.

![img](https://prisma-blog-ebon.vercel.app/blog/posts/fullstack-mongodb-remix-prisma-4/aws-bucket-permissions.png)

In this tab, hit the **Edit** button under the **Block public access** section. In this form, uncheck the **Block \*all\* public access** box and hit **Save changes**. This sets your bucket as *public*, which will allow your application to access the images.

![img](https://prisma-blog-ebon.vercel.app/blog/posts/fullstack-mongodb-remix-prisma-4/aws-bucket-access.png)

Below that section you will see a **Bucket policy** section. Paste in the following policy, and be sure to replace `<bucket-name>` with your bucket's name. This policy will allow your images to be publicly read:

```json
{
  "Version": "2008-10-17",
  "Statement": [
    {
      "Sid": "AllowPublicRead",
      "Effect": "Allow",
      "Principal": {
        "AWS": "*"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::<bucket-name>/*"
    }
  ]
}
```

![img](https://prisma-blog-ebon.vercel.app/blog/posts/fullstack-mongodb-remix-prisma-4/aws-bucket-policy.png)

You now have your AWS user and S3 bucket set up. Next you need to save the keys and bucket configurations into your `.env` file so they can be used later on.

```sh
// .env
# ...
KUDOS_ACCESS_KEY_ID="<access key ID>"
KUDOS_SECRET_ACCESS_KEY="<secret key>"
KUDOS_BUCKET_NAME="<s3 bucket name>"
KUDOS_BUCKET_REGION="<s3 bucket region>"
```

### Update your Prisma schema

You will now create a field in your database where you will store the links to the uploaded images. These should be stored with the `Profile` embedded document, so add a new field to your `Profile` type block.

```prisma
// prisma/schema.prisma


// ...
type Profile {
  firstName      String
  lastName       String
  department     Department? @default(MARKETING)
+  profilePicture String?
}
// ... 
```

To update Prisma Client with these changes, run `npx prisma generate`.

### Build the image upload component

Create a new file in `app/components` named `image-uploader.tsx` with the following contents:

```tsx
// app/components/image-uploader.tsx


import React, { useRef, useState } from "react";

interface props {
    onChange: (file: File) => any,
    imageUrl?: string
}

export const ImageUploader = ({ onChange, imageUrl }: props) => {
    const [draggingOver, setDraggingOver] = useState(false)
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const dropRef = useRef(null)

    // 1
    const preventDefaults = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
    }

    // 2
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        preventDefaults(e)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            onChange(e.dataTransfer.files[0])
            e.dataTransfer.clearData()
        }
    }

    // 3
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget.files && event.currentTarget.files[0]) {
            onChange(event.currentTarget.files[0])
        }
    }

    // 4
    return (
        <div ref={dropRef}
            className={`${draggingOver ? 'border-4 border-dashed border-yellow-300 border-rounded' : ''} group rounded-full relative w-24 h-24 flex justify-center items-center bg-gray-400 transition duration-300 ease-in-out hover:bg-gray-500 cursor-pointer`}
            style={{
                backgroundSize: "cover",
                ...(imageUrl ? { backgroundImage: `url(${imageUrl})` } : {}),
            }}
            onDragEnter={() => setDraggingOver(true)}
            onDragLeave={() => setDraggingOver(false)}
            onDrag={preventDefaults}
            onDragStart={preventDefaults}
            onDragEnd={preventDefaults}
            onDragOver={preventDefaults}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
        >
            {
                imageUrl &&
                <div className="absolute w-full h-full bg-blue-400 opacity-50 rounded-full transition duration-300 ease-in-out group-hover:opacity-0" />
            }
            {
                <p className="font-extrabold text-4xl text-gray-200 cursor-pointer select-none transition duration-300 ease-in-out group-hover:opacity-0 pointer-events-none z-10">+</p>
            }
            <input type="file" ref={fileInputRef} onChange={handleChange} className="hidden" />
        </div>
    )
}
```

The snippet above is the full image upload component. Here is an overview of what is going on:

1. A `preventDefault` function is defined to handle changes to the file input in the component.
2. A `handleDrop` function is defined to handle `drop` events on the file input in the component.
3. A `handleChange` function is defined to handle any `change` events on the file input in the component.
4. A `div` is rendered with various event handlers defined, allowing it to react to file drops, drag events and clicks. These are used to trigger image uploads and style changes that appear only when the element is receiving a drag event.

Whenever the value of the `input` in this component changes, the `onChange` function from the `props` is called, passing along the file data. That data is what will be uploaded to S3.

Next create the service that will handle the image uploads.

### Build the image upload service

To build your image upload service you will need two new npm packages:

- [`aws-sdk`](https://www.npmjs.com/package/aws-sdk): Exposes a JavaScript API that allows you to interact with AWS services.
- [`cuid`](https://www.npmjs.com/package/cuid): A tool used to generate unique ids. You will use this to generate random file names.

```sh
npm i aws-sdk cuid
```

Your image upload service will live in a new utility file. Create a file in `app/utils` named `s3.server.ts`.

In order to handle the upload, you will make use of Remix's [`unstable_parseMultipartFormData`](https://remix.run/docs/en/v1/api/remix#unstable_parsemultipartformdata-node) function which handles a `request` object's `multipart/form-data` values.

> **Note**: `multipart/form-data` is the form data type when posting an entire file within the form.

`unstable_parseMultipartFormData` will take in two parameters:

1. A `request` object retrieved from a form submission.
2. An [`uploadHandler`](https://remix.run/docs/en/v1/api/remix#uploadhandler) function, which streams the file data and handles the upload.

> **Note**: The `unstable_parseMultipartFormData` function is used in a way similar to Remix's `request.formData` function we've used in the past.

Add the following function and imports to the new file you created:

```ts
// app/utils/s3.server.ts
import {
  unstable_parseMultipartFormData,
  UploadHandler,
} from "@remix-run/node";
import S3 from "aws-sdk/clients/s3";
import cuid from "cuid";

// 1
const s3 = new S3({
  region: process.env.KUDOS_BUCKET_REGION,
  accessKeyId: process.env.KUDOS_ACCESS_KEY_ID,
  secretAccessKey: process.env.KUDOS_SECRET_ACCESS_KEY,
});

const uploadHandler: UploadHandler = async ({ name, filename, stream }) => {
  // 2
  if (name !== "profile-pic") {
    stream.resume();
    return;
  }

  // 3
  const { Location } = await s3
    .upload({
      Bucket: process.env.KUDOS_BUCKET_NAME || "",
      Key: `${cuid()}.${filename.split(".").slice(-1)}`,
      Body: stream,
    })
    .promise();


  // 4
  return Location;
};
```

This code sets up your S3 API so you can iteract with your bucket. It also adds the `uploadHandler` function. This function:

1. Uses the environment variables you stored while setting up your AWS user and S3 bucket to set up the S3 SDK.
2. Streams the file data from the `request` as long as the data key's name is `'profile-pic'`.
3. Uploads the file to S3.
4. Returns the `Location` data S3 returns, which includes the new file's URL location in S3.

Now that the `uploadHandler` is complete, add another function that actually takes in the `request` object and passes it along with the `uploadHandler` into the `unstable_parseMultipartFormData` function.

```ts
// app/utils/s3.server.ts
// ...
export async function uploadAvatar(request: Request) {
  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );


  const file = formData.get("profile-pic")?.toString() || "";


  return file;
}
```

This function is passed a `request` object, which will be sent over from an `action` function later on.

The file data is passed through the `uploadHandler` function, which handles the upload to S3 and the `formData` gives you back the new file's location inside of a form data object. The `'profile-pic'` URL is then pulled from that object and returned by the function.

### Put the component and service to use

Now that the two pieces needed to implement a working profile picture upload are complete, put them together.

Add a *resource route* that handles your upload form data by creating a new file in `app/routes` named `avatar.ts` with the following `action` function:

```ts
// app/routes/avatar.tsx
import { ActionFunction, json } from "@remix-run/node";
import { requireUserId } from "~/utils/auth.server";
import { uploadAvatar } from "~/utils/s3.server";
import { prisma } from "~/utils/prisma.server";

export const action: ActionFunction = async ({ request }) => {
  // 1
  const userId = await requireUserId(request);
  // 2
  const imageUrl = await uploadAvatar(request);

  // 3
  await prisma.user.update({
    data: {
      profile: {
        update: {
          profilePicture: imageUrl,
        },
      },
    },
    where: {
      id: userId,
    },
  });

  // 4
  return json({ imageUrl });
};
```

The function above performs these steps to handle the upload form:

1. Grabs the requesting user's `id`.
2. Uploads the file past along in the request data.
3. Updates the requesting user's profile data with the new `profilePicture` URL.
4. Responds to the `POST` request with the `imageUrl` variable.

Now you can use the `ImageUploader` component to handle a file upload and send the file data to this new `/avatar` route.

In `app/routes/home/profile.tsx`, import the `ImageUploader` component and add it to your form to the left of the input fields.

Also add a new function to handle the `onChange` event emitted by the `ImageUploader` component and a new field in `formData` variable to store the profile picture data.

```tsx
// app/routes/home/profile.tsx
// ...
+import { ImageUploader } from '~/components/image-uploader'
// ...
export default function ProfileSettings() {
   // ...
   const [formData, setFormData] = useState({
      firstName: user?.profile?.firstName,
      lastName: user?.profile?.lastName,
      department: (user?.profile?.department || 'MARKETING'),
+      profilePicture: user?.profile?.profilePicture || ''
   })


+   const handleFileUpload = async (file: File) => {
+      let inputFormData = new FormData()
+      inputFormData.append('profile-pic', file)
+
+      const response = await fetch('/avatar', {
+         method: 'POST',
+         body: inputFormData
+      })
+      const { imageUrl } = await response.json()
+
+      setFormData({
+         ...formData,
+         profilePicture: imageUrl
+      })
+    }


   // ...


   return (
      <Modal>
         <div className="p-3">
            <h2 className="text-4xl font-semibold text-blue-600 text-center mb-4">Your Profile</h2>
            <div className="flex">
+               <div className="w-1/3">
+                  <ImageUploader onChange={handleFileUpload} imageUrl={formData.profilePicture || ''}/>
+               </div>
               {/* ... */}
            </div>
         </div>
      </Modal>
   )
}
```

Now if you go to that form and attempt to upload a file the data should save correctly in S3, the database, and in your form's state.

UploadImage PreviewDatabaseAWS S3

![img](https://prisma-blog-ebon.vercel.app/blog/posts/fullstack-mongodb-remix-prisma-4/image-upload.gif)

## Display the profile pictures

This is great! The image upload is working smoothly, now you just need to display those images across the site wherever a user's circle shows up.

Open the `UserCircle` component in `app/components/user-circle.tsx` and make these changes to set the circle's background image to be the profile picture if available:

```tsx
// app/components/user-circle.tsx
import { Profile } from '@prisma/client';


interface props {
    profile: Profile,
    className?: string,
    onClick?: (...args: any) => any
}


export function UserCircle({ profile, onClick, className }: props) {
    return (
        <div
            className={`${className} cursor-pointer bg-gray-400 rounded-full flex justify-center items-center`}
            onClick={onClick}
+            style={{
+                backgroundSize: "cover",
+                ...(profile.profilePicture ? { backgroundImage: `url(${profile.profilePicture})` } : {}),
+            }}
        >
-        <h2>{profile.firstName.charAt(0).toUpperCase()}{profile.lastName.charAt(0).toUpperCase()}</h2>
+        {
+           !profile.profilePicture && (
+              <h2>{profile.firstName.charAt(0).toUpperCase()}{profile.lastName.charAt(0).toUpperCase()}</h2>
+           )
+        }
      </div>
   )
}
```

If you now give a couple of your users a profile picture, you should see those displayed throughout the site!

![img](https://prisma-blog-ebon.vercel.app/blog/posts/fullstack-mongodb-remix-prisma-4/user-images.png)

## Add a delete account function

The last piece of functionalty your profile settings modal needs is the ability to delete an account.

Deleting data, especially in a schemaless database, has the possibility of creating *"orphan documents"*, or documents that were once related to a parent document, but whose parent was at some point deleted.

You will put in safeguards against that scenario in this section.

### Add the delete button

You will handle this form in a way similar to how the sign in and sign up forms were handled. This one form will send along an `_action` key that lets the `action` function know what kind of request it receives.

In `app/routes/home/profile.tsx` make the following changes to the `form` returned in the `ProfileSettings` function:

```tsx
// app/routes/home/profile.tsx
{/* ... */}
-<form method="post">
+<form method="post" onSubmit={e => !confirm('Are you sure?') ? e.preventDefault() : true}>


    {/* ... form fields*/}
+    <button name="_action" value="delete" className="rounded-xl w-full bg-red-300 font-semibold text-white mt-4 px-16 py-2 transition duration-300 ease-in-out hover:bg-red-400 hover:-translate-y-1">
+        Delete Account
+    </button>
    <div className="w-full text-right mt-4">
        <button className="rounded-xl bg-yellow-300 font-semibold text-blue-600 px-16 py-2 transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1"
+          name="_action"
+          value="save"
         >
            Save
        </button>
    </div>
</form>
{/* ... */}


COPY 
```

Now depending on the button clicked, you can handle a different `_action` in the `action` function.

Update the `action` function to use a `switch` statement to perform the different actions:

```tsx
// app/routes/home/profile.tsx
// ...
export const action: ActionFunction = async ({ request }) => {
    const userId = await requireUserId(request);
    const form = await request.formData();


    let firstName = form.get('firstName')
    let lastName = form.get('lastName')
    let department = form.get('department')
+    const action = form.get('_action')




+    switch (action) {
+        case 'save':
            if (
               typeof firstName !== 'string'
               || typeof lastName !== 'string'
               || typeof department !== 'string'
            ) {
               return json({ error: `Invalid Form Data` }, { status: 400 });
            }


            const errors = {
               firstName: validateName(firstName),
               lastName: validateName(lastName),
               department: validateName(department)
            }


            if (Object.values(errors).some(Boolean))
               return json({ errors, fields: { department, firstName, lastName } }, { status: 400 });


            await updateUser(userId, {
               firstName,
               lastName,
               department: department as Department
            })
            return redirect('/home')
+        case 'delete':
+            // Perform delete function
+            break;
+        default:
+            return json({ error: `Invalid Form Data` }, { status: 400 });
+    }
}
// ...

```

Now if the user saves the form, the `'save'` case will be hit and the existing functionality will occur. The `'delete'` case currently does nothing, however.

Add a new function in `app/utils/user.server.ts` that takes in a `id` and deletes the user associated with it:

```ts
// app/utils/user.server.ts
// ...
export const deleteUser = async (id: string) => {
  await prisma.user.delete({ where: { id } });
};
```

You may now fill out the rest of the `"delete"` case on the profile page.

```tsx
// app/routes/home/profile.tsx
// ...
// 👇 Added the deleteUser function
import { updateUser, deleteUser } from "~/utils/user.server";
// 👇 Added the logout function
import { getUser, requireUserId, logout } from "~/utils/auth.server";


// ...
export const action: ActionFunction = async ({ request }) => {
   // ...
   switch (action) {
      case 'save':
         // ...
      case 'delete':
         await deleteUser(userId)
         return logout(request)
      default:
         // ...
   }
}
```

Your users can now delete their account!

![img](https://prisma-blog-ebon.vercel.app/blog/posts/fullstack-mongodb-remix-prisma-4/delete-user.gif)

### Update the data model to add referential integrity

The only problem with this delete user functionality is that when a user is deleted, all of their authored kudos become *orphans*.

You can use *referrential actions* to trigger the deletion of any kudos when their author is deleted.

```prisma
// prisma/schema.prisma
model Kudo {
  id          String     @id @default(auto()) @map("_id") @db.ObjectId
  message     String
  createdAt   DateTime   @default(now())
  style       KudoStyle?
-  author      User       @relation(references: [id], fields: [authorId], "AuthoredKudos")
+  author      User       @relation(references: [id], fields: [authorId], onDelete: Cascade, "AuthoredKudos")
  authorId    String     @db.ObjectId
  recipient   User       @relation(references: [id], fields: [recipientId],  onDelete: Cascade, "RecievedKudos")
  recipientId String     @db.ObjectId
}
```

Run `npx prisma db push` to propagate those changes and generate Prisma Client.

Now if you delete an account, any `Kudos` authored by that account will be deleted along with it!

![img](https://prisma-blog-ebon.vercel.app/blog/posts/fullstack-mongodb-remix-prisma-4/referrential-delete.gif)

## Add form validation

You're getting close to the end! The final piece is to hook up the error message handling in the profile settings form.

Your `action` function is already returning all of the correct error messages; they simply need to be handled.

Make the following changes in `app/routes/home/profile.tsx` to handle these errors:

```tsx
// app/routes/home/profile.tsx
import {
  useState,
+  useRef,
+  useEffect
} from "react";
// 👇 Added the useActionData hook
import {
  useLoaderData,
+  useActionData
} from "@remix-run/react"
// ...
export default function ProfileSettings() {
    const { user } = useLoaderData()

    // 1
+    const actionData = useActionData()
+    const [formError, setFormError] = useState(actionData?.error || '')
+    const firstLoad = useRef(true)

    const [formData, setFormData] = useState({
-        firstName: user?.profile?.firstName,
-        lastName: user?.profile?.lastName,
-        department: (user?.profile?.department || 'MARKETING'),
-        profilePicture: user?.profile?.profilePicture || ''
+        firstName: actionData?.fields?.firstName || user?.profile?.firstName,
+        lastName: actionData?.fields?.lastName || user?.profile?.lastName,
+        department: actionData?.fields?.department || (user?.profile?.department || 'MARKETING'),
+        profilePicture: user?.profile?.profilePicture || ''
    })

+    useEffect(() => {
+        if (!firstLoad.current) {
+            setFormError('')
+        }
+    }, [formData])


+    useEffect(() => {
+        firstLoad.current = false
+    }, [])


    // ...

    return (
        <Modal isOpen={true} className="w-1/3">
            <div className="p-3">
                <h2 className="text-4xl font-semibold text-blue-600 text-center mb-4">Your Profile</h2>
                {/* 2 */}
+                <div className="text-xs font-semibold text-center tracking-wide text-red-500 w-full mb-2">
+                    {formError}
+                </div>
                <div className="flex">
                    <div className="w-1/3">
                        <ImageUploader onChange={handleFileUpload} imageUrl={formData.profilePicture || ''} />
                    </div>
                    <div className="flex-1">
                        {/* 3 */}
                        <form method="post" onSubmit={e => !confirm('Are you sure?') ? e.preventDefault() : true}>
                            <FormField
                                htmlFor="firstName"
                                label="First Name"
                                value={formData.firstName}
                                onChange={e => handleInputChange(e, 'firstName')}
+                                error={actionData?.errors?.firstName}
                            />
                            <FormField
                                htmlFor="lastName"
                                label="Last Name"
                                value={formData.lastName}
                                onChange={e => handleInputChange(e, 'lastName')}
+                                error={actionData?.errors?.lastName}
                            />
                            {/* ... */}
                        </form>
                    </div>
                </div>
            </div>
        </Modal >
    )
}


COPY 
```

The following changes were made in the snippet above:

1. The `useActionData` hook was used to retrieve the error messages. Those were stored in state variables and used to populate the form in the case that a user is returned to the modal after submitting a bad form.
2. An error output was added to display any form-level errors.
3. Error data was passed along to the `FormField` components to allow them to display their field-level errors if needed.

After making the changes above, you will see any form and validation errors are displayed on the form.

![img](https://prisma-blog-ebon.vercel.app/blog/posts/fullstack-mongodb-remix-prisma-4/form-error.png)

## Summary & What's next

With the changes made in this article, you successfully finished off your Kudos application! All pieces of the site are functional and ready to be shipped to your users.

In this section you learned about:

- Nested routes in Remix
- AWS S3
- Referrential actions and integrity with Prisma and MongoDB

In the next section of this series you will wrap things up by taking the application you've built and deploy it to Vercel!

[EDUCATION](https://www.prisma.io/blog/education)

### Don’t miss the next post!

Sign up for the Prisma Newsletter









[Building a REST API with NestJS and Prisma: AuthenticationMarch 31, 2023*10 min read*Welcome to the fifth tutorial in this series about building a REST API with NestJS, Prisma and PostgreSQL! In this tutorial, you will learn how to implement JWT authentication in your NestJS REST API.](https://www.prisma.io/blog/nestjs-prisma-authentication-7D056s1s0k3l)

[EDUCATION](https://www.prisma.io/blog/education)



[The Ultimate Guide to Testing with Prisma: CI PipelinesMarch 24, 2023Continuous Integration (CI) refers to the process of safely integrating code changes from various authors into a central repository. In this article, you will learn in more detail what a CI pipeline is, how to configure a CI pipeline and how to use that pipeline to automate your tests.](https://www.prisma.io/blog/testing-series-5-xWogenROXm)

[EDUCATION](https://www.prisma.io/blog/education)



[Building a REST API with NestJS and Prisma: Handling Relational DataMarch 23, 2023*8 min read*Welcome to the fourth tutorial in this series about building a REST API with NestJS, Prisma and PostgreSQL! In this tutorial, you will learn how to handle relational data in your NestJS REST API.](https://www.prisma.io/blog/nestjs-prisma-relational-data-7D056s1kOabc)

[EDUCATION](https://www.prisma.io/blog/education)

#### PRODUCT

[Client](https://www.prisma.io/client)[Migrate](https://www.prisma.io/migrate)[Data Browser](https://www.prisma.io/data-platform)[Data Proxy](https://www.prisma.io/data-platform/proxy)[Pricing](https://www.prisma.io/pricing)

#### DEVELOPERS

[Docs](https://www.prisma.io/docs)[Get Started](https://www.prisma.io/docs/getting-started)[Prisma Examples](https://github.com/prisma/prisma-examples)[Data Guide](https://www.prisma.io/dataguide)[Prisma in your Stack](https://www.prisma.io/stack)[Support](https://www.prisma.io/support)[Community](https://www.prisma.io/community)[Data Platform Status](https://www.prisma-status.com/)

#### USE CASES

[Customer Stories](https://www.prisma.io/showcase)[Enterprise](https://www.prisma.io/enterprise)

#### COMPANY

[About](https://www.prisma.io/about)[Blog](https://www.prisma.io/blog)[Careers](https://www.prisma.io/careers)[Events](https://www.prisma.io/events)[Causes](https://pris.ly/causes)[Terms & Privacy](https://pris.ly/privacy)

#### NEWSLETTER







![prisma_logo](https://prismalens.vercel.app/header/logo-dark.svg)

© 2023 Prisma Data, Inc.