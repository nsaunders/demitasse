# ☕ demitasse
**Zero-runtime CSS in TypeScript**

Demitasse offers the developer experience of CSS-in-JS without the typical
runtime cost or configuration burden of other CSS-in-JS approaches.

💅 Author style rules in TypeScript with type-checking via
   [csstype](https://github.com/frenic/csstype).

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
* a record defining multiple rulesets.

#### Return

In the former case, the `css` function returns a generated class name, which you
can then attach to the corresponding HTML element to apply the ruleset.

In the latter case, the `css` function returns a record of generated class
names. Essentially, this return value maps human-readable ruleset aliases to
the generated class names that are used at runtime.

#### Examples

##### Single Ruleset
```typescript
import { css } from "demitasse";

export const styles = /*#__PURE__*/ css({
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
import { FC } from "react";

export const styles = /*#__PURE__*/ css({
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

export const IconButton: FC<{ icon: ReactNode }> = ({ icon, children }) => (
  <button className={styles.container}>
    <div className={styles.icon}>{icon}</div>
    <div className={styles.label}>{children}</div>
  </button>
);
```
