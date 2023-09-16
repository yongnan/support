

# Typescript

## Installation[](https://create-react-app.dev/docs/adding-typescript/#installation)

To start a new Create React App project with [TypeScript](https://www.typescriptlang.org/), you can run:

```
yarn create react-app my-app --template typescript
```

To add [TypeScript](https://www.typescriptlang.org/) to an existing Create React App project, first install it:

```
yarn add typescript @types/node @types/react @types/react-dom @types/jest

yarn add -D @mui-treasury/layout
yarn add -D @mui-treasury/types
```



## 1. Create `.d.ts` file

You can create a `.d.ts` file by passing **`-d`** to compiler arguments or adding **`declaration: true`** in your `tsconfig.json`.

## 2. Add definitions to `package.json`

Add field named `typings` to your `project.json`, e.g. **`"typings": "./index.d.ts"`** (`./index.d.ts` is actually the default value if `typings` is omitted).

## Alias path

```json
// tsconfig.json
"compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@components/*": ["components/*"],
      "@lib/*": ["lib/*"],
      "@data/*": ["data/*"]
    },
...    
```

expamle usage

```tsx

import Button from '@components/Button'
import sss from '@lib/...'
import ddd from '@data/...'
```



If you want to take a component class as a parameter (vs an instance), use `React.ComponentClass`:

```js
function renderGreeting(Elem: React.ComponentClass<any>) {
    return <span>Hello, <Elem />!</span>;
}
```

