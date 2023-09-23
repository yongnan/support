# Remix useFetcher

#### `fetcher.state`

You can know the state of the fetcher with `fetcher.state`. It will be one of:

- **idle** - Nothing is being fetched.
- **submitting** - A form has been submitted. If the method is GET, then the route loader is being called. If POST, PUT, PATCH, or DELETE, then the route action is being called.
- **loading** - The loaders for the routes are being reloaded after an action submission.

#### `fetcher.type`

This is the type of state the fetcher is in. It's like `fetcher.state`, but more granular. Depending on the fetcher's state, the types can be the following:

- `state === "idle"`
  - **init** - The fetcher isn't doing anything currently and hasn't done anything yet.
  - **done** - The fetcher isn't doing anything currently, but it has completed a fetch and you can safely read the `fetcher.data`.
- `state === "submitting"`
  - **actionSubmission** - A form has been submitted with POST, PUT, PATCH, or DELETE, and the action is being called.
  - **loaderSubmission** - A form has been submitted with GET and the loader is being called.
- `state === "loading"`
  - **actionReload** - The action from an "actionSubmission" returned data and the loaders on the page are being reloaded.
  - **actionRedirect** - The action from an "actionSubmission" returned a redirect and the page is transitioning to the new location.
  - **normalLoad** - A route's loader is being called without a submission (`fetcher.load()`).

#### `fetcher.submission`

When using `<fetcher.Form>` or `fetcher.submit()`, the form submission is available to build optimistic UI.

It is not available when the fetcher state is "idle" or "loading".