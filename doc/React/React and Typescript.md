# React and Typescript

# setup a project

## create project 

1. Via: create-create-app

```bash
 npx create-react-app typescript-react-starter --template typescript
```

2. Define tsconfig.json

   ```
   // for React v17 no more: import React...
   {
     "jsx": "react-jsx", //  "react" is deprecated
   }
   ```

3. install eslintrc.js

   ```
   npm init @eslint/config
   ```

   ✔ How would you like to use ESLint? · **problems**
   ✔ What type of modules does your project use? · **esm**
   ✔ Which framework does your project use? · **react**
   ✔ Does your project use TypeScript? · No / **Yes**
   ✔ Where does your code run? · **browser**
   ✔ What format do you want your config file to be in? · **JavaScript**

4. define .prettierrc
   * 若要整合到 ESLint 需留意和 TypeScript 可能的衝突，可參考[這篇](https://www.sitepoint.com/react-with-typescript-best-practices/)的設定。

## ESLint config

> 參考設定：[create-exposed-app](https://github.com/iamturns/create-exposed-app/blob/master/.eslintrc.js)：eslint-config-airbnb-typescript 的參考設定。

- `React Error : is declared but its value is never read`：參考 [Introducing the New JSX Transform](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#eslint)，升級到 react v17 後，不需要 `import React` 的 ESLint 設定