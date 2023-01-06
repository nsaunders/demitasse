# ☕ Demitasse <a href="https://github.com/nsaunders/demitasse/actions/workflows/verify.yml"><img src="https://img.shields.io/github/actions/workflow/status/nsaunders/demitasse/verify.yml?branch=master" alt="Build status"></a> <a href="https://www.npmjs.com/package/demitasse"><img src="https://img.shields.io/npm/v/demitasse.svg" alt="Latest Release"></a> <a href="https://github.com/nsaunders/demitasse/blob/master/LICENSE"><img src="https://img.shields.io/github/license/nsaunders/demitasse.svg" alt="License"></a>

**CSS Modules in TypeScript…the _simple_ way**

Demitasse offers a component development experience comparable to Typed CSS Modules or CSS-in-TypeScript (CSS-in-JS) without the typical runtime cost or unwieldy configuration of those approaches.

💅 Author style rules within TypeScript.

👬 Colocate styles and markup in the same module.

⚒️  Extract static CSS at build time.

📦 Locally-scoped class names

🔎 Transparent and uncomplicated build configuration

👼 Pure computation / no side effects

## Installation
```bash
npm install demitasse
```

## How to use

> **Note**
> For illustrative purposes, the steps below show usage with React and Webpack, but the library is framework-agnostic and not tied to these specific technologies.

### Basic usage

#### Step 1: Import `getCSSBindings`

```typescript
// src/components/App.tsx

import { getCSSBindings } from "demitasse";
```

#### Step 2: Export CSS

```typescript
// src/components/App.tsx

export const css = `
  #title {
    margin: 0;
    font-size: 2rem;
  }
  
  .spinner-large {
    animation: spin 1s linear infinite;
    width: 72px;
    height: 72px;
  }
` as const;
```

> **Warning**
> Don't forget the `as const` assertion at the end. This allows the class names and IDs to be parsed.

#### Step 3: Get CSS bindings

```typescript
// src/components/App.tsx

const { classes, ids } = getCSSBindings(css);
```

`getCSSBindings(css)` returns a typed record e.g. `{ classes: { spinnerLarge: string }, ids: { title: string } }`, providing type-safe access to the class names and IDs referenced in the style sheet.

#### Step 4: Use CSS bindings

```typescript
// src/components/App.tsx

export default function App() {
  return (
    <>
      <h1 id={ids.title}>Hello world</h1>
      <Spinner className={classes.spinnerLarge} />
    </>
  );
}
```

#### Step 5: Create style sheet module

```typescript
// src/css.ts

import * as App from "./components/App";
export default App.css;
```

#### Step 6: Generate style sheet output

The remaining task is to extend your existing build process to process the CSS exported from the `src/css.ts` module. Strictly speaking, this is beyond the scope of this library, but we offer various [examples](#examples) of how to achieve this.

### Advanced usage

The following steps continue from [Basic usage](#basic-usage) above.

#### Step 7: Add a context

```typescript
// src/components/App.tsx

export const cssContext = "app";
```

#### Step 8: Scope the CSS

`src/css.ts` directly exports the CSS from the `App` module, but this wouldn't be suitable for large-scale component architecture given the lack of namespacing. We can resolve this using [PostCSS](https://postcss.org):

```typescript
// src/css.ts

import postcss from "postcss";
import prefixer from "postcss-prefixer";
import prefixKeyframe from "postcss-prefix-keyframe";

import * as App from "./components/App";

export default [
  App,
]
  .map(({ cssContext, css }) =>
    postcss([
      prefixer({ prefix: `${cssContext}___` }),
      prefixKeyframe({ prefix: `${cssContext}___` }),
    ])
    .process(css)
  )
  .join("\n\n");
```

Thus, each module's classes, IDs, and keyframe animation names (if applicable) are prepended with its `cssContext` value.

#### Step 9. Map the bindings

At this point, the values returned from `getCSSBindings` are incorrect. For example, `getCSSBindings(css).classes.spinnerLarge` will evaluate to `"spinner-large"` instead of the prefixed form `"app___spinner-large"`. We can solve this by creating a custom `getCSSBindings` function:

```typescript
// src/getCSSBindings.ts

import { makeGetCSSBindings } from "demitasse";
export default makeGetCSSBindings(
  (identifier, { context }) => `${context}___${identifier}`,
);
```

#### Step 10. Change `getCSSBindings` import

```typescript
// src/components/App.tsx

import getCSSBindings from "../getCSSBindings";
```

#### Step 11. Add context argument

```typescript
const { classes, ids } = getCSSBindings(css, cssContext);
```

## CSS Features

#### ✅ Single rule
```typescript
const [_css, styles] = /*#__PURE__*/ cssRules(cssModuleId, {
  color: "black"
});
```

#### ✅ Multi rule
```typescript
const [_css, styles] = /*#__PURE__*/ cssRules(cssModuleId, {
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
const [_css, styles] = /*#__PURE__*/ cssRules(cssModuleId, {
  color: "black",
  "&:hover": {
    color: "red"
  }
});
```

#### ✅ Animation keyframes
```typescript
const [_css, styles] = /*#__PURE__*/ cssRules(cssModuleId, {
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
const [_css, styles] = /*#__PURE__*/ cssRules(cssModuleId, {
  "@supports (display: grid)": {
    display: "grid"
  }
});
```

#### ✅ Implicit units
```typescript
const [_css, styles] = /*#__PURE__*/ cssRules(cssModuleId, {
  transitionDuration: 1000, // 1000ms
  width: 100, // 100px
});
```

#### 👍 Theming support

via [custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
```typescript
const [_css, styles] = /*#__PURE__*/ cssRules(cssModuleId, {
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
