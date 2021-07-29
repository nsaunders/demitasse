# ☕ demitasse
**Zero-runtime CSS in TypeScript**

Demitasse offers the developer experience of CSS-in-JS without the typical
runtime cost or configuration burden of other CSS-in-JS approaches.

💅 Author style rules in TypeScript with type-checking via [csstype](https://github.com/frenic/csstype).

👬 Colocate styles and markup in the same TypeScript module…or don't.

⚒️  Extract static CSS at build time.

📦 Locally-scoped class names

🔎 Transparent and uncomplicated build configuration

## API

### `css`

The `css` function forms the basis of the entire API.

#### Parameter

This function accepts either:
* an object defining a single "anonymous"
  [ruleset](https://developer.mozilla.org/en-US/docs/Web/CSS/Syntax#css_rulesets);
  or
* a record of objects, each of which defines a
  [ruleset](https://developer.mozilla.org/en-US/docs/Web/CSS/Syntax#css_rulesets).

#### Return

In the former case, the `css` function returns a generated class name, which you
can then attach to the corresponding HTML element to apply the ruleset.

In the latter case, the `css` function returns a record of generated class
names. Essentially, this return value maps human-readable ruleset aliases to
the generated class names that are used at runtime.
