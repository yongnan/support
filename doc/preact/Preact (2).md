# Preact

# Setup

## No Build tools

```jsx
<script type="module">
  import { h, Component, render } from 'https://unpkg.com/preact?module';

  // Create your app
  const app = h('h1', null, 'Hello World!');

  render(app, document.body);
</script>
```

`HTM` style:

```jsx
<script type="module">
//  import { h, Component, render } from 'https://unpkg.com/preact?module';
//  import htm from 'https://unpkg.com/htm?module';
// or
  import { html, render } from 'https://unpkg.com/htm/preact/index.mjs?module'

  // Initialize htm with Preact
  const html = htm.bind(h);

  function App (props) {
    return html`<h1>Hello ${props.name}!</h1>`;
  }

  render(html`<${App} name="World" />`, document.body);
</script>
```

##  Preact CLI

### Usage

```
$ npx preact-cli create <template-name> <project-name>
```

Example:

```
$ npx preact-cli create default my-project
```