# demitasse

## Table of contents

### Type aliases

- [CSS](#css)
- [Length](#length)
- [Rule](#rule)
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

[index.d.ts:45](https://github.com/nsaunders/demitasse/blob/b9a077f/index.d.ts#L45)

___

### Length

Ƭ **Length**: `string` \| `number`

A length value

**`remarks`** Unitless values default to pixels

#### Defined in

[index.d.ts:8](https://github.com/nsaunders/demitasse/blob/b9a077f/index.d.ts#L8)

___

### Rule

Ƭ **Rule**: `Properties`<[`Length`](#length), [`Time`](#time)\> & `Partial`<`Object`\>

A style rule

**`remarks`** Style rules support nested selectors, where `&` must be used within
the selector and are replaced with the parent selector.

#### Defined in

[index.d.ts:23](https://github.com/nsaunders/demitasse/blob/b9a077f/index.d.ts#L23)

___

### Rules

Ƭ **Rules**: [`Rule`](#rule) \| `Record`<`string`, [`Rule`](#rule)\>

A style rule or record of style rules

#### Defined in

[index.d.ts:29](https://github.com/nsaunders/demitasse/blob/b9a077f/index.d.ts#L29)

___

### Time

Ƭ **Time**: `string` \| `number`

A time value

**`remarks`** Unitless values default to milliseconds

#### Defined in

[index.d.ts:15](https://github.com/nsaunders/demitasse/blob/b9a077f/index.d.ts#L15)

## Functions

### css

▸ **css**<`R`\>(`groupName`, `rules`, `options?`): [`CSS`](#css)<`R`\>

Creates CSS rules.

**`remarks`** Style rules support nested selectors, where `&` must be used within
the selector and are replaced with the parent selector.

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `R` | extends [`Rules`](#rules) | A style rule or record of style rules |

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

[index.d.ts:82](https://github.com/nsaunders/demitasse/blob/b9a077f/index.d.ts#L82)

___

### toClassNames

▸ **toClassNames**<`R`\>(`css`): `UnionToIntersection`<`R` extends `Record`<infer K, [`Rule`](#rule)\> ? `K` extends \`${infer \_}&${infer \_}\` ? `string` : `Record`<`K`, `string`\> : `string`\>

Converts [CSS](#css) to a class name or record of style names.

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `R` | extends [`Rules`](#rules) | A style rule or record of style rules |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `css` | [`CSS`](#css)<`R`\> | The CSS to convert to class names |

#### Returns

`UnionToIntersection`<`R` extends `Record`<infer K, [`Rule`](#rule)\> ? `K` extends \`${infer \_}&${infer \_}\` ? `string` : `Record`<`K`, `string`\> : `string`\>

- A class name or record of class names depending on the `css` argument

#### Defined in

[index.d.ts:93](https://github.com/nsaunders/demitasse/blob/b9a077f/index.d.ts#L93)

___

### toString

▸ **toString**<`T`\>(`css`): `T` extends `Record`<infer K, [`CSS`](#css)<`unknown`\> \| [`CSS`](#css)<`unknown`\>[]\> ? `Record`<`K`, `string`\> : `string`

Converts [CSS](#css) to a style sheet.

**`remarks`** This is recommended for use at build time to generate a static style
sheet.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`CSS`](#css)<[`Rules`](#rules)\> \| [`CSS`](#css)<[`Rules`](#rules)\>[] \| `Record`<`string`, [`CSS`](#css)<[`Rules`](#rules)\> \| [`CSS`](#css)<[`Rules`](#rules)\>[]\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `css` | `T` | The CSS value from which to generate the style sheet |

#### Returns

`T` extends `Record`<infer K, [`CSS`](#css)<`unknown`\> \| [`CSS`](#css)<`unknown`\>[]\> ? `Record`<`K`, `string`\> : `string`

The generated style sheet

#### Defined in

[index.d.ts:105](https://github.com/nsaunders/demitasse/blob/b9a077f/index.d.ts#L105)
