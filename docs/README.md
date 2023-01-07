# demitasse

## Table of contents

### Functions

- [getCSSBindings](README.md#getcssbindings)
- [makeGetCSSBindings](README.md#makegetcssbindings)

## Functions

### getCSSBindings

▸ **getCSSBindings**<`CSS`\>(`css`): `Object`

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
| `classes` | `Record`<`Identifiers`<``"."``, `CSS`\>, `string`\> | A map of class names referenced within the specified CSS |
| `ids` | `Record`<`Identifiers`<``"#"``, `CSS`\>, `string`\> | A map of IDs referenced within the specified CSS |

#### Defined in

[index.ts:244](https://github.com/nsaunders/demitasse/blob/070b86e/lib/src/index.ts#L244)

___

### makeGetCSSBindings

▸ **makeGetCSSBindings**<`Context`\>(`f`): <CSS\>(`css`: `CSS`, `context`: `Context`) => { `classes`: `Record`<`Identifiers`<``"."``, `CSS`\>, `string`\> ; `ids`: `Record`<`Identifiers`<``"#"``, `CSS`\>, `string`\>  }

Creates a custom version of [getCSSBindings](README.md#getcssbindings) which allows class name
and ID values to be mapped in some way, for example to match a build-time
scoping mechanism.

#### Type parameters

| Name |
| :------ |
| `Context` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `f` | (`identifier`: `string`, `meta`: { `context`: `Context` ; `type`: ``"class"`` \| ``"id"``  }) => `string` | The mapping function to apply to class names and IDs |

#### Returns

`fn`

A version of [getCSSBindings](README.md#getcssbindings) that applies the specified
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
| `classes` | `Record`<`Identifiers`<``"."``, `CSS`\>, `string`\> | A map of class names referenced within the specified CSS |
| `ids` | `Record`<`Identifiers`<``"#"``, `CSS`\>, `string`\> | A map of IDs referenced within the specified CSS |

#### Defined in

[index.ts:190](https://github.com/nsaunders/demitasse/blob/070b86e/lib/src/index.ts#L190)
