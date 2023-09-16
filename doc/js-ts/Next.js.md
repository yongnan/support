# Next.js

## Data Fetching

### **CSR**

**Client-side rendering** (uses no initial props)

[next doc](https://nextjs.org/docs/basic-features/data-fetching/client-side)

* run: client side
* Build: page
* at the **page** level: the data is fetched at runtime, and the content of the page is updated as the data changes. at the **component** level: the data is fetched at the time of the component mount, and the content of the component is updated as the data changes. 

Tools:

​	useEffect (React Hook) of SWR

```js
function Profile() {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('api/profile-data')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.bio}</p>
    </div>
  )
}
```

useSWR

```js
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

function Profile() {
  const { data, error } = useSWR('/api/profile-data', fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.bio}</p>
    </div>
  )
}
```



best suited

* page doesn't require SEO indexing
* don't need to pre-render your data
* content of pages needs to update frequently.

 Best suit

​	=> Admin pages



### SSR

**Client-side rendering** (uses `getInitialProps` or `getServerSideProps`) :

[next doc](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props)

* only runs on server-side and never runs on the browser.
* When request this page directly,  `getServerSideProps` runs at request time
* When request this page on client-side page transitions through [`next/link`](https://nextjs.org/docs/api-reference/next/link) or [`next/router`](https://nextjs.org/docs/api-reference/next/router), Next.js sends an API request to the server, which runs `getServerSideProps`

when to use

*  only if you need to render a page whose data must be fetched at request time. (such as `authorization` headers or geo location).

Best suit

​	=> 

​		-  fetch data that relates to the user's cookies/activity and is consequently not possible to cache.

​		- fetching frequently-updated data

### SSG

**Static-site generation** (uses `getStaticProps`) :

[next doc](https://nextjs.org/docs/basic-features/data-fetching/get-static-props)

*  pre-render this page at build time
*  `getStaticProps` can only be exported from a **page**. You **cannot** export it from non-page files.

when to use

- The data required to render the page is available at build time ahead of a user’s request
- The data comes from a headless CMS
- The data can be publicly cached (not user-specific)
- The page must be pre-rendered (for SEO) and be very fast — `getStaticProps` generates `HTML` and `JSON` files, both of which can be cached by a CDN for performance

when does 'getStaticProps run'

- `getStaticProps` always runs during `next build`
- `getStaticProps` runs in the background when using `revalidate`
- `getStaticProps` runs on-demand in the background when using [`unstable_revalidate`](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#on-demand-revalidation-beta)

Best suit

​	=>



### SSG + ISR

**incremental static regeneration**  (uses `revalidate` in `getStaticProps`)

[next doc](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration)

To use ISR, add the `revalidate` prop to `getStaticProps`:

```js
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



Example2: fetch comments on server side and revalidate on clinet side

```javascript
export async function getStaticProps({params}) {
	const postUid = params.uid
  const post = (await Client().getByUID('page', postUid))

  // ADDED
	const commentsResponse = await fetch("https://random-comment-generator.herokuapp.com/")
	const { comments } = await commentsResponse.json()

  return {
    props: {
      post,
			comments,
    },
    // ADDED
    revalidate: 60_000
  }
}
```

[Using On-Demand Revalidation](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#using-on-demand-revalidation)

First, create a secret token only known by your Next.js app. This secret will be used to prevent unauthorized access to the revalidation API Route. You can access the route (either manually or with a webhook) with the following URL structure:

```bash
https://<your-site.com>/api/revalidate?secret=<token>
```

Next, add the secret as an [Environment Variable](https://nextjs.org/docs/basic-features/environment-variables) to your application. Finally, create the revalidation API Route:

```jsx
// pages/api/revalidate.js

export default async function handler(req, res) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    await res.unstable_revalidate('/path-to-revalidate')
    return res.json({ revalidated: true })
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating')
  }
}
```

 

### SSG + client (Mixed)

* data fetch at build time
* Additional data fetch on client side( ex. `loadMore`, `fetch`...)

Best Suit

​	=> pagination page, comments of a blog



### Dynamic Routes

(uses`getStaticPath` and  `getStaticProps`)

[next doc](https://nextjs.org/docs/basic-features/data-fetching/get-static-paths)

```
export async function getStaticPaths() {
  return {
    paths: [
      { params: { ... } }
    ],
    fallback: true // false or 'blocking'
  };
}
```

when to use

- The data comes from a headless CMS
- The data comes from a database
- The data comes from the filesystem
- The data can be publicly cached (not user-specific)
- The page must be pre-rendered (for SEO) and be very fast — `getStaticProps` generates `HTML` and `JSON` files, both of which can be cached by a CDN for performance

Run at

- `getStaticProps` runs during `next build` for any `paths` returned during build
- `getStaticProps` runs in the background when using `fallback: true`
- `getStaticProps` is called before initial render when using `fallback: blocking`

Best suit

​	=> detail [id] page

## When to use each data-fetching method

As we've seen, there are a variety of different techniques for data caching in Next.js, and it can be a bit tricky to know which one to use when. We need to know whether data will update infrequently or frequently, as well as where it's coming from. As a TL;DR, here are my recommendations:

- **getStaticProps**: Any data that changes infrequently, particularly from a CMS. (Must be used with **getStaticPaths** if there's a dynamic route).
- **revalidate:** An easy add-on to **getStaticProps** if the data might change, and we're OK serving a cached version.
- **getServerSideProps**: Primarily useful with data that must be fetched on the server that changes frequently or depends on user authentication.
- Client-side with **use-swr**: Great for any data coming from an API that changes frequently.
- Server Components: To use in the future 🚀