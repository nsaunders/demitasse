# ☕ Optimizations

We recommend build-time CSS extraction, i.e. configuring your build tool to output a static `.css` file. Minifying this CSS output is a well-solved problem; for example, if you use Webpack, you might be interested in [this guide](https://webpack.js.org/plugins/mini-css-extract-plugin/#minimizing-for-production). However, Demitasse's `cssBindings` function still depends on the source CSS at runtime in order to parse its class names and IDs. At a small scale, this is unlikely to affect performance noticeably; but for most applications you will likely want to save as many bytes as possible. To help, we offer two options for minimizing the source CSS code and thus reducing the size of the JavaScript bundle.

### `babel-plugin-template-css-minifier`

The first option [babel-plugin-template-css-minifier](https://github.com/nsaunders/babel-plugin-template-css-minifier) simply minifies the contents of a template literal tagged with a leading `/* css */` comment. For example:

**Before**
```typescript
export const css = /* css */`
  #foo {
    width: 100%;
  }
  
  .bar {
    height: 100%;
  }
` as const;
```

**After**
```typescript
export const css = /* css */`#foo{width:100%;}.bar{height:100%;}` as const;
```

You may be interested in this option if you want the `css` export to remain a valid CSS string for some reason.

### `babel-plugin-template-css-demitasse`

A more aggressive option is [babel-plugin-template-css-demitasse](https://github.com/nsaunders/demitasse/tree/master/packages/babel-plugin-template-css-demitasse). This removes most of the CSS code from a template literal tagged with a leading `/* css */ ` comment, leaving behind only what is useful to Demitasse's `cssBindings` function. For example:

**Before**
```typescript
export const css = /* css */`
  #foo {
    width: 100%;
  }
  
  .bar {
    height: 100%;
  }
` as const;
```

**After**
```typescript
export const css = /* css */"/*extracted*/ #foo .bar";
```

## Babel

As their names suggest, both optimizations leverage [Babel](https://babeljs.io) and are demonstrated throughout our various [examples](../../examples).
