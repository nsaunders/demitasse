# webpack example

This example project demonstrates how to configure
[webpack](https://webpack.js.org) to produce a static CSS file.

## Libraries used
1. [ts-node](https://github.com/TypeStrong/ts-node) offers a convenient way to
   run TypeScript modules in a Node.js environment.
2. [val-loader](https://webpack.js.org/loaders/val-loader) offers a way to
   generate a module dynamically, i.e. to use a Node.js script to produce the
   contents of a module.
3. [postcss-loader](https://webpack.js.org/loaders/postcss-loader)
   integrates [PostCSS](https://postcss.org) processing with webpack. A common
   use case is
   [adding vendor prefixes](https://github.com/postcss/autoprefixer)
   automatically without adding noise to your code.
4. [css-loader](https://webpack.js.org/loaders/css-loader) converts plain CSS
   string content into the module format required by
   [mini-css-extract-plugin](https://webpack.js.org/plugins/mini-css-extract-plugin)
   (used in this project) or
   [style-loader](https://webpack.js.org/loaders/style-loader) (not used here).
5. [mini-css-extract-plugin](https://webpack.js.org/plugins/mini-css-extract-plugin)
   extracts the output of
   [css-loader](https://webpack.js.org/loaders/css-loader) into a static CSS
   file separate from the main JavaScript bundle.
6. [webpack-virtual-modules](http://github.com/sysgears/webpack-virtual-modules)
   offers a way to create virtual modules that don't exist in the physical file
   system.

Note that, of these, val-loader is likely the only library that is strictly
required for demitasse's CSS extraction. Beyond that, you can choose whatever
mix of tools best suits your use case and personal preferences.


## How it works

The [`./src/styles.ts`](./src/styles.ts) module exports the style rules used
throughout the app. Essentially, it functions as an index of style rules.

A [val-loader](https://webpack.js.org/loaders/val-loader)-compatible Node.js
script uses the style rule index to generate static CSS. This script exists as
a virtual module [`./src/styles.css`](./webpack.config.js#L43-L121) because its
source seems most relevant in the context of webpack configuration, but it could
just as easily inhabit its own physical module.

The generated CSS output is then passed on to
[postcss-loader](https://webpack.js.org/loaders/postcss-loader),
[css-loader](https://webpack.js.org/loaders/css-loader), and finally
[mini-css-extract-plugin](https://webpack.js.org/plugins/mini-css-extract-plugin)
to be emitted in the form of a static CSS file.

## Try it

**First, install dependencies:**
```bash
npm install
```

**To run the dev server:**
```bash
npm run dev
```

**To create a production build:**
```bash
npm run build
ls dist
```
