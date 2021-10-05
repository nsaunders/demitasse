# Basic example

This example demonstrates the use of a standalone script to generate static CSS
outputs, a strategy that may be useful when you aren't using a bundler or don't
need the bundler to handle your CSS. You will also notice that the build script
produces a CSS file per module/component: This pattern may be useful for a
component library because it allows clients to selectively include CSS to reduce
bundle size.

## Try it

> :memo: **Note**: Producing a runnable app is beyond the scope of this example.
  The build script will only produce outputs in the `css` subdirectory. See the
  other examples for more of a "live demo" experience.

```bash
npm install
npm run build
ls css
```
