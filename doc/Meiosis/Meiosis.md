# Meiosis



  <script src="https://unpkg.com/mithril/mithril.js"></script>
  <script src="https://unpkg.com/mergerino"></script>
  <script src="https://unpkg.com/mithril/stream/stream.js"></script>

`meiosis-setup` is a helper library that sets up the Meiosis pattern for you.

## JavaScript version - Table of Contents

- [Installation](https://meiosis.js.org/docs/setup-js-installation.html)
- [Patches](https://meiosis.js.org/docs/setup-js-patches.html)
- [Initial State](https://meiosis.js.org/docs/setup-js-initial-state.html)
- [View Library](https://meiosis.js.org/docs/setup-js-view-library.html)
- [Services](https://meiosis.js.org/docs/setup-js-services.html)
- [Nested Components](https://meiosis.js.org/docs/setup-js-nested-components.html)
- [Stream Implementation](https://meiosis.js.org/docs/setup-js-stream-implementation.html)
- [Utilities](https://meiosis.js.org/docs/setup-js-utilities.html)

The [TypeScript version](https://meiosis.js.org/docs/setup-ts-toc.html) is also available.

------

[Meiosis](https://meiosis.js.org/) is developed by foxdonut ([Twitter](https://twitter.com/foxdonut00) / [GitHub](https://github.com/foxdonut)) and is released under the MIT license.

## Installation

You can install `meiosis-setup`:

- Using npm, or,
- Using an HTML `<script>` tag.

### Using npm

Install `meiosis-setup` with `npm`:

```
npm i meiosis-setup
```

Then you can import it and use it with this code:

```js
import { meiosisSetup } from 'meiosis-setup';

const cells = meiosisSetup();
```

### Using an HTML `<script>` tag

Load `meiosis-setup` by adding a `<script>` tag to your HTML page:

```html
<script src="https://unpkg.com/meiosis-setup/meiosis-setup.js"></script>
```

Or load the minimized version:

```html
<script src="https://unpkg.com/meiosis-setup/meiosis-setup.min.js"></script>
```

Then use the `Meiosis` global variable:

```js
const cells = Meiosis.setup();
```

In both cases, the setup gives you a stream of cells as explained in the [Meiosis documentation](https://meiosis.js.org/docs/06-cells.html).

