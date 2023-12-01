# Elysia

# QuickStart

# Quick Start[](https://elysiajs.com/quick-start.html#quick-start)

Elysia is a library built for Bun.

Bun is all you need to get started.

```bash
curl https://bun.sh/install | bash
```

Bootstrap a new project with `bun create`:

```bash
bun create elysia hi-elysia
```

Then you should see the folder name `hi-elysia` in your directory.

```bash
cd hi-elysia
```

Open `src/index.ts`, and you should see:

```ts
import { Elysia } from "elysia";

const app = new Elysia().get("/", () => "Hello Elysia").listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
```

Start a development server by:

```bash
bun dev
```

Open your browser and go to `http://localhost:3000`.

You should see your server is running.