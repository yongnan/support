# React

## Installation[](https://create-react-app.dev/docs/adding-typescript/#installation)

To start a new Create React App project with [TypeScript](https://www.typescriptlang.org/), you can run:

```sh
npx create-react-app my-app --template typescript
```

or

```sh
yarn create react-app my-app --template typescript
```

> If you've previously installed `create-react-app` globally via `npm install -g create-react-app`, we recommend you uninstall the package using `npm uninstall -g create-react-app` or `yarn global remove create-react-app` to ensure that `npx` always uses the latest version.
>
> Global installs of `create-react-app` are no longer supported.

To add [TypeScript](https://www.typescriptlang.org/) to an existing Create React App project, first install it:

```sh
npm install --save typescript @types/node @types/react @types/react-dom @types/jest
```

or

```sh
yarn add typescript @types/node @types/react @types/react-dom @types/jest
```

Next, rename any file to be a TypeScript file (e.g. `src/index.js` to `src/index.tsx`) and **restart your development server**!

Type errors will show up in the same console as the build one. You'll have to fix these type errors before you continue development or build your project. For advanced configuration, [see here](https://create-react-app.dev/docs/advanced-configuration).

create `/tsconfig`.json

```
{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": [
    "src", "**/*.ts", "**/*.tsx"
  ]
}
```

