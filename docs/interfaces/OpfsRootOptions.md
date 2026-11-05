[**OPFS.ts v0.1.11**](../README.md)

***

[OPFS.ts](../globals.md) / OpfsRootOptions

# Interface: OpfsRootOptions

Defined in: [src/types/v1.ts:485](https://github.com/anthonybudd/OPFS.ts/blob/677bf59c4aa7616578f2e3ad95962f2cab8f7819/src/types/v1.ts#L485)

Which origin-private directory library calls start from.
Omit `bucket` to use `navigator.storage.getDirectory()`.

## Properties

### bucket?

> `optional` **bucket?**: `string`

Defined in: [src/types/v1.ts:487](https://github.com/anthonybudd/OPFS.ts/blob/677bf59c4aa7616578f2e3ad95962f2cab8f7819/src/types/v1.ts#L487)

Named storage bucket to open instead of the default bucket.
