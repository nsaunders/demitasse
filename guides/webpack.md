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
` as const; // Note the const assertion.

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

At this point, we have achieved:
* type-safe CSS bindings;
* build-time extraction of static CSS; and
* the ability to colocate CSS and related markup.

However, our solution depends on manual scoping, e.g. using a class name `app-container` instead of just `container`. With a few additional steps, scoping can be automated so that a namespace doesn't need to be repeated throughout a given module.

### Loader configuration

#### Install additional loader

```bash
npm install -D prefix-loader
```

#### Updated Webpack rule

```javascript
  use: [
    "style-loader",
    "css-loader",
    "prefix-loader", // [2]
    "execute-module-loader?module", // [1]
  ],
```

1. We have replaced `execute-module-loader`'s `export` option with the `module` option. Thus, rather than only the `css` export, the loader will output the stringified JSON content of the entire module, providing additional context to `prefix-loader`.
2. [`prefix-loader`](https://github.com/nsaunders/prefix-loader) reads the `moduleId` and `css` fields from the JSON content and outputs scoped CSS using the `moduleId` as a prefix for each class name, ID, and animation name appearing within the provided `css` string.

### Custom `cssBindings`

At this point, the `cssBindings` function is no longer providing accurate class names or IDs. Where the build process emits a scoped name, e.g. `button___label`, the `cssBindings` function still reports the original name, e.g. `label`. We need to update this simplistic behavior of `cssBindings` to reflect the new reality of scoped class names and IDs. To achieve this, let's create a custom implementation:

```typescript
// src/cssBindings.ts
import { makeCSSBindings } from "demitasse";
export default makeCSSBindings( // [1]
  (name, { context }) => `${context}___${name}`, // [2]
);
```

1. The `makeCSSBindings` "factory" function returns a `cssBindings` function that applies a user-defined mapping to each class name and ID.
2. The mapping function describes how class names and IDs are transformed in the build process (e.g. by `prefix-loader`).

### Component updates

```typescript
// src/components/App.ts

import cssBindings from "../cssBindings"; // [1]

export const moduleId = "app"; // [2]

export const css = `
  .container {
    background: pink;
  }
` as const;

const { classes } = cssBindings(css, moduleId); // [3]

// Now we have access to a type-checked `classes.container` reference in our component HTML. 👍 [4]
```

1. Instead of importing `cssBindings` directly from Demitasse, we import the [custom version](#custom-cssbindings) created earlier.
2. `prefix-loader` will prepend the `moduleId` to each class name, ID, and animation name that appears within the style sheet.
3. `moduleId` is passed as a second `context` argument to `cssBindings`. Review the [custom `cssBindings` implementation](#custom-cssbindings) to see how we used `context`.
4. Note that the namespace can be dropped from the class name and ID maps; e.g. we can just reference `classes.container` and our mapping function will provide the scoped name `"app___container"`.
