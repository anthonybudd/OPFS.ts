[**OPFS.ts v0.1.11**](../README.md)

***

[OPFS.ts](../globals.md) / OpfsPath

# Type Alias: OpfsPath

> **OpfsPath** = `string`

Defined in: [src/types/v1.ts:168](https://github.com/anthonybudd/OPFS.ts/blob/4ff9e127efb908762c17192626f145128ee7d0f2/src/types/v1.ts#L168)

Path inside the origin private file system, relative to the storage root.

Segments are separated by `/`. An empty string is the root. Library
functions accept unnormalized paths and normalize them before resolving.
