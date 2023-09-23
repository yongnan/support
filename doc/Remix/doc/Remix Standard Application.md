#  Remix Standard Application

# Outline

Topics covers:

- Generating a new Remix project
- Conventional files
- Routes (including the nested variety ✨)
- Styling
- Database interactions (via `sqlite` and `prisma`)
- Mutations
- Validation
- Authentication
- Error handling: Both unexpected (the dev made a whoopsies) and expected (the end-user made a whoopsies) errors
- SEO with Meta Tags
- JavaScript...
- Resource Routes
- Deployment

# Setup

## Prerequisites

install:

- [Node.js](https://nodejs.org/) version (^14.17.0, or >=16.0.0)
- [npm](https://www.npmjs.com/) 7 or greater
- A code editor ([VSCode](https://code.visualstudio.com/) is a nice one)

With the deploy step at the end, you'll also want an account on [Fly.io](https://fly.io/).

Other resources:

- [JavaScript to know for React](https://kentcdodds.com/blog/javascript-to-know-for-react)
- [The Beginner's Guide to React](https://kcd.im/beginner-react)

And having a good understanding of [the HTTP API](https://developer.mozilla.org/en-US/docs/Web/HTTP) is also helpful, but not totally required.

## Generating a new Remix project

If you're planning on using CodeSandbox, you can use [the Basic example](https://codesandbox.io/s/github/remix-run/examples/tree/main/basic) to get started.

💿 Open your terminal and run this command:

```sh
npx create-remix@latest
```
This may ask you whether you want to install `create-remix@latest`. Enter `y`. It will only be installed the first time to run the setup script.
```
Need to install the following packages:
  create-remix@1.11.0
Ok to proceed? (y) y
```
Once the setup script has run, it'll ask you a few questions. We'll call our app "remix-app1", choose "Just the basics", then the "Remix App Server" deploy target, use TypeScript, and have it run the installation for us:

```
? Where would you like to create your app? remix-app1
? What type of app do you want to create? Just the basics
? Where do you want to deploy? Choose Remix App Server if you're unsure; it's easy to change deployment targets. Remix App Server
? TypeScript or JavaScript? TypeScript
? Do you want me to run `npm install`? Yes
```

### Dependency

```
yarn ad tiny-invariant
yarn add marked

yarn add -D @types/marked
```



Remix can be deployed in a large and growing list of JavaScript environments. The "Remix App Server" is a full-featured [Node.js](https://nodejs.org/) server based on [Express](https://expressjs.com/). It's the simplest option and it satisfies most people's needs, so that's what we're going with for this tutorial. Feel free to experiment in the future!

Once the `npm install` has completed, we'll change into the `remix-app1` directory:

💿 Run this command

```sh
cd remix-app1
```

Now you're in the `remix-app1` directory. All other commands you run from here on out will be in that directory.

💿 Great, now open that up in your favorite editor and let's explore the project structure a bit.

## Explore the project structure

Here's the tree structure. Hopefully what you've got looks a bit like this:

```
remix-app1
├── README.md
├── app
│   ├── entry.client.tsx
│   ├── entry.server.tsx
│   ├── root.tsx
│   └── routes
│       └── index.tsx
├── package-lock.json
├── package.json
├── public
│   └── favicon.ico
├── remix.config.js
├── remix.env.d.ts
└── tsconfig.json
```

Let's talk briefly about a few of these files:

- `app/` - This is where all your Remix app code goes
- `app/entry.client.tsx` - This is the first bit of your JavaScript that will run when the app loads in the browser. We use this file to [hydrate](https://reactjs.org/docs/react-dom.html#hydrate) our React components.
- `app/entry.server.tsx` - This is the first bit of your JavaScript that will run when a request hits your server. Remix handles loading all the necessary data and you're responsible for sending back the response. We'll use this file to render our React app to a string/stream and send that as our response to the client.
- `app/root.tsx` - This is where we put the root component for our application. You render the `<html>` element here.
- `app/routes/` - This is where all your "route modules" will go. Remix uses the files in this directory to create the URL routes for your app based on the name of the files.
- `public/` - This is where your static assets go (images/fonts/etc)
- `remix.config.js` - Remix has a handful of configuration options you can set in this file.

### Resources

#### public/fonts/Raleway



💿 Also, download [the font](https://remix.run/jokes-tutorial/baloo/baloo.woff) and [its license](https://remix.run/jokes-tutorial/baloo/License.txt) and put them in `public/fonts/baloo/`.

💿 While you're downloading assets, you may as well download [the social image](https://remix.run/jokes-tutorial/social.png) and put that at `public/social.png`. You'll need that later.

💿 Add the `links` export to `app/root.tsx` and `app/routes/jokes.tsx` to bring in some CSS to make the page look nice (note: each will have its own CSS file(s)). You can look at the CSS and add some structure to your JSX elements to make things look appealing. I'm going to add some links too.

### 

```sh
npm start
```

This will start the server and output this:

```
Remix App Server started at http://localhost:3000
```
Open up that URL and you should be presented with a minimal page pointing to some docs.

![Screen Shot 2023-01-20 at 10.42.50 AM](/Users/yongnan/Desktop/Screen Shot 2023-01-20 at 10.42.50 AM.png)


💿 Now stop the server and delete this directory:

- `app/routes`

We're going to trim this down the bare bones and introduce things incrementally.

💿 Replace the contents of `app/root.tsx` with this:

```
import { LiveReload } from "@remix-run/react";

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Remix: So great, it's funny!</title>
      </head>
      <body>
        Hello world
        <LiveReload />
      </body>
    </html>
  );
}
```

The `<LiveReload />` component is useful during development to auto-refresh our browser whenever we make a change. Because our build server is so fast, the reload will often happen before you even notice ⚡

Your `app/` directory should now look like this:

```
app
├── entry.client.tsx
├── entry.server.tsx
└── root.tsx
```

💿 With that set up, go ahead and start the dev server up with this command:

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000/) and the app should greet the world:

![Bare bones hello world app](https://remix.run/jokes-tutorial/img/bare-bones.png)

Great, now we're ready to start adding stuff back.

## Git 
initialize a git repository
```
git init 
git add .*
get add *
g commit -am "init commit"
```
add git repository https://github.com/ync-alpha/remix-app1.git  
```
git remote add origin https://github.com/ync-alpha/remix-app1.git
git push --set-upstream origin master
```

# Database

### setup prisma

💿 Install the prisma packages:

```sh
npm install --save-dev prisma
npm install @prisma/client
```

💿 Now we can initialize prisma with sqlite:

```sh
npx prisma init --datasource-provider sqlite
```

That gives us this output:

```
✔ Your Prisma schema was created at prisma/schema.prisma
  You can now open it in your favorite editor.

warn You already have a .gitignore. Don't forget to exclude .env to not commit any secret.

Next steps:
1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Run prisma db pull to turn your database schema into a Prisma schema.
3. Run prisma generate to generate the Prisma Client. You can then start querying your database.

More information in our documentation:
https://pris.ly/d/getting-started
```

add .env like this: `.env.example`

```
DATABASE_URL="file:./dev.db?connection_limit=1"
SESSION_SECRET="super-duper-s3cret"
ADMIN_EMAIL="xxx"
```

### create schema

/prisma/schema.prisma

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id    String @id @default(cuid())
  email String @unique

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  password Password?
  notes    Note[]
  posts    Post[]
}

model Password {
  hash String

  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade, onUpdate: Cascade)
  userId String @unique
}

model Note {
  id    String @id @default(cuid())
  title String
  body  String

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade, onUpdate: Cascade)
  userId String
}

model Post {
  slug     String @id
  title    String
  markdown String

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade, onUpdate: Cascade)
  userId String
}

model Vendor {
  id    String @id @default(cuid())
  name  String
  web   String
  logo  String

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

#### update db

💿 With that in place, run this:

```sh
npx prisma db push
```

💿 Let's add that `prisma/dev.db` to our `.gitignore` so we don't accidentally commit it to our repository. We'll also want to add the `.env` file to the `.gitignore` as mentioned in the prisma output so we don't commit our secrets!

```sh
node_modules

/.cache
/build
/public/build

/prisma/dev.db
.env
```

### seed data

💿 Go ahead and get that installed right now so we don't forget:

```sh
npm install bcryptjs
```

💿 The `bcryptjs` library has TypeScript definitions in DefinitelyTyped, so let's install those as well:

```sh
npm install --save-dev @types/bcryptjs
```

```
touch prisma/seed.ts
```

```ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "rachel@remix.run";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("racheliscool", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  await prisma.note.create({
    data: {
      title: "My first note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  await prisma.note.create({
    data: {
      title: "My second note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  const posts = [
    {
      slug: "my-first-post",
      title: "My First Post",
      markdown: `
  # This is my first post
  
  Isn't it great?
      `.trim(),
      userId: user.id,
    },
    {
      slug: "90s-mixtape",
      title: "A Mixtape I Made Just For You",
      markdown: `
  # 90s Mixtape
  
  - I wish (Skee-Lo)
  - This Is How We Do It (Montell Jordan)
  - Everlong (Foo Fighters)
  - Ms. Jackson (Outkast)
  - Interstate Love Song (Stone Temple Pilots)
  - Killing Me Softly With His Song (Fugees, Ms. Lauryn Hill)
  - Just a Friend (Biz Markie)
  - The Man Who Sold The World (Nirvana)
  - Semi-Charmed Life (Third Eye Blind)
  - ...Baby One More Time (Britney Spears)
  - Better Man (Pearl Jam)
  - It's All Coming Back to Me Now (Céline Dion)
  - This Kiss (Faith Hill)
  - Fly Away (Lenny Kravits)
  - Scar Tissue (Red Hot Chili Peppers)
  - Santa Monica (Everclear)
  - C'mon N' Ride it (Quad City DJ's)
      `.trim(),
      userId: user.id,
    },
  ];
  
  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }

  const vendors = [
    {
      logo: "https://user-images.githubusercontent.com/1500684/157764397-ccd8ea10-b8aa-4772-a99b-35de937319e1.svg",
      name: "Fly.io",
      web: "https://fly.io",
    },
    {
      logo: "https://user-images.githubusercontent.com/1500684/157764395-137ec949-382c-43bd-a3c0-0cb8cb22e22d.svg",
      name: "SQLite",
      web: "https://sqlite.org",
    },
    {
      logo: "https://user-images.githubusercontent.com/1500684/157764484-ad64a21a-d7fb-47e3-8669-ec046da20c1f.svg",
      name: "Prisma",
      web: "https://prisma.io",
    },
    {
      logo: "https://user-images.githubusercontent.com/1500684/157764276-a516a239-e377-4a20-b44a-0ac7b65c8c14.svg",
      name: "Tailwind",
      web: "https://tailwindcss.com",
    },
    {
      logo: "https://user-images.githubusercontent.com/1500684/157764454-48ac8c71-a2a9-4b5e-b19c-edef8b8953d6.svg",
      name: "Cypress",
      web: "https://www.cypress.io",
    },
    {
      logo: "https://user-images.githubusercontent.com/1500684/157772386-75444196-0604-4340-af28-53b236faa182.svg",
      name: "MSW",
      web: "https://mswjs.io",
    },
    {
      logo: "https://user-images.githubusercontent.com/1500684/157772447-00fccdce-9d12-46a3-8bb4-fac612cdc949.svg",
      name: "Vitest",
      web: "https://vitest.dev",
    },
    {
      logo: "https://user-images.githubusercontent.com/1500684/157772662-92b0dd3a-453f-4d18-b8be-9fa6efde52cf.png",
      name: "Testing Library",
      web: "https://testing-library.com",
    },
    {
      logo: "https://user-images.githubusercontent.com/1500684/157772934-ce0a943d-e9d0-40f8-97f3-f464c0811643.svg",
      name: "Prettier",
      web: "https://prettier.io",
    },
    {
      logo: "https://user-images.githubusercontent.com/1500684/157772990-3968ff7c-b551-4c55-a25c-046a32709a8e.svg",
      name: "ESLint",
      web: "https://eslint.org",
    },
    {
      logo: "https://user-images.githubusercontent.com/1500684/157773063-20a0ed64-b9f8-4e0b-9d1e-0b65a3d4a6db.svg",
      name: "TypeScript",
      web: "https://typescriptlang.org",
    },
  ]

  await prisma.vendor.deleteMany({})
  
  for (const vendor of vendors) {
    await prisma.vendor.create({
      data: { 
        ...vendor 
      },
    });
  }

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

💿 Install `esbuild-register` as a dev dependency:

```sh
npm install --save-dev esbuild-register
```

💿 And now we can run our `seed.ts` file with that:

```sh
node --require esbuild-register prisma/seed.ts
```

Now our database has those jokes in it. No joke!

But I don't want to have to remember to run that script any time I reset the database. Luckily, we don't have to!

💿 Add this to your `package.json`:

```
// ...
  "prisma": {
    "seed": "node --require esbuild-register prisma/seed.ts"
  },
  "scripts": {
// ...
```

Now, whenever we reset the database, prisma will call our seeding file as well.

### update schema

Make changes to prisma/schema.prisma

#### update db

With that updated, let's go ahead and reset our database to this schema:

💿 Run this:

```sh
npx prisma db push
```

#### seed

💿 Let's start by fixing our `prisma/seed.ts` file.

`prisma/seed.ts`

💿 Great, now run the seed again:

```sh
npx prisma db seed
```

# Codes

location: `/app/**`

## Routes

Here are all the routes our app is going to have:

```
/
/notes
/notes/$noteId
/notes/admin/$noteId
/posts
/posts/$slug
/posts/admin/$slug
/users
/users/$userId
/users/admin/$userId

/login
```

### Root

location: `styles/**`

#### [global.css](https://github.com/ync-beta/remix-app1/blob/master/app/styles/global.css)

#### [global-large.css](https://github.com/ync-beta/remix-app1/blob/master/app/styles/global-large.css)

#### [global-medium.css](https://github.com/ync-beta/remix-app1/blob/master/app/styles/global-medium.css)
#### [index.css](https://github.com/ync-beta/remix-app1/blob/master/app/styles/index.css)
#### [root.tsx](https://github.com/ync-beta/remix-app1/blob/master/app/root.tsx)
#### [routes/index.tsx](https://github.com/ync-beta/remix-app1/blob/master/app/routes/index.tsx)

#### [healthcheck.tsx](https://github.com/ync-beta/remix-app1/blob/master/app/routes/healthcheck.tsx)

### Authenication

#### [join.tsx](https://github.com/ync-beta/remix-app1/blob/master/app/join.tsx)

#### [login.tsx](https://github.com/ync-beta/remix-app1/blob/master/app/login.tsx)

#### [logout.tsx](https://github.com/ync-beta/remix-app1/blob/master/app/logout.tsx)

## Components
#### [HeaderNav.tsx](https://github.com/ync-beta/remix-app1/blob/master/app/components/HeaderNav.tsx)
## Models
#### [note.server.ts](https://github.com/ync-beta/remix-app1/blob/master/app/models/note.server.ts)

#### [user.server.ts](https://github.com/ync-beta/remix-app1/blob/master/app/models/user.server.ts)

#### [post.server.ts](https://github.com/ync-beta/remix-app1/blob/master/app/models/post.server.ts)

#### [vendor.server.ts](https://github.com/ync-beta/remix-app1/blob/master/app/models/vendor.server.ts)
## Utils

#### [db.server.ts](https://github.com/ync-beta/remix-app1/blob/master/app/utils/db.server.ts)
#### [env.server.ts](https://github.com/ync-beta/remix-app1/blob/master/app/utils/env.server.ts)
#### [request.server.ts](https://github.com/ync-beta/remix-app1/blob/master/app/utils/request.server.ts)

#### [session.server.ts](https://github.com/ync-beta/remix-app1/blob/master/app/utils/session.server.ts)
#### [utils.ts](https://github.com/ync-beta/remix-app1/blob/master/app/utils/utils.ts)

## Features

### Notes

#### [notes.tsx](https://github.com/ync-beta/remix-app1/blob/master/app/routes/notes.tsx)
#### [index.tsx](https://github.com/ync-beta/remix-app1/blob/master/app/routes/notes/index.tsx)
#### [$noteId.tsx](https://github.com/ync-beta/remix-app1/blob/master/app/routes/notes/$noteId.tsx)
#### [admin/$noteId.tsx](https://github.com/ync-beta/remix-app1/blob/master/app/routes/notes/admin/$noteId.tsx)

### Posts
#### [posts.tsx](https://github.com/ync-beta/remix-app1/blob/master/app/routes/posts.tsx)
#### [index.tsx](https://github.com/ync-beta/remix-app1/blob/master/app/routes/posts/index.tsx)
#### [$slug.tsx](https://github.com/ync-beta/remix-app1/blob/master/app/routes/posts/$slug.tsx)
#### [admin/$slug.tsx](https://github.com/ync-beta/remix-app1/blob/master/app/routes/posts/admin/$slug.tsx)

### Users
#### [users.tsx](https://github.com/ync-beta/remix-app1/blob/master/app/routes/users.tsx)
#### [index.tsx](https://github.com/ync-beta/remix-app1/blob/master/app/routes/users/index.tsx)
#### [$userId.tsx](https://github.com/ync-beta/remix-app1/blob/master/app/routes/users/$userId.tsx)
#### [admin/$userId.tsx](https://github.com/ync-beta/remix-app1/blob/master/app/routes/users/admin/$userId.tsx)

# Deployment

### Fly.io

💿 Before proceeding, you're going to need to [install fly](https://fly.io/docs/hands-on/installing) and [sign up for an account](https://fly.io/docs/hands-on/sign-up).

💿 Once you've done that, run this command from within your project directory:

```sh
fly launch
```

The folks at fly were kind enough to put together a great setup experience. They'll detect your Remix project and ask you a few questions to get you started. Here's my output/choices:

```
Creating app in /Users/kentcdodds/Desktop/remix-app1
Scanning source code
Detected a Remix app
? App Name (leave blank to use an auto-generated name): remix-app1-ync
Automatically selected personal organization: Kent C. Dodds
? Select region: dfw (Dallas, Texas (US))
Created app remix-app1 in organization personal
Created a 1GB volume vol_18l524yj27947zmp in the dfw region
Wrote config file fly.toml

This launch configuration uses SQLite on a single, dedicated volume. It will not scale beyond a single VM. Look into 'fly postgres' for a more robust production database.

? Would you like to deploy now? No
Your app is ready. Deploy with `flyctl deploy`
```

You'll want to choose a different app name because I already took `remix-app1` (sorry 🙃).

Fly generated a few files for us:

- `fly.toml` - Fly-specific configuration
- `Dockerfile` - Remix-specific Dockerfile for the app
- `.dockerignore` - It just ignores `node_modules` because we'll run the installation as we build the image.

💿 Now set the `SESSION_SECRET` environment variable by running this command:

```sh
fly secret set SESSION_SECRET=$(openssl rand -hex 32) --app remix-app1-ync

fly secrets set ADMIN_EMAIL=rachel@remix.run
```

If you don't have openssl installed, you can also use [1password](https://1password.com/password-generator) to generate a random secret, just replace `$(openssl rand -hex 32)` with the generated secret.

💿 Run this command:

```sh
npx prisma migrate dev
```

This will create a migration file in the `migrations` directory. You may get an error when it tries to run the seed file. You can safely ignore that. It will ask you what you want to call your migration:

```
Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma
Datasource "db": SQLite database "dev.db" at "file:./dev.db"

SQLite database dev.db created at file:./dev.db

✔ Enter a name for the new migration: … init
```

💿 I called mine "init". Then you'll get the rest of the output:

```
Applying migration `20211121111251_init`

The following migration(s) have been created and applied from new schema changes:

migrations/
  └─ 20211121111251_init/
    └─ migration.sql

Your database is now in sync with your schema.

✔ Generated Prisma Client (3.5.0) to ./node_modules/@prisma/client in 52ms
```

💿 If you did get an error when running the seed, you can run it manually now:

```sh
npx prisma db seed
```

With that done, you're ready to deploy.

💿 Run this command:

```sh
fly deploy
```

### Github Actions

#### fly.io access token

When you've [registered for an account with fly.io](https://fly.io/app/sign-up), you can go to your [account settings](https://web.fly.io/user/personal_access_tokens) to get yourself an active token.

Click on the "Create access token" button and give it a descriptive name, I named mine "gh_worker_canrau.com".

Copy the token (it's the only time you'll get to see it) and then go to your GitHub repository's settings, and select "Secrets" in the left menu then click on "New repository secret".

**OR**

type your GitHub username/repo to generate the settings link

Give it the name `FLY_API_TOKEN` and value of the before copied access token you've got from fly.io, click "Add secret" and your done.

- Add a `FLY_API_TOKEN` to your GitHub repo. To do this, go to your user settings on FLy and create a new [[token](https://fly.io/user/personal_access_tokens), then add it to [your repo secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets) with the name `FLY_API_TOKEN`.

#### GitHub Action

- Go to repo home, click Settings -> Secrets and variables -> Actions, then click New repository secret,
- paste the Secret and git it a name `FLY_API_TOKEN`, click add secret.

### Create volume

```
fly volumes create data --size 1 --app remix-app1-ync
```

### Action flows

This one is independent of your package manager, it just cancels any previous builds, checks out your repo and tells fly to build it. So it completely depends on it beeing fly.io compatible, probably via a `Dockerfile`.

```
mkdir -p .github/workflows && touch .github/workflows/deployment.yml 
```



`.github/workflows/deployment.yml`

```yaml
name: 🚀 Deploy
on:
  push:
    branches:
      - main
      - dev
  pull_request: {}

permissions:
  actions: write
  contents: read

jobs:
  lint:
    name: ⬣ ESLint
    runs-on: ubuntu-latest
    steps:
      - name: 🛑 Cancel Previous Runs
        uses: styfle/cancel-workflow-action@0.11.0

      - name: ⬇️ Checkout repo
        uses: actions/checkout@v3

      - name: ⎔ Setup node
        uses: actions/setup-node@v3
        with:
          node-version: 16

      - name: 📥 Download deps
        uses: bahmutov/npm-install@v1
        with:
          useLockFile: false

      - name: 🔬 Lint
        run: npm run lint

  typecheck:
    name: ʦ TypeScript
    runs-on: ubuntu-latest
    steps:
      - name: 🛑 Cancel Previous Runs
        uses: styfle/cancel-workflow-action@0.11.0

      - name: ⬇️ Checkout repo
        uses: actions/checkout@v3

      - name: ⎔ Setup node
        uses: actions/setup-node@v3
        with:
          node-version: 16

      - name: 📥 Download deps
        uses: bahmutov/npm-install@v1
        with:
          useLockFile: false

      - name: 🔎 Type check
        run: npm run typecheck --if-present

  vitest:
    name: ⚡ Vitest
    runs-on: ubuntu-latest
    steps:
      - name: 🛑 Cancel Previous Runs
        uses: styfle/cancel-workflow-action@0.11.0

      - name: ⬇️ Checkout repo
        uses: actions/checkout@v3

      - name: ⎔ Setup node
        uses: actions/setup-node@v3
        with:
          node-version: 16

      - name: 📥 Download deps
        uses: bahmutov/npm-install@v1
        with:
          useLockFile: false

      - name: ⚡ Run vitest
        run: npm run test -- --coverage

  cypress:
    name: ⚫️ Cypress
    runs-on: ubuntu-latest
    steps:
      - name: 🛑 Cancel Previous Runs
        uses: styfle/cancel-workflow-action@0.11.0

      - name: ⬇️ Checkout repo
        uses: actions/checkout@v3

      - name: 🏄 Copy test env vars
        run: cp .env.example .env

      - name: ⎔ Setup node
        uses: actions/setup-node@v3
        with:
          node-version: 16

      - name: 📥 Download deps
        uses: bahmutov/npm-install@v1
        with:
          useLockFile: false

      - name: 🛠 Setup Database
        run: npx prisma migrate reset --force

      - name: ⚙️ Build
        run: npm run build

      - name: 🌳 Cypress run
        uses: cypress-io/github-action@v5
        with:
          start: npm run start:mocks
          wait-on: "http://localhost:8811"
        env:
          PORT: "8811"

  build:
    name: 🐳 Build
    # only build/deploy main branch on pushes
    if: ${{ (github.ref == 'refs/heads/main' || github.ref == 'refs/heads/dev') && github.event_name == 'push' }}
    runs-on: ubuntu-latest
    steps:
      - name: 🛑 Cancel Previous Runs
        uses: styfle/cancel-workflow-action@0.11.0

      - name: ⬇️ Checkout repo
        uses: actions/checkout@v3

      - name: 👀 Read app name
        uses: SebRollen/toml-action@v1.0.2
        id: app_name
        with:
          file: "fly.toml"
          field: "app"

      - name: 🐳 Set up Docker Buildx
        uses: docker/setup-buildx-action@v2
        with:
          version: v0.9.1

      # Setup cache
      - name: ⚡️ Cache Docker layers
        uses: actions/cache@v3
        with:
          path: /tmp/.buildx-cache
          key: ${{ runner.os }}-buildx-${{ github.sha }}
          restore-keys: |
            ${{ runner.os }}-buildx-

      - name: 🔑 Fly Registry Auth
        uses: docker/login-action@v2
        with:
          registry: registry.fly.io
          username: x
          password: ${{ secrets.FLY_API_TOKEN }}

      - name: 🐳 Docker build
        uses: docker/build-push-action@v3
        with:
          context: .
          push: true
          tags: registry.fly.io/${{ steps.app_name.outputs.value }}:${{ github.ref_name }}-${{ github.sha }}
          build-args: |
            COMMIT_SHA=${{ github.sha }}
          cache-from: type=local,src=/tmp/.buildx-cache
          cache-to: type=local,mode=max,dest=/tmp/.buildx-cache-new

      # This ugly bit is necessary if you don't want your cache to grow forever
      # till it hits GitHub's limit of 5GB.
      # Temp fix
      # https://github.com/docker/build-push-action/issues/252
      # https://github.com/moby/buildkit/issues/1896
      - name: 🚚 Move cache
        run: |
          rm -rf /tmp/.buildx-cache
          mv /tmp/.buildx-cache-new /tmp/.buildx-cache

  deploy:
    name: 🚀 Deploy
    runs-on: ubuntu-latest
    needs: [lint, typecheck, vitest, cypress, build]
    # only build/deploy main branch on pushes
    if: ${{ (github.ref == 'refs/heads/main' || github.ref == 'refs/heads/dev') && github.event_name == 'push' }}

    steps:
      - name: 🛑 Cancel Previous Runs
        uses: styfle/cancel-workflow-action@0.11.0

      - name: ⬇️ Checkout repo
        uses: actions/checkout@v3

      - name: 👀 Read app name
        uses: SebRollen/toml-action@v1.0.2
        id: app_name
        with:
          file: "fly.toml"
          field: "app"

      - name: 🚀 Deploy Staging
        if: ${{ github.ref == 'refs/heads/dev' }}
        uses: superfly/flyctl-actions@1.3
        with:
          args: "deploy --app ${{ steps.app_name.outputs.value }}-staging --image registry.fly.io/${{ steps.app_name.outputs.value }}:${{ github.ref_name }}-${{ github.sha }}"
        env:
          FLY_API_TOKEN: ${{ secrets.FLY_API_TOKEN }}

      - name: 🚀 Deploy Production
        if: ${{ github.ref == 'refs/heads/main' }}
        uses: superfly/flyctl-actions@1.3
        with:
          args: "deploy --image registry.fly.io/${{ steps.app_name.outputs.value }}:${{ github.ref_name }}-${{ github.sha }}"
        env:
          FLY_API_TOKEN: ${{ secrets.FLY_API_TOKEN }}

```

now , every time commit `main` will deploy main

now , every time commit `dev` will deploy staging
