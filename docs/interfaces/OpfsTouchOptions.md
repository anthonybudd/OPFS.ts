[**OPFS.ts v0.1.2**](../README.md)

***

[OPFS.ts](../globals.md) / OpfsTouchOptions

# Interface: OpfsTouchOptions

Defined in: [src/types/v1.ts:294](https://github.com/anthonybudd/OPFS.ts/blob/76e189896b0beb55a8735aadc15e2a7d101d7aa4/src/types/v1.ts#L294)

Options for creating an empty file without changing one that already exists.

## Properties

### exclusive?

> `optional` **exclusive?**: `boolean`

Defined in: [src/types/v1.ts:301](https://github.com/anthonybudd/OPFS.ts/blob/76e189896b0beb55a8735aadc15e2a7d101d7aa4/src/types/v1.ts#L301)

Fail when the file already exists.

***

### recursive?

> `optional` **recursive?**: `boolean`

Defined in: [src/types/v1.ts:299](https://github.com/anthonybudd/OPFS.ts/blob/76e189896b0beb55a8735aadc15e2a7d101d7aa4/src/types/v1.ts#L299)

Create missing parent directories.

#### Default Value

```ts
true
```

***

### signal?

> `optional` **signal?**: `AbortSignal`

Defined in: [src/types/v1.ts:302](https://github.com/anthonybudd/OPFS.ts/blob/76e189896b0beb55a8735aadc15e2a7d101d7aa4/src/types/v1.ts#L302)
