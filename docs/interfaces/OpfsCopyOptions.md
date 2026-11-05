[**OPFS.ts v0.1.11**](../README.md)

***

[OPFS.ts](../globals.md) / OpfsCopyOptions

# Interface: OpfsCopyOptions

Defined in: [src/types/v1.ts:397](https://github.com/anthonybudd/OPFS.ts/blob/677bf59c4aa7616578f2e3ad95962f2cab8f7819/src/types/v1.ts#L397)

Options for copying a file or directory tree.

## Properties

### overwrite?

> `optional` **overwrite?**: `boolean`

Defined in: [src/types/v1.ts:399](https://github.com/anthonybudd/OPFS.ts/blob/677bf59c4aa7616578f2e3ad95962f2cab8f7819/src/types/v1.ts#L399)

Replace an existing file at the destination.

***

### recursive?

> `optional` **recursive?**: `boolean`

Defined in: [src/types/v1.ts:401](https://github.com/anthonybudd/OPFS.ts/blob/677bf59c4aa7616578f2e3ad95962f2cab8f7819/src/types/v1.ts#L401)

Copy directories. Required when the source is a directory.

***

### signal?

> `optional` **signal?**: `AbortSignal`

Defined in: [src/types/v1.ts:402](https://github.com/anthonybudd/OPFS.ts/blob/677bf59c4aa7616578f2e3ad95962f2cab8f7819/src/types/v1.ts#L402)
