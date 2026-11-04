[**OPFS.ts v0.1.2**](../README.md)

***

[OPFS.ts](../globals.md) / OpfsFileStat

# Interface: OpfsFileStat

Defined in: [src/types/v1.ts:342](https://github.com/anthonybudd/OPFS.ts/blob/76e189896b0beb55a8735aadc15e2a7d101d7aa4/src/types/v1.ts#L342)

Metadata for a file.

## Properties

### handle

> **handle**: `FileSystemFileHandle`

Defined in: [src/types/v1.ts:346](https://github.com/anthonybudd/OPFS.ts/blob/76e189896b0beb55a8735aadc15e2a7d101d7aa4/src/types/v1.ts#L346)

***

### kind

> **kind**: `"file"`

Defined in: [src/types/v1.ts:343](https://github.com/anthonybudd/OPFS.ts/blob/76e189896b0beb55a8735aadc15e2a7d101d7aa4/src/types/v1.ts#L343)

***

### lastModified

> **lastModified**: `number`

Defined in: [src/types/v1.ts:350](https://github.com/anthonybudd/OPFS.ts/blob/76e189896b0beb55a8735aadc15e2a7d101d7aa4/src/types/v1.ts#L350)

Last modified time, in milliseconds since the Unix epoch.

***

### name

> **name**: `string`

Defined in: [src/types/v1.ts:344](https://github.com/anthonybudd/OPFS.ts/blob/76e189896b0beb55a8735aadc15e2a7d101d7aa4/src/types/v1.ts#L344)

***

### path

> **path**: `string`

Defined in: [src/types/v1.ts:345](https://github.com/anthonybudd/OPFS.ts/blob/76e189896b0beb55a8735aadc15e2a7d101d7aa4/src/types/v1.ts#L345)

***

### size

> **size**: `number`

Defined in: [src/types/v1.ts:348](https://github.com/anthonybudd/OPFS.ts/blob/76e189896b0beb55a8735aadc15e2a7d101d7aa4/src/types/v1.ts#L348)

Length in bytes.

***

### type

> **type**: `string`

Defined in: [src/types/v1.ts:352](https://github.com/anthonybudd/OPFS.ts/blob/76e189896b0beb55a8735aadc15e2a7d101d7aa4/src/types/v1.ts#L352)

MIME type reported by `File.type`. Empty when the browser cannot infer one.
