[**OPFS.ts v0.1.11**](../README.md)

***

[OPFS.ts](../globals.md) / OpfsReadOptions

# Interface: OpfsReadOptions

Defined in: [src/types/v1.ts:210](https://github.com/anthonybudd/OPFS.ts/blob/677bf59c4aa7616578f2e3ad95962f2cab8f7819/src/types/v1.ts#L210)

Options for reading a file.

## Properties

### as?

> `optional` **as?**: [`OpfsReadAs`](../type-aliases/OpfsReadAs.md)

Defined in: [src/types/v1.ts:212](https://github.com/anthonybudd/OPFS.ts/blob/677bf59c4aa7616578f2e3ad95962f2cab8f7819/src/types/v1.ts#L212)

Defaults to an ArrayBuffer.

***

### encoding?

> `optional` **encoding?**: [`OpfsEncoding`](../type-aliases/OpfsEncoding.md)

Defined in: [src/types/v1.ts:214](https://github.com/anthonybudd/OPFS.ts/blob/677bf59c4aa7616578f2e3ad95962f2cab8f7819/src/types/v1.ts#L214)

Used when [OpfsReadOptions.as](#as) is `text`. Defaults to UTF-8.

***

### signal?

> `optional` **signal?**: `AbortSignal`

Defined in: [src/types/v1.ts:215](https://github.com/anthonybudd/OPFS.ts/blob/677bf59c4aa7616578f2e3ad95962f2cab8f7819/src/types/v1.ts#L215)
