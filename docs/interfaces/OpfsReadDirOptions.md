[**OPFS.ts v0.1.11**](../README.md)

***

[OPFS.ts](../globals.md) / OpfsReadDirOptions

# Interface: OpfsReadDirOptions

Defined in: [src/types/v1.ts:328](https://github.com/anthonybudd/OPFS.ts/blob/4ff9e127efb908762c17192626f145128ee7d0f2/src/types/v1.ts#L328)

Options for listing a directory.

## Properties

### recursive?

> `optional` **recursive?**: `boolean`

Defined in: [src/types/v1.ts:330](https://github.com/anthonybudd/OPFS.ts/blob/4ff9e127efb908762c17192626f145128ee7d0f2/src/types/v1.ts#L330)

Walk nested directories.

***

### signal?

> `optional` **signal?**: `AbortSignal`

Defined in: [src/types/v1.ts:333](https://github.com/anthonybudd/OPFS.ts/blob/4ff9e127efb908762c17192626f145128ee7d0f2/src/types/v1.ts#L333)

***

### withFileTypes?

> `optional` **withFileTypes?**: `boolean`

Defined in: [src/types/v1.ts:332](https://github.com/anthonybudd/OPFS.ts/blob/4ff9e127efb908762c17192626f145128ee7d0f2/src/types/v1.ts#L332)

Return [OpfsDirent](OpfsDirent.md) values instead of paths.
