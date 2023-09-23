# Creating a TypeScript Project From Scratch

[Source](https://khalilstemmler.com/blogs/typescript/node-starter-project/)

## Step 1: Installing TypeScript

### Setup node

You need a `package.json` file to run a typescript project. Use `npm init` to create one:

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

Next save `typescript` compiler and the loader `ts-node` as development dependencies.

```bash
npm i -D typescript
```

The shell output shows the installed dependencies (with your version instead)

```sql
+ ts-node@10.0.0
+ typescript@4.3.4
added 14 packages from 45 contributors and audited 14 packages in 1.209s
found 0 vulnerabilities
```

### Install ambient Node.js types for TypeScript

TypeScript has Implicit, Explicit, and *Ambient* types. Ambient types are types that get added to the global execution scope. Since we're using Node, it would be good if we could get type safety and auto-completion on the Node apis like `file`, `path`, `process`, etc. That's what installing the [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) type definition for Node will do.

```bash
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

uncommit and specify  `outDir`, `rootDir`

```json
{
  "compilerOptions": {
    "outDir": "build",                  /* Redirect output structure to the directory. */
    "rootDir": "src",                   /* Specify the root directory of input files. Use   }
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

To compile our code, we'll need to run the `tsc` command using `npx`, the Node package executer. `tsc` will read the `tsconfig.json` in the current directory, and apply the configuration against the TypeScript compiler to generate the compiled JavaScript code.

```bash
npx tsc
```

### Our compiled code

Check out `build/index.js`, we've compiled our first TypeScript file.

```javascript
"use strict";
console.log('Hello world!');
```

## Useful configurations & scripts

### Cold reloading

Cold reloading is nice for local development. In order to do this, we'll need to rely on a couple more packages: `ts-node` for running TypeScript code directly without having to wait for it be compiled, and `nodemon`, to watch for changes to our code and automatically restart when a file is changed.

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

### Creating production builds

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

### Production startup script

In order to start the app in production, all we need to do is run the `build` command first, and then execute the compiled JavaScript at `build/index.js`.

The startup script looks like this.

```json
"start": "npm run build && node build/index.js"
```

## Testing (Added November 26th, 2022)

I want to talk to you about testing for a moment. I've made a few additions to the project for the purposes of getting my mentorship students up and running faster.

- There are two ways to write tests in this project.
- **Stateless testing**: You can write your tests [like this](https://github.com/stemmlerjs/simple-typescript-starter/blob/master/src/index.spec.ts), similarly to how most testing documentation will tell you to write them. This is the simplest way, and it works well for basic unit tests against *stateless* functions or components.
- **[Stateful Testing](https://khalilstemmler.com/wiki/testing/stateful-tests) (Given-When-Then style)**: This is how I write my *High-Value Tests (HVTs)* (also known as Acceptance Tests). You can use the Given-When-Then Gherkins format enabled by `jest-cucumber`. I've provided a basic example which you can find within the `useCase` folder [here](https://github.com/stemmlerjs/simple-typescript-starter/tree/master/src/useCase). For a [real-world example of this, check out this folder](https://github.com/stemmlerjs/how-to-test-code-reliant-on-apis/tree/main/after/src/modules/users/useCases/createUser) and [read this article](https://khalilstemmler.com/articles/test-driven-development/how-to-test-code-coupled-to-apis-or-databases/).
  - This is my *preferred approach* most of the time. Especially for stateful tests.
- **(Recommendation)**: Use the stateless testing approach when you're testing stateless functions or domain objects like [value objects](https://khalilstemmler.com/articles/typescript-value-object/) and [entities](https://khalilstemmler.com/articles/typescript-domain-driven-design/entities/).

## Linting

Oh yeah, linting is another thing you'll most likely want to do. If you're interested in that, read the next post, "[How to use ESLint with TypeScript](https://khalilstemmler.com/blogs/typescript/eslint-for-typescript/)".

