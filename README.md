# ☕ Demitasse <a href="https://github.com/nsaunders/demitasse/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/nsaunders/demitasse/ci.yml?branch=master" alt="Build status"></a> <a href="https://www.npmjs.com/package/demitasse"><img src="https://img.shields.io/npm/v/demitasse.svg" alt="Latest Release"></a> <a href="https://github.com/nsaunders/demitasse/blob/master/LICENSE"><img src="https://img.shields.io/github/license/nsaunders/demitasse.svg" alt="License"></a>

<table>
<tr>
<td>

**CSS Modules in TypeScript…the _simple_ way**

Demitasse offers a component development experience comparable to Typed CSS Modules or CSS-in-TypeScript (CSS-in-JS) without the typical runtime cost or unwieldy configuration of those approaches.

💅 Author style rules within TypeScript.

👬 Colocate styles and markup in the same module.

⚒️  Extract static CSS at build time.

📦 Locally-scoped class names

🔎 Transparent and uncomplicated build configuration

👼 Pure computation / no side effects

</td>
<td>

<img src="https://user-images.githubusercontent.com/2517229/213875430-b7065a2d-98eb-4d0f-a30c-a71a10130fb5.gif" alt="Live code demo" width="400" height="400" />

</td>
</tr>
</table>

## Installation
```bash
npm install demitasse
```

## API

#### `cssBindings`

```typescript
cssBindings:
  (css: string) => {
    classes: Record<ClassRef extends string, string>;
    ids: Record<IdRef extends string, string>;
  }
```

Given a style sheet, returns a map of class names and IDs. For use with dot notation, keys are converted to camel-case; e.g. `button-label` is converted to `buttonLabel`. The values correspond to the names that appear in the `css`.

#### `makeCSSBindings`

```typescript
makeCSSBindings:
  <Context>(mapFn: (name: string, meta: { type: "class" | "id", context: Context }) => string) =>
    (css: string, context: Context) => {
      classes: Record<ClassRef extends string, string>;
      ids: Record<IdRef extends string, string>;
    }
```

Given a mapping function `mapFn`, returns a function similar to [`cssBindings`](#cssbindings), except with one additional `context` parameter. The `context` argument is forwarded to `mapFn` and can be used e.g. to add a prefix to the class name or ID.

### Generated docs

Generated API documentation is available [here](./docs).

## Additional resources

* [Examples](./examples)
* [Guides](./guides)
