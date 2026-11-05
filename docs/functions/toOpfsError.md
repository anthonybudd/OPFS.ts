[**OPFS.ts v0.1.11**](../README.md)

***

[OPFS.ts](../globals.md) / toOpfsError

# Function: toOpfsError()

> **toOpfsError**(`error`, `context`): [`OpfsError`](../classes/OpfsError.md)

Defined in: [src/errors/errors.ts:191](https://github.com/anthonybudd/OPFS.ts/blob/677bf59c4aa7616578f2e3ad95962f2cab8f7819/src/errors/errors.ts#L191)

Maps a thrown value from a read or write into an [OpfsError](../classes/OpfsError.md).

`DOMException` names used by the File System API are mapped to a subclass.
Any other failure becomes [OpfsReadError](../classes/OpfsReadError.md) or [OpfsWriteError](../classes/OpfsWriteError.md)
according to `context.operation`. Values that are already an [OpfsError](../classes/OpfsError.md)
are returned unchanged.

## Parameters

### error

`unknown`

### context

`OpfsErrorContext`

## Returns

[`OpfsError`](../classes/OpfsError.md)
