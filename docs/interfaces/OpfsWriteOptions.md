[**OPFS.ts v0.1.2**](../README.md)

***

[OPFS.ts](../globals.md) / OpfsWriteOptions

# Interface: OpfsWriteOptions

Defined in: [src/types/v1.ts:241](https://github.com/anthonybudd/OPFS.ts/blob/76e189896b0beb55a8735aadc15e2a7d101d7aa4/src/types/v1.ts#L241)

Options for creating or replacing a file.

## Properties

### append?

> `optional` **append?**: `boolean`

Defined in: [src/types/v1.ts:246](https://github.com/anthonybudd/OPFS.ts/blob/76e189896b0beb55a8735aadc15e2a7d101d7aa4/src/types/v1.ts#L246)

Append to existing bytes.
When omitted, the write replaces the file.

***

### create?

> `optional` **create?**: `boolean`

Defined in: [src/types/v1.ts:251](https://github.com/anthonybudd/OPFS.ts/blob/76e189896b0beb55a8735aadc15e2a7d101d7aa4/src/types/v1.ts#L251)

Create the file and any missing parent directories.

#### Default Value

```ts
true
```

***

### encoding?

> `optional` **encoding?**: [`OpfsEncoding`](../type-aliases/OpfsEncoding.md)

Defined in: [src/types/v1.ts:261](https://github.com/anthonybudd/OPFS.ts/blob/76e189896b0beb55a8735aadc15e2a7d101d7aa4/src/types/v1.ts#L261)

Encoding used when the written data is a string.

#### Default Value

`'utf-8'`

***

### exclusive?

> `optional` **exclusive?**: `boolean`

Defined in: [src/types/v1.ts:253](https://github.com/anthonybudd/OPFS.ts/blob/76e189896b0beb55a8735aadc15e2a7d101d7aa4/src/types/v1.ts#L253)

Fail when the file already exists.

***

### keepExistingData?

> `optional` **keepExistingData?**: `boolean`

Defined in: [src/types/v1.ts:259](https://github.com/anthonybudd/OPFS.ts/blob/76e189896b0beb55a8735aadc15e2a7d101d7aa4/src/types/v1.ts#L259)

Keep the current bytes when opening the writable stream.
Corresponds to `FileSystemCreateWritableOptions.keepExistingData`.
Implied when [OpfsWriteOptions.append](#append) is set.

***

### signal?

> `optional` **signal?**: `AbortSignal`

Defined in: [src/types/v1.ts:262](https://github.com/anthonybudd/OPFS.ts/blob/76e189896b0beb55a8735aadc15e2a7d101d7aa4/src/types/v1.ts#L262)
