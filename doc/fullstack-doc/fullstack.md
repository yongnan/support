# FullStack

# Backend

## Prisma

### Setup prisma

```
npm init -y 
npm install prisma typescript ts-node @types/node --save-dev
```

tsconfig.json

```tsx
{
  "compilerOptions": {
    "sourceMap": true,
    "outDir": "dist",
    "strict": true,
    "lib": ["esnext"],
    "esModuleInterop": true
  }
}
```

Next, set up your Prisma project by creating your [Prisma schema](https://www.prisma.io/docs/concepts/components/prisma-schema) file with the following command:

```terminal
$ npx prisma init
```

### Connect your database

To connect your database, you need to set the `url` field of the `datasource` block in your Prisma schema to your database [connection URL](https://www.prisma.io/docs/reference/database-reference/connection-urls):

prisma/schema.prisma

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

In this case, the `url` is [set via an environment variable](https://www.prisma.io/docs/guides/development-environment/environment-variables) which is defined in `.env`:

.env

```bash
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
```

specific connection details):

```no-lines
postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA
```

### Creating the database schema

prisma/schema.prisma

```prisma
model Post {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  title     String   @db.VarChar(255)
  content   String?
  published Boolean  @default(false)
}
```

```
npx prisma migrate dev --name init
```

### Updating package

`package.json`, like this:

```json
{
  "name": "graphql-auth",
  "license": "MIT",
  "scripts": {
    "dev": "ts-node-dev --no-notify --respawn --transpile-only src/server",
    "start": "node dist/server",
    "clean": "rm -rf dist",
    "build": "npm -s run clean && npm -s run generate && tsc",
    "generate": "npm -s run generate:prisma && npm -s run generate:nexus",
    "generate:prisma": "prisma generate",
    "generate:nexus": "ts-node --transpile-only src/schema"
  },
  "dependencies": {
  ......
  },
  "prisma": {
    "seed": "ts-node prisma/seed.ts"
  }
}

```

Create and seed the database

Run the following command to create your SQLite database file. This also creates the `User` and `Post` tables that are defined in [`prisma/schema.prisma`](./prisma/schema.prisma):

```
npx prisma migrate dev --name init
```

When `npx prisma migrate dev` is executed against a newly created database, seeding is also triggered. The seed file in [`prisma/seed.ts`](./prisma/seed.ts) will be executed and your database will be populated with the sample data.

### Install Prisma Client

```
npm install @prisma/client
```

## Testing

```
yarn add type-graphql reflect-metadata
```



```
yarn add --dev jest prettier
```

### Using TypeScript via ts-jest

```
yarn add --dev @types/jest ts-jest ts-node ts-node-dev
```

create `jest-config.ts`

```
/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
    clearMocks: true,
    collectCoverage: true,  
    coverageDirectory: "coverage",
    coverageProvider: "v8",
    transform: {
      "^.+\\.[t|j]s$": "ts-jest"
    },
    testTimeout: 30000
  };
```

create a target file `tests/sum.ts`.

```tsx
const sum = (x: number, y: number) => {
    return x + y 
}

export default sum
```

Then, create a file named `tests/sum.test.ts`. This will contain our actual test:

```javascript
import sum from './sum'

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

Add the following section to your `package.json`:

```json
{
  "scripts": {
    "test": "jest"
  }
}
```

Finally, run `yarn test` or `npm run test` and Jest will print this message:

```bash
PASS  ./sum.test.js
✓ adds 1 + 2 to equal 3 (5ms)
```

This test used `expect` and `toBe` to test that two values were exactly identical. To learn about the other things that Jest can test, see [Using Matchers](https://jestjs.io/docs/using-matchers).

### Configuring Jest

Jest's configuration can be defined in the `package.json` file of your project, or through a `jest.config.js`, or `jest.config.ts` file or through the `--config <path/to/file.js|ts|cjs|mjs|json>` option. If you'd like to use your `package.json` to store Jest's config, the `"jest"` key should be used on the top level so Jest will know how to find your settings:

```json
{
  "name": "my-project",
  "jest": {
    "verbose": true
  }
}
```

Or through TypeScript (if `ts-node` is installed):

`jest.config.ts`

```ts
import type {Config} from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
};
export default config;

// Or async function
export default async (): Promise<Config.InitialOptions> => {
  return {
    verbose: true,
  };
};
```

### Suplements for Tests

```
yarn add -D get-port graphql-request
```



---

# Frontend

## Apollo client

### Create project with typescript

```
npx create-next-app client --typescript
```

### **Setting up Apollo Client**

```
yarn add @apollo/client graphql
```

#### add client file `lib/client.ts`

```ts
import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
    uri: "https://apollo-handbook-api.vercel.app/api/graphql",
    cache: new InMemoryCache(),
})
export default client
```

#### import client

```ts
import { ApolloProvider } from "@apollo/client";
...
return (
	<ApolloProvider client={client}>
      <Books books={books} />
  </ApolloProvider>
);
...
```

#### consum client

With default client pass down

```ts
import { useQuery } from "@apollo/client";

const { loading, error, data } = useQuery<AllBooksQuery>(allBooksQuery);
```

To specify another client, both query & mutation supports `client` variable:

```ts
import { client2 } from '../../lib/client'

const [ loadBooks , {loading, error, data }] = useBooksQueryLazyQuery({client: client2});

const [createBookMutation, { data, called, loading, error }] = useCreateBookMutation( { client: client2})

```



## GraphQL

### Code Generator

```
yarn add -D @graphql-codegen/cli
```

that now to set the GraphQL Code Generator up:

```
yarn graphql-codegen init
```

> “What type of application are you building?”.
>
> >  =>   “Application built with React”,
>
> “Where is your schema?”
>
> > =>  https://apollo-handbook-api.vercel.app/api/graphql
>
> “Where are your operations and fragments?”
>
> > => components/\*\*/*.{tsx,ts}
>
>  pick some plugins
>
> > * TypeScript
> > * TypeScriptOperations
> > * TypeScriptReactApollo
>
> “Where to write the output”.
>
> > => lib/graphql.tsx
>
>  “Do you want to generate an introspection file?”
>
> > => no
>
> “How to name the config file?”
>
> > => codegen.yml
>
> “What script in package.json should run the codegen?”
>
> > =>“gql:codegen”

package.json:

​    "gql:codegen": "graphql-codegen --config codegen.yml"

1.  "@graphql-codegen/typescript-react-apollo":"3.2.2",
2.  "@graphql-codegen/typescript-operations":"2.2.1",
3.  "@graphql-codegen/typescript":"2.4.1"

```
yarn install
yarn gql:codegen
```

## LazyQuery

### Debouncing

```
yarn add use-debounce
```

>
>
>**import**{useDebouncedCallback}**from**"use-debounce";
>
>​	**const**_findBook=(title:**string**)=>{
>
>​	 loadBooks({ variables: { title } });
>
>​	 };
>
>**const**findBook=useDebouncedCallback(_findBook,250);

## Tailwind CSS

```
yarn add tailwindcss autoprefixer
```

Add followoing to styles/global.css

```
@tailwind base;
@tailwind components;
@tailwind utilities;

h1 {
  @apply text-4xl mb-4;
}

h2 {
  @apply text-3xl mb-4;
}

h3 {
  @apply text-2xl mb-4;
}

h4 {
  @apply text-xl mb-4;
}

a {
  @apply text-blue-600 underline;
}

ul {
  @apply list-disc list-inside;
}

.text-field {
  @apply shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
}

.text-field.has-error {
  @apply border-red-500 border-2;
}

.submit {
  @apply mt-4 bg-white font-bold border-2 py-2 px-4 rounded inline-block text-blue-500 border-blue-500;
}

.submit:disabled {
  @apply opacity-70 cursor-not-allowed;
}
```

## Form

### final form

```bash
yarn add react-final-form final-form
```

create a common form:

```ts
import { Form, Field, FieldRenderProps} from 'react-final-form'

const TextInput = ({ input, meta }: FieldRenderProps<string>) => {
    const hasError = meta.error && meta.touched
    return (
        <div>
            <input type="text" 
            className={`text-field ${hasError && "has-error"}` }
            {...input} />
            {hasError && <span className="text-red-500">{meta.error}</span>}
        </div>
    )    
}

type BookFormProps = {
    onSubmit: (value: any) => void
}

const required = (value: string) =>
    value ? undefined : "This field is required"

const BookForm = ({ onSubmit }: BookFormProps) => {
    return (
        <Form
            onSubmit={onSubmit}
            render={({handleSubmit, hasValidationErrors }) => {
                return (
                    <form onSubmit={handleSubmit}>
                        <label>
                            Title
                            <Field name="title" component={TextInput} validate={required} />
                        </label>
                        <input className="submit" type="submit" value="Create Book" 
                            disabled={hasValidationErrors}
                        />
                    </form> 
                )}    
            }
        />           
    )
}

export default BookForm
```

and a createForm:

```ts
import Form from './Form'
import { useCreateBookMutation } from '../../lib/graphql-local_generated'
import { client2 } from '../../lib/client'

function CreateForm() {
    const [createBookMutation, { data, called, loading, error }] = useCreateBookMutation( { client: client2})
    const onCreateBook = ({ title }: { title: string }) => {
        //console.log('title', title)
        createBookMutation({ variables: { title }})
    }

    return (
    <>
        <Form onSubmit={onCreateBook} />
        {called && !loading && !error && (
            <div className="text-green-500 mt-4">Book created successfully!</div> )}
    </>        
    )
}

export default CreateForm
```

# Auth

## Server

### Putting authenticated user info on the `context`

```
const { ApolloServer } = require('apollo-server');

const server = new ApolloServer({
 typeDefs,
 resolvers,
 context: ({ req }) => {
   // Note: This example uses the `req` argument to access headers,
   // but the arguments received by `context` vary by integration.
   // This means they vary for Express, Koa, Lambda, etc.
   //
   // To find out the correct arguments for a specific integration,
   // see https://www.apollographql.com/docs/apollo-server/api/apollo-server/#middleware-specific-context-fields

   // Get the user token from the headers.
   const token = req.headers.authorization || '';

   // Try to retrieve a user with the token
   const user = getUser(token);

   // Add the user to the context
   return { user };
 },
});

server.listen().then(({ url }) => {
 console.log(`🚀 Server ready at ${url}`)
});

```

### create a Context

`lib/Context.ts`

```ts
import { PrismaClient } from '@prisma/client'
import prisma from './lib/prisma'
import { AuthenticationError } from 'apollo-server'

export interface Context {
  prisma: PrismaClient
  req: any
}

const getUser = (token: string): any => {
  return ''
}

// export const context: Context = {
//   prisma: prisma,
// }

export function createContext(req: any) {
  return {
    ...req,
    prisma,
  }
}
```

### Authorization methods

#### API-wide authorization

```js
context: ({ req }) => {
 // get the user token from the headers
 const token = req.headers.authorization || '';

 // try to retrieve a user with the token
 const user = getUser(token);

 // optionally block the user
 // we could also check user roles/permissions here
 if (!user) throw new AuthenticationError('you must be logged in');

 // add the user to the context
 return { user };
},
```

#### In resolvers

```js
users: (parent, args, context) => {
 // In this case, we'll pretend there is no data when
 // we're not logged in. Another option would be to
 // throw an error.
 if (!context.user) return null;

 return ['bob', 'jake'];
}
```

with role check

```js
users: (parent, args, context) => {
 if (!context.user || !context.user.roles.includes('admin')) return null;
 return context.models.User.getAll();
}
```

**in resolvers**

```ts
resolve: (_, args, context: Context) => {
  const userId = getUserId(context)
  return context.prisma.post.create({
    data: {
      title: args.data.title,
      content: args.data.content,
      authorId: userId,
    },
  })
}  
```

## Token base Authentication

### jsonwebtoken

```
yarn add jsonwebtoken
npm i --save-dev @types/jsonwebtoken 
```

new file `lib/utis.ts`

```ts
import { verify } from 'jsonwebtoken'
import { Context } from './context'

export const APP_SECRET = 'appsecret321'

interface Token {
  userId: string
}

export function getUserId(context: Context) {
  const authHeader = context.req.get('Authorization')
  if (authHeader) {
    const token = authHeader.replace('Bearer ', '')
    const verifiedToken = verify(token, APP_SECRET) as Token
    return verifiedToken && Number(verifiedToken.userId)
  }
}
```

### Authorization

add graphql middleware support

```
yarn add graphql-middleware graphql-shield
```

add file `permissions/index.ts`

```ts
import { rule, shield } from 'graphql-shield'
import { getUserId } from '../lib/utils'
import { Context } from '../context'

const rules = {
  isAuthenticatedUser: rule()((_parent, _args, context: Context) => {
    const userId = getUserId(context)
    return Boolean(userId)
  }),
  isPostOwner: rule()(async (_parent, args, context) => {
    const userId = getUserId(context)
    const author = await context.prisma.post
      .findUnique({
        where: {
          id: Number(args.id),
        },
      })
      .author()
    return userId === author.id
  }),
}

export const permissions = shield({
  Query: {
    me: rules.isAuthenticatedUser,
    draftsByUser: rules.isAuthenticatedUser,
    postById: rules.isAuthenticatedUser,
  },
  Mutation: {
    createDraft: rules.isAuthenticatedUser,
    deletePost: rules.isPostOwner,
    incrementPostViewCount: rules.isAuthenticatedUser,
    togglePublishPost: rules.isPostOwner,
  },
})
```

in `schema.ts`:

```ts
import { permissions } from './permissions'
import { APP_SECRET, getUserId } from './lib/utils'
import { compare, hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { applyMiddleware } from 'graphql-middleware'

    t.nullable.field('me', {
      type: 'User',
      resolve: (parent, args, context: Context) => {
        const userId = getUserId(context)
        return context.prisma.user.findUnique({
          where: {
            id: Number(userId),
          },
        })
      },
    })

t.field('signup', {
      ......
      resolve: async (_parent, args, context: Context) => {
        const hashedPassword = await hash(args.password, 10)
        const user = await context.prisma.user.create({
          data: {
            name: args.name,
            email: args.email,
            password: hashedPassword,
          },
        })
        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user,
        }
      },
    })

t.field('login', {
  		......
      resolve: async (_parent, { email, password }, context: Context) => {
        const user = await context.prisma.user.findUnique({
          where: {
            email,
          },
        })
        if (!user) {
          throw new Error(`No user found for email: ${email}`)
        }
        const passwordValid = await compare(password, user.password)
        if (!passwordValid) {
          throw new Error('Invalid password')
        }
        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user,
        }
      },
    })

const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.string('token')
    t.field('user', { type: 'User' })
  },
})

export const schema = applyMiddleware(schemaWithoutPermissions, permissions)

```

must add AuthPayload

## Client

# Graphql

## gqlgenerator

```bash
# Install
npm install gql-generator -g

# see the usage
gqlg --help

# Generate sample queries from schema file
gqlg --schemaFilePath ./example/sampleTypeDef.graphql --destDirPath ./example/output --depthLimit 5
```



# Tools

## Logger

### pino

```
yarn add pino pino-pretty
```

use

```js
export const logger = pino({
  level: "debug", //process.env.LOGGER_LEVEL || 
  prettyPrint: true
})
```

## services

### Random comment-generator

 returns a random list of 20 different comments at every request.

https://random-comment-generator.herokuapp.com/
