[**OPFS.ts v0.1.11**](../README.md)

***

[OPFS.ts](../globals.md) / OpfsOpenFlag

# Type Alias: OpfsOpenFlag

> **OpfsOpenFlag** = `"r"` \| `"w"` \| `"a"` \| `"wx"` \| `"ax"`

Defined in: [src/types/v1.ts:274](https://github.com/anthonybudd/OPFS.ts/blob/4ff9e127efb908762c17192626f145128ee7d0f2/src/types/v1.ts#L274)

How a file is opened.

- `r` — read an existing file
- `w` — create or truncate, then write
- `a` — create if needed, then append
- `wx` — create and write, failing when the file exists
- `ax` — create and append, failing when the file exists
