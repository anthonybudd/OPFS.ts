[**OPFS.ts v0.1.11**](../README.md)

***

[OPFS.ts](../globals.md) / OpfsEntryChange

# Interface: OpfsEntryChange

Defined in: [src/types/v1.ts:444](https://github.com/anthonybudd/OPFS.ts/blob/4ff9e127efb908762c17192626f145128ee7d0f2/src/types/v1.ts#L444)

A change that is not a move.

## Extends

- `OpfsChangeBase`

## Properties

### changedHandle

> **changedHandle**: `FileSystemHandle`

Defined in: [src/types/v1.ts:438](https://github.com/anthonybudd/OPFS.ts/blob/4ff9e127efb908762c17192626f145128ee7d0f2/src/types/v1.ts#L438)

#### Inherited from

`OpfsChangeBase.changedHandle`

***

### path

> **path**: `string`

Defined in: [src/types/v1.ts:435](https://github.com/anthonybudd/OPFS.ts/blob/4ff9e127efb908762c17192626f145128ee7d0f2/src/types/v1.ts#L435)

Path of the changed entry relative to the OPFS root.

#### Inherited from

`OpfsChangeBase.path`

***

### relativePathComponents

> **relativePathComponents**: readonly `string`[]

Defined in: [src/types/v1.ts:440](https://github.com/anthonybudd/OPFS.ts/blob/4ff9e127efb908762c17192626f145128ee7d0f2/src/types/v1.ts#L440)

Path components from [OpfsChangeBase.root](#root) to the changed entry.

#### Inherited from

`OpfsChangeBase.relativePathComponents`

***

### root

> **root**: `FileSystemHandle`

Defined in: [src/types/v1.ts:437](https://github.com/anthonybudd/OPFS.ts/blob/4ff9e127efb908762c17192626f145128ee7d0f2/src/types/v1.ts#L437)

Handle that was passed to `observe`.

#### Inherited from

`OpfsChangeBase.root`

***

### type

> **type**: `"appeared"` \| `"disappeared"` \| `"modified"` \| `"unknown"` \| `"errored"`

Defined in: [src/types/v1.ts:445](https://github.com/anthonybudd/OPFS.ts/blob/4ff9e127efb908762c17192626f145128ee7d0f2/src/types/v1.ts#L445)
