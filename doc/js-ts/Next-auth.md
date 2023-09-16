# Next-auth



## Auth

pages/admin.jsx

```js
export default function AdminDashboard() {
  const { data: session } = useSession()
  // session is always non-null inside this page, all the way down the React tree.
  return "Some super secret dashboard"
}

AdminDashboard.auth = true
```

pages/_app.jsx

```jsx
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <Auth>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  )
}

function Auth({ children }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true })

  if (status === 'loading') {
    return <div>Loading...</div>
  }
  
  return children
}
```

It can be easily be extended/modified to support something like an options object for role based authentication on pages. An example:

pages/admin.jsx

```jsx
AdminDashboard.auth = {
  role: "admin",
  loading: <AdminLoadingSkeleton />,
  unauthorized: "/login-with-different-user", // redirect to this url
}
```

### Secure ServerSide

pages/server-side-example.js

```js
import { useSession, getSession } from "next-auth/react"
import { GetServerSideProps } from 'next'

export default function Page() {
  const { data: session } = useSession()

  if (typeof window === "undefined") return null

  if (session) {
    return (
      <>
        <h1>Protected Page</h1>
        <p>You can view this page because you are signed in.</p>
      </>
    )
  }
  return <p>Access Denied</p>
}

export const getServerSideProps: GetServerSideProps = async(context) => {
  return {
    props: {
      session: await getSession(context),
    },
  }
}
```