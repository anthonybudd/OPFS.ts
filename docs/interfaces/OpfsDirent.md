[**OPFS.ts v0.1.2**](../README.md)

***

[OPFS.ts](../globals.md) / OpfsDirent

# Interface: OpfsDirent

Defined in: [src/types/v1.ts:306](https://github.com/anthonybudd/OPFS.ts/blob/76e189896b0beb55a8735aadc15e2a7d101d7aa4/src/types/v1.ts#L306)

A directory listing entry. Call [OpfsDirent.isFile](#isfile) to narrow the handle.

## Extended by

- [`OpfsDirectoryDirent`](OpfsDirectoryDirent.md)
- [`OpfsFileDirent`](OpfsFileDirent.md)

## Properties

### kind

> `readonly` **kind**: `FileSystemHandleKind`

Defined in: [src/types/v1.ts:310](https://github.com/anthonybudd/OPFS.ts/blob/76e189896b0beb55a8735aadc15e2a7d101d7aa4/src/types/v1.ts#L310)

***

### name

> `readonly` **name**: `string`

Defined in: [src/types/v1.ts:307](https://github.com/anthonybudd/OPFS.ts/blob/76e189896b0beb55a8735aadc15e2a7d101d7aa4/src/types/v1.ts#L307)

***

### path

> `readonly` **path**: `string`

Defined in: [src/types/v1.ts:309](https://github.com/anthonybudd/OPFS.ts/blob/76e189896b0beb55a8735aadc15e2a7d101d7aa4/src/types/v1.ts#L309)

Path relative to the OPFS root.

## Methods

### isDirectory()

> **isDirectory**(): `this is OpfsDirectoryDirent`

Defined in: [src/types/v1.ts:312](https://github.com/anthonybudd/OPFS.ts/blob/76e189896b0beb55a8735aadc15e2a7d101d7aa4/src/types/v1.ts#L312)

#### Returns

`this is OpfsDirectoryDirent`

***

### isFile()

> **isFile**(): `this is OpfsFileDirent`

Defined in: [src/types/v1.ts:311](https://github.com/anthonybudd/OPFS.ts/blob/76e189896b0beb55a8735aadc15e2a7d101d7aa4/src/types/v1.ts#L311)

#### Returns

`this is OpfsFileDirent`
