# ☕ demitasse <a href="https://github.com/nsaunders/demitasse/actions/workflows/verify.yml"><img src="https://shields.io/github/workflow/status/nsaunders/demitasse/verify" alt="Build status"></a> <a href="https://www.npmjs.com/package/demitasse"><img src="https://img.shields.io/npm/v/demitasse.svg" alt="Latest Release"></a> <a href="https://github.com/nsaunders/demitasse/blob/master/LICENSE"><img src="https://img.shields.io/github/license/nsaunders/demitasse.svg" alt="License"></a>

**Zero-runtime CSS-in-TypeScript**

Demitasse offers the developer experience of CSS-in-TypeScript (CSS-in-JS)
without the typical runtime cost or configuration burden of other approaches.

💅 Author style rules in TypeScript with type-checking via
   [csstype](https://github.com/frenic/csstype).

👬 Colocate styles and markup in the same TypeScript module…or don't.

⚒️ Extract static CSS at build time.

📦 Locally-scoped class names

🔎 Transparent and uncomplicated build configuration

## Installation
```bash
npm install demitasse
```

## Default API

The default API is perhaps best understood as the "runtime" API, although it
produces no CSS and essentially functions only as an index of the CSS rulesets
generated at build time. (For more, see [Extraction API](#extraction-api).).

### `css`

The `css` function constitutes the entire API.

#### Parameters

##### `groupName`

The name specified here, e.g. `link-btn`, will be prepended to each class
name, e.g. `link-btn-3azf08l-content`. This identifier provides an easier
debugging experience and avoids side effects that might otherwise result from
duplicative style rules.

##### `styles`

Style rules are specified here in JavaScript object form. As with similar
libraries, CSS property names are written in camel-case, e.g.
`backgroundColor`. Vendor-prefixed property names are written in Pascal case,
e.g. `WebkitAppearance`.

A special `animationKeyframes` property can be used to create a `@keyframes`
rule automatically in the context in which it is used. This replaces the
`animationName` property, which can still be used if you would like to
reference a `@keyframes` rule defined elsewhere.

Nested rulesets are also supported. Nested selectors can use `&` to reference
the parent class name, e.g. `&:hover` or `& + &`.


Finally, this object may define either one or multiple (a record of) style
rules, which determines the return type as described below.

#### Return

A different value is returned depending on whether the `css` function is called
with a single or multiple style rules.

In the former case, the function returns a generated class name, which you
can then attach to the corresponding HTML element to apply the rule.

In the latter case, the function returns a record of generated class names
corresponding to the provided style rules.

#### Examples

##### Single Ruleset
```typescript
import { css } from "demitasse";

export const styles = /*#__PURE__*/ css("link", {
  color: "#00f",
  "&:hover": {
    color: "#06f"
  },
  "&:active": {
    color: "#f30",
  },
});

export function styleLinks() {
  document.querySelectorAll("a").forEach(anchor => {
    anchor.className = styles;
  });
}
```

##### Multiple Rulesets
```typescript
import { css } from "demitasse";
import { FC, ReactNode } from "react";

export const styles = /*#__PURE__*/ css("button", {
  container: {
    display: "inline-flex",
  },
  icon: {
    marginRight: 8,
  },
  label: {
    flex: 1,
  },
});

export const Button: FC<{ icon: ReactNode }> = ({ icon, children }) => (
  <button className={styles.container}>
    <div className={styles.icon}>{icon}</div>
    <div className={styles.label}>{children}</div>
  </button>
);
```

## Extraction API

Rather than prescribing specific bundlers, transpilers, plugins, or other build
tools, the extraction API provides a small utility that will help you to build
your own CSS extraction mechanism on the basis of other tools. This allows you
to reuse knowledge, to avoid surprises, and to integrate CSS extraction into
your existing build process smoothly.

Extracting CSS involves redirecting [default `css` function](#default-api) calls
to the corresponding function in the extraction API. For example, a vanilla
NodeJS build script might look something like this:

```typescript
require("demitasse").css = require("demitasse/extract").css;
require("ts-node").register({ transpileOnly: true, compilerOptions: { module: "commonjs" } });
const output = require("./src/style-index.ts");
// TODO: Write CSS output to a file, pipe it to PostCSS, or whatever!
```

There's no magic here: The `require("demitasse/extract").css` function has the
same signature as its [default counterpart](#default-api); but, instead of
returning generated class names, it returns the corresponding CSS code that you
can then deliver to the browser by whatever means are appropriate for your use
case.

## Examples

A few examples are provided [here](examples).
