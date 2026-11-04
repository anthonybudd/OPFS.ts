[**OPFS.ts v0.1.2**](../README.md)

***

[OPFS.ts](../globals.md) / OpfsReadDirOptions

# Interface: OpfsReadDirOptions

Defined in: [src/types/v1.ts:328](https://github.com/anthonybudd/OPFS.ts/blob/76e189896b0beb55a8735aadc15e2a7d101d7aa4/src/types/v1.ts#L328)

Options for listing a directory.

## Properties

### recursive?

> `optional` **recursive?**: `boolean`

Defined in: [src/types/v1.ts:330](https://github.com/anthonybudd/OPFS.ts/blob/76e189896b0beb55a8735aadc15e2a7d101d7aa4/src/types/v1.ts#L330)

Walk nested directories.

***

### signal?

> `optional` **signal?**: `AbortSignal`

Defined in: [src/types/v1.ts:333](https://github.com/anthonybudd/OPFS.ts/blob/76e189896b0beb55a8735aadc15e2a7d101d7aa4/src/types/v1.ts#L333)

***

### withFileTypes?

> `optional` **withFileTypes?**: `boolean`

Defined in: [src/types/v1.ts:332](https://github.com/anthonybudd/OPFS.ts/blob/76e189896b0beb55a8735aadc15e2a7d101d7aa4/src/types/v1.ts#L332)

Return [OpfsDirent](OpfsDirent.md) values instead of paths.
