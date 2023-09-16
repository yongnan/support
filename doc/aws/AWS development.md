AWS development

# app

`package.json`

```
"private": "true",
"workspaces": [
    "packages/infra",
    "packages/backend",
    "packages/frontend"
  ],
```



# Backend

```
yarn add @aws-sdk/client-dynamodb @aws-sdk/util-dynamodb
```

```
yarn add -D @types/aws-lambda @types/node @typescript-eslint/eslint-plugin @typescript-eslint/parser esbuild eslint typescript
```

### init tsconfig

```
node_modules/.bin/tsc --init
```

or create `tsconfig.json`:

```
{
  "compilerOptions": {
    "target": "ES2018",
    "module": "ES6",
    "moduleResolution": "node",
    "esModuleInterop": true
  },
  "include": ["src/**/*.ts"]
}
```

### eslint

`.eslintrc.json`

```
{
  "env": {
    "es2021": true,
    "node": true
  },
  "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint"],
  "rules": {}
}
```



#cdk

https://docs.aws.amazon.com/cdk/index.html

```
yarn add @types/node aws-cdk typescript

yarn add -D aws-cdk-lib constructs

```

