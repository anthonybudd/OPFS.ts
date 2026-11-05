[**OPFS.ts v0.1.11**](../README.md)

***

[OPFS.ts](../globals.md) / OpfsStorageEstimate

# Interface: OpfsStorageEstimate

Defined in: [src/types/v1.ts:469](https://github.com/anthonybudd/OPFS.ts/blob/677bf59c4aa7616578f2e3ad95962f2cab8f7819/src/types/v1.ts#L469)

Quota and persistence for the origin that owns this OPFS.
`usage` and `quota` are bytes.

## Properties

### persisted

> **persisted**: `boolean`

Defined in: [src/types/v1.ts:478](https://github.com/anthonybudd/OPFS.ts/blob/677bf59c4aa7616578f2e3ad95962f2cab8f7819/src/types/v1.ts#L478)

Whether the origin has been granted persistent storage.

***

### quota

> **quota**: `number`

Defined in: [src/types/v1.ts:471](https://github.com/anthonybudd/OPFS.ts/blob/677bf59c4aa7616578f2e3ad95962f2cab8f7819/src/types/v1.ts#L471)

***

### usage

> **usage**: `number`

Defined in: [src/types/v1.ts:470](https://github.com/anthonybudd/OPFS.ts/blob/677bf59c4aa7616578f2e3ad95962f2cab8f7819/src/types/v1.ts#L470)

***

### usageRatio?

> `optional` **usageRatio?**: `number`

Defined in: [src/types/v1.ts:476](https://github.com/anthonybudd/OPFS.ts/blob/677bf59c4aa7616578f2e3ad95962f2cab8f7819/src/types/v1.ts#L476)

`usage / quota`, from 0 to 1.
Absent when the browser does not report a quota.
