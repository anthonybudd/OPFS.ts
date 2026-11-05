[**OPFS.ts v0.1.11**](../README.md)

***

[OPFS.ts](../globals.md) / OpfsReadDirResult

# Type Alias: OpfsReadDirResult\<Options\>

> **OpfsReadDirResult**\<`Options`\> = `Options` *extends* `object` ? [`OpfsDirent`](../interfaces/OpfsDirent.md)[] : [`OpfsPath`](OpfsPath.md)[]

Defined in: [src/types/v1.ts:337](https://github.com/anthonybudd/OPFS.ts/blob/677bf59c4aa7616578f2e3ad95962f2cab8f7819/src/types/v1.ts#L337)

Paths, or directory entries when `withFileTypes` is set.

## Type Parameters

### Options

`Options` *extends* [`OpfsReadDirOptions`](../interfaces/OpfsReadDirOptions.md) \| `undefined` = `undefined`
