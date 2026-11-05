[**OPFS.ts v0.1.11**](../README.md)

***

[OPFS.ts](../globals.md) / OpfsPath

# Type Alias: OpfsPath

> **OpfsPath** = `string`

Defined in: [src/types/v1.ts:168](https://github.com/anthonybudd/OPFS.ts/blob/677bf59c4aa7616578f2e3ad95962f2cab8f7819/src/types/v1.ts#L168)

Path inside the origin private file system, relative to the storage root.

Segments are separated by `/`. An empty string is the root. Library
functions accept unnormalized paths and normalize them before resolving.
