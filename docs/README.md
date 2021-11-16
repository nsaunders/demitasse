# demitasse

## Table of contents

### Type aliases

- [CSS](#css)
- [Length](#length)
- [Options](#options)
- [Rule](#rule)
- [Rules](#rules)
- [Time](#time)

### Functions

- [cssExport](#cssexport)
- [cssRules](#cssrules)
- [demi](#demi)
- [sheets](#sheets)

## Type aliases

### CSS

Ƭ **CSS**<`S`\>: `A.Type`<[`string`, [`Rules`](#rules), [`Options`](#options)], `S`\>

A structure created [cssRules](#cssrules) that contains CSS rules

**`typeparam`** Identifies whether the CSS has been exported, useful for
determining to which style sheet generated CSS should be written

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends ``"NotExported"`` \| ``"Exported"`` |

#### Defined in

[index.d.ts:45](https://github.com/nsaunders/demitasse/blob/b362831/index.d.ts#L45)

___

### Length

Ƭ **Length**: `string` \| `number`

A length value

**`remarks`** Unitless values default to pixels

#### Defined in

[index.d.ts:9](https://github.com/nsaunders/demitasse/blob/b362831/index.d.ts#L9)

___

### Options

Ƭ **Options**: `Object`

Options for creating CSS via [cssRules](#cssrules)

**`property`** debug - Debug mode flag; when enabled, class names are
significantly longer but can be used to identify CSS rules more easily.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `debug?` | `boolean` |

#### Defined in

[index.d.ts:35](https://github.com/nsaunders/demitasse/blob/b362831/index.d.ts#L35)

___

### Rule

Ƭ **Rule**: `Properties`<[`Length`](#length), [`Time`](#time)\> & `Partial`<`Object`\>

The type of a rule

#### Defined in

[index.d.ts:21](https://github.com/nsaunders/demitasse/blob/b362831/index.d.ts#L21)

___

### Rules

Ƭ **Rules**: [`Rule`](#rule) \| `Record`<`string`, [`Rule`](#rule)\>

The type of either a rule or a record of rules

#### Defined in

[index.d.ts:27](https://github.com/nsaunders/demitasse/blob/b362831/index.d.ts#L27)

___

### Time

Ƭ **Time**: `string` \| `number`

A time value

**`remarks`** Unitless values default to milliseconds

#### Defined in

[index.d.ts:16](https://github.com/nsaunders/demitasse/blob/b362831/index.d.ts#L16)

## Functions

### cssExport

▸ **cssExport**<`I`\>(`moduleId`, `rules`): [`CSS`](#css)<``"Exported"``\>[]

Prepares CSS rules for conversion into style sheets.

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `I` | extends `string` | CSS module identifier |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `moduleId` | `I` extends ``"_common"`` ? `never` : `I` | CSS module identifier |
| `rules` | [`CSS`](#css)<``"NotExported"`` \| ``"Exported"``\>[] | The CSS that should be included in this module (including dependencies) |

#### Returns

[`CSS`](#css)<``"Exported"``\>[]

CSS that is ready to convert into style sheets

#### Defined in

[index.d.ts:98](https://github.com/nsaunders/demitasse/blob/b362831/index.d.ts#L98)

___

### cssRules

▸ **cssRules**<`I`, `R`\>(`moduleId`, `rules`, `options?`): [[`CSS`](#css)<``"NotExported"``\>[], `A.Compute`<`U.IntersectOf`<`R` extends `Record`<infer K, [`Rule`](#rule)\> ? `K` extends \`${infer \_}&${infer \_}\` ? `string` : `K` extends \`@${infer \_}\` ? `string` : `Record`<`K`, `string`\> : `string`\>\>]

Constructs CSS rules.

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `I` | extends `string` | CSS module identifier |
| `R` | extends [`Rules`](#rules) | Rule structure |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `moduleId` | `I` extends ``"_common"`` ? `never` : `I` | CSS module identifier |
| `rules` | `R` | CSS rules |
| `options?` | [`Options`](#options) | Additional options |

#### Returns

[[`CSS`](#css)<``"NotExported"``\>[], `A.Compute`<`U.IntersectOf`<`R` extends `Record`<infer K, [`Rule`](#rule)\> ? `K` extends \`${infer \_}&${infer \_}\` ? `string` : `K` extends \`@${infer \_}\` ? `string` : `Record`<`K`, `string`\> : `string`\>\>]

A tuple/pair containing the CSS and a generated class name (or
record thereof, when multiple rules are defined)

#### Defined in

[index.d.ts:63](https://github.com/nsaunders/demitasse/blob/b362831/index.d.ts#L63)

___

### demi

▸ `Const` **demi**<`I`, `R`\>(`moduleId`, `rules`, `options?`): [[`CSS`](#css)<``"NotExported"``\>[], `A.Compute`<`U.IntersectOf`<`R` extends `Record`<infer K, [`Rule`](#rule)\> ? `K` extends \`${infer \_}&${infer \_}\` ? `string` : `K` extends \`@${infer \_}\` ? `string` : `Record`<`K`, `string`\> : `string`\>\>]

**`deprecated`**

#### Type parameters

| Name | Type |
| :------ | :------ |
| `I` | extends `string` |
| `R` | extends [`Rules`](#rules) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `moduleId` | `I` extends ``"_common"`` ? `never` : `I` |
| `rules` | `R` |
| `options?` | [`Options`](#options) |

#### Returns

[[`CSS`](#css)<``"NotExported"``\>[], `A.Compute`<`U.IntersectOf`<`R` extends `Record`<infer K, [`Rule`](#rule)\> ? `K` extends \`${infer \_}&${infer \_}\` ? `string` : `K` extends \`@${infer \_}\` ? `string` : `Record`<`K`, `string`\> : `string`\>\>]

#### Defined in

[index.d.ts:85](https://github.com/nsaunders/demitasse/blob/b362831/index.d.ts#L85)

___

### sheets

▸ **sheets**(`css`): `Record`<`string`, `string`\>

Generates style sheets.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `css` | [`CSS`](#css)<``"Exported"``\>[] | The exported CSS to convert into style sheets |

#### Returns

`Record`<`string`, `string`\>

A record of style sheets, where each key is a module identifier
(filename without the ".css" extension) and each corresponding value is
static CSS content

#### Defined in

[index.d.ts:112](https://github.com/nsaunders/demitasse/blob/b362831/index.d.ts#L112)
