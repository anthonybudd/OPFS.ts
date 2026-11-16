[**OPFS.ts v0.1.11**](../README.md)

***

[OPFS.ts](../globals.md) / OpfsWriteCommand

# Type Alias: OpfsWriteCommand

> **OpfsWriteCommand** = \{ `data`: `BufferSource` \| `Blob` \| `string`; `position?`: `number`; `type`: `"write"`; \} \| \{ `position`: `number`; `type`: `"seek"`; \} \| \{ `size`: `number`; `type`: `"truncate"`; \}

Defined in: [src/types/v1.ts:222](https://github.com/anthonybudd/OPFS.ts/blob/4ff9e127efb908762c17192626f145128ee7d0f2/src/types/v1.ts#L222)

A single command written to a FileSystemWritableFileStream.
`position` and `size` are byte offsets.
