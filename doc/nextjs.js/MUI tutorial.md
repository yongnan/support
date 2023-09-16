# MUI tutorial

tutorial link:

https://www.youtube.com/watch?v=IFaFFmPYyMI

```
git clone https://github.com/leoroese/nextjs-materialui-v5-tutorial.git
```

```
git checkout starter
```

add `.eslintrc.json`

```
{
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    },
    "project": "./tsconfig.json"
  },
  "extends": ["next/core-web-vitals", "plugin:@typescript-eslint/recommended", "prettier"],
 ; "settings": {
    "version": "detect"
  }
}
```

```
yarn add @emotion/react
yarn add -D @emotion/eslint-plugin
yarn add -D @emotion/babel-plugin
yarn add @emotion/styled
yarn add @mui/material @mui/icons-material @emotion/server
yarn add @mui/system
```





update `.eslintrc.json`

```
// add under ... "extends"
  "plugins": ["@emotion"],
  "rules": {
    "@emotion/jsx-import": "error",
    "@emotion/no-vanilla": "error",
    "@emotion/import-from-emotion": "error",
    "@emotion/styled-import": "error"
  },
// before "settings" ...
```

create  `.babelrc`

```
{
	"presets": ["next/babel"],
	"plugins": []
}
```

## .babelrc

*`"emotion"` must be the **first plugin** in your babel config `plugins` list.*

```json
{
  "plugins": ["@emotion"]
}
```

#### upgrade next js 10 pragma and pragmaFrag cannot be set when runtime is automatic.

https://github.com/vercel/next.js/discussions/18440

React 17 introduced a new version of JSX which has two runtime options "classic" and "automatic".
The old JSX transform turned JSX into `React.createElement(...)` calls, which has some disadvantages like for example require..

Add this to your files as a fix for now:

```
/** @jsxRuntime classic */
/** [@jsx](https://github.com/jsx) jsx */
import { jsx } from '@emotion/core'

```

`Components/EmotionButton.tsx`

```tsx
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from '@emotion/react'
import {FC} from 'react'

const buttonStyle = css({
    padding: '32px',
    backgroundColor: 'hotpink',
    fontSize: '24px',
    borderRadius: '4px',
    '&:hover': {
        color: 'white',
    },
})

const EmotionButton: FC = () => {
    return (
        <div
            css={buttonStyle}
        >
            Hover to change color
        </div>
    )
}

export default EmotionButton
```

add `StyledEmotionButton.tsx`

```tsx
import styled from '@emotion/styled'
import {FC} from 'react'

interface IButtonProps { 
    backgroundColor: string;
}

const StyledButton = styled.button<IButtonProps>`
    padding: 32px;
    background-color: ${(props) => props.backgroundColor};
    font-size: '24px';
    border-radius: '4px';
    color: black;
    font-weight: bold;
    &:hover {
        color: white;
    },
`

const StyledEmotionButton: FC = () => {
    return (
        <StyledButton backgroundColor='green'>
            This is my button component.
        </StyledButton>
    )
}

export default StyledEmotionButton
```

create `lib/createEmotionCache.tsx`

```tsx
import createCache from "@emotion/cache";

const createEmotionCache = () => {
    return createCache({ key: 'css' })
}

export default createEmotionCache
```

Create `page/_document.tsx`

```tsx
import * as React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import theme from '../../styles/theme';
import createEmotionCache from '../lib/createEmotionCache';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />

          <link rel="shortcut icon" href="/static/favicon.ico" />
          {/* google Roboto font */}
          {/* <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          /> */}

          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />  
          {/* Inject MUI styles first to match with the prepend: true configuration. */}
          {(this.props as any).emotionStyleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  const originalRenderPage = ctx.renderPage;

  // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);
  // This is important. It prevents emotion to render invalid HTML.
  // See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    styles: [
      React.Children.toArray(initialProps.styles),
      emotionStyleTags,
    ]  
  };
};

```

update `page/_app.tsx`

```tsx
import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
 import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '../lib/createEmotionCache'
import { ThemeProvider } from '@mui/material';
import theme from '../../styles/theme'
import CssBaseline from '@mui/material/CssBaseline';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const App = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const AnyComponent = Component as any;
  
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AnyComponent {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;

```

