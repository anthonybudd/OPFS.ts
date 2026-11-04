[**OPFS.ts v0.1.2**](../README.md)

***

[OPFS.ts](../globals.md) / OpfsDirectoryDirent

# Interface: OpfsDirectoryDirent

Defined in: [src/types/v1.ts:322](https://github.com/anthonybudd/OPFS.ts/blob/76e189896b0beb55a8735aadc15e2a7d101d7aa4/src/types/v1.ts#L322)

[OpfsDirent](OpfsDirent.md) for a directory.

## Extends

- [`OpfsDirent`](OpfsDirent.md)

## Properties

### handle

> `readonly` **handle**: `FileSystemDirectoryHandle`

Defined in: [src/types/v1.ts:324](https://github.com/anthonybudd/OPFS.ts/blob/76e189896b0beb55a8735aadc15e2a7d101d7aa4/src/types/v1.ts#L324)

***

### kind

> `readonly` **kind**: `"directory"`

Defined in: [src/types/v1.ts:323](https://github.com/anthonybudd/OPFS.ts/blob/76e189896b0beb55a8735aadc15e2a7d101d7aa4/src/types/v1.ts#L323)

#### Overrides

[`OpfsDirent`](OpfsDirent.md).[`kind`](OpfsDirent.md#kind)

***

### name

> `readonly` **name**: `string`

Defined in: [src/types/v1.ts:307](https://github.com/anthonybudd/OPFS.ts/blob/76e189896b0beb55a8735aadc15e2a7d101d7aa4/src/types/v1.ts#L307)

#### Inherited from

[`OpfsDirent`](OpfsDirent.md).[`name`](OpfsDirent.md#name)

***

### path

> `readonly` **path**: `string`

Defined in: [src/types/v1.ts:309](https://github.com/anthonybudd/OPFS.ts/blob/76e189896b0beb55a8735aadc15e2a7d101d7aa4/src/types/v1.ts#L309)

Path relative to the OPFS root.

#### Inherited from

[`OpfsDirent`](OpfsDirent.md).[`path`](OpfsDirent.md#path)

## Methods

### isDirectory()

> **isDirectory**(): `this is OpfsDirectoryDirent`

Defined in: [src/types/v1.ts:312](https://github.com/anthonybudd/OPFS.ts/blob/76e189896b0beb55a8735aadc15e2a7d101d7aa4/src/types/v1.ts#L312)

#### Returns

`this is OpfsDirectoryDirent`

#### Inherited from

[`OpfsDirent`](OpfsDirent.md).[`isDirectory`](OpfsDirent.md#isdirectory)

***

### isFile()

> **isFile**(): `this is OpfsFileDirent`

Defined in: [src/types/v1.ts:311](https://github.com/anthonybudd/OPFS.ts/blob/76e189896b0beb55a8735aadc15e2a7d101d7aa4/src/types/v1.ts#L311)

#### Returns

`this is OpfsFileDirent`

#### Inherited from

[`OpfsDirent`](OpfsDirent.md).[`isFile`](OpfsDirent.md#isfile)
