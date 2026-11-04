[**OPFS.ts v0.1.2**](../README.md)

***

[OPFS.ts](../globals.md) / OpfsWriteCommand

# Type Alias: OpfsWriteCommand

> **OpfsWriteCommand** = \{ `data`: `BufferSource` \| `Blob` \| `string`; `position?`: `number`; `type`: `"write"`; \} \| \{ `position`: `number`; `type`: `"seek"`; \} \| \{ `size`: `number`; `type`: `"truncate"`; \}

Defined in: [src/types/v1.ts:222](https://github.com/anthonybudd/OPFS.ts/blob/76e189896b0beb55a8735aadc15e2a7d101d7aa4/src/types/v1.ts#L222)

A single command written to a FileSystemWritableFileStream.
`position` and `size` are byte offsets.
