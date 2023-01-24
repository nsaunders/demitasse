# demitasse

## Table of contents

### Functions

- [cssBindings](README.md#cssbindings)
- [makeCSSBindings](README.md#makecssbindings)

## Functions

### cssBindings

▸ **cssBindings**<`CSS`\>(`css`): `Object`

Extracts bindings from the provided CSS string.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `CSS` | extends `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `css` | `CSS` | The CSS from which to extract CSS bindings |

#### Returns

`Object`

Class and ID bindings to the specified CSS

| Name | Type | Description |
| :------ | :------ | :------ |
| `classes` | `Record`<`Names`<``"."``, `CSS`, []\>[`number`] extends `Name` ? `Name` extends `string` ? `FieldName`<`Name`, ``""``, ``false``\> : `never` : `never`, `string`\> | A map of class names referenced within the specified CSS |
| `ids` | `Record`<`Names`<``"#"``, `CSS`, []\>[`number`] extends `Name` ? `Name` extends `string` ? `FieldName`<`Name`, ``""``, ``false``\> : `never` : `never`, `string`\> | A map of IDs referenced within the specified CSS |

#### Defined in

[index.ts:185](https://github.com/nsaunders/demitasse/blob/24d26a6/packages/demitasse/src/index.ts#L185)

___

### makeCSSBindings

▸ **makeCSSBindings**<`Context`\>(`f`): <CSS\>(`css`: `CSS`, `context`: `Context`) => { `classes`: `Record`<`Names`<``"."``, `CSS`, []\>[`number`] extends `Name` ? `Name` extends `string` ? `FieldName`<`Name`, ``""``, ``false``\> : `never` : `never`, `string`\> ; `ids`: `Record`<`Names`<``"#"``, `CSS`, []\>[`number`] extends `Name` ? `Name` extends `string` ? `FieldName`<`Name`, ``""``, ``false``\> : `never` : `never`, `string`\>  }

Creates a custom version of [cssBindings](README.md#cssbindings) which allows class name
and ID values to be mapped in some way, for example to match a build-time
scoping mechanism.

#### Type parameters

| Name |
| :------ |
| `Context` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `f` | (`name`: `string`, `meta`: { `context`: `Context` ; `type`: ``"class"`` \| ``"id"``  }) => `string` | The mapping function to apply to class names and IDs |

#### Returns

`fn`

A version of [cssBindings](README.md#cssbindings) that applies the specified
mapping function

▸ <`CSS`\>(`css`, `context`): `Object`

##### Type parameters

| Name | Type |
| :------ | :------ |
| `CSS` | extends `string` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `css` | `CSS` |
| `context` | `Context` |

##### Returns

`Object`

| Name | Type | Description |
| :------ | :------ | :------ |
| `classes` | `Record`<`Names`<``"."``, `CSS`, []\>[`number`] extends `Name` ? `Name` extends `string` ? `FieldName`<`Name`, ``""``, ``false``\> : `never` : `never`, `string`\> | A map of class names referenced within the specified CSS |
| `ids` | `Record`<`Names`<``"#"``, `CSS`, []\>[`number`] extends `Name` ? `Name` extends `string` ? `FieldName`<`Name`, ``""``, ``false``\> : `never` : `never`, `string`\> | A map of IDs referenced within the specified CSS |

#### Defined in

[index.ts:118](https://github.com/nsaunders/demitasse/blob/24d26a6/packages/demitasse/src/index.ts#L118)
