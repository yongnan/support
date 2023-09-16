# Next.js

[doc](https://nextjs.org/docs)

## [Automatic Setup](https://nextjs.org/docs#automatic-setup)

We recommend creating a new Next.js app using `create-next-app`, which sets up everything automatically for you. To create a project, run:

```bash
npx create-next-app@latest
# or
yarn create next-app
# or
pnpm create next-app
```

If you want to start with a TypeScript project you can use the `--typescript` flag:

```bash
npx create-next-app@latest --typescript
# or
yarn create next-app --typescript
# or
pnpm create next-app -- --typescript
```

# Data Fetching

○ (Static) automatically rendered as static HTML (uses no initial props)

## SSR: Server-side rendering 

* λ (Server) server-side renders at runtime (uses getInitialProps or getServerSideProps)

* `getServerSideProps`

  ````jsx
  export async function getServerSideProps(context) {
    return {
      props: {}, // will be passed to the page component as props
    }
  }
  ````

## SSG: Static-site generation 

* `getStaticProps`

  ```jsx
  export async function getStaticProps(context) {
    return {
      props: {}, // will be passed to the page component as props
    }
  }
  ```

## Dynamic routing

* `getStaticPaths`,  **must** be used with `getStaticProps`

  ```jsx
  export async function getStaticPaths() {
    return {
      paths: [
        { params: { ... } }
      ],
      fallback: true // false or 'blocking'
    };
  }
  ```

## CSR: Client-side rendering

* with useEffecteffect
* with SWR

## ISR: Incremental Static Regeneration

* To use ISR, add the `revalidate` prop to `getStaticProps`:

  ```jsx
  export async function getStaticProps() {
    const res = await fetch('https://.../posts')
    const posts = await res.json()
  
    return {
      props: {
        posts,
      },
      // Next.js will attempt to re-generate the page:
      // - When a request comes in
      // - At most once every 10 seconds
      revalidate: 10, // In seconds
    }
  }
  ```

  