# ☕ Demitasse <a href="https://github.com/nsaunders/demitasse/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/nsaunders/demitasse/ci.yml?branch=master" alt="Build status"></a> <a href="https://www.npmjs.com/package/demitasse"><img src="https://img.shields.io/npm/v/demitasse.svg" alt="Latest Release"></a> <a href="https://github.com/nsaunders/demitasse/blob/master/LICENSE"><img src="https://img.shields.io/github/license/nsaunders/demitasse.svg" alt="License"></a>

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

#### Step 1: Import `cssBindings`

```typescript
// src/components/App.tsx

import { cssBindings } from "demitasse";
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

const { classes, ids } = cssBindings(css);
```

`cssBindings(css)` returns a typed record e.g. `{ classes: { spinnerLarge: string }, ids: { title: string } }`, providing type-safe access to the class names and IDs referenced in the style sheet.

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

`src/css.ts` directly exports the CSS from the `App` module, but this wouldn't be suitable for large-scale component architecture given the lack of namespacing. For example, two components could each declare their own `.container` classes, resulting in a conflict.

To solve this problem, we need to implement a scoping mechanism. The solution proposed here will use [PostCSS](https://postcss.org) with the [prefixer](https://github.com/marceloucker/postcss-prefixer) and [prefix-keyframe](https://github.com/VitaliyR/postcss-prefix-keyframe) plugins to achieve this.

> **Note**
> The following steps continue from [Basic usage](#basic-usage) above.

#### Step 7: Add a context

```typescript
// src/components/App.tsx

export const moduleId = "app";
```

#### Step 8: Scope the CSS

```typescript
// src/css.ts

import postcss from "postcss";
import prefixer from "postcss-prefixer";
import prefixKeyframe from "postcss-prefix-keyframe";

import * as App from "./components/App";

export default [
  App,
]
  .map(({ moduleId, css }) =>
    postcss([
      prefixer({ prefix: `${moduleId}___` }),
      prefixKeyframe({ prefix: `${moduleId}___` }),
    ])
    .process(css)
  )
  .join("\n\n");
```

Thus, each module's classes, IDs, and animation names (if applicable) are prepended with its `moduleId` value.

#### Step 9. Map the bindings

At this point, the values returned from `cssBindings` are incorrect. For example, `cssBindings(css).classes.spinnerLarge` will evaluate to `"spinner-large"` instead of the prefixed form `"app___spinner-large"`. We can solve this by creating a custom `cssBindings` function with the required mapping:

```typescript
// src/cssBindings.ts

import { makeCSSBindings } from "demitasse";
export default makeCSSBindings(
  (identifier, { context }) => `${context}___${identifier}`,
);
```

#### Step 10. Change `cssBindings` import

```typescript
// src/components/App.tsx

import cssBindings from "../cssBindings";
```

#### Step 11. Add context argument (`moduleId`)

```typescript
// src/components/App.tsx

const { classes, ids } = cssBindings(css, moduleId);
```

Now `classes.spinnerLarge` evaluates to `"app___spinner-large"`, matching the PostCSS output.

## API

API documentation is available [here](./docs).

## Examples

Examples are provided [here](examples).
