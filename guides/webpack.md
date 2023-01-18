# ☕ Webpack

Demitasse's API is essentially a pure function that provides type-safe bindings to a style sheet. The style sheet is not automatically added to the document for you; instead, static CSS can be extracted at build time using Webpack. This short guide describes the required configuration.

> **Note**
> We'll start with a basic configuration and upgrade to a more scalable [advanced configuration](#advanced-configuration) later in the guide.

## Basic configuration

### First CSS module

To start, let's add some CSS to an existing `App` component.

```typescript
// src/components/App.ts

import { cssBindings } from "demitasse";

export const css = `
  .app-container {
    background: pink;
  }
` as const;

const { classes } = cssBindings(css);

// Now we have access to a type-checked `classes.appContainer` reference in our component HTML. 👍
```

### CSS entry point

Now we'll create an entry point module for CSS. This will import the CSS from each component in the application.

```typescript
// src/css.ts
import "./components/App?css";
```

Next, we need to import the CSS at the main entry point of the application.

```typescript
// src/main.ts
import "./css";
```

### Loader configuration

Now we'll need to configure a [Webpack rule](https://webpack.js.org/configuration/module/#modulerules) that leverages a few simple [loaders](https://webpack.js.org/loaders).

#### TypeScript

The first step is to configure Webpack to support TypeScript as usual. [This guide](https://webpack.js.org/guides/typescript/) can help if you aren't sure where to start. After you have a working TypeScript setup, continue to the next step.

#### Install additional loaders

```bash
npm install -D execute-module-loader css-loader style-loader
```

#### New Webpack rule

At this point, you should have an existing rule that applies to `.ts` (and/or `.tsx`) extensions. If not, review the [TypeScript](#typescript) section above.

Add a new rule _above_ the existing TypeScript rule:

```javascript
// webpack.config.js
{
  test: /\.ts$/, // or /\.tsx$/
  resourceQuery: /css/,
  use: [
    "style-loader",
    "css-loader",
    "execute-module-loader?export=css",
  ],
},
```

The loader chain continues from the previous TypeScript rule according to Webpack's [right-to-left loader order](https://webpack.js.org/configuration/module/#ruleuse), whenever the `resourceQuery` is matched (i.e. a `?css` query string is appended to the import path):
1. [`execute-module-loader`](http://github.com/nsaunders/execute-module-loader) receives transpiled JavaScript code, executes the module, and outputs the value of the `css` export.
2. [`css-loader`](https://github.com/webpack-contrib/css-loader) resolves `@import` and `url()` as needed. (Note that these will be resolved relative to the source TypeScript module.)
3. [`style-loader`](https://github.com/webpack-contrib/style-loader) adds the CSS to the DOM.

## Advanced configuration
