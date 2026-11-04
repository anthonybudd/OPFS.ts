[**OPFS.ts v0.1.2**](../README.md)

***

[OPFS.ts](../globals.md) / OpfsReadDirResult

# Type Alias: OpfsReadDirResult\<Options\>

> **OpfsReadDirResult**\<`Options`\> = `Options` *extends* `object` ? [`OpfsDirent`](../interfaces/OpfsDirent.md)[] : [`OpfsPath`](OpfsPath.md)[]

Defined in: [src/types/v1.ts:337](https://github.com/anthonybudd/OPFS.ts/blob/76e189896b0beb55a8735aadc15e2a7d101d7aa4/src/types/v1.ts#L337)

Paths, or directory entries when `withFileTypes` is set.

## Type Parameters

### Options

`Options` *extends* [`OpfsReadDirOptions`](../interfaces/OpfsReadDirOptions.md) \| `undefined` = `undefined`
