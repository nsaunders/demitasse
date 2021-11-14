# ☕ demitasse <a href="https://github.com/nsaunders/demitasse/actions/workflows/verify.yml"><img src="https://shields.io/github/workflow/status/nsaunders/demitasse/verify" alt="Build status"></a> <a href="https://www.npmjs.com/package/demitasse"><img src="https://img.shields.io/npm/v/demitasse.svg" alt="Latest Release"></a> <a href="https://github.com/nsaunders/demitasse/blob/master/LICENSE"><img src="https://img.shields.io/github/license/nsaunders/demitasse.svg" alt="License"></a>

**Zero-runtime CSS-in-TypeScript**

Demitasse offers the developer experience of CSS-in-TypeScript (CSS-in-JS)
without the typical runtime cost or configuration burden of other approaches.

💅 Author style rules in TypeScript with type-checking via
   [csstype](https://github.com/frenic/csstype).

👬 Colocate styles and markup in the same TypeScript module…or don't.

⚒️  Extract static CSS at build time.

📦 Locally-scoped class names

🔎 Transparent and uncomplicated build configuration

## Installation
```bash
npm install demitasse
```

## How to use

### Step 1: Imports

```typescript
import { demi, cssExport } from "demitasse";
import { ComponentBase, css as baseCSS } from "./component-base"; // optional
```

* The `demi` function is used to define CSS rules. It outputs a record of CSS
  class names (or just a single class name) along with the CSS model (a data
  structure from which a style sheet will be generated).
* The `cssExport` function is used to export the aforementioned CSS models.
* The `css as baseCSS` import will be used to re-export the CSS model exported
  from another module. This is required when the current module has some CSS
  dependency, e.g. when leveraging a base component.

> ℹ️  In the example above, we imported a variable called `css` from the upstream
> module. This follows a suggested convention of exporting CSS models as `css`.

### Step 2: Create a CSS module ID and options

```typescript
const
  cssModuleId = "fancy-button",
  cssOptions = { debug: !!process.env.DEBUG_CSS }; // optional
```

* The `cssModuleId` serves dual purposes:
  * When generating style sheets, the name of the style sheet is the module ID,
    e.g. `fancy-button.css`.
  * When the `debug` option is enabled, generated class names will include the
    module ID to allow CSS rules to be identified more easily.
* The `options` object supports a single `debug` option. This option expands the
  generated class names, which usually look something like `a4eds5a`, into more
  recognizable names like `fancy-button-a4eds5a-container`.

### Step 3: Create style rules

```typescript
const [fancyButtonCSS, styles] = /*#__PURE__*/ demi(cssModuleId, {
  appearance: "none",
  font: "inherit",
  border: 0,
  padding: "4px 8px 4px 8px",
  background: "#06f",
  color: "#fff",
  "&:hover": {
    animationKeyframes: {
      "0%, 100%": {
        transform: "none",
      },
      "50%": {
        transform: "scale(1.1)",
      }
    },
    animationDuration: 1000,
    animationIterationCount: "infinite"
  }
}, cssOptions);
```

* The `fancyButtonCSS` variable references the CSS model that will be exported
  later in order to generate the style sheet.
* The `styles` variable references the generated class name.

> ℹ️  This example shows a single rule, which is why `styles` would reference a
> single generated class name string. It is also possible to specify a record of
> rules, in which case `styles` would return a record of generated class names.

### Step 4: Use generated class names

This library is framework-agnostic; but suppose you are building a simple React
component `FancyButton` on the basis of some other component `ContainerBase`.
Here is how you would use the `styles` object from the previous step:

```typescript
export const FancyButton: FC<...> = ({ children, ...props }) => (
  <ContainerBase as="button" className={styles} {...props}>
    {children}
  </ContainerBase>
);
```

### Step 5: Export CSS models

```typescript
export const css = /*#__PURE__*/ cssExport(cssModuleId, [
  ...baseCSS,
  ...fancyButtonCSS,
]);
```

* The `cssExport` function prepares the CSS models to allow the corresponding
  style sheet outputs to be produced.
* The `cssModuleId` is provided again to distinguish re-exports.
  * Within style sheet output, re-exported CSS is sorted to the top based on the
    number of times it is used. This helps to ensure that base styles can be
    overridden by component-specific styles as expected.
  * Re-exported CSS is also included in a `_common` style sheet to prevent
    duplication across dependent components' style sheets.
* The CSS models are spread into a single array. For simpler use cases without
  CSS dependencies, this is unnecessary: You can simplify this to something like
  `cssExport(cssModuleId, fancyButtonCSS)`.

> ℹ️  This example follows a suggested convention of naming CSS exports as `css`.

### Step 6: Create style sheet module

e.g. **`src/styles.ts`**:
```typescript
import { css as fancyButton } from "./fancy-button";
import { css as textBox } from "./text-box";
// ...
import { sheets } from "demitasse";

export default sheets([
  ...fancyButton,
  ...textBox,
]);
```

* CSS models are imported from each component module.
* The `sheets` function is used to produce static CSS style sheet outputs.
* The style sheets are exported as a record, with each key corresponding to a
  module name, and values as generated CSS code.

> ℹ️  It is unnecessary to include any modules that client code wouldn't depend
> on directly. For example, you shouldn't include the CSS for a `ContainerBase`
> component intended only for internal use because it will automatically be
> included in the dependent module's CSS output and/or `_common.css`, and it
> doesn't warrant its own `container-base.css` file.

### Step 7: Generate style sheet outputs

The module shown in Step 6 now exports a record object in the following format:

```json
{
  "_common": "/* CSS shared across multiple modules/components */",
  "fancy-button": "/* CSS from the fancy-button module/component */",
  "text-box": "/* CSS from the text-box module/component */"
}
```

The remaining task is to extend the existing build process for your app or
component library to include writing the CSS code in this object to CSS files
and/or adding it to the JavaScript bundle. Strictly speaking, this is beyond the
scope of this library, but some [examples](#examples) are provided to help you
get started.

## CSS Features

#### ✅ Single rule
```typescript
const [css, styles] = /*#__PURE__*/ demi(cssModuleId, {
  color: "black"
});
```

#### ✅ Multi rule
```typescript
const [css, styles] = /*#__PURE__*/ demi(cssModuleId, {
  container: {
    appearance: "none",
    padding: 0
  },
  content: {
    padding: 4
  }
});
```

#### ✅ Nested selectors
```typescript
const [css, styles] = /*#__PURE__*/ demi(cssModuleId, {
  color: "black",
  "&:hover": {
    color: "red"
  }
});
```

#### ✅ Animation keyframes
```typescript
const [css, styles] = /*#__PURE__*/ demi(cssModuleId, {
  animationKeyframes: {
    "0%, 100%": {
      opacity: 0
    },
    "50%": {
      opacity: 1
    }
  },
  animationDuration: 1000,
  animationIterationCount: "infinite"
});
```

#### ✅ At-rules
```typescript
const [css, styles] = /*#__PURE__*/ demi(cssModuleId, {
  "@supports (display: grid)": {
    display: "grid"
  }
});
```

#### ✅ Implicit units
```typescript
const [css, styles] = /*#__PURE__*/ demi(cssModuleId, {
  transitionDuration: 1000, // 1000ms
  width: 100, // 100px
});
```

#### 👍 Theming support

via [custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
```typescript
const [css, styles] = /*#__PURE__*/ demi(cssModuleId, {
  color: "var(--primary-color)",
});
```

#### 🤷 Dynamic CSS

For dynamic CSS, probably just use inline styles in addition to style sheets and
class names. Inline styles are usually criticized because:

* **performance concerns**. But this is not likely a significant factor for
  these one-off edge cases.
* **specificity (priority)**. But for dynamic CSS values determined at runtime,
  high specificity is almost certainly what you want, i.e. feature not bug.
* **maintainability**. But if you believe that CSS and markup shouldn't be
  colocated, then CSS-in-JS is probably not the architecture you are looking
  for. Go [Get BEM](http://getbem.com) or something. 😉

## API

Formal API documentation is available [here](./docs).

## Examples

A few examples are provided [here](examples).
