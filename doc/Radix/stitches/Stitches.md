# Stitches

```bash
# With npm
npm install @stitches/react


# With yarn
yarn add @stitches/react
```

Import `styled` from `@stitches/react`.

```js
import { styled } from '@stitches/react';
```

## [Use it](https://stitches.dev/docs/installation#use-it)

Use the `styled` function to create a component and add styles to it.

```jsx
import { styled } from '@stitches/react';

const Button = styled('button', {
  backgroundColor: 'gainsboro',
  borderRadius: '9999px',
  fontSize: '13px',
  padding: '10px 15px',
  '&:hover': {
    backgroundColor: 'lightgray',
  },
});
```

## [Render it](https://stitches.dev/docs/installation#render-it)

Finally, render the component.

Button

```jsx
import { styled } from '@stitches/react';

const Button = styled('button', {...});
() => <Button>Button</Button>;
```

## [Available functions](https://stitches.dev/docs/installation#available-functions)

Aside from `styled`, these are the other functions available:

```jsx
import {
  styled,
  css,
  globalCss,
  keyframes,
  theme,
  createTheme,
  getCssText,
} from '@stitches/react';
```

Refer to the [API page](https://stitches.dev/docs/api) to learn more about each of them.

## [Global styles](https://stitches.dev/docs/styling#global-styles)

For handling things like global resets, you can write global CSS styles. The `globalCss` function will return another function, which you must call in your app.

```jsx
const globalStyles = globalCss({
  '*': { margin: 0, padding: 0 },
});

() => {
  globalStyles();
  return <div ... />
};
```

## [Base styles](https://stitches.dev/docs/styling#base-styles)

Button

```jsx
const Button = styled('button', {
  backgroundColor: 'gainsboro',
  borderRadius: '9999px',
  fontSize: '13px',
  border: '0',
});

() => <Button>Button</Button>;
```

# API

The nuts and bolts of Stitches' API.

## [styled](https://stitches.dev/docs/api#styled)

A function to create a component including its styles and variants. It receives:

- `element` or `component`: a HTML element (`div`) or a React Component (`Component`)
- `styles`: as many `styleObject` as you need

```jsx
const Button = styled('button', {
  // base styles

  variants: {
    variant: {
      primary: {
        // primary styles
      },
      secondary: {
        // secondary styles
      },
    },
  },
});

// Use it
<Button>Button</Button>
<Button variant="primary">Primary button</Button>
```

## [css](https://stitches.dev/docs/api#css)

A function to generate class names from a style object. It receives as many `styleObject` as you need.

```jsx
const button = css({
  // base styles

  variants: {
    variant: {
      primary: {
        // primary styles
      },
      secondary: {
        // secondary styles
      },
    },
  },
});

// Use it
<div className={button()}>Button</div>
<div className={button({ variant: 'primary' })}>Primary button</div>
```

## [globalCss](https://stitches.dev/docs/api#globalcss)

For handling things like global resets, you can write global CSS styles.

```jsx
const globalStyles = globalCss({
  body: { margin: 0 },
});

() => {
  globalStyles();
  return <div />;
};
```

## [keyframes](https://stitches.dev/docs/api#keyframes)

A function to create a global CSS `@keyframe` rule.

```jsx
const scaleUp = keyframes({
  '0%': { transform: 'scale(1)' },
  '100%': { transform: 'scale(1.5)' },
});

const Button = styled('button', {
  '&:hover': {
    animation: `${scaleUp} 200ms`,
  },
});
```

## [getCssText](https://stitches.dev/docs/api#getcsstext)

A function to generate styles on the [server-side](https://stitches.dev/docs/server-side-rendering).

```jsx
<style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
```

## [defaultThemeMap](https://stitches.dev/docs/api#defaultthememap)

You can import `defaultThemeMap` if you want to merge with the [default mapping](https://github.com/modulz/stitches/blob/canary/packages/core/src/default/defaultThemeMap.js).

```jsx
import { createStitches, defaultThemeMap } from '@stitches/react';

createStitches({
  themeMap: {
    ...defaultThemeMap,
    width: 'space',
    height: 'space',
  },
});
```

## [createStitches](https://stitches.dev/docs/api#createstitches)

This function is used to configure Stitches. You can use this function if you need to add default theme tokens, custom utilities, media queries, etc.

```js
import { createStitches } from '@stitches/react';

createStitches({
  theme: object,
  media: object,
  utils: object,
  prefix: string,
  themeMap: object,
});
```

The `createStitches` function returns the following:

- `styled`: a function to create React components with styles.
- `css`: a function to create CSS rules.
- `globalCss`: a function to create global styles.
- `keyframes`: a function to create keyframes.
- `theme`: a function for accessing default theme data.
- `createTheme`: a function for creating additional themes.
- `getCssText`: a function get styles as a string, useful for SSR.
- `config`: an object containing the hydrated config.

```js
const {
  styled,
  css,
  globalCss,
  keyframes,
  theme,
  createTheme,
  getCssText,
  config,
} = createStitches();
```

### [theme](https://stitches.dev/docs/api#theme)

Set up your design [theme tokens](https://stitches.dev/docs/tokens). You can then use them in the style object.

```jsx
createStitches({
  theme: {
    colors: {},
    space: {},
    fontSizes: {},
    fonts: {},
    fontWeights: {},
    lineHeights: {},
    letterSpacings: {},
    sizes: {},
    borderWidths: {},
    borderStyles: {},
    radii: {},
    shadows: {},
    zIndices: {},
    transitions: {},
  },
});
```

### [media](https://stitches.dev/docs/api#media)

Set up reusable [breakpoints](https://stitches.dev/docs/breakpoints).

```jsx
createStitches({
  media: {
    bp1: '(min-width: 640px)',
    bp2: '(min-width: 768px)',
    bp3: '(min-width: 1024px)',
  },
});
```

The `media` config supports [range](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries#syntax_improvements_in_level_4) queries by default:

```jsx
createStitches({
  media: {
    toBp2: '(width <= 768px)',
  },
});
```

### [utils](https://stitches.dev/docs/api#utils)

Set up custom [utils](https://stitches.dev/docs/utils) to improve your developer experience.

```jsx
createStitches({
  utils: {
    // A property for applying width/height together
    size: (value) => ({
      width: value,
      height: value,
    }),

    // A property to apply linear gradient
    linearGradient: (value) => ({
      backgroundImage: `linear-gradient(${value})`,
    }),

    // An abbreviated property for background-color
    bg: (value) => ({
      backgroundColor: value,
    }),
  },
});
```

### [prefix](https://stitches.dev/docs/api#prefix)

Prefix all class names and CSS variables to avoid global clashes.

```jsx
createStitches({
  prefix: 'radix',
});
```

### [themeMap](https://stitches.dev/docs/api#thememap)

Define custom mapping of CSS properties to theme tokens.

```jsx
createStitches({
  themeMap: {
    // Map these properties to the `space` scale
    width: 'space',
    height: 'space',
  },
});
```

Here's a list of the [default mapping](https://github.com/modulz/stitches/blob/canary/packages/core/src/default/defaultThemeMap.js).

Note: this overrides the default mapping. Import [defaultThemeMap](https://stitches.dev/docs/api#defaultthememap) to merge with default.

## [theme](https://stitches.dev/docs/api#theme-1)

An object containing default theme data.

```jsx
const { theme } = createStitches({
  theme: {
    colors: {
      background: 'white',
      foreground: 'black',
    },
  },
});
```

You can use the returned theme object to apply the default theme class, this is specially useful when using multiple themes:

```jsx
<div className={theme}>Content here</div>
```

You can use the returned theme objects to read the tokens, like so:

```diff
// default theme

+ theme.colors.foreground.value; // black
+ theme.colors.foreground.token; // foreground
+ theme.colors.foreground.scale; // colors
+ theme.colors.foreground.variable; // --colors-foreground
+ theme.colors.foreground.computedValue; // var(--colors-foreground)
```

## [createTheme](https://stitches.dev/docs/api#createtheme)

A function to override the default `theme` passed into the `createStitches` function. It receives a theme object.

```jsx
export const darkTheme = createTheme({
  colors: {
    background: 'black',
    foreground: 'white',
  },
});
```

You can define the theme class to used by passing it as the first argument:

```jsx
export const darkTheme = createTheme('dark-theme', {...});
```

You can use the returned theme object to apply the default theme class:

```jsx
<div className={darkTheme}>{children}</div>
```

You can use the returned theme objects to read the tokens, like so:

```diff
// dark theme

+ dark.colors.foreground.value; // white
+ dark.colors.foreground.token; // foreground
+ dark.colors.foreground.scale; // colors
+ dark.colors.foreground.variable; // --colors-foreground
+ dark.colors.foreground.computedValue; // var(--colors-foreground)
```

## [Style object](https://stitches.dev/docs/api#style-object)

CSS but written as a JavaScript object.

```jsx
{

  color: 'red',
  backgroundColor: 'red',
  fontSize: '13px',
    
  '&:hover': {
    color: 'black'
  },

  '&.chained': {
    color: 'black'
  },

  '& .descendant': {
    color: 'black'
  },

  '@media (min-width: 400px)': {
    fontSize: '16px'
  }
}
```

## [Locally scoped tokens](https://stitches.dev/docs/api#locally-scoped-tokens)

You can create a token directly within a style object by prefixing it with two dollar signs (`$$`).

```jsx
const Button = styled('button', {
  $$shadowColor: 'red',
  boxShadow: '0 0 0 15px $$shadowColor',
});
```

## [Scale-prefixed tokens](https://stitches.dev/docs/api#scale-prefixed-tokens)

You can pick a token from any of your available [theme](https://stitches.dev/docs/tokens) scales by prefixing them with the scale name.

```jsx
const Button = styled('button', {
  // apply a color token to a locally scoped token
  $$shadowColor: '$colors$purple500',
  boxShadow: '0 0 0 15px $$shadowColor'

  // use a token from the sizes scale
  marginTop: '$sizes$1'
})
```

## [As Prop](https://stitches.dev/docs/api#as-prop)

All components created via the `styled` function support a polymorphic `as` prop. This prop is useful for changing the rendering element of a component. You can also use the `as` prop to render another component.

[GitHub](https://github.com/modulz/stitches)

```jsx
const Button = styled('button', {
  // base styles
});

() => (
  <Button as="a" href="https://github.com/modulz/stitches">
    GitHub
  </Button>
);
```

If you're using TypeScript the attributes will change based on the element type provided.