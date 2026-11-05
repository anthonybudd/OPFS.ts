[**OPFS.ts v0.1.11**](../README.md)

***

[OPFS.ts](../globals.md) / OpfsFileDirent

# Interface: OpfsFileDirent

Defined in: [src/types/v1.ts:316](https://github.com/anthonybudd/OPFS.ts/blob/677bf59c4aa7616578f2e3ad95962f2cab8f7819/src/types/v1.ts#L316)

[OpfsDirent](OpfsDirent.md) for a file.

## Extends

- [`OpfsDirent`](OpfsDirent.md)

## Properties

### handle

> `readonly` **handle**: `FileSystemFileHandle`

Defined in: [src/types/v1.ts:318](https://github.com/anthonybudd/OPFS.ts/blob/677bf59c4aa7616578f2e3ad95962f2cab8f7819/src/types/v1.ts#L318)

***

### kind

> `readonly` **kind**: `"file"`

Defined in: [src/types/v1.ts:317](https://github.com/anthonybudd/OPFS.ts/blob/677bf59c4aa7616578f2e3ad95962f2cab8f7819/src/types/v1.ts#L317)

#### Overrides

[`OpfsDirent`](OpfsDirent.md).[`kind`](OpfsDirent.md#kind)

***

### name

> `readonly` **name**: `string`

Defined in: [src/types/v1.ts:307](https://github.com/anthonybudd/OPFS.ts/blob/677bf59c4aa7616578f2e3ad95962f2cab8f7819/src/types/v1.ts#L307)

#### Inherited from

[`OpfsDirent`](OpfsDirent.md).[`name`](OpfsDirent.md#name)

***

### path

> `readonly` **path**: `string`

Defined in: [src/types/v1.ts:309](https://github.com/anthonybudd/OPFS.ts/blob/677bf59c4aa7616578f2e3ad95962f2cab8f7819/src/types/v1.ts#L309)

Path relative to the OPFS root.

#### Inherited from

[`OpfsDirent`](OpfsDirent.md).[`path`](OpfsDirent.md#path)

## Methods

### isDirectory()

> **isDirectory**(): `this is OpfsDirectoryDirent`

Defined in: [src/types/v1.ts:312](https://github.com/anthonybudd/OPFS.ts/blob/677bf59c4aa7616578f2e3ad95962f2cab8f7819/src/types/v1.ts#L312)

#### Returns

`this is OpfsDirectoryDirent`

#### Inherited from

[`OpfsDirent`](OpfsDirent.md).[`isDirectory`](OpfsDirent.md#isdirectory)

***

### isFile()

> **isFile**(): `this is OpfsFileDirent`

Defined in: [src/types/v1.ts:311](https://github.com/anthonybudd/OPFS.ts/blob/677bf59c4aa7616578f2e3ad95962f2cab8f7819/src/types/v1.ts#L311)

#### Returns

`this is OpfsFileDirent`

#### Inherited from

[`OpfsDirent`](OpfsDirent.md).[`isFile`](OpfsDirent.md#isfile)
