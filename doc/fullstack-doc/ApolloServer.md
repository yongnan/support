# Apollo Server

## Resolver

### [The resolver function signature](https://www.apollographql.com/docs/tutorial/resolvers/#the-resolver-function-signature)

Before we start writing resolvers, let's cover what a resolver function's signature looks like. Resolver functions can optionally accept four positional arguments:

```js
fieldName: (parent, args, context, info) => data;
```

Copy

| ARGUMENT  | DESCRIPTION                                                  |
| --------- | ------------------------------------------------------------ |
| `parent`  | This is the return value of the resolver for this field's parent (the resolver for a parent field always executes *before* the resolvers for that field's children). |
| `args`    | This object contains all [GraphQL arguments](https://graphql.org/graphql-js/passing-arguments/) provided for this field. |
| `context` | This object is shared across all resolvers that execute for a particular operation. Use this to share per-operation state, such as authentication information and access to data sources. |
| `info`    | This contains information about the execution state of the operation (used only in advanced cases). |

Of these four arguments, the resolvers we define will mostly use `context`. It

![Screen Shot 2022-04-08 at 3.02.04 PM](/Users/yongnan/Library/Application Support/typora-user-images/Screen Shot 2022-04-08 at 3.02.04 PM.png)