[**OPFS.ts v0.1.11**](../README.md)

***

[OPFS.ts](../globals.md) / OpfsMovedChange

# Interface: OpfsMovedChange

Defined in: [src/types/v1.ts:449](https://github.com/anthonybudd/OPFS.ts/blob/677bf59c4aa7616578f2e3ad95962f2cab8f7819/src/types/v1.ts#L449)

A change recorded when an entry is renamed or moved.

## Extends

- `OpfsChangeBase`

## Properties

### changedHandle

> **changedHandle**: `FileSystemHandle`

Defined in: [src/types/v1.ts:438](https://github.com/anthonybudd/OPFS.ts/blob/677bf59c4aa7616578f2e3ad95962f2cab8f7819/src/types/v1.ts#L438)

#### Inherited from

`OpfsChangeBase.changedHandle`

***

### path

> **path**: `string`

Defined in: [src/types/v1.ts:435](https://github.com/anthonybudd/OPFS.ts/blob/677bf59c4aa7616578f2e3ad95962f2cab8f7819/src/types/v1.ts#L435)

Path of the changed entry relative to the OPFS root.

#### Inherited from

`OpfsChangeBase.path`

***

### relativePathComponents

> **relativePathComponents**: readonly `string`[]

Defined in: [src/types/v1.ts:440](https://github.com/anthonybudd/OPFS.ts/blob/677bf59c4aa7616578f2e3ad95962f2cab8f7819/src/types/v1.ts#L440)

Path components from [OpfsChangeBase.root](OpfsEntryChange.md#root) to the changed entry.

#### Inherited from

`OpfsChangeBase.relativePathComponents`

***

### relativePathMovedFrom

> **relativePathMovedFrom**: readonly `string`[]

Defined in: [src/types/v1.ts:452](https://github.com/anthonybudd/OPFS.ts/blob/677bf59c4aa7616578f2e3ad95962f2cab8f7819/src/types/v1.ts#L452)

Path components of the entry before the move, relative to `root`.

***

### root

> **root**: `FileSystemHandle`

Defined in: [src/types/v1.ts:437](https://github.com/anthonybudd/OPFS.ts/blob/677bf59c4aa7616578f2e3ad95962f2cab8f7819/src/types/v1.ts#L437)

Handle that was passed to `observe`.

#### Inherited from

`OpfsChangeBase.root`

***

### type

> **type**: `"moved"`

Defined in: [src/types/v1.ts:450](https://github.com/anthonybudd/OPFS.ts/blob/677bf59c4aa7616578f2e3ad95962f2cab8f7819/src/types/v1.ts#L450)
