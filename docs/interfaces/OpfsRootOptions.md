[**OPFS.ts v0.1.11**](../README.md)

***

[OPFS.ts](../globals.md) / OpfsRootOptions

# Interface: OpfsRootOptions

Defined in: [src/types/v1.ts:485](https://github.com/anthonybudd/OPFS.ts/blob/4ff9e127efb908762c17192626f145128ee7d0f2/src/types/v1.ts#L485)

Which origin-private directory library calls start from.
Omit `bucket` to use `navigator.storage.getDirectory()`.

## Properties

### bucket?

> `optional` **bucket?**: `string`

Defined in: [src/types/v1.ts:487](https://github.com/anthonybudd/OPFS.ts/blob/4ff9e127efb908762c17192626f145128ee7d0f2/src/types/v1.ts#L487)

Named storage bucket to open instead of the default bucket.
