[**OPFS.ts v0.1.11**](../README.md)

***

[OPFS.ts](../globals.md) / default

# Variable: default

> **default**: `object`

Defined in: [src/index.ts:78](https://github.com/anthonybudd/OPFS.ts/blob/677bf59c4aa7616578f2e3ad95962f2cab8f7819/src/index.ts#L78)

## Type Declaration

### exists

> **exists**: (`pathOrHandle`) => `Promise`\<`boolean`\>

Tests whether a file or directory exists in the origin private file system (OPFS).

#### Parameters

##### pathOrHandle

[`OpfsEntryTarget`](../type-aliases/OpfsEntryTarget.md)

Either an OPFS-relative path to the entry to check, or a
  FileSystemFileHandle for a file that was already obtained from OPFS
  (for example via [touch](#touch) or [readFile](#readfile)).

#### Returns

`Promise`\<`boolean`\>

A promise that resolves to `true` when the target file or directory is
  present, or `false` when it is missing or cannot be resolved without error.

#### Remarks

This is a presence check only; it does not read file bytes or enumerate a
directory. Prefer [readFile](#readfile) or [readDir](#readdir) when you need contents.
For file paths, a missing entry should yield `false` rather than rejecting with
`NotFoundError`, so callers can branch without try/catch.

#### Example

```ts
if (await opfs.exists('cache/index.json')) {
  await opfs.readFile('cache/index.json');
}
```

### mkdir

> **mkdir**: (`path`) => `Promise`\<`FileSystemDirectoryHandle`\>

Creates every directory in an origin private file system (OPFS) path and
returns a handle to the last one.

#### Parameters

##### path

`string`

An OPFS-relative path. Missing segments are created. An empty
  path returns the OPFS root.

#### Returns

`Promise`\<`FileSystemDirectoryHandle`\>

A promise that resolves to the FileSystemDirectoryHandle for
  the final directory in `path`.

#### Remarks

Directories that already exist along the path are reused, so calling this
again with the same path does not fail. Parent directories are always
created. A segment that is already a file rejects with `TypeMismatchError`.
Use [touch](#touch) or [write](#write) to create a file inside the new directory.

#### Example

```ts
const dir = await opfs.mkdir('personal/notes');
await opfs.write('personal/notes/test.txt', 'Hello World');
```

### observe

> **observe**: (`pathOrHandle`, `callback`, `options?`) => `Promise`\<`FileSystemObserver`\>

Creates a new instance of a FileSystemObserver to watch for changes to a file or directory.

#### Parameters

##### pathOrHandle

[`OpfsEntryTarget`](../type-aliases/OpfsEntryTarget.md)

An OPFS-relative path to a file, a directory, 
  FileSystemFileHandle or FileSystemDirectoryHandle.

##### callback

`OpfsObserverCallback`

A function to call when a change is detected.

##### options?

`OpfsObserverOptions`

Optional options for the observer.

#### Returns

`Promise`\<`FileSystemObserver`\>

A promise that resolves to the new FileSystemObserver instance.

#### Remarks

This feature is not standardized. API and may change in the future.

#### Example

```ts
const observer = await opfs.observe('personal/notes/test.txt', (records, observer) => {
  for (const record of records) {
    console.log('Change detected:', record);
  }
});
```

### readDir

> **readDir**: (`pathOrHandle`) => `Promise`\<`string`[]\>

Lists the immediate children of a directory in the origin private file system (OPFS).

#### Parameters

##### pathOrHandle

[`OpfsDirectoryTarget`](../type-aliases/OpfsDirectoryTarget.md)

An OPFS-relative path to the directory, or a
  FileSystemDirectoryHandle already obtained from OPFS (for example
  via [mkdir](#mkdir)). An empty path lists the OPFS root.

#### Returns

`Promise`\<`string`[]\>

A promise that resolves to the names of the directory's files and
  subdirectories, such as `'file.txt'`.

#### Remarks

Only direct children are listed; nested entries are omitted. Iteration order
is not guaranteed. A missing directory rejects with `NotFoundError`. A path
that names a file rejects with `TypeMismatchError`.

#### Example

```ts
await opfs.mkdir('personal/notes');
await opfs.write('personal/notes/test.txt', 'Hello World');
const entries = await opfs.readDir('personal/notes');
// ['test.txt']
```

### readFile

> **readFile**: (`pathOrHandle`) => `Promise`\<`ArrayBuffer`\>

Reads the bytes of a file in the origin private file system (OPFS).

#### Parameters

##### pathOrHandle

[`OpfsFileTarget`](../type-aliases/OpfsFileTarget.md)

An OPFS-relative path to the file, or a
  FileSystemFileHandle already obtained from OPFS (for example via
  [touch](#touch)).

#### Returns

`Promise`\<`ArrayBuffer`\>

A promise that resolves to an ArrayBuffer containing the
  file's bytes.

#### Remarks

The file must already exist. A missing file rejects with `NotFoundError`. A
path that names a directory rejects with `TypeMismatchError`. The bytes are
returned as-is; decode them with `TextDecoder` when the file holds text.

#### Example

```ts
await opfs.touch('personal/notes/test.txt');
await opfs.write('personal/notes/test.txt', 'Hello World');
const bytes = await opfs.readFile('personal/notes/test.txt');
const text = new TextDecoder().decode(bytes);
// 'Hello World'
```

### rm

> **rm**: (`pathOrHandle`, `options`) => `Promise`\<`boolean`\>

Removes a directory from the origin private file system (OPFS).

#### Parameters

##### pathOrHandle

[`OpfsDirectoryTarget`](../type-aliases/OpfsDirectoryTarget.md)

An OPFS-relative path to the directory, or a
  FileSystemDirectoryHandle already obtained from OPFS (for example
  via [mkdir](#mkdir)).

##### options?

[`OpfsRemoveOptions`](../interfaces/OpfsRemoveOptions.md) = `{}`

[OpfsRemoveOptions](../interfaces/OpfsRemoveOptions.md). Set `recursive` to remove a
  directory that still has children. Set `force` to succeed when the
  directory is already absent.

#### Returns

`Promise`\<`boolean`\>

A promise that resolves to `true` when the directory is removed, or
  when `force` is set and it was already absent. Resolves to `false` when
  removal fails.

#### Remarks

An empty directory is removed without `recursive`. A directory that still
has children stays in place unless `recursive` is `true`, in which case the
directory and everything under it are removed. Parent directories are left
in place. The OPFS root cannot be removed. A missing directory resolves to
`false` unless `force` is `true`. A path that names a file is left in place
and resolves to `false`. Those failures are logged with `console.error`. An
already-aborted `signal` resolves to `false` and removes nothing. Use
[unlink](#unlink) to remove a file.

#### Example

```ts
await opfs.mkdir('personal/notes');
await opfs.touch('personal/notes/test.txt');
const removed = await opfs.rm('personal/notes', { recursive: true });
// true
```

### rmrf

> **rmrf**: (`pathOrHandle`) => `Promise`\<`boolean`\>

Forcibly recursively removes a directory and everything under it from the origin private file
system (OPFS).

Shorthand for rm(pathOrHandle, \{ recursive: true, force: true )}.

#### Parameters

##### pathOrHandle

[`OpfsDirectoryTarget`](../type-aliases/OpfsDirectoryTarget.md)

An OPFS-relative path to the directory, or a
  FileSystemDirectoryHandle already obtained from OPFS (for example
  via [mkdir](#mkdir)).

#### Returns

`Promise`\<`boolean`\>

A promise that always resolves to `true` when the directory and its
  contents are removed.

#### Example

```ts
await opfs.mkdir('personal/notes');
await opfs.touch('personal/notes/test.txt');
const removed = await opfs.rmrf('personal/notes');
// true
```

### supported

> **supported**: () => `Promise`\<`OpfsSupported`\>

Returns whether the origin private file system is supported.

#### Returns

`Promise`\<`OpfsSupported`\>

#### Example

```ts
await opfs.supported();
```

### touch

> **touch**: (`filepath`) => `Promise`\<`FileSystemFileHandle`\>

Creates an empty file in the origin private file system (OPFS), including
any missing parent directories.

#### Parameters

##### filepath

`string`

An OPFS-relative path to the file. Missing parent
  directories are created.

#### Returns

`Promise`\<`FileSystemFileHandle`\>

A promise that resolves to the FileSystemFileHandle for the
  file at `filepath`.

#### Remarks

If the file already exists, its contents are left unchanged. An empty path,
or a path with a `.` or `..` segment, rejects with `TypeError` and creates
nothing. A path that already names a directory, or a parent segment that is
a file, rejects with `TypeMismatchError`.

#### Example

```ts
const file = await opfs.touch('personal/notes/test.txt');
await opfs.write(file, 'Hello World');
```

### unlink

> **unlink**: (`pathOrHandle`) => `Promise`\<`boolean`\>

Removes a file from the origin private file system (OPFS).

#### Parameters

##### pathOrHandle

[`OpfsFileTarget`](../type-aliases/OpfsFileTarget.md)

An OPFS-relative path to the file, or a
  FileSystemFileHandle already obtained from OPFS (for example via
  [touch](#touch)).

#### Returns

`Promise`\<`boolean`\>

A promise that resolves to `true` when the file is removed or was
  already absent, and `false` when removal fails for another reason.

#### Remarks

A missing file is treated as success, so calling this again with the same
path still resolves to `true`. Other failures, including a path that names a
directory, are logged with `console.error` and resolve to `false`. Parent
directories are left in place.

#### Example

```ts
await fs.touch('personal/notes/test.txt');
const removed = await fs.unlink('personal/notes/test.txt');
// true
```

### walkDir

> **walkDir**: (`pathOrHandle`) => `AsyncGenerator`\<\[`string`, `FileSystemHandle`\]\>

Yields each file in a directory. Subdirectories are not entered.

#### Parameters

##### pathOrHandle

[`OpfsDirectoryTarget`](../type-aliases/OpfsDirectoryTarget.md)

#### Returns

`AsyncGenerator`\<\[`string`, `FileSystemHandle`\]\>

An async iterable of `[path, handle]` pairs. `path` is `/`-separated
  and relative to `root`.

#### Remarks

Only files in the listed directory are yielded. The starting directory itself
is not yielded, and nested entries are omitted. Iteration order is not
guaranteed. An entry that cannot be resolved is skipped and a warning is
written to the console.

#### Example

```ts
for await (const [path, handle] of opfs.walkDir(root)) {
  console.log(path, handle.kind);
}
```

### write

> **write**: (`pathOrHandle`, `data`, `options?`) => `Promise`\<`void`\>

Replaces the contents of a file in the origin private file system (OPFS).

#### Parameters

##### pathOrHandle

[`OpfsFileTarget`](../type-aliases/OpfsFileTarget.md)

An OPFS-relative path to the file, or a
  FileSystemFileHandle already obtained from OPFS (for example via
  [touch](#touch)).

##### data

[`OpfsWriteData`](../type-aliases/OpfsWriteData.md)

Bytes, text, a blob, or a positioned [OpfsWriteCommand](../type-aliases/OpfsWriteCommand.md).
  A string is encoded as UTF-8.

##### options?

`OpfsCreateWritableOptions`

#### Returns

`Promise`\<`void`\>

A promise that resolves when the new contents have been written and
  the writable stream has been closed.

#### Remarks

The file must already exist; this does not create it or any parent
directories. Use [touch](#touch) first. Opening the writable stream discards
the current bytes before `data` is written. A missing file rejects with
`NotFoundError`. A path that names a directory rejects with
`TypeMismatchError`.

#### Example

```ts
await opfs.touch('personal/notes/test.txt');
await opfs.write('personal/notes/test.txt', 'Hello World');
```
