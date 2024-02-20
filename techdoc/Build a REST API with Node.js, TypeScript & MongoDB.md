# Build a REST API with Node.js, TypeScript & MongoDB

[source](https://tomanagle.medium.com/build-a-rest-api-with-node-js-typescript-mongodb-b6c898d70d61)

In this guide, we are going to build a REST API with Node.js, TypeScript, and MongoDB. This guide is for junior to mid-level developers that want to build APIs like a senior developer.

**Finished repository:** https://github.com/TomDoesTech/REST-API-Tutorial

**Postman collection:** https://github.com/TomDoesTech/REST-API-Tutorial/blob/main/postman_collection.json

**Technologies and concepts covered:**

- REST APIs
- JWTs & refresh tokens
- Node.js
- TypeScript
- MongoDB with Mongoose

# Bootstrap app

```
yarn init 
```

## Install typescript

```bash
yarn add -D typescript
```

## Install ambient Node.js types for TypeScript

```
yarn add -D @types/node 
```

## Setup tsconfig

```
npx tsc --init
```

## Create the `src` folder and create our first TypeScript file

```bash
mkdir src
touch src/app.ts
```

## nodemon

 Cold reloading

```bash
yarn add -D ts-node nodemon
```

Add a `nodemon.json` config.

```json
{
  "watch": ["src"],
  "ext": ".ts,.js",
  "ignore": [],
  "exec": "npx ts-node ./src/app.ts"
}
```

And then to run the project, all we have to do is run `nodemon`. Let's add a script for that.

```json
"dev": "npx nodemon",
```

Install some required dependencies:

```bash
yarn add express yup dotenv cors express mongoose pino pino-pretty dayjs bcrypt jsonwebtoken lodash nanoid
```

Add some development dependencies:

```
yarn add @types/body-parser @types/config @types/cors @types/express @types/yup @types/pino @types/mongoose @types/bcrypt @types/jsonwebtoken @types/lodash @types/nanoid -D
```

# Coding

Create a `src` directory and add a file called `app.ts`

```
mkdir src && touch /src/app.ts
```

Create a config file:

```
mkdir config && touch ./config/default.ts
```

Open `/config/default.ts` and add the following object:

```
export default {
  port: 1337,
  host: "localhost",
  dbUri: "mongodb://localhost:27017/rest-api"
}
```

Open `/src/app.ts` and add the following:

```tsx
import express from "express";
import config from "config";

const port = config.get("port") as number;
const host = config.get("host") as string;

const app = express();

/// Parses incoming requests with JSON payloads
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, host, () => {
  console.log(`Server listing at http://${host}:${port}`);
});
```

We can now start the application with `yarn dev` and see the server start on port `1337`.

## Configure the logger

```
mkdir src/logger && touch src/logger/index.ts 
```

```tsx
import logger from "pino";
import dayjs from "dayjs";

const log = logger({
  /// prettyPrint: true,
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default log;
```

in `src/app.ts`, add & use logger:

```typescript
import log from "./logger";
...
log.info(`Server listing at http://${host}:${port}`);
```



## **Configure the Mongoose database connection**

```
mkdir src/db && touch src/db/connect.ts
```

```tsx
import mongoose from "mongoose";
import config from "config";
import log from "../logger";

function connect() {
  const dbUri = config.get("dbUri") as string;

  return mongoose
    .connect(dbUri, {
      /// useNewUrlParser: true,
      /// useUnifiedTopology: true,
    })
    .then(() => {
      log.info("Database connected");
    })
    .catch((error) => {
      log.error("db error", error);
      process.exit(1);
    });
}

export default connect;
```

## **Configure the routes file**

```
touch src/routes.ts
```

```tsx
import { Express, Request, Response } from "express";

export default function (app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));
}
```

## **Bring it all together**

Now that we have the logger, database connection, and routes configured, it’s time to bring it all together in the `app.ts` file.

1. Open `app.ts`
2. Import the logger, routes, and connect function.
3. Update the `console.log` statement to use `log.info`
4. Call the connect function inside the `app.listen` call
5. Call routes inside the `app.listen` call and pass in the instance of the app

Your `app.ts` file should now look like the following:

```tsx
import express from "express";
import config from "config";
import log from "./logger";
import connect from "./db/connect";
import routes from "./routes";
import { deserializeUser } from "./middleware";

const port = config.get("port") as number;
const host = config.get("host") as string;

const app = express();
app.use(deserializeUser);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, host, () => {
  log.info(`Server listing at http://${host}:${port}`);

  connect();

  routes(app);
});
```

Now, navigate : http://localhost:1337/healthcheck

//			=> OK


## List All Users
### create user controller

```typescript
export const getAll = async (req: Request, res: Response) => {
  try {
      const users = await findAllUsers();
      res.status(200).send(users);
  } catch (error) {
      return res.status(500).send(getErrorMessage(error));
  }
};
```


### create user service

```typescript
export async function findAllUsers() {
    try {
        return await UserModel.find({});
    } catch (error) {
        throw error;
    }
}
```

### update the route

```typescript
  app.get('/all', userController.getAll);
```

## User registration

###**Create user model**

```
mkdir src/model && touch src/model/user.model.ts
```

```tsx
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

export interface UserDocument extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next: any ){/// mongoose.HookNextFunction) { ) {
  let user = this as UserDocument;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // Random additional data
  const salt = await bcrypt.genSalt(parseInt(config.get("saltWorkFactor")));

  const hash = await bcrypt.hashSync(user.password, salt);

  // Replace the password with the hash
  user.password = hash;

  return next();
});

// Used for logging in
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const user = this as UserDocument;

  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const User = mongoose.model<UserDocument>("User", UserSchema);

export default User;
```

### Create validate r middleware

Create a folder for the middleware and the `validateRequest` middleware:

```
mkdir src/middleware && touch src/middleware/validateRequest.ts
```

```tsx
import { AnySchema } from "yup";
import { Request, Response, NextFunction } from "express";
import log from "../logger";

const validate = (schema: AnySchema) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    return next();
  } catch (e) {
    log.error(e);
    return res.status(400).send((<any>e).errors);
  }
};

export default validate;
```

````
touch `src/middleware/index.ts`
````

```tsx
/// export { default as deserializeUser } from "./deserializeUser";
/// export { default as requiresUser } from "./requiresUser";
export { default as validateRequest } from "./validateRequest";
```

Import the validate request middleware into the `src/routes.ts` file.

```tsx
...
import { validateRequest, requiresUser } from "./middleware";
...
app.post("/api/users", validateRequest(createUserSchema), createUserHandler);
```

### create user schema

Create a schema file for all the user-related validation schemas:

```
mkdir src/schema && touch src/schema/user.schema.ts 
```

```tsx
import { object, string, ref } from "yup";

export const createUserSchema = object({
  body: object({
    name: string().required("Name is required"),
    password: string()
      .required("Password is required")
      .min(6, "Password is too short - should be 6 chars minimum.")
      .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain Latin letters."),
    passwordConfirmation: string().oneOf(
      [ref("password")],
      "Passwords must match"
    ),
    email: string()
      .email("Must be a valid email")
      .required("Email is required"),
  }),
});

export const createUserSessionSchema = object({
  body: object({
    password: string()
      .required("Password is required")
      .min(6, "Password is too short - should be 6 chars minimum.")
      .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain Latin letters."),

    email: string()
      .email("Must be a valid email")
      .required("Email is required"),
  }),
});
```

### Create user controller

Add `createUserHandler` controller, to `src/controller/user.controller.ts`:

```tsx
import { Request, Response } from "express";
import { omit } from "lodash";
import { createUser } from "../service/user.service";
import log from "../logger";

export async function createUserHandler(req: Request, res: Response) {
  try {
    const user = await createUser(req.body);
    return res.send(omit(user.toJSON(), "password"));
  } catch (e) {
    log.error(e);
    return res.status(409).send(e.message);
  }
}
```

### Add `createUser` service:

to `src/service/user.service.ts`

```tsx
...
import { omit } from "lodash";

export async function createUser(input: any) {/// DocumentDefinition<UserDocument>) {
  try {
    return await User.create(input);
  } catch (error) {
    throw new Error(error as any);
  }
}

export async function validatePassword({
  email,
  password,
}: {
  email: UserDocument["email"];
  password: string;
}) {
  const user = await User.findOne({ email });

  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) {
    return false;
  }

  return omit(user.toJSON(), "password");
} 
...
```

Import the `createUser` service into the controller, 

import the controller into the routes file 

### Update route - Create a user

add a route to `src/routes.ts`

```
app.post("/api/users", validateRequest(createUserSchema), createUserHandler);
```

test the handler by sending a `POST` request to `http://localhost:1337/api/users.`

## Login (Create Session)

### Create utils for JWTs

``` 
mkdir src/utils/ && touch src/utils/jwt.utils.ts
```

```tsx
import jwt from "jsonwebtoken";
import config from "../config";

const privateKey = config.PRIVATKEY as string;

export function sign(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, privateKey, options);
}

export function decode(token: string) {
  try {
    const decoded = jwt.verify(token, privateKey);

    return { valid: true, expired: false, decoded };
  } catch (error) {
    return {
      valid: false,
      expired: (error as Error).message === "jwt expired",
      decoded: null,
    };
  }
}
```

### Create other utils

```
touch src/utils/lang.ts
```

```ts
export type LeanDocument<T> = T & { $locals?: never };
```

### Create session model

```
touch src/model/session.model.ts
```

```tsx
import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface SessionDocument extends mongoose.Document {
  user: UserDocument["_id"];
  valid: boolean;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
}

const SessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    valid: { type: Boolean, default: true },
    userAgent: { type: String },
  },
  { timestamps: true }
);

const Session = mongoose.model<SessionDocument>("Session", SessionSchema);

export default Session;
```

### Create session services

```
touch src/service/session.service.ts
```

```tsx
import { LeanDocument } from "../utils/lang";
import { UserDocument } from "../model/user.model";
import Session, { SessionDocument } from "../model/session.model";
import { sign } from "../utils/jwt.utils";

export async function createSession(userId: string, userAgent: string) {
  const session = await Session.create({ user: userId, userAgent });

  return session.toJSON();
}

export function createAccessToken({
  user,
  session,
}: {
  user:
    // Allows a user object that has had the password omitted
    | Omit<UserDocument, "password">
    // Allows a user object that has been found with .lean()
    | LeanDocument<Omit<UserDocument, "password">>;
  session:
    // Allows a session object that has had the password omitted
    | Omit<SessionDocument, "password">
    // Allows a session object that has been found with .lean()
    | LeanDocument<Omit<SessionDocument, "password">>;
}) {
  // Build and return the new access token
  const accessToken = sign(
    { ...user, session: session._id },
    { expiresIn: config.ACCESSTOKENTTL } // 15 minutes
  );

  return accessToken;
}
```

### Create session controller

```
touch src/controller/session.controller.ts
```

```tsx
import config from "../config";
import { Request, Response } from "express";
import { validatePassword } from "../service/user.service";
import {
   createSession,
   createAccessToken,
} from "../service/session.service";
import { sign } from "../utils/jwt.utils";

export async function createUserSessionHandler(req: Request, res: Response) {
  // validate the email and password
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send("Invalid username or password");
  }

  // Create a session
  const session = await createSession(user._id, req.get("user-agent") || "");

  // create access token
  const accessToken = createAccessToken({
    user,
    session,
  });

  // create refresh token
  const refreshToken = sign(session, {
    expiresIn: config.REFRESHTOKENTTL, // 1 year
  });

  // send refresh & access token back
  return res.send({ accessToken, refreshToken });
}  
```

### Update config

Add a `privateKey`, `accessTokenTtl`, & `refreshTokenTtl` to your config file:

`config/default.ts`

```
export default {
  port: 1337,
  host: "localhost",
  dbUri: "mongodb://localhost:27017/rest-api",
  saltWorkFactor: 10,
  accessTokenTtl: "15m",
  refreshTokenTtl: "1y",
  privateKey: `-----BEGIN RSA PRIVATE KEY-----
  MIICWwIBAAKBgQCQNBc4IP2ewViqE+ZHbnqGoCZFyAUtrxKmO4k/boSvBisJH6BX
  01ajpafM7c7f5PO+wAcGYIxiTQsv9ml2/cgnB6MWG/YYKDCfbWLNbpvQxYlUCu0f
  bRHc4dYM3AysBpx/SE9JNAlUoRsuQ05PP3U0IsM9FzYUpyZ9TDR7bjPYyQIDAQAB
  AoGABnnAXS3mFb36/FA+dBC7AdapQVL1IJMPFFXyGN4eqTlur08zRR5hcqHawjIf
  qyA97d/zsM6fHz70dKftHoHQ/hZKfWsBr2+R8C7rY/tlJhM24kqusDvNA9AMNoQW
  K4+DF+J05q5a+VWjP07Y976LZjq+vXlEVBfEiHig4wECaDECQQDbRQ5L9Mcibd5a
  R+Y3LxtXu0agpSG1dYDcWlLzRAt6yDD/EziRV8DSFyvgj1amO0SQ+2K/Hp5BEHii
  fDJB48ZFAkEAqFv32dNZcBy4IKAAHPgxhsYBcuUCHGfwwxxXJ3DjjZlhuR4K9YjO
  0alf4zNOlUyoULe9z+OAIgIqI9EyIX2itQJAShMeLVLYIy1yvJUllOb5Gb5Osd6X
  cLHtgoORGlWWezg+NS3NImy+2zqwvAAwiZ/kHgaO6XnyhJCH8Hx8jf3g8QJAepLK
  tlo7iXY/T/FtY6oHVNof/+hfSxMZpNOjWGHGKjd7gG0xCWZbPSYVW7LlCanP+URs
  +0fk592vlHggCWYQ6QJANZzno1FwUOjtGLeKm83ZGdbo3K+00i25FmBgB2d0uAtk
  noxFVOjsY+eSXHZqNybrhWRAzutSnpz/QEf/7Vg97g==
  -----END CERTIFICATE-----`,
};
```

You can use the private key in the example above, or [generate your own private key](https://travistidwell.com/jsencrypt/demo/).

test the handler by sending a `POST` request to `http://localhost:1337/api/sessions.`

### add route

```tsx
...
import { createUserSessionHandler } from "./controller/session.controller";
import {
   createUserSessionSchema,  
 } from "./schema/user.schema";

...
app.post("/api/sessions", validateRequest(createUserSessionSchema), createUserSessionHandler);
```

## Delete a user session

### update route

```ts
import { 
  ...,
  requiresUser 
} from "./middleware";
import { 
  ...,
  invalidateUserSessionHandler
 } from "./controller/session.controller";

app.delete("/api/sessions", requiresUser, invalidateUserSessionHandler);
```

### Create requireUser middleware

``` 
touch src/middleware/requiresUser.ts
```

```ts
import { get } from "lodash";
import { Request, Response, NextFunction } from "express";

const requiresUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = get(req, "user");

  if (!user) {
    return res.sendStatus(403);
  }

  return next();
};

export default requiresUser;
```

update `src/middleware/index.ts`

```ts
export { default as requiresUser } from "./requiresUser";
...
```

### Update session service

add:

```ts
...
import { FilterQuery, UpdateQuery } from "mongoose";

...
export async function updateSession(
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) {
  return Session.updateOne(query, update);
}
```

### Update session controller

add:

```ts
import { get } from "lodash";
import {
	...,
   updateSession,
 } from "../service/session.service";

...
export async function invalidateUserSessionHandler(
  req: Request,
  res: Response
) {
  const sessionId = get(req, "user.session");

  await updateSession({ _id: sessionId }, { valid: false });

  return res.sendStatus(200);
}
```

### Create deserializeUser

```
touch src/middleware/deserializeUser.ts
```

```ts
import { get } from "lodash";
import { Request, Response, NextFunction } from "express";
import { decode } from "../utils/jwt.utils";
import { reIssueAccessToken } from "../service/session.service";

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = get(req, "headers.authorization", "").replace(
    /^Bearer\s/,
    ""
  );

  const refreshToken = get(req, "headers.x-refresh");

  if (!accessToken) return next();

  const { decoded, expired } = decode(accessToken);

  if (decoded) {
    // @ts-ignore
    req.user = decoded;

    return next();
  }

  if (expired && refreshToken && typeof refreshToken === "string") {
    const newAccessToken = await reIssueAccessToken({ refreshToken });

    if (newAccessToken) {
      // Add the new access token to the response header
      res.setHeader("x-access-token", newAccessToken);

      const { decoded } = decode(newAccessToken);

      // @ts-ignore
      req.user = decoded;
    }

    return next();
  }

  return next();
};

export default deserializeUser;
```

this middleware to run on every request, 

update `src/imddleware/index.ts`:

```ts
export { default as deserializeUser } from "./deserializeUser";
...
```

update `src/app.ts`:

```ts
import { deserializeUser } from "./middleware";

app.use(deserializeUser);
```



### Update session service  

add `reIssueAccessToken` : 

```ts
import { get } from "lodash";
import { 
  ..., 
  decode } from "../utils/jwt.utils";
import { findUser } from "./user.service";

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  // Decode the refresh token
  const { decoded } = decode(refreshToken);

  if (!decoded || !get(decoded, "_id")) return false;

  // Get the session
  const session = await Session.findById(get(decoded, "_id"));

  // Make sure the session is still valid
  if (!session || !session?.valid) return false;

  const user = await findUser({ _id: session.user });

  if (!user) return false;

  const accessToken = createAccessToken({ user, session });

  return accessToken;
}
```

### add findUser to user service

`user.serice.ts`

```ts
export async function findUser(query: FilterQuery<UserDocument>) {
  return User.findOne(query).lean();
}
```

## Get all sessions for the currently logged in user

By getting all the sessions, the user has an audit trail they can use to see where there and when their account has been accessed. 

### update route

```ts
import { 
  ...,
  getUserSessionsHandler,
 } from "./controller/session.controller";

app.get("/api/sessions", requiresUser, getUserSessionsHandler);
```

### Create the handler

`src/controller/session.controller.ts`

```ts
import {
  ...,
  findSessions,
} from "../service/session.service";

export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");

  const sessions = await findSessions({ user: userId, valid: true });

  return res.send(sessions);
}
```

### Create the `findSession` service

`src/service/session.service.ts`

```ts
import Session, { SessionDocument } from "../model/session.model";

export async function findSessions(query: FilterQuery<SessionDocument>) {
  return Session.find(query).lean();
}
```

## Create a Post

### Create post model

The post model is similar to the user and session models.

call to `nanoid`, which will be used to generate a shorter ID.

use the post title to generate a unique slug.

```
touch src/model/post.model.ts
```

```ts
import mongoose from "mongoose";
import { nanoid } from "nanoid";
import { UserDocument } from "./user.model";

export interface PostDocument extends mongoose.Document {
  user: UserDocument["_id"];
  title: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new mongoose.Schema(
  {
    postId: {
      type: String,
      required: true,
      unique: true,
      default: () => nanoid(10),
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, default: true },
    body: { type: String, default: true },
  },
  { timestamps: true }
);

const Post = mongoose.model<PostDocument>("Post", PostSchema);

export default Post;
```

### Create  post schema

```
touch src/schema/post.schema.ts
```



```ts
import { object, string } from "yup";

const payload = {
  body: object({
    title: string().required("Title is required"),
    body: string()
      .required("Body is required")
      .min(120, "Body is too short - should be 120 chars minimum."),
  }),
};

const params = {
  params: object({
    postId: string().required("postId is required"),
  }),
};

export const createPostSchema = object({
  ...payload,
});
```



### Create post service

```ts
touch src/service/post.service.ts
```

```ts
/// import { DocumentDefinition } from "mongoose";
import Post, { PostDocument } from "../model/post.model";

export function createPost(input: any ){ ///DocumentDefinition<PostDocument>) {
  return Post.create(input);
}
```

### Create post controller

```tsx
touch src/controller/post.controller.ts
```

```ts
import { Request, Response } from "express";
import { get } from "lodash";
import { createPost } from "../service/post.service";

export async function createPostHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const body = req.body;

  const post = await createPost({ ...body, user: userId });

  return res.send(post);
}  
```

### Update rotue

```ts
import { createPostSchema } from "./schema/post.schema";
import { createPostHandler } from "./controller/post.controller";

app.post("/api/posts", [requiresUser, validateRequest(createPostSchema)], createPostHandler);
```

### Fix bug : nanoid

Nano ID 5 works only with ESM projects, in tests or Node.js scripts. For CommonJS you need Nano ID 3.x (we still support it):

[source](https://github.com/ai/nanoid/)

```
npm install nanoid@3
```

## Read a Post

### Update the  route

```ts
import { getPostHandler } from "./controller/post.controller";

app.get("/api/posts/:postId", getPostHandler);
```

### Update the controller

add to `src/controller/post.controller.ts`

```ts
import { ..., findPost } from "../service/post.service";

export async function getPostHandler(req: Request, res: Response) {
  const postId = get(req, "params.postId");
  const post = await findPost({ postId });

  if (!post) {
    return res.sendStatus(404);
  }

  return res.send(post);
}
```

### Update the service

add to `src/service/post.service.ts`

```ts
import { FilterQuery, QueryOptions } from "mongoose";

export function findPost(
  query: FilterQuery<PostDocument>,
  options: QueryOptions = { lean: true }
) {
  return Post.findOne(query, {}, options);
}
```

## Update a Post

### Update the route

```ts
import { ..., updatePostSchema } from "./schema/post.schema";
import { ..., updatePostHandler } from "./controller/post.controller";

app.put("/api/posts/:postId", [requiresUser, validateRequest(updatePostSchema)], updatePostHandler);
```

### Update the model

add to `src/schema/post.schema.ts`

```ts
export const updatePostSchema = object({
  ...params,
  ...payload,
});

```

### Update the controller

add to `src/controller/post.controller.ts`

```ts
import { ..., findAndUpdate } from "../service/post.service";

export async function updatePostHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const postId = get(req, "params.postId");
  const update = req.body;

  const post = await findPost({ postId });

  if (!post) {
    return res.sendStatus(404);
  }

  if (String(post.user) !== userId) {
    return res.sendStatus(401);
  }

  const updatedPost = await findAndUpdate({ postId }, update, { new: true });

  return res.send(updatedPost);
}
```

### Update the service

add to `src/service/post.service`

```ts
import {
  ...,
  UpdateQuery
} from "mongoose";

export function findAndUpdate(
  query: FilterQuery<PostDocument>,
  update: UpdateQuery<PostDocument>,
  options: QueryOptions
) {
  return Post.findOneAndUpdate(query, update, options);
}
```



## Delete a Post

### Update the route

```ts
import { ..., deletePostSchema } from "./schema/post.schema";
import { ..., deletePostHandler
} from "./controller/post.controller";

app.delete("/api/posts/:postId", [requiresUser, validateRequest(deletePostSchema)], deletePostHandler);
```

### Update the model

add to `src/schema/post.schema.ts`

```ts
export const deletePostSchema = object({
  ...params,
});
```

### Update the controller

add to `src/controller/post.controller.ts

```ts
import {
  ...,
  deletePost,
} from "../service/post.service";

export async function deletePostHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const postId = get(req, "params.postId");

  const post = await findPost({ postId });

  if (!post) {
    return res.sendStatus(404);
  }

  if (String(post.user) !== String(userId)) {
    return res.sendStatus(401);
  }

  await deletePost({ postId });

  return res.sendStatus(200);
}
```

### Update the service

add to `src/service/post.service`

```ts
export function deletePost(query: FilterQuery<PostDocument>) {
  return Post.deleteOne(query);
}
```

