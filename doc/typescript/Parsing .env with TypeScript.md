# Parsing .env with TypeScript

[source](https://dev.to/asjadanis/parsing-env-with-typescript-3jjm)

[#typescript](https://dev.to/t/typescript)[#javascript](https://dev.to/t/javascript)[#programming](https://dev.to/t/programming)

When working with Node.js its a common practice to keep our credentials and secrets in a separate `.env` file, that's never pushed to our repo. In order to access these variables in our code, we simply use [dotenv](https://github.com/motdotla/dotenv) package to parse the `.env` file and load our env variables into `process.env`.

#### Example

Here's a quick example on how to do this in plain JavaScript.

```
// .env

API_KEY = <YOUR_API_KEY>
DB_URI = <YOUR_DB_URL>
....
```



Now to access these variables we can do something like

```
// index.js

const dotenv = require('dotenv');

dotenv.config()

const connectDB = () => {
  ...
  mongooose.connect(process.env.DB_URI)
  ...
}
```



Since JavaScript doesn't care much about the type so we can pretty much access any property on `process.env` and our code won't give us any red signs untill we run it and find out that process.env.DB_URI is `undefined`.

Now let's say we had to do the same thing in TypeScript, and keep it fully typed and have all the benefits that come with a typed system. In order to keep it fully typed we will have to first extend the `ProcessEnv` Interface to have our custom env variables available on the interface. For this we will have to use [Declaration-Merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) which is a TypeScript feature for combining two or more declarations with the same name.

You can have a quick overview of this feature and its use case on this twitter thread



We will use the same feature to extend the `ProcessEnv` interface with our custom env varibales.

Create a file named `global.d.ts` with the below contents

```
namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    PORT: string;
    MONGO_URI: string;
  }
}
```



Above we are just extending the ProcessEnv Interface that's accessible under NodeJS namespace and specifying our custom env varibales types.

Now if you write `process.env` in your code, intellisense would autosuggest you the fields avaialable on `process.env` which is great `process.env.MONGO_URI` is no longer a mystery in our code.

Make sure you specify the path to this file in your `tsconfig.json`

A better approach would be to have a folder lets say `extended-types` and keep all your extended types there and just specify the path to that folder here instead of a single file.

```
"typeRoots": ["./global.d.ts", "./node_modules/@types"]
```



[![image](https://res.cloudinary.com/practicaldev/image/fetch/s--TTu6-Tuc--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/e0c5xt9c3injh9r3yuvh.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--TTu6-Tuc--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/e0c5xt9c3injh9r3yuvh.png)

Now let's create a `config.ts` file that will encapsulate the logic for parsing `.env` file and converting it into our own custom `Config` type that we want to use in the code.

```
import path from "path";
import dotenv from "dotenv";

// Parsing the env file.
dotenv.config({ path: path.resolve(__dirname, "../config/config.env") });

// Interface to load env variables
// Note these variables can possibly be undefined
// as someone could skip these varibales or not setup a .env file at all

interface ENV {
  NODE_ENV: string | undefined;
  PORT: number | undefined;
  MONGO_URI: string | undefined;
}

interface Config {
  NODE_ENV: string;
  PORT: number;
  MONGO_URI: string;
}

// Loading process.env as ENV interface

const getConfig = (): ENV => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
    MONGO_URI: process.env.MONGO_URI
  };
};

// Throwing an Error if any field was undefined we don't 
// want our app to run if it can't connect to DB and ensure 
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type 
// definition.

const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;
```



Now you can simple import config.ts in your code and access the fields and it would be super cool to have the intelllisense give you type inference about the fields present on config object.

[![image](https://res.cloudinary.com/practicaldev/image/fetch/s--bZKJe6h9--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/f0xbk37gtwvalqmtkj0d.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--bZKJe6h9--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/f0xbk37gtwvalqmtkj0d.png)

```
import mongoose from "mongoose";
import config from "./config";

const connectDB = async () => {
  const connection = await mongoose.connect(config.MONGO_URI);
  console.log(`🟢 Mongo db connected:`, connection.connection.host);
};
```



I hope this post helped you and you can extend the same concept to other similar use cases when working with TypeScript.

Feel free to drop any suggestions or improvements on my approach for this, and you can always connect with me on [twitter](https://twitter.com/asjadanis)