# Stitches



[Install Stitches](https://stitches.dev/docs/installation#install-stitches)

Install Stitches from your terminal via npm or yarn.

```bash
# With npm

npm install @stitches/react



# With yarn

yarn add @stitches/react
```

[Import it](https://stitches.dev/docs/installation#import-it)

Import `styled` from `@stitches/react`.

```js
import { styled } from '@stitches/react';
```

[Use it](https://stitches.dev/docs/installation#use-it)

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