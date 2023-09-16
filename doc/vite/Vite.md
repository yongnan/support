# Vite 

# Getting started

## Trying Vite Online

 [StackBlitz](https://vite.new/). 

The supported template presets are:

|             JavaScript              |                TypeScript                 |
| :---------------------------------: | :---------------------------------------: |
| [vanilla](https://vite.new/vanilla) | [vanilla-ts](https://vite.new/vanilla-ts) |
|     [vue](https://vite.new/vue)     |     [vue-ts](https://vite.new/vue-ts)     |
|   [react](https://vite.new/react)   |   [react-ts](https://vite.new/react-ts)   |
|  [preact](https://vite.new/preact)  |  [preact-ts](https://vite.new/preact-ts)  |
|     [lit](https://vite.new/lit)     |     [lit-ts](https://vite.new/lit-ts)     |
|  [svelte](https://vite.new/svelte)  |  [svelte-ts](https://vite.new/svelte-ts)  |

## Scaffolding Your First Vite Project[#](https://vitejs.dev/guide/#scaffolding-your-first-vite-project)

```
$ yarn create vite
```

You can also directly specify the project name and the template you want to use via additional command line options. For example, to scaffold a Vite + Vue project, run:

```bash
# npm 6.x
npm create vite@latest my-vue-app --template vue

# npm 7+, extra double-dash is needed:
npm create vite@latest my-vue-app -- --template vue

# yarn
yarn create vite my-vue-app --template vue

# pnpm
pnpm create vite my-vue-app --template vue
```

```bash
yarn create vite my-vite-app --template preact-ts
```



`pacakge.json`

```json
{
  "scripts": {
    "dev": "vite", // start dev server, aliases: `vite dev`, `vite serve`
    "build": "vite build", // build for production
    "preview": "vite preview" // locally preview production build
  }
}
```

## Features

### JSX

If not using JSX with React or Vue, custom `jsxFactory` and `jsxFragment` can be configured using the [`esbuild` option](https://vitejs.dev/config/shared-options.html#esbuild). For example for Preact:

```js
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  }
})
```

# tip

failed to load config from /Users/yongnan/codes/alpha/hugo-quickstart/vite.config.ts

error during build:

Error: Cannot find module 'node:path'

=>

```
nvm list
nvm use v16.9.1
```

##
