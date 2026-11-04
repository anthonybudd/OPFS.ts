[**OPFS.ts v0.1.2**](../README.md)

***

[OPFS.ts](../globals.md) / OpfsRootOptions

# Interface: OpfsRootOptions

Defined in: [src/types/v1.ts:485](https://github.com/anthonybudd/OPFS.ts/blob/76e189896b0beb55a8735aadc15e2a7d101d7aa4/src/types/v1.ts#L485)

Which origin-private directory library calls start from.
Omit `bucket` to use `navigator.storage.getDirectory()`.

## Properties

### bucket?

> `optional` **bucket?**: `string`

Defined in: [src/types/v1.ts:487](https://github.com/anthonybudd/OPFS.ts/blob/76e189896b0beb55a8735aadc15e2a7d101d7aa4/src/types/v1.ts#L487)

Named storage bucket to open instead of the default bucket.
