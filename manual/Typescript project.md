# Typescript project

## Installing TypeScript

### Setup node

```bash
npm init --yes
```

The output shows a newly created `package.json` file:

```json
{
  "name": "example",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

### Install typescript

```bash
yarn add -D typescript
```

### Install ambient Node.js types for TypeScript

```
yarn add -D @types/node 
```

### Setup tsconfig

Next you can create a `tsconfig.json` file using typescript's `tsc --init` command:

* way1

```
npx tsc --init --rootDir src --outDir build \
--esModuleInterop --resolveJsonModule --lib es6 \
--module commonjs --allowJs true --noImplicitAny true

```

* way2

```
npx tsc --init
```

* way3

```
touch tsconfig.json
```

result content of  `tsconfig.json`

```json
{
  "compilerOptions": {
		"target": "es2016",
    "module": "commonjs",
    "lib": ["es6"],
    "rootDir": "src",
    "outDir": "build",
    "resolveJsonModule": true,
    "allowJs": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "noImplicitAny": true,
    "skipLibCheck": true
  }
}
```

### Create the `src` folder and create our first TypeScript file

```bash
mkdir src
touch src/index.ts
```

And let's write some code.

```typescript
console.log('Hello world!')
```

### Compiling our TypeScript

```bash
npx tsc
```

## configurations & scripts

### nodemon

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
  "exec": "npx ts-node ./src/index.ts"
}
```

And then to run the project, all we have to do is run `nodemon`. Let's add a script for that.

```json
"start:dev": "npx nodemon",
```

By running `npm run start:dev`, `npx nodemon` will start our app using `npx ts-node ./src/index.ts`, watching for changes to `.ts` and `.js` files from within `/src`.

### rimraf 

Creating production builds

In order to *clean* and compile the project for production, we can add a `build` script.

Install `rimraf`, a cross-platform tool that acts like the `rm -rf` command (just obliterates whatever you tell it to).

```bash
yarn add -D rimraf
```

And then, add this to your `package.json`.

```json
"build": "rimraf ./build && tsc",
```

Now, when we run `npm run build`, `rimraf` will remove our old `build` folder before the TypeScript compiler emits new code to `dist`.

#### Production startup script

In order to start the app in production, all we need to do is run the `build` command first, and then execute the compiled JavaScript at `build/index.js`.

The startup script looks like this.

```json
"start": "npm run build && node build/index.js"
```

### eslint

```
npm init @eslint/config
```

### eslint2

Run the following commands to setup ESLint in your TypeScript project.

```bash
yarn add -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

Create an `.eslintrc` file.

```bash
touch .eslintrc
```

In it, use the following starter config.

```json
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ]
}
```

#### Ignoring files we don't want to lint

Create an `.eslintignore` in order to prevent ESLint from linting stuff we don't want it to.

```bash
touch .eslintignore
```

```text
node_modules
dist
```

#### Adding a lint script

In your project `package.json`, lets add a `lint` script in order to lint all TypeScript code.

```json
{
  "scripts": {
    ...
    "lint": "eslint . --ext .ts",
  }
}
```

Ready to try it out? Let's run the following command.

```bash
npm run lint
```

#### Add eslint Rules

There are three modes for a rule in eslint: `off`, `warn`, and `error`.

- "off" means 0 (turns the rule off completely)
- "warn" means 1 (turns the rule on but won't make the linter fail)
- "error" means 2 (turns the rule on and will make the linter fail)

In `.eslintrc`, add a new attribute to the json object called "rules".

We update the `.eslintrc`

```json
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": { 
    "no-console": 2 // Remember, this means error!  }
}
```

**no-loops** is a plugin that will enable you to enforce a convention specifying that `for` and `while` loops are illegal and that you should use functions like `map` and `forEach` instead.

Install it like this.

```bash
yarn add -D eslint-plugin-no-loops
```

And then update your `.eslintrc` with `no-loops` in the "plugins" array, and add the rule to the "rules" attribute like so.

```json
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint",
    "no-loops"  ],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": {
    "no-console": 1,
    "no-loops/no-loops": 2  }
}
```

Now if we update our code to include a `for` loop...

src/index.ts

```typescript
console.log('Hello world!');

for (let i = 0; i < 10; i++) {
  console.log(i)
}
```

#### Fixing linted code with ESLint

You might have noticed that at the end of the error message, it says "2 errors and 0 warnings potentially fixable with the `--fix` option."

You *can* run ESLint and tell it to fix things that it's able to fix at the same time.

Using the `--fix` option, let's add a new script to our `package.json` called `lint-and-fix`.

```json
{
  "scripts": {
    ...
    "lint": "eslint . --ext .ts",
    "lint-and-fix": "eslint . --ext .ts --fix"  },
}
```

#### Installing ESLint Extension

![image-20230918105346660](/Users/yongnan/Library/Application Support/typora-user-images/image-20230918105346660.png)

To find the settings in Visual Studio Code, use the command palette to open **Preferences: Open Workspace Settings (JSON)**.

The `settings.json` file will open inside of your code editor. For ESLint to fix errors when you save your file, you will need to write the following code in `settings.json`:

.vscode/settings.json

```json
{
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    "eslint.validate": ["javascript", "typescript", "typescriptreact"]
}
```

### testing

```bash
yarn add -D jest ts-jest @types/jest
```

`package.json`, add script:

```json
 "scripts": {
 		...
		"test": "jest",
 		"test:dev": "jest --watchAll"
 }		
```

In order for Jest to transpile TypeScript with `ts-jest`, you may also need to create a [configuration](https://kulshekhar.github.io/ts-jest/docs/getting-started/installation#jest-config-file) file.

```bash
yarn ts-jest config:init
```

`jest.config.js`

```javascript
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};
```



sample test file `src/index.spec.ts`

```typescript
describe('test', () => {
  test('add', async () => {
    expect(1 + 1).toEqual(2);
  });
});
```



# Coding

## passing env

```
yarn add dotenv
```

```
// .env

API_KEY = <YOUR_API_KEY>
DB_URI = <YOUR_DB_URL>
....
```

Now to access these variables we can do something like

```ts
import path from "path";
import dotenv from "dotenv";

// Parsing the env file.
dotenv.config({ path: path.resolve(__dirname, "../config/config.env") });

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

```ts
import mongoose from "mongoose";
import config from "./config";

const connectDB = async () => {
  const connection = await mongoose.connect(config.MONGO_URI);
  console.log(`🟢 Mongo db connected:`, connection.connection.host);
};
```



```js
// index.js

const dotenv = require('dotenv');

dotenv.config()

const connectDB = () => {
  ...
  mongooose.connect(process.env.DB_URI)
  ...
}
```
