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
npm i -D typescript
```

### Install ambient Node.js types for TypeScript

```
npm install @types/node --save-dev
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
touch tsconfig
```

result content of  `tsconfig.json`

```json
{
  "compilerOptions": {
		"target": "es5",
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
npm install --save-dev ts-node nodemon
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
npm install --save-dev rimraf
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

Run the following commands to setup ESLint in your TypeScript project.

```bash
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
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

### Add eslint Rules

There are three modes for a rule in eslint: `off`, `warn`, and `error`.

- "off" means 0 (turns the rule off completely)
- "warn" means 1 (turns the rule on but won't make the linter fail)
- "error" means 2 (turns the rule on and will make the linter fail)

### Adding a rule

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

#### installing ESLint Extension

![image-20230918105346660](/Users/yongnan/Library/Application Support/typora-user-images/image-20230918105346660.png)
