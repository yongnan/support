# How to use ESLint with TypeScript

[TypeScript](https://khalilstemmler.com/articles/categories/type-script)

Last updated Dec 19th, 2021

ESLint is a JavaScript linter that you can use to lint either TypeScript or JavaScript code. In this post, we'll walk through how to set up linting in your project.

[formatting](https://khalilstemmler.com/articles/tags/formatting/)[eslint](https://khalilstemmler.com/articles/tags/es-lint/)

![img](https://d33wubrfki0l68.cloudfront.net/4bc5b886be4f8e811114cf6c045c47a222c0c796/684ba/img/blog/templates/banners/typescript-blog-banner.png)

## Intro

**Formatting** is one of several concerns in the efforts to write *clean code*. There's a lot of other stuff we should be concerned about as well, but formatting is one of those things that we can set up right off the bat and establish a standard for our project.

### ESLint and TSLint

[ESLint](https://eslint.org/) is a JavaScript *linter* that enables you to enforce a set of style, formatting, and coding standards for your codebase. It looks at your code, and tells you when you're not following the standard that you set in place.

You may have also heard of [TSLint](https://palantir.github.io/tslint/), the TypeScript equivalent. In 2019, the team behind TSLint [decided that they would no longer support it](https://medium.com/palantir/tslint-in-2019-1a144c2317a9a). The reason, primarily, is because *ESLint exists*, and there was a lot of duplicate code between projects with the same intended purpose.

That being said, there are some really awesome TSLint packages out there that, if you would like to use, you can- but just understand that they're not being supported anymore.

So onwards into 2020 and beyond, we're going to continue to look to ESLint for all of our TypeScript (and JavaScript) linting needs!

## Prerequisites

Here's what you need to have in order to follow along:

- A code editor installed (psst- VS Code is ideal)
- An existing codebase (if you need to get setup, you can follow "[How to Setup a TypeScript + Node.js Project](https://khalilstemmler.com/blogs/typescript/node-starter-project/) first and then come back to this article)

## Installation and setup

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

### Ignoring files we don't want to lint

Create an `.eslintignore` in order to prevent ESLint from linting stuff we don't want it to.

```bash
touch .eslintignore
```

Then add the things we want to ignore. In the following code sample, we're ignoring the `dist/` folder that contains the compiled TypeScript code. If you're compiling your TypeScript code to a different folder, make sure to use that instead of `dist`. You should be able to find this in your `.tsconfig` (see the [previous guide](https://khalilstemmler.com/blogs/typescript/node-starter-project/)).

```text
node_modules
dist
```

### Adding a lint script

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

For *me*, since I'm continuing with the [previous tutorial](https://khalilstemmler.com/blogs/typescript/node-starter-project/), and since my `src` folder only has a single `index.ts` in it that prints out some text with `console.log()`, I don't see anything after I run the command.

src/index.ts

```typescript
console.log('Hello world!')
```

What if we wanted to *disallow* `console.log` statements in our code?

## Rules

There are three modes for a rule in eslint: `off`, `warn`, and `error`.

- "off" means 0 (turns the rule off completely)
- "warn" means 1 (turns the rule on but won't make the linter fail)
- "error" means 2 (turns the rule on and will make the linter fail)

### Adding a rule

In `.eslintrc`, add a new attribute to the json object called "rules".

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
  "rules": { }}
```

Rules get added as keys of this `rules` attribute, and you can normally find the `eslint` base rules [here on their website via the Rules docs](https://eslint.org/docs/rules/).

We want to add the [no-console](https://eslint.org/docs/rules/no-console) rule, so here is an example of how we can make the linter fail (throw a mean error code) if it encounters a `console.log` statement with the `no-console` rule set to `error`.

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

And then run the linter again.

```bash
npm run lint
```

And we should get an angry linting result.

```bash
/simple-typescript-starter/src/index.ts

  2:1  error  Unexpected console statement  no-console
    ✖ 1 problem (1 error, 0 warnings)
```

And if we wanted, we could turn the rule off by setting it to `0 - off`.

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
  "rules": {     "no-console": 0 
  }
}
```

Run the linter.

```bash
npm run lint
```

...and silence.

### Using rules in a real-life project

There's a reason that all three of these modes exist. When you set the linter to `off` for a rule, it's because you and your team probably don't care about *that rule* in a particular **base configuration** you're using (we're currently using the ESLint recommended config but you can also go and use [Shopify's](https://github.com/Shopify/eslint-plugin-shopify), [Facebook's](https://www.npmjs.com/package/eslint-config-fbjs) or several other companies' configs as starting points instead).

When you set the rule to `error - 2`, it means that you don't want the code that breaks your coding conventions to even make it into the repo at all. I think this is a great act of professionalism and empathy towards the codebase, your fellow teammates, and future maintainers. A popular approach to **actually enforce** code conventions with this tool is to set up your project with a tool like [Husky](https://github.com/typicode/husky) so that when a teammate tries to **commit** code or **push** code, you can tell your linter to check the code first before the operation executes. It's a great habit, though sometimes, if the rules are overly restrictive, it can slow down and annoy your teammates.

To remedy overly restrictive rules, the `warn - 1` setting means that yes, you want you and your team to adhere to that rule, but you don't want it to prevent you from moving forward.

## Adding a plugin (features)

ESLint also allows you to add one-off features to your config. These are known as *plugins*.

Here's a fun one. It's called [no-loops](https://github.com/buildo/eslint-plugin-no-loops).

Check out this list of other [awesome-eslint](https://github.com/dustinspecker/awesome-eslint) plugins and configs.

**no-loops** is a plugin that will enable you to enforce a convention specifying that `for` and `while` loops are illegal and that you should use functions like `map` and `forEach` instead.

Install it like this.

```bash
npm install --save-dev eslint-plugin-no-loops
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

And run the lint command again...

```bash
npm run lint
```

We'll see the errors that restricts loops appear.

```bash
/simple-typescript-starter/src/index.ts
  2:1   warning  Unexpected console statement                   no-console
  2:1   error    'console' is not defined                       no-undef
  4:1   error    loops are not allowed                          no-loops/no-loops  5:3   warning  Unexpected console statement                   no-console
  5:3   error    'console' is not defined                       no-undef
  5:17  error    Missing semicolon                              babel/semi
  5:17  error    Missing semicolon                              semi
  6:2   error    Newline required at end of file but not found  eol-last

✖ 8 problems (6 errors, 2 warnings)
  3 errors and 0 warnings potentially fixable with the `--fix` option.
```

## Extending a different base config

Let's say that you wanted to start with a different base config- [Shopify's](https://github.com/Shopify/eslint-plugin-shopify), for example.

Here's how to do that.

Looking at the [readme](https://github.com/Shopify/eslint-plugin-shopify), we need to install it by running:

```bash
npm install eslint-plugin-shopify --save-dev
```

Update our `.eslintrc`

```json
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint"
  ],
  "extends": [
    "plugin:shopify/esnext"  ],
  "rules": {
    "no-console": 1
  }
}
```

You can add several base configs to your project by including them in the array, though you may end up seeeing the same linting rules twice or more.

Now when we run the lint command again with `npm run lint`, we can see a few errors reported based on the base Shopify config and our `no-console` rule.

```bash
/simple-typescript-starter/src/index.ts
  2:1   warning  Unexpected console statement  no-console
  2:1   error    'console' is not defined      no-undef
  2:28  error    Missing semicolon             babel/semi
  2:28  error    Missing semicolon             semi

✖ 4 problems (3 errors, 1 warning)
  2 errors and 0 warnings potentially fixable with the `--fix` option.
```

### Fixing linted code with ESLint

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

Running this command against our code, I expect that it will put a semicolon on the `console.log` statement that we had.

Let's run it.

```bash
npm run lint-and-fix
```

The result is that *less* errors are reported. We don't see the error about semi-colons anymore.

```bash
/simple-typescript-starter/src/index.ts
  2:1  warning  Unexpected console statement  no-console
  2:1  error    'console' is not defined      no-undef
```

Because sure enough, the linter added the semi-colon.

src/index.ts

```typescript
console.log('Hello world!');
```

That's really awesome. But what if we don't want to run the linter all the time to fix our code? What if there was a way that we could, while coding, have it *automatically* format things based on our conventions?

We can! With [Prettier](https://prettier.io/). Read the next article, "[How to use Prettier with ESLint and TypeScript in VSCode](https://khalilstemmler.com/blogs/tooling/prettier/)".

------

### Discussion

Liked this? Sing it loud and proud 👨‍🎤.

[![img](data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDYxMiA2MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDYxMiA2MTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiIGNsYXNzPSIiPjxnPjxnPgoJPGc+CgkJPHBhdGggZD0iTTYxMiwxMTYuMjU4Yy0yMi41MjUsOS45ODEtNDYuNjk0LDE2Ljc1LTcyLjA4OCwxOS43NzJjMjUuOTI5LTE1LjUyNyw0NS43NzctNDAuMTU1LDU1LjE4NC02OS40MTEgICAgYy0yNC4zMjIsMTQuMzc5LTUxLjE2OSwyNC44Mi03OS43NzUsMzAuNDhjLTIyLjkwNy0yNC40MzctNTUuNDktMzkuNjU4LTkxLjYzLTM5LjY1OGMtNjkuMzM0LDAtMTI1LjU1MSw1Ni4yMTctMTI1LjU1MSwxMjUuNTEzICAgIGMwLDkuODI4LDEuMTA5LDE5LjQyNywzLjI1MSwyOC42MDZDMTk3LjA2NSwyMDYuMzIsMTA0LjU1NiwxNTYuMzM3LDQyLjY0MSw4MC4zODZjLTEwLjgyMywxOC41MS0xNi45OCw0MC4wNzgtMTYuOTgsNjMuMTAxICAgIGMwLDQzLjU1OSwyMi4xODEsODEuOTkzLDU1LjgzNSwxMDQuNDc5Yy0yMC41NzUtMC42ODgtMzkuOTI2LTYuMzQ4LTU2Ljg2Ny0xNS43NTZ2MS41NjhjMCw2MC44MDYsNDMuMjkxLDExMS41NTQsMTAwLjY5MywxMjMuMTA0ICAgIGMtMTAuNTE3LDIuODMtMjEuNjA3LDQuMzk4LTMzLjA4LDQuMzk4Yy04LjEwNywwLTE1Ljk0Ny0wLjgwMy0yMy42MzQtMi4zMzNjMTUuOTg1LDQ5LjkwNyw2Mi4zMzYsODYuMTk5LDExNy4yNTMsODcuMTk0ICAgIGMtNDIuOTQ3LDMzLjY1NC05Ny4wOTksNTMuNjU1LTE1NS45MTYsNTMuNjU1Yy0xMC4xMzQsMC0yMC4xMTYtMC42MTItMjkuOTQ0LTEuNzIxYzU1LjU2NywzNS42ODEsMTIxLjUzNiw1Ni40ODUsMTkyLjQzOCw1Ni40ODUgICAgYzIzMC45NDgsMCwzNTcuMTg4LTE5MS4yOTEsMzU3LjE4OC0zNTcuMTg4bC0wLjQyMS0xNi4yNTNDNTczLjg3MiwxNjMuNTI2LDU5NS4yMTEsMTQxLjQyMiw2MTIsMTE2LjI1OHoiIGRhdGEtb3JpZ2luYWw9IiMwMTAwMDIiIGNsYXNzPSJhY3RpdmUtcGF0aCIgZGF0YS1vbGRfY29sb3I9IiMwMTAwMDIiIGZpbGw9IiNGRkZGRkYiLz4KCTwvZz4KPC9nPjwvZz4gPC9zdmc+Cg==)Share on Twitter](http://twitter.com/share?text=How to use ESLint with TypeScript&url=https://khalilstemmler.com/blogs/typescript/eslint-for-typescript/&via=khalilstemmler)

### 28 Comments

Commenting has been disabled for now. To ask questions and discuss this post, [join the community](https://discord.gg/TnqMR2P2rV).

Sergio

4 years ago



A very useful and pragmatic post, thanks



qetr1ck

4 years ago



Thanks for sharing!

Would be great to see the best practice how to setup `eslint` with two more things

- with `pre-*-git-hooks` via `husky`
- with `prettier`



Karl Horky

4 years ago



Thanks for the guide Khalil!



I would suggest using the string values to configure rules though ("off", "warn", and "error"), documented here: https://eslint.org/docs/user-guide/configuring#configuring-rules



Waheed

4 years ago



Simple and straightforward. Thanks for this guide...already used it to setup a template.



ItayBS

3 years ago



Thank you very much! Great post!



kapil

3 years ago



Thanks, very much helpful.



Emmanuel Idun

3 years ago



Can it be installed globally?



Ilyas

3 years ago



When I run command I am getting:



```
$ eslint . --ext .ts


Oops! Something went wrong! :(


ESLint: 7.10.0


TypeError [ERR_INVALID_ARG_TYPE]: The "path" argument must be of type string. Received type undefined
    at assertPath (path.js:39:11)
    at Object.join (path.js:434:7)
    at FileEnumerator._iterateFilesRecursive (E:\wertik-js\node_modules\eslint\lib\cli-engine\file-enumerator.js:426:35)
    at _iterateFilesRecursive.next (<anonymous>)
    at FileEnumerator.iterateFiles (E:\wertik-js\node_modules\eslint\lib\cli-engine\file-enumerator.js:287:49)
    at iterateFiles.next (<anonymous>)
    at CLIEngine.executeOnFiles (E:\wertik-js\node_modules\eslint\lib\cli-engine\cli-engine.js:751:48)
    at ESLint.lintFiles (E:\wertik-js\node_modules\eslint\lib\eslint\eslint.js:521:23)
    at Object.execute (E:\wertik-js\node_modules\eslint\lib\cli.js:294:36)
    at main (E:\wertik-js\node_modules\eslint\bin\eslint.js:142:52)
error Command failed with exit code 2.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```



'''''''''''''''''''

3 years ago



<<<<<<<<<<<>>>>>>>>>>>



Yash

3 years ago



Thanks buddy.



Diogo

3 years ago



Great post!! On my way to read the next ones



Frank B

3 years ago



Nice job of making this straight forward, simple and easy to understand the basics. Thanks



nilinswap

3 years ago



beautiful post



Paulo

2 years ago



Finally I can understand Lint! Thank you!

One thing: node_modules files are ignored by default



birgersp

2 years ago



Great article! But how can I enable linting to happen "automatically" when building? Running `tsc --watch` for instance does not give any warnings even though rules are broken by my source code ...



Mark

2 years ago



thank you - great post!



Ale

2 years ago



This was very helpful! Thank!!



Michael Roberts

2 years ago



I'd prefer to leave the script as `npm run lint -- --fix` passing in the fix parameter as an extra argument. :)



Daniel

2 years ago



Parsing error: The keyword 'import' is reserved



How to fix it?



Daniel

2 years ago



I had more problem with this tutorial that with `eslint --init`. I think you should mention about this option.



\```

eslint --init

✔ How would you like to use ESLint? · syntax

✔ What type of modules does your project use? · none

✔ Which framework does your project use? · none

✔ Does your project use TypeScript? · No / Yes

✔ Where does your code run? · node                   

✔ What format do you want your config file to be in? · JSON                         

✔ Would you like to install them now with npm? · No / Yes        

\```



Joe

2 years ago



Excellent, thank you Khalil!



james gardner

2 years ago



Have you had any issues where TSC assigns a greater priority to the same 'rule' so that when you run both in succession (e.g. eslint => tsc to build) eslint says 'warning' but tsc says 'error' ?



Geoffrey J. Swenson

2 years ago



I am getting lint errors because common interface definitions in types.d.ts are considered undefined in my .ts files by the linter. How do I get it to use these?



Steve

a year ago



Very well written and straightforward in a way that answers typical questions that someone who is newer to eslint and prettier would have. Cheers!



lukaszek

a year ago



Thank you for that post!



Blaine Garrett

a year ago



Great article. Although, I'm running into an odd case where typescript type issues are not being caught when running eslint. The syntax is highlighted as an error in VSCode but not failing via eslint cli. For the record, I have prettier running.



```
interface Test { thing: number; }
const x1: Test = { thing: 'test' };
const x2: Test = { thing2: 'test' };
```



Marc

a year ago



Why is --ext .ts necessary? I notice without it ESLint ignores .ts files. Is there a neater way to tell ESLint to scan all files (e.g. *.js and *.ts) in a directory?



Glenn

a year ago



Really clear and helpful, thank you a lot.



### Stay in touch!

Enjoying so far? Join 15000+ Software Essentialists getting my posts delivered straight to your inbox each week. I won't spam ya. 🖖

Get notified

![img](https://d33wubrfki0l68.cloudfront.net/136b30aa6dcc1e2bcf190c846279aecd30e6cb0a/d0a1b/static/khalil-headshot-fecbe8f1d39b9e2b0ae79cc0005e0efb.png)

### About the author

Khalil Stemmler,
Software Essentialist ⚡

I'm Khalil. I turn code-first developers into confident crafters without having to buy, read & digest hundreds of complex programming books. Using Software Essentialism, my philosophy of software design, I coach developers through boredom, impostor syndrome, and a lack of direction to master software design and architecture. Mastery though, is not the end goal.