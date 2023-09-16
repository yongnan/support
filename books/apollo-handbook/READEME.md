# Apollo-handbook

**Code base**:

base for our work: https://github.com/radar/apollo-handbook-examples.

 the finished code from this book on GitHub here: https://github.com/radar/apollo- handbook-examples/tree/v2.

# **Apollo Client**

The foundation for this app was created by running this command:

```
npx create-next-app client --typescript
```

## **Setting up Apollo Client**

```
yarn add @apollo/client graphql
```

# **Automatically generated types**

**Installing GraphQL Code Generator**

```
yarn add -D @graphql-codegen/cli
```

We’ll run

that now to set the GraphQL Code Generator up:

```
yarn graphql-codegen init
```

> “What type of application are you building?”.
>
> >  =>   “Application built with React”,
>
> “Where is your schema?”
>
> > =>  https://apollo-handbook-api.vercel.app/api/graphql
>
> “Where are your operations and fragments?”
>
> > => components/\*\*/*.{tsx,ts}
>
>  pick some plugins
>
> > * TypeScript
> > * TypeScriptOperations
> > * TypeScriptReactApollo
>
> “Where to write the output”.
>
> > => lib/graphql.tsx
>
>  “Do you want to generate an introspection file?”
>
> > => no
>
> “How to name the config file?”
>
> > => codegen.yml
>
> “What script in package.json should run the codegen?”
>
> > =>“gql:codegen”

package.json

1.  "@graphql-codegen/typescript-react-apollo":"3.2.2",
2.  "@graphql-codegen/typescript-operations":"2.2.1",
3.  "@graphql-codegen/typescript":"2.4.1"

```
yarn install
yarn gql:codegen
```

# LazyQuery

**Debouncing the query**

```
yarn add use-debounce
```

>
>
>**import**{useDebouncedCallback}**from**"use-debounce";
>
>​	**const**_findBook=(title:**string**)=>{
>
>​	 loadBooks({ variables: { title } });
>
>​	 };
>
>**const**findBook=useDebouncedCallback(_findBook,250);

# Tailwind CSS

```
yarn add tailwindcss autoprefixer

```



Add followoing to styles/global.css

```
@tailwind base;
@tailwind components;
@tailwind utilities;

h1 {
  @apply text-4xl mb-4;
}

h2 {
  @apply text-3xl mb-4;
}

h3 {
  @apply text-2xl mb-4;
}

h4 {
  @apply text-xl mb-4;
}

a {
  @apply text-blue-600 underline;
}

ul {
  @apply list-disc list-inside;
}

.text-field {
  @apply shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
}

.text-field.has-error {
  @apply border-red-500 border-2;
}

.submit {
  @apply mt-4 bg-white font-bold border-2 py-2 px-4 rounded inline-block text-blue-500 border-blue-500;
}

.submit:disabled {
  @apply opacity-70 cursor-not-allowed;
}