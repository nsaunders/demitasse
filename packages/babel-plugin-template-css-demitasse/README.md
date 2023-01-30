# ☕ Demitasse Babel Plugin <a href="https://github.com/nsaunders/demitasse/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/nsaunders/demitasse/ci.yml?branch=master" alt="Build status"></a> <a href="https://www.npmjs.com/package/babel-plugin-template-css-demitasse"><img src="https://img.shields.io/npm/v/babel-plugin-template-css-demitasse.svg" alt="Latest Release"></a> <a href="https://github.com/nsaunders/demitasse/blob/master/LICENSE"><img src="https://img.shields.io/github/license/nsaunders/demitasse.svg" alt="License"></a>

This [Babel](http://babeljs.io) plugin converts CSS code embedded within a [template literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) to a compact format that [Demitasse](https://github.com/nsaunders/demitasse) can use to produce CSS bindings. Simply tag the template literal with a leading `/* css */` comment to activate the plugin.

Use this plugin in your production build to remove unused CSS code (e.g. large declaration blocks) since Demitasse only needs the class names and IDs to produce CSS bindings.

> **Note**
> This is an aggressive optimization and assumes you are following our recommended approach of build-time CSS extraction. For more information, see our [guides](../../docs/guides) and [examples](../../examples).

## Example

**Input**
```javascript
const css = /*css*/`
  .container {
    height: 100%;
  }

  #header_nav {
    width: 100%;
  }
`;
```
**Output**
```javascript
const css = /*css*/`/*extracted*/ .container #header_nav`;
```

## Configuration

The plugin doesn't require any configuration in itself. Your `.babelrc` file can be as simple as this:

**.babelrc**
```json
{ "plugins": ["babel-plugin-template-css-demitasse"] }
```

Due to Babel's [first-to-last plugin ordering](https://babeljs.io/docs/en/plugins/#plugin-ordering), this plugin should be placed at or near the beginning of the list of plugins so that it runs before template literals are transformed by another plugin.

## See also

For a less aggressive optimization, see [babel-plugin-template-css-minifier](https://github.com/nsaunders/babel-plugin-template-css-minifier). This plugin simply minifies the CSS, otherwise leaving declaration blocks, media queries, and other CSS statements intact. This may be useful in some scenarios, such as:

1. Needing a `css` export to remain useful at runtime for some purpose other than generating CSS bindings
2. Adding component CSS to the document explicitly at runtime
