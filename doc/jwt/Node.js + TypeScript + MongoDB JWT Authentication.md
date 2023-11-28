# Node.js + TypeScript + MongoDB: JWT Authentication

September 6, 2023 [19 Comments](https://codevoweb.com/node-typescript-mongodb-jwt-authentication/#comments) 143

In this article, you’ll learn how to add JSON Web Token (JWT) Authentication to your Node.js app with TypeScript, MongoDB, Mongoose, Typegoose, Docker, Redis, and Zod.

Node.js, TypeScript, and MongoDB Tutorial Series:

- [Node.js + TypeScript + MongoDB: JWT Authentication](https://codevoweb.com/node-typescript-mongodb-jwt-authentication)
- [Node.js + TypeScript + MongoDB: JWT Refresh Token](https://codevoweb.com/react-node-access-refresh-tokens-authentication)
- [Google OAuth Authentication React.js and Node.js(No Passport)](https://codevoweb.com/google-oauth-authentication-react-and-node)

You can also read:



- [Form Validation with React Hook Form, Material UI, React and TypeScript](https://codevoweb.com/form-validation-react-hook-form-material-ui-react)
- [How to Setup Material-UI v5 with React JS and TypeScript](https://codevoweb.com/setup-material-ui-v5-with-react-js-and-typescript)
- [16 Complicated Programming Terms You Need To Know](https://codevoweb.com/16-complicated-programming-terms-you-need-to-know)

![Node.js + TypeScript + MongoDB JWT Authentication](https://codevoweb.com/wp-content/uploads/2022/04/Node.js-TypeScript-MongoDB-JWT-Authentication.webp?ezimgfmt=rs:615x323/rscb1/ng:webp/ngcb1)

## Introduction



In this course, you’ll learn how to build a Node.js backend with TypeScript, implement user authentication and authorization with JWT, store data in Redis, and spawn Docker containers with docker-compose.



The JWT Authentication Architecture is built with:

- [Node.js](https://nodejs.org/) – a JavaScript run-time scripting language
- [Expressjs](https://expressjs.com/) – serves as a Node.js framework
- [Typegoose](https://typegoose.github.io/typegoose/) – serves as a wrapper around Mongoose to allow us to write Mongoose models with TypeScript classes.
- [Mongoose](https://mongoosejs.com/) – an ODM (Object Document Mapping) for accessing and mutating the database
- [Bcryptjs](https://www.npmjs.com/package/bcryptjs) – for hashing the passwords
- [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken) – generating JWTs
- [Redis](https://www.npmjs.com/package/redis) – as caching storage for storing the user’s session
- [MongoDB](https://www.mongodb.com/) – as NoSQL database
- [Zod](https://github.com/colinhacks/zod) – for validating user inputs
- [cors](https://www.npmjs.com/package/cors) – To allow Cross-Origin Resource Sharing between the backend and frontend

## What the course will cover



- How to use TypeScript in Node.js and Express
- How to model data with Mongoose, Typegoose, and TypeScript
- How to spawn docker containers with docker-compose
- JWT Authentication with Private and Public keys
- How to store data in Redis

## Prerequisites

To follow along with this tutorial, make sure you have the following:



### Software

- [Node.js](https://nodejs.org/en/download/) – for scripting the backend logic
- [Docker](https://www.docker.com/products/docker-desktop/) – allows us to package applications into containers
- [MongoDB compass](https://www.mongodb.com/try/download/compass) (optional) – A GUI for querying, mutating, analyzing, and aggregating MongoDB data.

### VS Code Extensions



- [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker) (optional) – Manage docker containers directly in VS Code
- [DotENV](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv) – Get syntax highlighting in the environment variables file
- [HTTP Client](https://marketplace.visualstudio.com/items?itemName=mkloubert.vscode-http-client) – For making HTTP requests to the server. You can also use [Postman](https://www.postman.com/downloads/) or [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
- [MySQL](https://marketplace.visualstudio.com/items?itemName=cweijan.vscode-mysql-client2) – Database client for VS Code. Allows us to see what’s in the Redis database.

## Assumed Knowledge

The course assumes:



- You have basic knowledge of Node.js
- You have basic knowledge of TypeScript and JavaScript
- Have basic knowledge of NoSQL databases
- Have basic knowledge of Mongoose
- You have basic knowledge of Docker

## Setup Development Environment (Optional)



To follow along with this course, you need to have Node.js, Docker, and MongoDB Compass installed on your machine.



### Download and Install Node.js

![official homepage of nodejs](https://codevoweb.com/wp-content/uploads/2022/04/official-homepage-of-nodejs.png?ezimgfmt=rs:615x437/rscb1/ng:webp/ngcb1)

To download Node.js, visit the [official download page](https://nodejs.org/en/) of Node.js and download the current or LTS (Long Term Support) version of Node.js.



After the installation is complete, run the installer wizard and accept the default options.

### Download and Install Docker

To download Docker, visit the [official download](https://www.docker.com/products/docker-desktop/) page of Docker and download the right version for your operating system.



The Docker installer will automatically install Docker-compose.

### Download and Install MongoDB Compass

To download and install MongoDB Compass, visit the [official MongoDB Compass](https://www.mongodb.com/try/download/compass) download page and download the right version for your operating system.



## Node.js, Redis, MongoDB, Typegoose, Docker: JWT Authentication example



With this JWT Authentication Rest API, the user will be able to do the following:

- Signup for a new account with a Name, Email, Password, and Password Confirm fields.
- Login with the Email and Password credentials.
- Get the profile information only if he is logged in.
- Admin will be able to get all the users in the database.

These are the API endpoints we need for this Rest API

| RESOURCE | HTTP METHOD |       ROUTE        |                 DESCRIPTION                 |
| :------: | :---------: | :----------------: | :-----------------------------------------: |
|  users   |     GET     |     /api/users     | returns all the users and their information |
|  users   |     GET     |   /api/users/me    |   return the logged-in user’s information   |
|   auth   |    POST     | /api/auth/register |              Create a new user              |
|   auth   |    POST     |  /api/auth/login   |              Logs the user in               |



## JWT Authentication Flow with Redis, MongoDB, and Node.js

This is the JWT Authentication flow we will follow in this tutorial. The user visits our app in the browser and provides his username and password to log into our application.

The frontend app will then make a request to the backend with the user’s credentials. The backend will then authenticate the user and send back some cookies if the credentials are valid.

![JWT Authentication with NodeJs](https://codevoweb.com/wp-content/uploads/2022/04/JWT-Authentication-with-NodeJs.webp?ezimgfmt=rs:615x443/rscb1/ng:webp/ngcb1)

The diagram below illustrates the user login flow in our application



![JWT Authentication User Login](https://codevoweb.com/wp-content/uploads/2022/04/JWT-Authentication-User-Login.webp?ezimgfmt=rs:615x400/rscb1/ng:webp/ngcb1)

The diagram below shows the user registration flow in the JWT Authentication flow.



![User Registration with JWT Authentication](https://codevoweb.com/wp-content/uploads/2022/04/User-Registration-with-JWT-Authentication.webp?ezimgfmt=rs:615x400/rscb1/ng:webp/ngcb1)

## Project Structure

```
jwt_authentication_authorization_node/
├── .vscode/
│ └── extensions.json
├── config/
│ ├── custom-environment-variables.ts
│ └── default.ts
├── http/
│ ├── getUsers.http-request
│ ├── login.http-request
│ ├── me.http-request
│ └── register.http-request
├── src/
│ ├── controllers/
│ │ ├── auth.controller.ts
│ │ └── user.controller.ts
│ ├── middleware/
│ │ ├── deserializeUser.ts
│ │ ├── requireUser.ts
│ │ ├── restrictTo.ts
│ │ └── validate.ts
│ ├── models/
│ │ └── user.model.ts
│ ├── routes/
│ │ ├── auth.route.ts
│ │ └── user.route.ts
│ ├── schema/
│ │ └── user.schema.ts
│ ├── services/
│ │ └── user.service.ts
│ ├── utils/
│ │ ├── appError.ts
│ │ ├── connectDB.ts
│ │ ├── connectRedis.ts
│ │ └── jwt.ts
│ └── app.ts
├── .env
├── .gitignore
├── docker-compose.yml
├── package.json
├── tsconfig.json
└── yarn.lock
```

## Project Setup

Create a new project folder with the following command



```powershell
mkdir jwt_auth
cd jwt_auth
```

### Initialize a Node.js Project with TypeScript

The first thing we always do before coding a Node.js project that will require external libraries is to initialize a new project with the following command.

```shell
# with yarn
yarn init
# with npm 
npm init
```

You will be prompted to provide some answers. If you don’t want to answer questions then use the `**-y**`flag.

You should see logs like this in your terminal if you answered the prompted questions.

```
$ yarn init
yarn init v1.22.18
question name (test): Jwt_Auth
question version (1.0.0):
question description: Jwt Authentication with Node.js, Typegoose, mongoD
B, Mongoose, Docker, Redis, and JsonWebToken
question entry point (index.js): app.ts
question repository url:
question author: Codevo
question license (MIT):
question private:
success Saved package.json
Done in 21.33s.
```

Run the command below to install TypeScript as a dev dependency. This will allow us compile the TypeScript code into pure JavaScript using the TypeScript compiler.

```shell
# with yarn
yarn add -D typescript
# with npm 
npm init -y
npm install -D typescript
```

Run the following command to initialize a TypeScript project. A tsconfig.json file will be created in your root directory.

```shell
npx tsc --init
```

#### TypeScript tsconfig.json file configurations

Add the following configuration options to your **tsconfig.json** file to allow us use decorators and more in our code.

```json
{
  "compilerOptions": {
    "target": "es2016",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "module": "commonjs",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "strictPropertyInitialization": false,
    "skipLibCheck": true
  }
}
```

#### Important configurations in the tsconfig.json

- experimentalDecorators: true
- emitDecoratorMetadata: true
- strictPropertyInitialization: false

### Install the Required Libraries

#### Install the Dependencies

```shell
# npm
npm install @typegoose/typegoose bcryptjs config cookie-parser dotenv express jsonwebtoken lodash mongoose redis ts-node-dev zod cors

# yarn
yarn add @typegoose/typegoose bcryptjs config cookie-parser dotenv express jsonwebtoken lodash mongoose redis ts-node-dev zod cors
```

- **`dotenv`** – loads environment variables from a `.env` file into `process.env`
- **`@typegoose/typegoose`** – writing Mongoose models with TypeScript class
- **`bcryptjs`** – to hash the password data
- **`config`** – allow us to provide TypeScript types for the environment variables we import from the `.env` file
- **`cookie-parser`** – to parse the cookies in the request headers and attach them to `req.cookies`
- `**jsonwebtoken**` – to sign and verify JWTs
- `lodash` – contains utilities for simplifying common programming tasks.
- `ts-node-dev` – allow us run the server. An alternative solution is `nodemon` and `ts-node`.

#### Install the devDependencies

```shell
# npm
npm install -D morgan typescript
# yarn
yarn add -D morgan typescript
```

#### Install the Type Definition files

These type definition files are needed for TypeScript to function properly.

```shell
# npm
npm install -D @types/bcryptjs @types/config @types/cookie-parser @types/express @types/jsonwebtoken @types/lodash @types/morgan @types/node @types/cors
# yarn
yarn add -D @types/bcryptjs @types/config @types/cookie-parser @types/express @types/jsonwebtoken @types/lodash @types/morgan @types/node @types/cors
```

### Initialize and Start the Express Server

Create an src folder in the root directory and within the src folder create a file named `app.ts` .

 and paste the boilerplate code for the express server.

**src/app.ts**

```ts
require('dotenv').config();
import express from 'express';
import config from 'config';

const app = express();

const port = config.get<number>('port');
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
```

In the code snippets above, I imported the [dotenv](https://www.npmjs.com/package/dotenv) package and configured it at the top level of the `app.ts` file.

Then I created an instance of the express class and called the listen method with the port we want to run the server on and a callback function.

Since we are making use of environment variables it makes sense to create a `.env` file in the root directory.

Now create a `.env` file in the root directory and add the following code.

**.env**

```env
NODE_ENV=development
MONGODB_USERNAME=codevoweb
MONGODB_PASSWORD=password123
MONGODB_DATABASE_NAME=jwtAuth

ACCESS_TOKEN_PRIVATE_KEY=LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlCT2dJQkFBSkJBTlFLQStSV2ZQZFdHR25iYS9WRVo1TUs5cG1nMUlQay9paEE5dXF2Ny8rNVlzRjNUVURoCnFHZXN1bGJhdFFGdkNPaHVmSlNJQmFWT3RjbVZrTWZoWmRrQ0F3RUFBUUpBYkVlTkF6NnpaQzhBR3BhbGc4TmgKelBJdFNmaWFiWnd6dWVTcTh0L1RoRmQrUGhqN2IxTmphdjBMTjNGamhycjlzV3B2UjBBNW13OFpoSUFUNzZMUgpzUUloQU95Zmdhdy9BSTVoeGs3NmtWaVRRV0JNdjdBeERwdi9oSG1aUFdxclpyL1ZBaUVBNVdjalpmK0NaYlhTCnlpV3dUbEVENGVZQ3BSNk16Qk8wbFVhbExKdVRFL1VDSUhWTWZSUE9CNUNObDZqL1BaNFRJWTJEZm1MeGJyU1cKYmkxNWNhQzNaekFoQWlBNmUrVG1hQkdTWkp4c3ROY1I0RTJoRmNhdTJlOERTRExOcThrSWFsRkEwUUloQUlwUApUODFlWlNzYmVrNTlidGJPZ3J3bTJBdzJqUVk4TitJa3FMSTNySWFFCi0tLS0tRU5EIFJTQSBQUklWQVRFIEtFWS0tLS0t
ACCESS_TOKEN_PUBLIC_KEY=LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUZ3d0RRWUpLb1pJaHZjTkFRRUJCUUFEU3dBd1NBSkJBTlFLQStSV2ZQZFdHR25iYS9WRVo1TUs5cG1nMUlQawovaWhBOXVxdjcvKzVZc0YzVFVEaHFHZXN1bGJhdFFGdkNPaHVmSlNJQmFWT3RjbVZrTWZoWmRrQ0F3RUFBUT09Ci0tLS0tRU5EIFBVQkxJQyBLRVktLS0tLQ==
```

Within the .env file, I added public and private access token keys which are base64 encoded.

I also provided the MongoDB database credentials we will need for the mongo docker container.

I will later show how you can generate those private and public keys. Also, make sure you change the database credentials.

Next, create a config folder in the root directory and create two files named `default.ts` and `custom-environment-variables.ts` in the config folder.

Open the default.ts file and add the following code

**config/default.ts**

```ts
export default {
  port: 8000,
  accessTokenExpiresIn: 15,
origin: 'http://localhost:3000',
};
```

Next, add the following code to the `custom-environment-variables.ts` file.

**config/custom-environment-variables.ts**

```ts
export default {
  dbName: 'MONGODB_USERNAME',
  dbPass: 'MONGODB_PASSWORD',
  accessTokenPrivateKey: 'ACCESS_TOKEN_PRIVATE_KEY',
  accessTokenPublicKey: 'ACCESS_TOKEN_PUBLIC_KEY',
};
```

The **custom-environment-variables.ts** file will allow us to import the environment variables we defined in the **.env** file.

Now add the start script to the package.json file

```json
"scripts": {
    "start": "ts-node-dev --respawn --transpile-only src/app.ts"
  }
```

If you followed all the instructions above, your final package.json file should look somehow like this:

**package.json**

```json
{
  "name": "JWT_Auth",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "start": "ts-node-dev --respawn --transpile-only src/app.ts"
  },
  "dependencies": {
    "@typegoose/typegoose": "^9.8.0",
    "bcryptjs": "^2.4.3",
    "config": "^3.3.7",
    "cookie-parser": "^1.4.6",
    "dotenv": "^16.0.0",
    "express": "^4.17.3",
    "jsonwebtoken": "^8.5.1",
    "lodash": "^4.17.21",
    "mongoose": "^6.3.0",
    "redis": "^4.0.6",
    "ts-node-dev": "^1.1.8",
    "zod": "^3.14.4"
  },
  "devDependencies": {
    "@types/bcryptjs": "^2.4.2",
    "@types/config": "^0.0.41",
    "@types/cookie-parser": "^1.4.2",
    "@types/express": "^4.17.13",
    "@types/jsonwebtoken": "^8.5.8",
    "@types/lodash": "^4.14.182",
    "@types/morgan": "^1.9.3",
    "@types/node": "^17.0.25",
    "morgan": "^1.10.0",
    "typescript": "^4.6.3"
  }
}
```

Finally, open your terminal and run the start script to start the Express server.

```shell
yarn start
```

This will start the Express server on port **8000** or the port you specified.

Click on this http://localhost:8000/healthChecker link and you should see this in a new tab.

![express app health checker](https://codevoweb.com/wp-content/uploads/2022/04/express-app-health-checker.png?ezimgfmt=rs:615x357/rscb1/ng:webp/ngcb1)

Once you see the Welcome message then it means you did everything correctly.

### Setting up Redis and MongoDB with Docker Compose

I assume you already have docker installed on your computer. In the root directory create a `docker-compose.yml` file and add the code below.

**docker-compose.yml**

```yml
version: '3.8'
services:
  mongo:
    image: mongo:latest
    container_name: mongo
    environment:
      MONGO_INITDB_ROOT_USERNAME: ${MONGODB_USERNAME}
      MONGO_INITDB_ROOT_PASSWORD: ${MONGODB_PASSWORD}
      MONGO_INITDB_DATABASE: ${MONGODB_DATABASE_NAME}
    env_file:
      - ./.env
    volumes:
      - mongo:/data/db
    ports:
      - '6000:27017'
  redis:
    image: redis:latest
    container_name: redis
    ports:
      - '6379:6379'
    volumes:
      - redis:/data
volumes:
  mongo:
  redis:
```

With the mongo container, I exposed port 6000 so that we can log into the mongo container on port 6000 in MongoDB Compass.

Also, I exposed port 6379 on the Redis container to allow us to connect to the Redis container with the [MySQL VS Code client extension](https://marketplace.visualstudio.com/items?itemName=cweijan.vscode-mysql-client2).

Now, open your terminal and run the command below to spawn the Mongo and Redis containers.

```shell
# start the docker containers
docker-compose up -d
```

### Connecting to the MongoDB Docker Container with Mongoose

Since we have our MongoDB database up and running, we need to connect our Express app to it with Mongoose.

In the src folder, create a **utils** folder, and within this `utils` folder create a `connectDB.ts` file and paste this code into it.

**src/utils/connectDB.ts**

```ts
import mongoose from 'mongoose';
import config from 'config';

const dbUrl = `mongodb://${config.get('dbName')}:${config.get(
  'dbPass'
)}@localhost:6000/jwtAuth?authSource=admin`;

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log('Database connected...');
  } catch (error: any) {
    console.log(error.message);
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
```

What we just did above:

- imported mongoose and the config library
- constructed the database connection string with the properties we defined in the `custom-environment-variables.ts` file.
- I called the mongoose `connect` function and passed the database connection string as an argument.
- Lastly, I used setTimeout to call the `connectDB` function after every 5s when there is a connection error.

The database connection URL has the following structure:

```js
const dbUrl = `mongodb://username:password@host:port/database?authSource=admin`
```

|   NAME   | PLACEHOLDER |                         DESCRIPTION                          |
| :------: | :---------: | :----------------------------------------------------------: |
|   Host   |    host     |     The domain of the database server, **eg: localhost**     |
|   Port   |    port     | The port on which the database server is running on, **eg: 27017** |
|   User   |  username   |                    The database username                     |
| Password |  password   |              The password of the database user               |
| Database |  database   |                   The name of the database                   |
| Options  | authSource  | The database to use when authenticating with `user` and `pass` |

### Connecting to Redis Docker Container

Next, let’s connect our express app to the Redis container.

Inside the utils folder, create a new `connectRedis.ts` file then  and paste the code snippets below into it.

**src/utils/connectRedis.ts**

```ts
import { createClient } from 'redis';

const redisUrl = `redis://localhost:6379`;
const redisClient = createClient({
  url: redisUrl,
});

const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log('Redis client connected...');
  } catch (err: any) {
    console.log(err.message);
    setTimeout(connectRedis, 5000);
  }
};

connectRedis();

redisClient.on('error', (err) => console.log(err));

export default redisClient;
```

Here is a breakdown of what I did in the `connectRedis.ts` file:

- I imported the `createClient` function from the `redis` library
- I created the Redis connection URL and assigned it to redisUrl
- I called the `createClient` function and passed an object with the connection URL. I assigned the object returned by the `createClient` function to the redisClient variable.
- I then created a `connectRedis` function and called the connect method on the `redisClient` object.
- Lastly, I used setTimeout to call the `connectRedis` function after every 5s when the connection fails.

Now, open `app.ts` and import the `connectDB` function we defined in the`connectDB.ts` file then call it below the `console.log()` in the callback we passed to the `listen` function.

**src/app.ts**

```ts
require('dotenv').config();
import express from 'express';
import config from 'config';
import connectDB from './utils/connectDB';

const app = express();

const port = config.get<number>('port');
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
  // ? call the connectDB function here
  connectDB();
});
```

You will see the DB connection message in the terminal assuming your server is still running.

## Creating the Database Schema with Typegoose

Now create a models folder in the src folder and within the models’ folder create a `user.model.ts` file.

Typegoose makes heavy use of decorators to define a Mongoose model.

**src/models/user.model.ts**

```ts
import {
  DocumentType,
  getModelForClass,
  index,
  modelOptions,
  pre,
  prop,
} from '@typegoose/typegoose';
import bcrypt from 'bcryptjs';

@index({ email: 1 })
@pre<User>('save', async function () {
  // Hash password if the password is new or was updated
  if (!this.isModified('password')) return;

  // Hash password with costFactor of 12
  this.password = await bcrypt.hash(this.password, 12);
})
@modelOptions({
  schemaOptions: {
    // Add createdAt and updatedAt fields
    timestamps: true,
  },
})

// Export the User class to be used as TypeScript type
export class User {
  @prop()
  name: string;

  @prop({ unique: true, required: true })
  email: string;

  @prop({ required: true, minlength: 8, maxLength: 32, select: false })
  password: string;

  @prop({ default: 'user' })
  role: string;

  // Instance method to check if passwords match
  async comparePasswords(hashedPassword: string, candidatePassword: string) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }
}

// Create the user model from the User class
const userModel = getModelForClass(User);
export default userModel;
```

Breakdown of what I did above:

- I created a User class and added all the properties our model requires with the Typegoose decorators and exported the class.
- I used the utility function `getModelForClass` to create a Mongoose model from the User class we defined above.
- I used a pre-save hook to hash the password only if the password is new or was modified.
- I then added the email field as an index.

## How to Generate Private and Public keys for JWT Authentication

#### Way1:

First check the bit length of your key

```
$ PRIVATE_KEY_FILE="private.pem"
$ openssl rsa -in $PRIVATE_KEY_FILE -text -noout | grep "Private-Key"
```

The reported bit length should be >= 2048. If your key has less then 2048 bits you have the following options:

1.) Gnerate a new key pair:

```
openssl genrsa -out private.pem 2048
openssl rsa -in private.pem -pubout -out public.pem
```

2.) Switch to one of the `ES*` algorithms

3.) If for some reasons you can not change your keys, you might set the flag `allowInsecureKeySizes` to true.
Although this is not recommended as 1024 bit keys are considered weak nowadays. Also the RFC7518 requires at least 2048 bit keys.

> A key of size 2048 bits or larger MUST be used with these algorithms.
> https://datatracker.ietf.org/doc/html/rfc7518.html#section-3.3

####Way2:

Generating the private and public keys yourself can be challenging so am going to use [this website](http://travistidwell.com/jsencrypt/demo/) to easily generate them.

On the website, you can use either **512 bits** or **1024 bits** as the key size but am going to use **512 bits**. After selecting the key size, click on the **“Generate New Key”** button to generate the keys.

Now let’s [visit this website](https://www.base64encode.org/) to encode both keys in **base64**.  each of the keys and paste it into the “Encode to Base64 format” Textarea then click on the “Encode” button.

After each encoding  the encoded key and paste it into the .env file respectively.

## Define Middleware to Sign and Verify JWTs

Next, create a middleware folder in the src folder and create a file named `jwt.ts` file in the middleware folder.

 and paste the code below into the `jwt.ts` file.

**src/utils/jwt.ts**

```ts
import jwt, { SignOptions } from 'jsonwebtoken';
import config from 'config';

export const signJwt = (payload: Object, options: SignOptions = {}) => {
  const privateKey = Buffer.from(
    config.get<string>('accessTokenPrivateKey'),
    'base64'
  ).toString('ascii');
  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
};

export const verifyJwt = <T>(token: string): T | null => {
  try {
    const publicKey = Buffer.from(
      config.get<string>('accessTokenPublicKey'),
      'base64'
    ).toString('ascii');
    return jwt.verify(token, publicKey) as T;
  } catch (error) {
    return null;
  }
};
```

Let me explain what I did in the `jwt.ts` file:

- I exported a `signJwt` and `verifyJwt` functions
- The `signJwt` function is responsible for signing a new JsonWebToken. The `signJwt` function takes two parameters, a payload object and a SignOptions object.
- In the `signJwt` function, I converted the encoded private key we stored in the `.env` file to an **ASCII** string.
- Next, I made the `verifyJwt` function a generic function so that it can return the generic type or null.
- When the `verifyJwt` function turns null then it means the token is invalid or has expired

## Define a Custom Error Handler in Express

Next, let’s create a custom Express Error Handler by extending the Error class.

**src/utils/appError.ts**

```ts
export default class AppError extends Error {
  status: string;
  isOperational: boolean;

  constructor(public message: string, public statusCode: number = 500) {
    super(message);
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
```

Whenever we want to send an error to the user we’ll call the next function and pass an instance of the **AppError** class with the message and the status code.

In Express when you call the next function with an argument, Express assumes it’s an error so it will skip all the middleware functions and directly send the error to the error handler in the middleware pipe.

In our JWT Authentication app, Express will immediately send the error we passed to the next function to the middleware below.

```
app.use((err: any, req: Request, res: Response, next: NextFunction) =&gt; {
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});
```

The error controller will then perform some logic before sending the actual message and status code to the user that made the request.

Error handling in Express can be very challenging but I simplified the error handling process in this article because I noticed the article was getting too long.

## Define the Zod Validation Schema

With every backend application, it’s always good not to trust the user’s input. You should always validate the user’s input in your backend application.

Mongoose itself comes with schema validation but since we are using TypeScript, we can add Zod schema validation.

Below are the schema validation rules for both the login and register functions.

**src/schemas/user.schema.ts**

```ts
import { object, string, TypeOf } from 'zod';

export const createUserSchema = object({
  body: object({
    name: string({ required_error: 'Name is required' }),
    email: string({ required_error: 'Email is required' }).email(
      'Invalid email'
    ),
    password: string({ required_error: 'Password is required' })
      .min(8, 'Password must be more than 8 characters')
      .max(32, 'Password must be less than 32 characters'),
    passwordConfirm: string({ required_error: 'Please confirm your password' }),
  }).refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Passwords do not match',
  }),
});

export const loginUserSchema = object({
  body: object({
    email: string({ required_error: 'Email is required' }).email(
      'Invalid email or password'
    ),
    password: string({ required_error: 'Password is required' }).min(
      8,
      'Invalid email or password'
    ),
  }),
});

export type CreateUserInput = TypeOf<typeof createuserschema="">['body'];
export type LoginUserInput = TypeOf<typeof loginuserschema="">['body'];
```

I also used the **TypeOf** function from Zod to infer the TypeScript types of our schemas and exported them from the file.

## Create a Middleware to Validate the User Inputs

This function is responsible for validating the user input based on the schema passed to it as an argument.

**src/middleware/validate.ts**

```ts
import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        params: req.params,
        query: req.query,
        body: req.body,
      });

      next();
    } catch (err: any) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          status: 'fail',
          error: err.errors,
        });
      }
      next(err);
    }
  };
```

## Create a Service to Communicate with the Database

It’s recommended to always have services that communicate with the database for a couple of reasons.

Don’t let your controllers access and mutate the database directly if you want to scale and easily test your Express app.

Below are the functions that communicate with the database. I also added the logic to sign new JWT tokens.

**src/services/user.service.ts**

```ts
import { omit, get } from 'lodash';
import { FilterQuery, QueryOptions } from 'mongoose';
import config from 'config';
import userModel, { User } from '../models/user.model';
import { excludedFields } from '../controllers/auth.controller';
import { signJwt } from '../utils/jwt';
import redisClient from '../utils/connectRedis';
import { DocumentType } from '@typegoose/typegoose';

// CreateUser service
export const createUser = async (input: Partial<User>) => {
  const user = await userModel.create(input);
  return omit(user.toJSON(), excludedFields);
};

// Find User by Id
export const findUserById = async (id: string) => {
  const user = await userModel.findById(id).lean();
  return omit(user, excludedFields);
};

// Find All users
export const findAllUsers = async () => {
  return await userModel.find();
};

// Find one user by any fields
export const findUser = async (
  query: FilterQuery<User>,
  options: QueryOptions = {}
) => {
  return await userModel.findOne(query, {}, options).select('+password');
};

// Sign Token
export const signToken = async (user: DocumentType<User>) => {
  // Sign the access token
  const access_token = signJwt(
    { sub: user._id },
    {
      expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`,
    }
  );

  // Create a Session
  redisClient.set(user._id, JSON.stringify(user), {
    EX: 60 * 60,
  });

  // Return access token
  return { access_token };
};
```

Important things to note in the above code:

- In the `signToken` function, I first generated the access token and specified expiration time in minutes.
- I then called the set method on the redisClient object and used the user id as the key and the user’s info as the value to be stored in Redis. I also gave the data an expiration time.

## Create the Authentication Controller

The authentication controller is responsible for anything regarding user authentication. Here are some of the jobs the controller can perform:

- Registering new user
- Logging the user into his account
- Sending a password reset email to a user who forgets his email or password
- Reset the user’s password
- Updating the currently logged in user’s password
- Authentication with Google OAuth
- Authentication with GitHub OAuth

**src/controllers/auth.controller.ts**

```ts
import config from 'config';
import { CookieOptions, NextFunction, Request, Response } from 'express';
import { CreateUserInput, LoginUserInput } from '../schema/user.schema';
import { createUser, findUser, signToken } from '../services/user.service';
import AppError from '../utils/appError';

// Exclude this fields from the response
export const excludedFields = ['password'];

// Cookie options
const accessTokenCookieOptions: CookieOptions = {
  expires: new Date(
    Date.now() + config.get<number>('accessTokenExpiresIn') * 60 * 1000
  ),
  maxAge: config.get<number>('accessTokenExpiresIn') * 60 * 1000,
  httpOnly: true,
  sameSite: 'lax',
};

// Only set secure to true in production
if (process.env.NODE_ENV === 'production')
  accessTokenCookieOptions.secure = true;

export const registerHandler = async (
  req: Request<{}, {}, CreateUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await createUser({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
    });

    res.status(201).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(409).json({
        status: 'fail',
        message: 'Email already exist',
      });
    }
    next(err);
  }
};

export const loginHandler = async (
  req: Request<{}, {}, LoginUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get the user from the collection
    const user = await findUser({ email: req.body.email });

    // Check if user exist and password is correct
    if (
      !user ||
      !(await user.comparePasswords(user.password, req.body.password))
    ) {
      return next(new AppError('Invalid email or password', 401));
    }

    // Create an Access Token
    const { accessToken } = await signToken(user);

    // Send Access Token in Cookie
    res.cookie('accessToken', accessToken, accessTokenCookieOptions);
    res.cookie('logged_in', true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    // Send Access Token
    res.status(200).json({
      status: 'success',
      accessToken,
    });
  } catch (err: any) {
    next(err);
  }
};
```

Here is a breakdown of what I did in the **auth.controller.ts** file:

- We have two functions, a `registerHandler` and `loginHandler` .
- When the user provides his email, name and password to register for an account, the `registerHandler` will be called then the `registerHandler` will also call the `createUser` service with the required user credentials.
- The `createUser` service will then communicate with the user model to create the new user.
- In the catch block of the `registerHandler` I checked if the error has a code of **11000** which is a MongoDB error code of a duplicate unique field. When the error code is **11000** then it means the user already exists so we send the appropriate error message and status code.
- Next, in the `loginHandler` I checked if the user with that email exists in our MongoDB database.
- If the user exists then we check if the password is the same as the encrypted one in the database.
- Then we create a new JWT access token and send it to the user as a response and a cookie.

## Create the User Controller to Test Authorization

In the user controller there are two functions:

1. The `getMeHandler` returns the currently logged in user’s profile info.
2. The `getAllUsersHandler` function is only for the Admin to get all users.

**src/controllers/user.controller.ts**

```ts
import { NextFunction, Request, Response } from 'express';
import { findAllUsers } from '../services/user.service';

export const getMeHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getAllUsersHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await findAllUsers();
    res.status(200).json({
      status: 'success',
      result: users.length,
      data: {
        users,
      },
    });
  } catch (err: any) {
    next(err);
  }
};
```

## Define a function to deserialize the User

This middleware is responsible for getting the JWT Authorization bearer token and cookie from the headers and cookie object respectively.

It then validates the token, checks if the user has a valid session, check if the user still exists and adds the user to `res.locals` if there wasn’t any error.

**src/middleware/deserializeUser.ts**

```ts
import { NextFunction, Request, Response } from 'express';
import { findUserById } from '../services/user.service';
import AppError from '../utils/appError';
import redisClient from '../utils/connectRedis';
import { verifyJwt } from '../utils/jwt';

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get the token
    let access_token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      access_token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.access_token) {
      access_token = req.cookies.access_token;
    }

    if (!access_token) {
      return next(new AppError('You are not logged in', 401));
    }

    // Validate Access Token
    const decoded = verifyJwt<{ sub: string }>(access_token);

    if (!decoded) {
      return next(new AppError(`Invalid token or user doesn't exist`, 401));
    }

    // Check if user has a valid session
    const session = await redisClient.get(decoded.sub);

    if (!session) {
      return next(new AppError(`User session has expired`, 401));
    }

    // Check if user still exist
    const user = await findUserById(JSON.parse(session)._id);

    if (!user) {
      return next(new AppError(`User with that token no longer exist`, 401));
    }

    // This is really important (Helps us know if the user is logged in from other controllers)
    // You can do: (req.user or res.locals.user)
    res.locals.user = user;

    next();
  } catch (err: any) {
    next(err);
  }
};
```

## Define a function to check if the user is logged in

This middleware will be called after the **deserializeUser** middleware to check if the user exists on **res.locals**.

**src/middleware/requireUser.ts**

```ts
import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/appError';

export const requireUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    if (!user) {
      return next(new AppError(`Invalid token or session has expired`, 401));
    }

    next();
  } catch (err: any) {
    next(err);
  }
};
```

## Define a Middleware to Restrict Unauthorized Access

This middleware checks if the user role exists in the `allowedRoles` array. If the role is in the array then it means the user is allowed to perform that action else it will throw an error.

**src/middleware/restrictTo.ts**

```ts
import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/appError';

export const restrictTo =
  (...allowedRoles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user;
    if (!allowedRoles.includes(user.role)) {
      return next(
        new AppError('You are not allowed to perform this action', 403)
      );
    }

    next();
  };
```

## Create the Authentication Routes

Now, create two routes folders named `user.route.ts` and `auth.route.ts` in the src folder.

A route in Express is considered as a mini-app. Whenever a request matches the route in the middleware stack, Express will delegate the request to the route handler of that route.

**src/routes/user.route.ts**

```ts
import express from 'express';
import {
  getAllUsersHandler,
  getMeHandler,
} from '../controllers/user.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { restrictTo } from '../middleware/restrictTo';

const router = express.Router();
router.use(deserializeUser, requireUser);

// Admin Get Users route
router.get('/', restrictTo('admin'), getAllUsersHandler);

// Get my info route
router.get('/me', getMeHandler);

export default router;
```

The `user.route.ts` contains the routes to:

- Get all users (only by Admin)
- Get the currently logged-in credentials

**src/routes/auth.route.ts**

```ts
import express from 'express';
import { loginHandler, registerHandler } from '../controllers/auth.controller';
import { validate } from '../middleware/validate';
import { createUserSchema, loginUserSchema } from '../schema/user.schema';

const router = express.Router();

// Register user route
router.post('/register', validate(createUserSchema), registerHandler);

// Login user route
router.post('/login', validate(loginUserSchema), loginHandler);

export default router;
```

The `auth.route.ts` contains the routes to:

- Login a user
- Register a user

## Update the app.ts file to use the route

Next, update the **app.ts** to use the following middleware:

- Body Parser middleware to parse the request body and attach it to `req.body`
- Morgan to log the HTTP request logs in the terminal
- Cors for Cross-Origin Resource Sharing
- Cookie Parser to parse the cookie and attach it to `req.cookies`
- User router

**src/app.ts**

```ts
require('dotenv').config();
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import config from 'config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './utils/connectDB';
import userRouter from './routes/user.route';
import authRouter from './routes/auth.route';

const app = express();

// Middleware

// 1. Body Parser
app.use(express.json({ limit: '10kb' }));

// 2. Cookie Parser
app.use(cookieParser());

// 3. Logger
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// 4. Cors
app.use(
  cors({
    origin: config.get<string>('origin'),
    credentials: true,
  })
);

// 5. Routes
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

// Testing
app.get('/healthChecker', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to CodevoWeb????',
  });
});

// UnKnown Routes
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

const port = config.get<number>('port');
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
  // ? call the connectDB function here
  connectDB();
});
```

## Testing the JWT Authentication Rest API

Run this command to spawn the MongoDB and Redis Docker containers:

```shell
docker-compose up -d
```

You should see the following logs:

```bash
$ docker-compose up -d
Creating network "jwt_auth_default" with the default driver
Creating redis ... done
Creating mongo ... done
```

Run `yarn start` in the terminal and you should see the following logs:

```bash
$ yarn start
yarn run v1.22.18
$ ts-node-dev --respawn --transpile-only src/app.ts
[INFO] 08:49:09 ts-node-dev ver. 1.1.8 (using ts-node ver. 9.1.1, typescript ver. 4.6.3)
Server started on port: 8000
Redis client connected...
Database connected...
```

### Register users

Let’s register some users. You can use Postman but am going to use the [HTTP client VS Code extension](https://marketplace.visualstudio.com/items?itemName=mkloubert.vscode-http-client).

Register some users with http://localhost:8000/api/auth/register route

```json
{
  "body": {
  	"name": "John Doe",
  	"email": "johndoe@gmail.com",
  	"password": "password123",
  	"passwordConfirm": "password123"
	},
  "method": "POST",
  "url": "http://127.0.0.1:8000/api/auth/register"
}
```

Here is the response you’ll get after registering a new user

```json
{
    "status": "success",
    "data": {
        "user": {
            "name": "John Doe",
            "email": "johndoe@gmail.com",
            "role": "user",
            "_id": "655c38ce06dbd7d269a8bb87",
            "createdAt": "2023-11-21T04:57:50.186Z",
            "updatedAt": "2023-11-21T04:57:50.186Z",
            "__v": 0
        }
    }
}
```

Open MongoDB Compass then click on the users collection and you should see the registered users.

```json
{
    "_id" : ObjectId("655c38ce06dbd7d269a8bb87"),
    "name" : "John Doe",
    "email" : "johndoe@gmail.com",
    "password" : "$2a$12$3qqTiowMJWf.MAj8sABNBeXTvNeaoZKznTIO1LbtjuoiWJSM5QVi.",
    "role" : "user",
    "createdAt" : ISODate("2023-11-21T04:57:50.186+0000"),
    "updatedAt" : ISODate("2023-11-21T04:57:50.186+0000"),
    "__v" : NumberInt(0)
}
```

### Login user

Let’s login with the login credentials of any of the users you created

```json
{
  "body": {
	  "email": "johndoe@gmail.com",
  	"password": "password123"
	}
  "method": "POST",
  "url": "http://127.0.0.1:8000/api/auth/login"
}  
```

You should get a response with an access token. We sent a cookie with the response but this extension doesn’t show cookies. If you are using Postman then you will see the cookies in the cookie tab.

```json
{
    "status": "success",
    "accessToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTVjMzhjZTA2ZGJkN2QyNjlhOGJiODciLCJpYXQiOjE3MDA1NDM3NTQsImV4cCI6MTcwMDU0NDY1NH0.DvZIYSi6lRbhrNGJwZQW8YgqcAV0NYh4CJCWP1MNEbRZOEZ8DEv6FzJFDhSTH8Qw6BlIXkmLWX-eDntp1mcyBuGQLZzTu235slR-74bkJmVNjAzT_T86R6GgFpqK3ShqUuS24LYTOyW0YEXy2Y0AbWCBfb6r06-bo4MUG7kL0wxYS8wx5vOHjLwE_oo5eEQtH2wt0ueMuqFrnWgBBePt87gnc7hVHDjskVOUXiIIly_Eqzd-bKsQp2PuSS0Z-6-uKZUqakY6oYQfmZc9B5fn1-mS4iLTIEv--3AH1mHJeWErT_3rqqJLG0S95ayatR_wQC7UcsLPnXoF901tmPXLrw"
}
```

Now, let’s connect to the Redis Docker container to see the logged-in users’ credentials. We are storing the credentials in Redis to serve as a form of session.

![Connect To Redis On Vs Code](https://codevoweb.com/wp-content/uploads/2022/04/Connect-To-Redis-On-Vs-Code.gif)

### Get Currently Logged in User’s Credentials

After logging in,  the access token and add the authorization header with the token attached to the bearer string value.

```json
{
  "body": {
  },
  "headers": {
    "authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MjYxMjBlMDYyZjRmMThlMTVkZjdiNDgiLCJpYXQiOjE2NTA1Mzk0MTksImV4cCI6MTY1MDU0MDMxOX0.ViMoWXT8F9V8NDNSmmr8J9eSqpSr7nwZ7SdF1vjlrOD542rGSd1WUAPbJYTvmcXdDgGoVaWXlvZNGhGwioCs2A"
  },
  "method": "GET",
  "title": "Get Me",
  "url": "http://localhost:8000/api/users/me"
}
```

You should get the users’ credentials as a response if the access token is valid

```json
{
    "status": "success",
    "data": {
        "user": {
            "_id": "655c38ce06dbd7d269a8bb87",
            "name": "John Doe",
            "email": "johndoe@gmail.com",
            "role": "user",
            "createdAt": "2023-11-21T04:57:50.186Z",
            "updatedAt": "2023-11-21T04:57:50.186Z",
            "__v": 0
        }
    }
}
```

### Admin Get All Users

Get back to MongoDB Compass and change one of the users’ role to admin and login with that email.

 and paste the access token and make a request to http://localhost:8000/users route in order to get all the users in the database.

```json
{
  "body": {
  },
  "headers": {
    "authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MjYxMjBlMDYyZjRmMThlMTVkZjdiNDgiLCJpYXQiOjE2NTA1Mzk0MTksImV4cCI6MTY1MDU0MDMxOX0.ViMoWXT8F9V8NDNSmmr8J9eSqpSr7nwZ7SdF1vjlrOD542rGSd1WUAPbJYTvmcXdDgGoVaWXlvZNGhGwioCs2A"
  },
  "method": "GET",
  "title": "All users",
  "url": "http://localhost:8000/api/users"
}
```



You should get all the users if that email is the admin’s email.

```json
{
    "status": "success",
    "result": 1,
    "data": {
        "users": [
            {
                "_id": "655c38ce06dbd7d269a8bb87",
                "name": "John Doe",
                "email": "johndoe@gmail.com",
                "role": "admin",
                "createdAt": "2023-11-21T04:57:50.186Z",
                "updatedAt": "2023-11-21T04:57:50.186Z",
                "__v": 0
            }
        ]
    }
}
```



## Conclusion

In this article, we looked at how you can add JWT Authentication to your app with Node.js, Express, MongoDB, Zod, TypeScript, Docker-compose, Redis, and Mongoose.

Checkout [source code on GitHub](https://github.com/wpcodevo/jwt_authentication_authorization_node/tree/Access_Token)