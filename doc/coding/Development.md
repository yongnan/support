# Development

# Installation

## Create a Next project

```
yarn create next-app --typescript
```

`tsconfig.json`, add:

```
{
  "compilerOptions": {
    "target": "es5",
    "baseUrl": ".",
    "paths": {
      "@components/*": [ "components/*" ],
      "@lib/*": [ "lib/*" ],
      "@data/*": [ "data/*" ]
    },

```

## styling system : stitch

```
yarn add @stitches/react
yarn add @radix-ui/colors
```

### radix-ui

`package.json`, add:

```
    "@radix-ui/react-accessible-icon": "0.1.4",
    "@radix-ui/react-accordion": "^0.1.6",
    "@radix-ui/react-alert-dialog": "^0.1.7",
    "@radix-ui/react-aspect-ratio": "^0.1.4",
    "@radix-ui/react-avatar": "^0.1.4",
    "@radix-ui/react-checkbox": "^0.1.5",
    "@radix-ui/react-context-menu": "^0.1.6",
    "@radix-ui/react-dialog": "^0.1.7",
    "@radix-ui/react-dropdown-menu": "^0.1.6",
    "@radix-ui/react-hover-card": "^0.1.5",
    "@radix-ui/react-icons": "^1.1.1",
    "@radix-ui/react-id": "^0.1.5",
    "@radix-ui/react-menu": "^0.1.6",
    "@radix-ui/react-navigation-menu": "^0.1.2",
    "@radix-ui/react-popover": "^0.1.6",
    "@radix-ui/react-portal": "^0.1.4",
    "@radix-ui/react-progress": "^0.1.4",
    "@radix-ui/react-radio-group": "^0.1.5",
    "@radix-ui/react-scroll-area": "^0.1.4",
    "@radix-ui/react-select": "^0.1.1",
    "@radix-ui/react-separator": "^0.1.4",
    "@radix-ui/react-slider": "^0.1.4",
    "@radix-ui/react-switch": "^0.1.5",
    "@radix-ui/react-tabs": "^0.1.5",
    "@radix-ui/react-toast": "^0.1.1",
    "@radix-ui/react-toggle": "^0.1.4",
    "@radix-ui/react-toggle-group": "^0.1.5",
    "@radix-ui/react-toolbar": "^0.1.5",
    "@radix-ui/react-tooltip": "^0.1.7",
    "@radix-ui/react-use-layout-effect": "^0.1.0",
```



### next-themes

```
yarn add next-themes
```

### eslint

```
yarn add -D eslint-plugin-react-hooks
```

### next-auth

```
yarn add next-auth
```



# Config

## eslint

`.eslintrc.json`

```
{
  "rules": {
    "react/display-name": "off",
    "react-hooks/rules-of-hooks": "off", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn" // Checks effect dependencies
	}
}

```

# Auth

Adopt **next-auth** with **yandex**

yandex OAUTH

http://auth.yandex.com

### create a client

#### Permission:

* Yandex ID API
  * Access to username, first name and surname, gender
  * Access to email address
  * Access to date of birth
  * Access to user avatar
* Yandex.Disk REST API
  * Writing in any place on Yandex.Disk
  * Read all of Yandex.Disk
  * Access to information about Yandex.Disk
  * Access to app folder in Yandex.Disk

Callback:

​	http://localhost:3000/api/auth/callback/yandex

Copy:

	* id
	* password

into .env.local

```
YANDEX_CLIENT_ID=[------]
YANDEX_CLIENT_SECRET=[------]
```



# Image

`next.conf.js`

```
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['downloader.disk.yandex.ru'],
  },
}
```

`[path].tsx`

```
import { Image } from '@components/design-system/Image'
...
<Image src={o.preview} alt="NextImage" />
```

