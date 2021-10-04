# demitasse

## Table of contents

### Type aliases

- [CSS](#css)
- [Length](#length)
- [Rules](#rules)
- [Time](#time)

### Functions

- [css](#css)
- [toClassNames](#toclassnames)
- [toString](#tostring)

## Type aliases

### CSS

Ƭ **CSS**<`R`\>: `Object`

A group of style rules

**`typeparam`** Style rules

#### Type parameters

| Name |
| :------ |
| `R` |

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `_debug` | `boolean` | Debug flag  **`internal`** |
| `_groupName` | `string` | A unique namespace for the rules  **`internal`** |
| `_rules` | `R` | Style rules  **`internal`** |

#### Defined in

[index.d.ts:40](https://github.com/nsaunders/demitasse/blob/5bf1b6e/index.d.ts#L40)

___

### Length

Ƭ **Length**: `string` \| `number`

A length value

**`remarks`** Unitless values default to pixels

#### Defined in

[index.d.ts:8](https://github.com/nsaunders/demitasse/blob/5bf1b6e/index.d.ts#L8)

___

### Rules

Ƭ **Rules**: `Properties`<[`Length`](#length), [`Time`](#time)\> & `Partial`<`Object`\>

A style rule or map of style rules.

**`remarks`** Style rules support nested selectors, where `&` must be used within
the selector and are replaced with the parent selector.

#### Defined in

[index.d.ts:23](https://github.com/nsaunders/demitasse/blob/5bf1b6e/index.d.ts#L23)

___

### Time

Ƭ **Time**: `string` \| `number`

A time value

**`remarks`** Unitless values default to milliseconds

#### Defined in

[index.d.ts:15](https://github.com/nsaunders/demitasse/blob/5bf1b6e/index.d.ts#L15)

## Functions

### css

▸ **css**<`R`\>(`groupName`, `rules`, `options?`): [`CSS`](#css)<`R`\>

Creates CSS rules.

**`remarks`** Style rules support nested selectors, where `&` must be used within
the selector and are replaced with the parent selector.

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `R` | extends [`Rules`](#rules) \| `Record`<`string`, [`Rules`](#rules)\> | A style rule or record of style rules |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `groupName` | `string` | A unique namespace used to generate class names |
| `rules` | `R` | A style rule or record of style rules |
| `options?` | `Object` | Additional options |
| `options.debug?` | `boolean` | When `true`, group names and record keys are presented in the generated class names. |

#### Returns

[`CSS`](#css)<`R`\>

CSS that is convertible to class names via [toClassNames](#toclassnames) or
a style sheet via [toString](#tostring).

#### Defined in

[index.d.ts:77](https://github.com/nsaunders/demitasse/blob/5bf1b6e/index.d.ts#L77)

___

### toClassNames

▸ **toClassNames**<`S`\>(`css`): `S` extends [`CSS`](#css)<infer R\> ? `UnionToIntersection`<`R` extends `Record`<infer K, [`Rules`](#rules)\> ? `K` extends \`${infer \_}&${infer \_}\` ? `string` : `Record`<`K`, `string`\> : `string`\> : `string`

Converts [CSS](#css) to a class name or map thereof.

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `S` | extends [`CSS`](#css)<[`Rules`](#rules) \| `Record`<`string`, [`Rules`](#rules)\>\> | The subtype of CSS value, used to determine whether the return type is a string or a map |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `css` | `S` | The CSS value to convert to class names |

#### Returns

`S` extends [`CSS`](#css)<infer R\> ? `UnionToIntersection`<`R` extends `Record`<infer K, [`Rules`](#rules)\> ? `K` extends \`${infer \_}&${infer \_}\` ? `string` : `Record`<`K`, `string`\> : `string`\> : `string`

- A class name or map of class names depending on the `css` argument

#### Defined in

[index.d.ts:89](https://github.com/nsaunders/demitasse/blob/5bf1b6e/index.d.ts#L89)

___

### toString

▸ **toString**<`R`\>(`css`): `string`

Converts [CSS](#css) to a style sheet.

**`remarks`** This is recommended for use at build time to generate a static CSS
style sheet that must be shipped alongside the JavaScript bundle.

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `css` | [`CSS`](#css)<`R`\> | The CSS value from which to generate the style sheet |

#### Returns

`string`

The generated style sheet

#### Defined in

[index.d.ts:101](https://github.com/nsaunders/demitasse/blob/5bf1b6e/index.d.ts#L101)
