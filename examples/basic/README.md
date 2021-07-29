# Basic example

This example demonstrates the use of a standalone script to generate static CSS
outputs, a strategy that may be useful when you aren't using a bundler or don't
need the bundler to handle your CSS. You will also notice that the build script
produces a CSS file per module/component: This pattern may add value to a
component library by allowing client apps to ship only the CSS they are actually
using.

## Try it

> :memo: **Note**: Producing a runnable app is beyond the scope of this example.
  The build script will only produce outputs in the `css` subdirectory. See the
  other examples for more of a "live demo" experience.

```bash
npm install
npm run build
ls css
```
