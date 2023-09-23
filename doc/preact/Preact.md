# Preact

# Setup

## preact-cli

### Usage

```
$ npx preact-cli create <template-name> <project-name>
```

### Templates

Use one of our official templates to get started

- **Default**

This template is a great starting point for most applications. It comes with `preact-router` and a couple of sample routes and does route-based code splitting by default.

- **Simple**

A "bare-bones" template, starting from a "Hello World" application. If you're looking to choose your own tools or already have a setup in mind, this is a good way to start.

- **Netlify CMS**

Example:

```
$ npx preact-cli create default my-project
```

```
$ cd my-project
$ yarn dev
```

## Integrating Into An Existing Pipeline

```
yarn add preact preact-router
```



### Setting up JSX

`.babelrc`

```
{
  "presets": [
    ["@babel/preset-env"],
    ["@babel/preset-react", {
      "runtime": "automatic"
    }],
    ......
  ],
  ......
}
```

#### Aliasing in webpack

```
const config = { 
   //...snip
  "resolve": { 
    "alias": { 
      "react": "preact/compat",
      "react-dom/test-utils": "preact/test-utils",
      "react-dom": "preact/compat",     // Must be below test-utils
      "react/jsx-runtime": "preact/jsx-runtime"
    },
  }
}
```

