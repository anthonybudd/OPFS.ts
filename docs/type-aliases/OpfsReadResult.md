[**OPFS.ts v0.1.11**](../README.md)

***

[OPFS.ts](../globals.md) / OpfsReadResult

# Type Alias: OpfsReadResult\<T\>

> **OpfsReadResult**\<`T`\> = `T` *extends* `"text"` ? `string` : `T` *extends* `"uint8array"` ? `Uint8Array`\<`ArrayBuffer`\> : `T` *extends* `"blob"` ? `Blob` : `T` *extends* `"stream"` ? `ReadableStream`\<`Uint8Array`\<`ArrayBuffer`\>\> : `T` *extends* `"file"` ? `File` : `ArrayBuffer`

Defined in: [src/types/v1.ts:196](https://github.com/anthonybudd/OPFS.ts/blob/677bf59c4aa7616578f2e3ad95962f2cab8f7819/src/types/v1.ts#L196)

Bytes returned for a given [OpfsReadAs](OpfsReadAs.md) value.

## Type Parameters

### T

`T` *extends* [`OpfsReadAs`](OpfsReadAs.md) \| `undefined` = `undefined`
