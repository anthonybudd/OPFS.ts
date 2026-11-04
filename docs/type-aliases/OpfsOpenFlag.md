[**OPFS.ts v0.1.2**](../README.md)

***

[OPFS.ts](../globals.md) / OpfsOpenFlag

# Type Alias: OpfsOpenFlag

> **OpfsOpenFlag** = `"r"` \| `"w"` \| `"a"` \| `"wx"` \| `"ax"`

Defined in: [src/types/v1.ts:274](https://github.com/anthonybudd/OPFS.ts/blob/76e189896b0beb55a8735aadc15e2a7d101d7aa4/src/types/v1.ts#L274)

How a file is opened.

- `r` — read an existing file
- `w` — create or truncate, then write
- `a` — create if needed, then append
- `wx` — create and write, failing when the file exists
- `ax` — create and append, failing when the file exists
