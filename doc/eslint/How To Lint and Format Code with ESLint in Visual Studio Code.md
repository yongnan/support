# How To Lint and Format Code with ESLint in Visual Studio Code

Published on December 12, 2019 · Updated on December 2, 2021

- [VS Code](https://www.digitalocean.com/community/tags/vs-code)

![Default avatar](https://www.digitalocean.com/_next/static/media/default-avatar.14b0d31d.jpeg)

By [James Quick](https://www.digitalocean.com/community/users/jamesqquick)

![How To Lint and Format Code with ESLint in Visual Studio Code](https://www.digitalocean.com/_next/static/media/intro-to-cloud.d49bc5f7.jpeg)

### [Introduction](https://www.digitalocean.com/community/tutorials/linting-and-formatting-with-eslint-in-vs-code#introduction)

When writing JavaScript with an editor such as [Visual Studio Code](https://code.visualstudio.com/), there are different ways you can ensure your code is syntactically correct and in line with current best practices. You can use a linter to do this. Linters check your code for syntax errors and highlight errors to make sure you can quickly find and fix them. [ESLint](https://eslint.org/) is a linter that you can integrate into your Visual Studio Code setup in order to ensure code integrity.

ESLint can both format your code and analyze it to make suggestions for improvement. It is also configurable. This means that you can customize how your code is evaluated.

In this tutorial, you will set up ESLint on Visual Studio Code and implement a custom configuration to deal with log statements in debugging. You will also configure ESLint to automatically fix syntax errors when you save your files.

## [Prerequisites](https://www.digitalocean.com/community/tutorials/linting-and-formatting-with-eslint-in-vs-code#prerequisites)

To complete this tutorial, you will need the following:

- The latest version [Visual Studio Code](https://code.visualstudio.com/download) installed on your machine.
- The latest version of [Node](https://nodejs.org/) installed on your machine. You can accomplish this by following the [How to Install Node.js and Create a Local Development Environment](https://www.digitalocean.com/community/tutorial_series/how-to-install-node-js-and-create-a-local-development-environment) for your machine.

This tutorial was verified with Visual Studio Code v1.62.3, ESLint Extension v2.2.2, Node.js v17.2.0, `npm` v8.1.4, and `eslint` v8.3.0.

## [Step 1 — Creating JavaScript Starter Code](https://www.digitalocean.com/community/tutorials/linting-and-formatting-with-eslint-in-vs-code#step-1-creating-javascript-starter-code)

You need to start with a demo project. Create a directory for your project with the following command:

```bash
mkdir vscode-eslint-example
```

Now that your project folder is created switch into the `vscode-eslint-example` directory:

```
cd vscode-eslint-example
```

While inside of the `vscode-eslint-example` directory, create a JavaScript file with the name `app.js`:

```bash
touch app.js
```

Open `app.js` in Visual Studio Code. Write the following JavaScript code in your `app.js` file:

app.js

```javascript
const name = 'James'

const person = {first: name}

console.log(person)

const sayHelloLinting = (fName) => {
console.log(`Hello linting, ${fName}`);
};
```

You may have noticed that there are formatting issues that could be improved:

- Inconsistent use of quotes
- Inconsistent use of semicolons
- Spacing

With this JavaScript file in place, you can now initialize this project. To do this, navigate back to your command line and in the `vscode-eslint-example` directory, run the following command:

```bash
npm init --yes
```

Using the `npm init` command to initialize your project will create a `package.json` file in the `vscode-eslint-example` directory. The `package.json` will store your project dependencies and other important configuration settings for your project.

![Screenshot of the terminal output after running npm init](https://assets.digitalocean.com/articles/linting-and-formatting-with-eslint-in-vs-code/1.png)

Now that your JavaScript project is properly set up, you can now set up ESLint.

## [Step 2 — Setting Up ESLint](https://www.digitalocean.com/community/tutorials/linting-and-formatting-with-eslint-in-vs-code#step-2-setting-up-eslint)

Before you set up ESLint for your project, you will first need to install ESLint:

```
npm install eslint --save-dev
```

It’s important to include the `--save-dev` flag because this saves the package as a dependency for development usage only. In this case, `eslint` is a package that is only needed when you are actively working on and making changes to your project. Once your project launches or is in production, `eslint` will no longer be needed. Using the `--save-dev` flag ensures that `eslint` will be listed in your `package.json` file as a development dependency only.

Now that ESLint is installed, you can initialize an ESLint configuration for your project using the following command:

```bash
./node_modules/.bin/eslint --init
```

An important piece in this command is the `--init` flag. The `./node_modules/.bin/eslint` section of the command is the path to ESLint in your project. Using the `--init` flag activates ESLint for your project. Activating or initializing ESLint will create an ESLint configuration file that will allow you to customize how ESLint works with your project.

Before you can access your ESLint configuration file, you will be prompted with different questions about your project. These questions are asked to make sure that the configuration that is initialized for your project best fits your needs.

The first prompt will be:

```
? How would you like to use ESLint? …
  To check syntax only
  To check syntax and find problems
❯ To check syntax, find problems, and enforce code style
```

Choose the `To check syntax, find problems, and enforce code style` option.

The next prompt will be:

```
 What type of modules does your project use? …
  JavaScript modules (import/export)
❯ CommonJS (require/exports)
  None of these
```

Choose the `CommonJS` option to use CommonJS global variables.

The next prompt will say:

```
? Which framework does your project use? …
  React
  Vue.js
❯ None of these
```

Choose the `None of these` option.

The next prompt will ask:

```
? Does your project use TypeScript? › No / Yes
```

Choose the `No` option.

The following prompt will say:

```
? Where does your code run? …  (Press <space> to select, <a> to toggle all, <i> to invert selection)
✔ Browser
  Node
```

Choose the `Browser` option.

The next prompt will say:

```
✔ How would you like to define a style for your project? …
❯ Use a popular style guide
  Answer questions about your style
  Inspect your JavaScript file(s)
```

Choose the `Use a popular style guide` option.

For the `Which style guide do you want to follow?` prompt, choose the `Airbnb: https://github.com/airbnb/javascript` option.

The next prompt will ask:

```
? What format do you want your config file to be in? …
  JavaScript
  YAML
❯ JSON
```

Choose the `JSON` option.

You will then see this message:

```
Checking peerDependencies of eslint-config-airbnb-base@latest
The config that you've selected requires the following dependencies:

eslint-config-airbnb-base@latest eslint@^5.16.0 || ^6.8.0 || ^7.2.0 eslint-plugin-import@^2.21.2
```

The last prompt will ask:

```
? Would you like to install them now with npm? › No / Yes
```

Choose the `Yes` option to install the dependencies with `npm`.

You will also be asked to install extra packages. Choose `yes`.

After completing all the prompts, you’ll notice that a file named `.eslintrc.json` has been added to your `vscode-eslint-example` directory. ESLint is now installed. The code in `app.js` hasn’t changed yet. This is because ESLint needs to be integrated with Visual Studio Code.

## [Step 3 — Installing the ESLint Extension](https://www.digitalocean.com/community/tutorials/linting-and-formatting-with-eslint-in-vs-code#step-3-installing-the-eslint-extension)

To integrate ESLint into Visual Studio Code, you will need to install the ESLint extension for Visual Studio Code. Navigate back to Visual Studio Code and search for ESLint in the **Extensions** tab. Click **Install** once you have located the extension:

![Screenshot of the ESLint extension details in Visual Studio Code](https://assets.digitalocean.com/articles/linting-and-formatting-with-eslint-in-vs-code/2.png)

Once ESLint is installed in Visual Studio Code, you’ll notice colorful underlining in your `app.js` file highlighting errors. These markers are color-coded based on severity. If you hover over your underlined code, you will see a message that explains the error to you. In this way, ESLint helps us find and remove code and syntax errors.

ESLint can do even more for you. ESLint can be modified to automatically fix errors every time a file is saved.

## [Step 4 — Formatting on Save](https://www.digitalocean.com/community/tutorials/linting-and-formatting-with-eslint-in-vs-code#step-4-formatting-on-save)

To configure ESLint to automatically fix syntax and formatting issues every time you save, you will need to open the settings menu.

To find the settings in Visual Studio Code, use the command palette to open **Preferences: Open Workspace Settings (JSON)**.

The `settings.json` file will open inside of your code editor. For ESLint to fix errors when you save your file, you will need to write the following code in `settings.json`:

.vscode/settings.json

```json
{
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    "eslint.validate": ["javascript"]
}
```

With this code in your `settings.json` file, ESLint will now automatically correct errors and validate JavaScript on save.

Return back to your `app.js` file and save it. You will see some changes, including less colorful underlining. Some of the formatting issues that ESLint has fixed include:

- Consistent use of single quotes
- Proper indentation inside of the function
- Consistent use of semicolons

![Screenshot of the correctly formatted JavaScript code in Visual Studio Code](https://assets.digitalocean.com/articles/linting-and-formatting-with-eslint-in-vs-code/3.png)

ESLint will now automatically solve syntax errors whenever you save `app.js`. There are still some remaining error messages. These can be fixed by customizing the ESLint configuration to catch or ignore specific errors and formatting issues.

## [Step 5 — Customizing ESLint Rules](https://www.digitalocean.com/community/tutorials/linting-and-formatting-with-eslint-in-vs-code#step-5-customizing-eslint-rules)

As is, ESLint produces a highlighted message for all `console.log()` statements in `app.js`. In some cases, removing `console.log` statements may not be a priority. You can customize the ESLint configuration to allow `console.log` statements without producing an error message. ESLint configuration rules can be modified in the `.eslintrc.json` file.

Open up the `.eslintrc.json` file. This is the code you will see in that file:

.eslintrc.json

```json
{
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true
    },
    "extends": [
        "airbnb-base"
    ],
    "parserOptions": {
        "ecmaVersion": 12
    },
    "rules": {
    }
}
```

At the bottom of the `.eslintrc.json` file, you will see a `"rules"` object. To customize the errors that trigger ESLint or to disable ESLint’s response to certain pieces of code, you will add key-value pairs to the `"rules"` object. The key will match the name of the rule you want to add or change. The value will match the severity level of the issue. You have three choices for severity level:

- `error` - produces a red underline
- `warn` - will produce a yellow underline
- `off` - will not display anything.

If you do not want to produce any error messages for `console.log` statements, you can use the `no-console` rule name as the key. Input `off` as the value for `no-console`:

.eslintrc.json

```json
"rules" : {
    "no-console": "off"
}
```

This removes the error messages from your `console.log` statements in `app.js`:

![Screenshot of the error messages removed in Visual Studio Code](https://assets.digitalocean.com/articles/linting-and-formatting-with-eslint-in-vs-code/4.png)

Some rules require multiple pieces of information, including a severity level and a value. To specify the type of quotes you want to use in your code, you have to pass in both the chosen type of quotes and the severity level:

.eslintrc.json

```json
"rules" : {
    "no-console": "off",
    "quotes": [
        "error",
        "double"
    ]
}
```

Now, if you include single quotes in your quote, ESLint will raise an error.

## [Conclusion](https://www.digitalocean.com/community/tutorials/linting-and-formatting-with-eslint-in-vs-code#conclusion)

This tutorial introduces some of what you can do with linting using ESLint on Visual Studio Code. Linting tools like ESLint can help create time for more complex tasks by automating and simplifying how you verify syntax and best practices.

If you would like more information about rules and what key-value pairs you can use to customize your ESLint rules, you can check out this [documentation](https://eslint.org/docs/rules/).

Want to deploy your application quickly? Try Cloudways, the #1 managed hosting provider for small-to-medium businesses, agencies, and developers - for free. DigitalOcean and Cloudways together will give you a reliable, scalable, and hassle-free managed hosting experience with anytime support that makes all your hosting worries a thing of the past. Start with $100 in free credits!

[Learn more here](https://www.cloudways.com/en/digital-ocean-hosting.php?id=1248182)

------

Formatting on save works for some eslint rules (indent, comma-dangle, quotes, semi) BUT doesn’t seem to work for other (max-len for example). Having the following rules in .eslintrc:

```
"rules": {
    "indent": [
        "error",
        2
    ],
    "quotes": [
        "error",
        "single"
    ],
    "semi": [
        "error",
        "always"
    ],
    "comma-dangle": [
        "error",
        "never"
    ],
    "max-len": [
        "error",
        {
            "code": 90
        }
    ]
}
```

When I save the file, it does change all double quotes to single quotes, sets proper indentation, adds semi-colons and removes trailing commas, all good. BUT if I have a code line that exceeds the max-length of 90, it does not break that line (although it is underlined and it shows the linting error). And it’s not a line of one long string, it’s simply this:

```
const someArray = ['asdasd', 'asdasdfgdswgsgs', 'asduhasjkdhkasudhku', 'akhjsdggasfygasfykgas', 'hgashdg', ['a', 'b', 'c']];
```