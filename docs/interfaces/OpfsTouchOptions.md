[**OPFS.ts v0.1.11**](../README.md)

***

[OPFS.ts](../globals.md) / OpfsTouchOptions

# Interface: OpfsTouchOptions

Defined in: [src/types/v1.ts:294](https://github.com/anthonybudd/OPFS.ts/blob/4ff9e127efb908762c17192626f145128ee7d0f2/src/types/v1.ts#L294)

Options for creating an empty file without changing one that already exists.

## Properties

### exclusive?

> `optional` **exclusive?**: `boolean`

Defined in: [src/types/v1.ts:301](https://github.com/anthonybudd/OPFS.ts/blob/4ff9e127efb908762c17192626f145128ee7d0f2/src/types/v1.ts#L301)

Fail when the file already exists.

***

### recursive?

> `optional` **recursive?**: `boolean`

Defined in: [src/types/v1.ts:299](https://github.com/anthonybudd/OPFS.ts/blob/4ff9e127efb908762c17192626f145128ee7d0f2/src/types/v1.ts#L299)

Create missing parent directories.

#### Default Value

```ts
true
```

***

### signal?

> `optional` **signal?**: `AbortSignal`

Defined in: [src/types/v1.ts:302](https://github.com/anthonybudd/OPFS.ts/blob/4ff9e127efb908762c17192626f145128ee7d0f2/src/types/v1.ts#L302)
