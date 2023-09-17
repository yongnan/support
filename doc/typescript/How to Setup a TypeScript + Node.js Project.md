# How to Setup a TypeScript + Node.js Project

[source](https://khalilstemmler.com/blogs/typescript/node-starter-project/)

[TypeScript](https://khalilstemmler.com/articles/categories/type-script)

Last updated Aug 10th, 2022

In this guide, we walk through the process of creating a TypeScript project from scratch with cold-reloading, and scripts for building, development, and production environments.

[guides](https://khalilstemmler.com/articles/tags/guides/)[typescript](https://khalilstemmler.com/articles/tags/type-script/)[starters](https://khalilstemmler.com/articles/tags/starters/)

![img](https://d33wubrfki0l68.cloudfront.net/4bc5b886be4f8e811114cf6c045c47a222c0c796/684ba/img/blog/templates/banners/typescript-blog-banner.png)

We talk about a lot of **advanced Node.js and TypeScript** concepts on this blog, particularly Domain-Driven Design and large-scale enterprise application patterns. However, after receiving emails from readers interested in seeing what a basic TypeScript starter project looks like, I've put together just that.

### Prequisites

- You should have Node and npm installed
- You should be familiar with Node and the npm ecosystem
- You have a code editor installed (preferably VS Code, it's the champ for TypeScript)

### Goals

In this short guide, I'll walk you through the process of creating a basic TypeScript application and compiling it. It's actually *really* easy!

- [View the source](https://github.com/stemmlerjs/simple-typescript-starter)

Afterwards, we'll setup a few scripts for hot-reloading in `development`, building for `production`, and running in `production`.

------

## About TypeScript

TypeScript, developed and appropriated labeled by Microsoft as "JavaScript that scales", is a superset of JavaScript, meaning that everything JavaScript can do, TypeScript can do (~~and more~~ better).

TypeScript was primarily meant to solve two problems:

1. Provide JavaScript developers with an *optional type system*.
2. Provide JavaScript developers with the ability to utilize **planned features from future JavaScript editions** against *current JavaScript engines*.

We use TypeScript for most of the topics on this blog because it's a lot better suited for creating long-lasting software and having the compiler help catch bugs and validate types is tremendously helpful.

------

## Initial Setup

Let's create a folder for us to work in.

```bash
mkdir typescript-starter
cd typescript-starter
```

Next, we'll setup the project `package.json` and add the dependencies.

### Setup Node.js package.json

Using the `-y` flag when creating a `package.json` will simply approve all the defaults.

```bash
npm init -y
```

### Add TypeScript as a dev dependency

This probably doesn't come as a surprise ;)

```bash
npm install typescript --save-dev
```

After we install `typescript`, we get access to the command line TypeScript compiler through the `tsc` command. More on that below.

### Install ambient Node.js types for TypeScript

TypeScript has Implicit, Explicit, and *Ambient* types. Ambient types are types that get added to the global execution scope. Since we're using Node, it would be good if we could get type safety and auto-completion on the Node apis like `file`, `path`, `process`, etc. That's what installing the [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) type definition for Node will do.

```bash
npm install @types/node --save-dev
```

### Create a `tsconfig.json`.

The `tsconfig.json` is where we define the TypeScript compiler options. We can create a tsconfig with several options set.

```bash
npx tsc --init --rootDir src --outDir build \
--esModuleInterop --resolveJsonModule --lib es6 \
--module commonjs --allowJs true --noImplicitAny true
```

- `rootDir`: This is where TypeScript looks for our code. We've configured it to look in the `src/` folder. That's where we'll write our TypeScript.
- `outDir`: Where TypeScript puts our compiled code. We want it to go to a `build/` folder.
- `esModuleInterop`: If you were in the JavaScript space over the past couple of years, you might have recognized that modules systems had gotten a little bit out of control (AMD, SystemJS, ES Modules, etc). For a topic that requires a much longer discussion, if we're using `commonjs` as our module system (for Node apps, you should be), then we need this to be set to `true`.
- `resolveJsonModule`: If we use JSON in this project, this option allows TypeScript to use it.
- `lib`: This option adds *ambient* types to our project, allowing us to rely on features from different Ecmascript versions, testing libraries, and even the browser DOM api. We'd like to utilize some `es6` language features. This all gets compiled down to `es5`.
- `module`: `commonjs` is the standard Node module system in 2019. Let's use that.
- `allowJs`: If you're converting an old JavaScript project to TypeScript, this option will allow you to include `.js` files among `.ts` ones.
- `noImplicitAny`: In TypeScript files, don't allow a type to be unexplicitly specified. Every type needs to either have a specific type or be explicitly declared `any`. No implicit `any`s.

At this point, you should have a `tsconfig.json` that looks like this:

```json
{
  "compilerOptions": {
    /* Basic Options */
    // "incremental": true,                   /* Enable incremental compilation */
    "target": "es5",                          /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019' or 'ESNEXT'. */
    "module": "commonjs",                     /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */
    "lib": ["es6"],                     /* Specify library files to be included in the compilation. */
    "allowJs": true,                          /* Allow javascript files to be compiled. */
    // "checkJs": true,                       /* Report errors in .js files. */
    // "jsx": "preserve",                     /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */
    // "declaration": true,                   /* Generates corresponding '.d.ts' file. */
    // "declarationMap": true,                /* Generates a sourcemap for each corresponding '.d.ts' file. */
    // "sourceMap": true,                     /* Generates corresponding '.map' file. */
    // "outFile": "./",                       /* Concatenate and emit output to single file. */
    "outDir": "build",                          /* Redirect output structure to the directory. */
    "rootDir": "src",                         /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */
    // "composite": true,                     /* Enable project compilation */
    // "tsBuildInfoFile": "./",               /* Specify file to store incremental compilation information */
    // "removeComments": true,                /* Do not emit comments to output. */
    // "noEmit": true,                        /* Do not emit outputs. */
    // "importHelpers": true,                 /* Import emit helpers from 'tslib'. */
    // "downlevelIteration": true,            /* Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'. */
    // "isolatedModules": true,               /* Transpile each file as a separate module (similar to 'ts.transpileModule'). */

    /* Strict Type-Checking Options */
    "strict": true,                           /* Enable all strict type-checking options. */
    "noImplicitAny": true,                    /* Raise error on expressions and declarations with an implied 'any' type. */
    // "strictNullChecks": true,              /* Enable strict null checks. */
    // "strictFunctionTypes": true,           /* Enable strict checking of function types. */
    // "strictBindCallApply": true,           /* Enable strict 'bind', 'call', and 'apply' methods on functions. */
    // "strictPropertyInitialization": true,  /* Enable strict checking of property initialization in classes. */
    // "noImplicitThis": true,                /* Raise error on 'this' expressions with an implied 'any' type. */
    // "alwaysStrict": true,                  /* Parse in strict mode and emit "use strict" for each source file. */

    /* Additional Checks */
    // "noUnusedLocals": true,                /* Report errors on unused locals. */
    // "noUnusedParameters": true,            /* Report errors on unused parameters. */
    // "noImplicitReturns": true,             /* Report error when not all code paths in function return a value. */
    // "noFallthroughCasesInSwitch": true,    /* Report errors for fallthrough cases in switch statement. */

    /* Module Resolution Options */
    // "moduleResolution": "node",            /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */
    // "baseUrl": "./",                       /* Base directory to resolve non-absolute module names. */
    // "paths": {},                           /* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. */
    // "rootDirs": [],                        /* List of root folders whose combined content represents the structure of the project at runtime. */
    // "typeRoots": [],                       /* List of folders to include type definitions from. */
    // "types": [],                           /* Type declaration files to be included in compilation. */
    // "allowSyntheticDefaultImports": true,  /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */
    "esModuleInterop": true,                  /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */
    // "preserveSymlinks": true,              /* Do not resolve the real path of symlinks. */
    // "allowUmdGlobalAccess": true,          /* Allow accessing UMD globals from modules. */

    /* Source Map Options */
    // "sourceRoot": "",                      /* Specify the location where debugger should locate TypeScript files instead of source locations. */
    // "mapRoot": "",                         /* Specify the location where debugger should locate map files instead of generated locations. */
    // "inlineSourceMap": true,               /* Emit a single file with source maps instead of having a separate file. */
    // "inlineSources": true,                 /* Emit the source alongside the sourcemaps within a single file; requires '--inlineSourceMap' or '--sourceMap' to be set. */

    /* Experimental Options */
    // "experimentalDecorators": true,        /* Enables experimental support for ES7 decorators. */
    // "emitDecoratorMetadata": true,         /* Enables experimental support for emitting type metadata for decorators. */

    /* Advanced Options */
    "resolveJsonModule": true                 /* Include modules imported with '.json' extension */
  }
}
```

We can go ahead and clean the commented out stuff that we don't need. Our `tsconfig.json` should look like this:

```json
{
  "compilerOptions": {
    "target": "es5",                          
    "module": "commonjs",                    
    "lib": ["es6"],                     
    "allowJs": true,
    "outDir": "build",                          
    "rootDir": "src",
    "strict": true,         
    "noImplicitAny": true,
    "esModuleInterop": true,
    "resolveJsonModule": true
  }
}
```

We're set to run our first TypeScript file.

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

------

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

I told you it was simple! Now, off you go. **Create great things, my friend**.

### View the source

A reminder that you can view [the entire source code](https://github.com/stemmlerjs/simple-typescript-starter) for this here.

------

## Scripts overview

### `npm run start:dev`

Starts the application in development using `nodemon` and `ts-node` to do cold reloading.

### `npm run build`

Builds the app at `build`, cleaning the folder first.

### `npm run start`

Starts the app in production by first building the project with `npm run build`, and then executing the compiled JavaScript at `build/index.js`.

## Testing (Added November 26th, 2022)

I want to talk to you about testing for a moment. I've made a few additions to the project for the purposes of getting my mentorship students up and running faster.

- There are two ways to write tests in this project.
- **Stateless testing**: You can write your tests [like this](https://github.com/stemmlerjs/simple-typescript-starter/blob/master/src/index.spec.ts), similarly to how most testing documentation will tell you to write them. This is the simplest way, and it works well for basic unit tests against *stateless* functions or components.
- **[Stateful Testing](https://khalilstemmler.com/wiki/testing/stateful-tests) (Given-When-Then style)**: This is how I write my *High-Value Tests (HVTs)* (also known as Acceptance Tests). You can use the Given-When-Then Gherkins format enabled by `jest-cucumber`. I've provided a basic example which you can find within the `useCase` folder [here](https://github.com/stemmlerjs/simple-typescript-starter/tree/master/src/useCase). For a [real-world example of this, check out this folder](https://github.com/stemmlerjs/how-to-test-code-reliant-on-apis/tree/main/after/src/modules/users/useCases/createUser) and [read this article](https://khalilstemmler.com/articles/test-driven-development/how-to-test-code-coupled-to-apis-or-databases/).
  - This is my *preferred approach* most of the time. Especially for stateful tests.
- **(Recommendation)**: Use the stateless testing approach when you're testing stateless functions or domain objects like [value objects](https://khalilstemmler.com/articles/typescript-value-object/) and [entities](https://khalilstemmler.com/articles/typescript-domain-driven-design/entities/).

## Linting

Oh yeah, linting is another thing you'll most likely want to do. If you're interested in that, read the next post, "[How to use ESLint with TypeScript](https://khalilstemmler.com/blogs/typescript/eslint-for-typescript/)".

------

### Discussion

I like having concurrently in the mix.. npm start and thats it.

```
"scripts": {
	"start": "concurrently npm:start:*",
	"start:build": "tsc -w",
	"start:run": "nodemon build/index.js",
},
```

i stuck at one place at nodemon config

```
{
  "watch": ["src"],
  "ext": ".ts,.js",
  "ignore": [],
  "exec": "ts-node ./src/index.ts"
}
```

the above code exce statement gave an error ts-node error,

```
{
   "watch": ["src"],
  "ext": ".ts,.js",
  "ignore": [],
    "exec": "npx ts-node ./src/index.ts"
}
```

I made a few modifications though. In nodemon.json instead of "ts-node", "npx ts-node". And in package.json instead of "nodemon" "npx nodemon".



If npx is used to execute the node commands, I need not have those node commands installed globally. I think this especially helps if I have multiple people working on the project. I wont have to specify extra instructions to first install the required global packages

Very good article! Didn't transpile util this: ***npm install @types/node --save-dev\*** was added.

Cool article, thanks!

Must note that tsconfig.json need an extra line to specify source directory:

```
{
  "compilerOptions": { ... }
  "include": ["src/**/*"]
}
```



It is not in the article, but it is in related repository:

https://github.com/stemmlerjs/simple-typescript-starter/blob/master/tsconfig.json



Hi, we can also use:



```
npx create-typescript-application
```



Cheers!



### Stay in touch!

Enjoying so far? Join 15000+ Software Essentialists getting my posts delivered straight to your inbox each week. I won't spam ya. 🖖

Get notified

![img](https://d33wubrfki0l68.cloudfront.net/136b30aa6dcc1e2bcf190c846279aecd30e6cb0a/d0a1b/static/khalil-headshot-fecbe8f1d39b9e2b0ae79cc0005e0efb.png)

### About the author

Khalil Stemmler,
Software Essentialist ⚡

I'm Khalil. I turn code-first developers into confident crafters without having to buy, read & digest hundreds of complex programming books. Using Software Essentialism, my philosophy of software design, I coach developers through boredom, impostor syndrome, and a lack of direction to master software design and architecture. Mastery though, is not the end goal. It is merely a step towards your Inward Pull.

<iframe id="twitter-widget-0" scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true" class="twitter-follow-button twitter-follow-button-rendered" title="Twitter Follow Button" src="https://platform.twitter.com/widgets/follow_button.2b2d73daf636805223fb11d48f3e94f7.en.html#dnt=false&amp;id=twitter-widget-0&amp;lang=en&amp;screen_name=khalilstemmler&amp;show_count=false&amp;show_screen_name=true&amp;size=l&amp;time=1694742596478" data-screen-name="khalilstemmler" style="box-sizing: inherit; margin: 0px 0.5rem 1.45rem 0px; padding: 0px; visibility: visible; width: 187px; height: 28px;"></iframe>

[ Follow](https://github.com/stemmlerjs)[3,304](https://github.com/stemmlerjs/followers)