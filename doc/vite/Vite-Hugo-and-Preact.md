# Vite, Hugo and Preact

# setup

## Step 1: Install Hugo 

`Homebrew` and `MacPorts`, package managers for `macOS`, can be installed from [brew.sh](https://brew.sh/) or [macports.org](https://www.macports.org/) respectively. See [install](https://gohugo.io/getting-started/installing) if you are running Windows etc.

```bash
brew install hugo
# or
port install hugo
```

To verify your new install:

```bash
hugo version
```

## Step 2: Create a New Site 

```bash
hugo new site quickstart
```

## Step 3: Add a Theme

See [themes.gohugo.io](https://themes.gohugo.io/) for a list of themes to consider. This quickstart uses the beautiful [Ananke theme](https://themes.gohugo.io/gohugo-theme-ananke/).

First, download the theme from GitHub and add it to your site’s `themes` directory:

```bash
cd quickstart
git init
git submodule add https://github.com/theNewDynamic/gohugo-theme-ananke.git themes/ananke
```

update theme:

```bash
git submodule status
git submodule update --init
```



Then, add the theme to the site configuration:

```bash
echo theme = \"ananke\" >> config.toml
```

## Step 4: Add Some Content 

You can manually create content files (for example as `content/<CATEGORY>/<FILE>.<FORMAT>`) and provide metadata in them, however you can use the `new` command to do a few things for you (like add title and date):

```
hugo new posts/my-first-post.md
```

Drafts do not get deployed; once you finish a post, update the header of the post to say `draft: false`. More info [here](https://gohugo.io/getting-started/usage/#draft-future-and-expired-content).

## Step 5: Start the Hugo server

```
hugo server -D
```

Now, start the Hugo server with [drafts](https://gohugo.io/getting-started/usage/#draft-future-and-expired-content) enabled:

## Step 6: Customize the Theme

Open up `config.toml` in a text editor:

```
baseURL = "https://example.org/"
languageCode = "en-us"
title = "My New Hugo Site"
theme = "ananke"
```

## Integrating Vite with Hugo

```
$ npm i -D vite vite-hugo-plugin @preact/preset-vite npm-run-all onchange typescript
```

![img](https://miro.medium.com/max/700/1*5L_JO9WSB1_tF7eIN4zE3w.png)

creating a `vite.config.ts` file

```js
import preact from '@preact/preset-vite';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import hugoPlugin from 'vitejs-hugo-plugin'

// Root directory of our application
const appDir = __dirname;

// The directory where hugo builds it's files.
const hugoOutDir = resolve(appDir, 'dist');

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        preact(), // Specify preact plugin, we will need that later
        hugoPlugin({ appDir, hugoOutDir }) // Hugo plugin that configures vite to work with hugo
    ], 
});
```

`package.json`, add scripts: 

```
{
  "scripts": {
    "build": "npm run build:hugo && npm run build:vite",
    "build:hugo": "hugo -d dist",
    "build:vite": "vite build"
  },
}
```

Running `npm run build` in console should output a similar result:

![img](https://miro.medium.com/max/700/1*zU4A86yHxG3LL11_3svoYw.png)

**Configuration of the development scripts**

`package.json`, add dev~

```
{
  "scripts": {
    "dev": "run-p dev:**",
    "dev:vite": "vite --host",
    "dev:hugo-watch": "onchange 'content/**/*.md' 'config.toml' '../layouts/**/*' -- npm run build:hugo",
    "build": "npm run build:hugo && npm run build:vite",
    "build:hugo": "hugo -d dist",
    "build:vite": "vite build"
  },
}
```

# Adding [Preact](https://preactjs.com/) app with [TypeScript](https://www.typescriptlang.org/)

Configuration of **tsconfig.base.json**

```
{
  "compilerOptions": {
    "baseUrl": ".",
    "jsx": "preserve",
    "jsxFactory": "h",
    "jsxFragmentFactory": "Fragment",
    "moduleResolution": "Node",
    "target": "es2016",
    "module": "ESNext",
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "noImplicitAny": true,
    "paths": {
      "js/*": [
        "/*"
      ]
    },
  }
}
```

Configuration of **tsconfig.json**, Config file placed in `assets/tsconfig.json` 

```
{
    "extends": "../tsconfig.base.json",
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "js/*": [
                "js/*"
            ]
        },
    }
}
```

# Create the Preact app

```
yarn add preact preact-router
```



To start the final step, let’s create `assets/js/src/app.tsx`

```tsx
import { h } from 'preact'
import { useState } from 'preact/hooks'

export default function App() {
    const [counter, setCounter] = useState(0);
    const handleButtonClick = () => {
        setCounter((prev) => prev + 1);
    }
    return (
        <div className="preact-page">
            <div>
                The button has been clicked <span className="counter">{counter}</span> times!
            </div>
            <button onClick={handleButtonClick}>Click me!</button>
        </div>
    )
}
```

Create the root component of the application in `assets/js/index.tsx`

# tip

## Q1

when `yarn vite build`

rendering chunks (4)...warnings when minifying css:

▲ [WARNING] Expected identifier but found "*" [css-syntax-error]



  <stdin>:1:7694:

   1 │ ...:table}.cf:after{clear:both}.cf{*zoom:1}.cl{clear:left}.cr{clear...

Fix ->

`vite.config.ts`

```
export default defineConfig({
  esbuild: {
    logOverride: {
      'unsupported-css-property': 'silent',
      'css-syntax-error': 'silent'
    }
  },
  ......
})
```



 

