# Remix

# Quick Start

## Installation

```
mkdir my-remix-app
cd my-remix-app

# install runtime dependencies
npm i @remix-run/node @remix-run/react @remix-run/serve isbot react react-dom

# install dev dependencies
npm i -D @remix-run/dev
```

```
touch tsconfig.json
```

```ts
{
  "include": ["remix.env.d.ts", "**/*.ts", "**/*.tsx", "app/actions/authenticate._ts"],
  "compilerOptions": {
    "lib": ["DOM", "DOM.Iterable", "ES2022"],
    "isolatedModules": true,
    "esModuleInterop": true,
    "jsx": "react-jsx",
    "moduleResolution": "Bundler",
    "resolveJsonModule": true,
    "target": "ES2022",
    "strict": true,
    "allowJs": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": ".",
    "paths": {
      "~/*": ["./app/*"]
    },

    // Remix takes care of building everything in `remix build`.
    "noEmit": true
  }
}
```



## The Root Route

```
mkdir app
touch app/root.tsx
```

`app/root.tsx`

```jsx
import {
  Links,
  Meta,
  Outlet,
  Scripts,
} from "@remix-run/react";

export default function App() {
  return (
    <html>
      <head>
        <link
          rel="icon"
          href="data:image/x-icon;base64,AA"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <h1>Hello world!</h1>
        <Outlet />

        <Scripts />
      </body>
    </html>
  );
}
```

## Build and Run

First build the app for production:

```
npx remix build
```

You should now see a `build/` folder (the server version of your app) and `public/build` folder (the browser version) with some build artifacts in them. (This is all [configurable](https://remix.run/docs/en/main/file-conventions/remix-config).)

###  Run with `remix-serve`

add to `package.json`:

```
"type": "module"
```

Now you can run your app with `remix-serve`:

```
# note the dash!
npx remix-serve build/index.js
```

You should be able to open up [http://localhost:3000](http://localhost:3000/) and see the "hello world" page.

### Using express-server

👉 **Install Express and the Remix Express adapter**

```
npm i express @remix-run/express

# not going to use this anymore
npm uninstall @remix-run/serve
```

👉 **Create an Express server**

```
touch server.mjs
```

```jsx
import { createRequestHandler } from "@remix-run/express";
import express from "express";

// notice that the result of `remix build` is "just a module"
import * as build from "./build/index.js";

const app = express();
app.use(express.static("public"));

// and your app is "just a request handler"
app.all("*", createRequestHandler({ build }));

app.listen(3000, () => {
  console.log("App listening on http://localhost:3000");
});
```

👉 **Run your app with express**

```
node server.mjs
```

Now that you own your server, you can debug your app with whatever tooling your server has. For example, you can inspect your app with chrome devtools with the [Node.js inspect flag](https://nodejs.org/en/docs/guides/debugging-getting-started/):

```
node --inspect server.mjs
```

👉 **Add a "scripts" entry to `package.json`**

```jsonc
{
  "scripts": {
    "dev": "remix dev -c \"node server.mjs\""
  }
  // ...
}
```

👉 **Add `broadcastDevReady` to your server**

When files change, Remix will restart your server for you, but because you own your server, you also have to tell Remix when it has restarted so Remix can safely send the hot updates to the browser.

update to `server.mjs`

```tsx
import { broadcastDevReady } from "@remix-run/node";

...
app.listen(3000, () => {
  if (process.env.NODE_ENV === "development") {
    broadcastDevReady(build);
  }
  console.log("App listening on http://localhost:3000");
});
```

And finally, let's connect your UI in the browser to receive those broadcasts:

add to `root.tsx`

```jsx
import {
  ...
  LiveReload,
} from "@remix-run/react";

export default function App() {
  return (
    <html>
      <head>
        <link
          rel="icon"
          href="data:image/x-icon;base64,AA"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <h1>Hello world!</h1>
        <Outlet />

        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
```

## Controlling Server and Browser Entries

There are default magic files Remix is using that most apps don't need to mess with, but if you want to customize Remix's entry points to the server and browser you can run `remix reveal` and they'll get dumped into your project.

```
npx remix reveal
```

Copy code to clipboard

```
Entry file entry.client created at app/entry.client.tsx.
Entry file entry.server created at app/entry.server.tsx.
```
# QA

1. # [The resource was preloaded using link preload but not used within a few seconds](https://wordpress.stackexchange.com/questions/253151/the-resource-was-preloaded-using-link-preload-but-not-used-within-a-few-seconds)

Answer:

due to http2/push

`root.tsx`

must add as attribute:

```
export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl, as: "style" }];
};
```





