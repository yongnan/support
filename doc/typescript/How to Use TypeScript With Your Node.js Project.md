# How to Use TypeScript With Your Node.js Project

**BY**[IDOWU OMISOLA](https://www.makeuseof.com/author/idowu-omisola/)

PUBLISHED APR 28, 2022

Many Node.js projects use TypeScript for its strict typing and object-oriented features. Learn how to get started right away.

![A dark monitor displaying TypeScript code in the VSCode editor.]()

Readers like you help support MUO. When you make a purchase using links on our site, we may earn an affiliate commission. [Read More.](https://www.makeuseof.com/page/terms-of-use/)

TypeScript is handy for crafting complex apps and robust architectures like microservices. Of course, TypeScript cannot do anything that JavaScript can't, but it can make complex projects more manageable. TypeScript's strict typing and support for interfaces mean it's great for object-oriented programming. We've seen many companies turn to TypeScript for coding their backend.

There's no better time to start using TypeScript in your Node.js project than now. But how can you set it up for your Node.js project? You'll find out in this article.

## What Is TypeScript?

TypeScript is a compiled, strictly-typed version of JavaScript developed and maintained by Microsoft. TypeScript code transpiles into JavaScript.

The strict-typing nature of TypeScript helps developers avoid bugs in their code. It will only compile code that satisfies the rules of its specified data types. This makes TypeScript code more robust than its pure JavaScript counterpart.

It also supports both functional and object-oriented programming. All these features make it highly scalable and suitable for developing complex apps.

## How to Set Up TypeScript in Node.JS

You'll have to pull up a few configurations here and there to start using TypeScript with your Node.js project. But no worries, it's easy.

However, ensure that you [install the Node.js npm package](https://www.makeuseof.com/install-node-js-npm-windows/) before proceeding.

### Initialize a package.json File

Open your terminal and create a project folder. Then, enter this new directory and initialize a Node.js project:

```
npm init
```

The above command creates a **package.json** file to store your dependencies.

### Install TypeScript and Other Dependencies

Next, go ahead and install TypeScript into your Node.js project:

```
npm i -D typescript
```

The **-D** keyword ensures that TypeScript gets installed as part of the **devDependencies** in **package.json**.

You'll also have to install **@types/express**, a TypeScript definition for Express.js:

```
npm install -D @types/express
```

Next, initialize a **tsconfig.json** file. This details the base compiler options for your project:

```
npx tsc --init
```

The above command creates a **tsconfig.json** file in your project root folder.

Also, install Express.js. You might skip this if you only intend to manage servers with Node.js' built-in HTTP primitives. But Express.js makes this easy:

```
npm install express
```

Next, install **nodemon**, a package that restarts your server automatically whenever there are changes in your code. Ensure to install this globally for it to work:

```
npm install -g nodemon
```

### Configure TypeScript With Node.JS

Open the **tsconfig.json** file you initialized earlier using your [chosen code editor](https://www.makeuseof.com/9-best-free-code-editors/). There might be a lot in this file. While you might configure this file in its current form, you can replace its entire content with the one below to make it simpler.

Here's all you need in **tsconfig.json** to get going:

```
{
  "compilerOptions": {
    "module": "commonjs",
    "esModuleInterop": true,
    "target": "es6",
    "moduleResolution": "node",
    "sourceMap": true,
    "outDir": "dist" //Specifies the transpiler directory. 
  },
  "lib": ["es2015"]
}
```

Now, open **package.json**. Here's how it currently looks after installing TypeScript and Express:

![package json content]()

Next, add the following configurations to the **scripts** array:

```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "npx tsc",
    "start": "node ./dist/app.js",
    "dist": "tsc -p .",
    "dev": "nodemon ./src/app.ts", //Replace this with the correct directory path for app.ts in your case
    "type": "module"
}
```

The above configuration points your server to start on **app.js**, the transpiler. No worries, this is a default file that'll be created automatically in a **dist** folder when you run the **build** script. You'll do this later down the line.

The configuration then specifies the primary development script as **app.ts**.

Hence, when you start the development environment, **nodemon** runs **app.ts**. Node.js then compiles this into JavaScript inside **app.js—**which communicates with the HTTP server.

Next, create a **src** folder in your project root directory. Inside this folder, create an empty TypeScript file and name it **app.ts**.

### Create the Transpiler Directory

The transpiler is a JavaScript file that compiles TypeScript code into native JavaScript. So this ensures that the server can relate with your code as JavaScript instead of the strictly typed script.

So while TypeScript handles code structure, the transpiler file compiles it into JavaScript.

Now run the **build** script to create the **dist** transpiler directory automatically:

```
npm run build
```

The above command compiles your TypeScript code into JavaScript. The created folder contains two files; **app.js** and **app.js.map**.

Open **package.json** again. You'll see a key in the array named **main**. You can see that its value points to **index.js**. Replace this with the **app.js** (transpiler) file directory:

```
"main": "./dist/app.js",
```

After formatting, **package.json** should look like this:

![packagejson final content and project structure]()

That's it for the configurations part.

## Create and Run an HTTP Request

Now try to create and run an HTTP request via the Express.js server to see if your code compiles as it should.

Inside **app.ts**:

```
import express, {Request, Response} from 'express'
 
const app = express()
 
app.get('/', async (req: Request, res: Response)=>{
    console.log('Hello world')
    res.send('Hello world')
})
 
const port = 8080
 
app.listen(port, (): void=>{
    console.log(`App is listening at http://localhost:${port}`)
})
```

Next, open the command line to your project root directory and run the **dev** script to start your project:

```
npm run dev
```

Open your browser and go to **localhost:8080,** and you'll see the response (**Hello world**). You'll also see this in the terminal if you've applied the **console.log** command as we did in the above example.

## TypeScript Has High Demand Prospects

There's hardly much difference between TypeScript and JavaScript. But the former eases development with its addition of strict typing.

TypeScript is a valuable language in frontend frameworks like Angular, and we can't deny its performance and scalability. It's becoming more popular, and the job prospects for TypeScript developers keep rising.