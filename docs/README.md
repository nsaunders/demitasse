# demitasse

## Table of contents

### Type aliases

- [CSS](#css)
- [ExportStatus](#exportstatus)
- [Length](#length)
- [Options](#options)
- [Rule](#rule)
- [Rules](#rules)
- [Time](#time)

### Functions

- [cssExport](#cssexport)
- [demi](#demi)
- [sheets](#sheets)

## Type aliases

### CSS

Ƭ **CSS**<`R`\>: `any`[] & { `_exportStatus`: `R`  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R` | extends [`ExportStatus`](#exportstatus)``"NotExported"`` |

#### Defined in

[index.d.ts:29](https://github.com/nsaunders/demitasse/blob/124d84f/index.d.ts#L29)

___

### ExportStatus

Ƭ **ExportStatus**: ``"NotExported"`` \| ``"Exported"``

#### Defined in

[index.d.ts:27](https://github.com/nsaunders/demitasse/blob/124d84f/index.d.ts#L27)

___

### Length

Ƭ **Length**: `string` \| `number`

A length value

**`remarks`** Unitless values default to pixels

#### Defined in

[index.d.ts:9](https://github.com/nsaunders/demitasse/blob/124d84f/index.d.ts#L9)

___

### Options

Ƭ **Options**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `debug?` | `boolean` |

#### Defined in

[index.d.ts:23](https://github.com/nsaunders/demitasse/blob/124d84f/index.d.ts#L23)

___

### Rule

Ƭ **Rule**: `Properties`<[`Length`](#length), [`Time`](#time)\> & `Partial`<`Object`\>

#### Defined in

[index.d.ts:18](https://github.com/nsaunders/demitasse/blob/124d84f/index.d.ts#L18)

___

### Rules

Ƭ **Rules**: [`Rule`](#rule) \| `Record`<`string`, [`Rule`](#rule)\>

#### Defined in

[index.d.ts:21](https://github.com/nsaunders/demitasse/blob/124d84f/index.d.ts#L21)

___

### Time

Ƭ **Time**: `string` \| `number`

A time value

**`remarks`** Unitless values default to milliseconds

#### Defined in

[index.d.ts:16](https://github.com/nsaunders/demitasse/blob/124d84f/index.d.ts#L16)

## Functions

### cssExport

▸ **cssExport**<`I`, `R`\>(`sheetId`, `rules`): [`CSS`](#css)<``"Exported"``\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `I` | extends `string` |
| `R` | extends [`Rules`](#rules) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `sheetId` | `I` extends ``"_common"`` ? `never` : `I` |
| `rules` | [`string`, `R`, [`Options`](#options)][] |

#### Returns

[`CSS`](#css)<``"Exported"``\>

#### Defined in

[index.d.ts:50](https://github.com/nsaunders/demitasse/blob/124d84f/index.d.ts#L50)

___

### demi

▸ **demi**<`I`, `R`\>(`moduleId`, `rules`, `options?`): [[`CSS`](#css), `A.Compute`<`U.IntersectOf`<`R` extends `Record`<infer K, [`Rule`](#rule)\> ? `K` extends \`${infer \_}&${infer \_}\` ? `string` : `Record`<`K`, `string`\> : `string`\>\>]

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

[[`CSS`](#css), `A.Compute`<`U.IntersectOf`<`R` extends `Record`<infer K, [`Rule`](#rule)\> ? `K` extends \`${infer \_}&${infer \_}\` ? `string` : `Record`<`K`, `string`\> : `string`\>\>]

#### Defined in

[index.d.ts:33](https://github.com/nsaunders/demitasse/blob/124d84f/index.d.ts#L33)

___

### sheets

▸ **sheets**(`css`): `Record`<`string`, `string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `css` | [`CSS`](#css)<``"Exported"``\> |

#### Returns

`Record`<`string`, `string`\>

#### Defined in

[index.d.ts:55](https://github.com/nsaunders/demitasse/blob/124d84f/index.d.ts#L55)
