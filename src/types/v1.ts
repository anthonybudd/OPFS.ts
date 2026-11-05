/**
 * Public types for the origin private file system.
 *
 * Browser handles (`FileSystemFileHandle`, `FileSystemDirectoryHandle`,
 * `FileSystemWritableFileStream`) come from the DOM. This module describes
 * paths, metadata, and options for library operations, and fills File System
 * API members that TypeScript's DOM lib does not declare yet.
 */

/** Lock mode for {@link FileSystemFileHandle.createSyncAccessHandle}. */
export type OpfsSyncAccessMode = 'read-only' | 'readwrite' | 'readwrite-unsafe';

/**
 * Why a watched origin-private entry changed.
 *
 * @see https://developer.mozilla.org/docs/Web/API/FileSystemChangeRecord/type
 */
export type OpfsChangeType =
  'appeared' | 'disappeared' | 'modified' | 'moved' | 'unknown' | 'errored';

declare global {
  /**
   * Byte offset for {@link FileSystemSyncAccessHandle.read} and
   * {@link FileSystemSyncAccessHandle.write}.
   */
  interface FileSystemReadWriteOptions {
    /** Position to read or write at, in bytes. */
    at?: number;
  }

  /** Lock mode for {@link FileSystemFileHandle.createSyncAccessHandle}. */
  type FileSystemSyncAccessHandleMode = OpfsSyncAccessMode;

  /** Options for {@link FileSystemFileHandle.createSyncAccessHandle}. */
  interface FileSystemCreateSyncAccessHandleOptions {
    /**
     * `readwrite` is the default. `read-only` rejects writes.
     * `readwrite-unsafe` allows concurrent access in supporting browsers.
     */
    mode?: OpfsSyncAccessMode;
  }

  /**
   * Synchronous file access. Available inside dedicated workers, and in some
   * browsers on the main thread.
   *
   * @see https://developer.mozilla.org/docs/Web/API/FileSystemSyncAccessHandle
   */
  interface FileSystemSyncAccessHandle {
    close(): void;
    flush(): void;
    getSize(): number;
    read(buffer: AllowSharedBufferSource, options?: FileSystemReadWriteOptions): number;
    truncate(newSize: number): void;
    write(buffer: AllowSharedBufferSource, options?: FileSystemReadWriteOptions): number;
  }

  var FileSystemSyncAccessHandle: {
    prototype: FileSystemSyncAccessHandle;
    new(): FileSystemSyncAccessHandle;
  };

  interface FileSystemFileHandle {
    /**
     * Opens the file for synchronous reads and writes.
     *
     * @see https://developer.mozilla.org/docs/Web/API/FileSystemFileHandle/createSyncAccessHandle
     */
    createSyncAccessHandle(
      options?: FileSystemCreateSyncAccessHandleOptions,
    ): Promise<FileSystemSyncAccessHandle>;
  }

  interface FileSystemHandle {
    /**
     * Renames the entry, or moves it into another directory in the same file system.
     *
     * @see https://developer.mozilla.org/docs/Web/API/FileSystemHandle/move
     */
    move(name: string): Promise<void>;
    move(destinationDirectory: FileSystemDirectoryHandle, name?: string): Promise<void>;
    /**
     * Removes this entry. `recursive` is required to remove a non-empty directory.
     *
     * @see https://developer.mozilla.org/docs/Web/API/FileSystemHandle/remove
     */
    remove(options?: FileSystemRemoveOptions): Promise<void>;
  }

  interface FileSystemDirectoryHandle {
    /**
     * @see https://developer.mozilla.org/docs/Web/API/FileSystemDirectoryHandle/keys
     */
    keys(): AsyncIterableIterator<string>;
    /**
     * @see https://developer.mozilla.org/docs/Web/API/FileSystemDirectoryHandle/values
     */
    values(): AsyncIterableIterator<FileSystemFileHandle | FileSystemDirectoryHandle>;
    /**
     * @see https://developer.mozilla.org/docs/Web/API/FileSystemDirectoryHandle/entries
     */
    entries(): AsyncIterableIterator<
      [string, FileSystemFileHandle | FileSystemDirectoryHandle]
    >;
    [Symbol.asyncIterator](): AsyncIterableIterator<
      [string, FileSystemFileHandle | FileSystemDirectoryHandle]
    >;
  }

  /**
   * Why a watched origin-private entry changed.
   *
   * @see https://developer.mozilla.org/docs/Web/API/FileSystemChangeRecord/type
   */
  type FileSystemChangeType = OpfsChangeType;

  /**
   * One change delivered to a {@link FileSystemObserver}.
   *
   * @see https://developer.mozilla.org/docs/Web/API/FileSystemChangeRecord
   */
  interface FileSystemChangeRecord {
    root: FileSystemHandle;
    changedHandle: FileSystemHandle;
    /** Path components from `root` to the changed entry. */
    relativePathComponents: string[];
    type: FileSystemChangeType;
    /** Previous path components when {@link FileSystemChangeRecord.type} is `moved`. */
    relativePathMovedFrom?: string[];
  }

  interface FileSystemObserverObserveOptions {
    /** Watch descendants of a directory as well as the directory itself. */
    recursive?: boolean;
  }

  type FileSystemObserverCallback = (
    records: FileSystemChangeRecord[],
    observer: FileSystemObserver,
  ) => void;

  /**
   * Reports changes to files and directories in the origin private file system.
   *
   * @see https://developer.mozilla.org/docs/Web/API/FileSystemObserver
   */
  interface FileSystemObserver {
    observe(
      handle: FileSystemHandle,
      options?: FileSystemObserverObserveOptions,
    ): Promise<void>;
    unobserve(handle: FileSystemHandle): void;
    disconnect(): void;
  }

  var FileSystemObserver: {
    prototype: FileSystemObserver;
    new(callback: FileSystemObserverCallback): FileSystemObserver;
  };
}

/**
 * Path inside the origin private file system, relative to the storage root.
 *
 * Segments are separated by `/`. An empty string is the root. Library
 * functions accept unnormalized paths and normalize them before resolving.
 */
export type OpfsPath = string;

/** A file path or a handle already obtained from OPFS. */
export type OpfsFileTarget = OpfsPath | FileSystemFileHandle;

/** A directory path or a handle already obtained from OPFS. */
export type OpfsDirectoryTarget = OpfsPath | FileSystemDirectoryHandle;

/** A file or directory path, or any OPFS handle. */
export type OpfsEntryTarget = OpfsPath | FileSystemHandle;

/** Whether an entry is a file or a directory. */
export type OpfsEntryKind = FileSystemHandleKind;

/**
 * Text encoding for string reads and writes.
 * UTF-8 is the encoding OPFS uses when a string is passed to a writable stream.
 */
export type OpfsEncoding = 'utf-8' | 'utf8';

/**
 * Form of the bytes returned by a file read.
 * {@link readFile} returns an {@link ArrayBuffer}, which is `arrayBuffer`.
 */
export type OpfsReadAs =
  'arrayBuffer' | 'uint8array' | 'text' | 'blob' | 'stream' | 'file';

/** Bytes returned for a given {@link OpfsReadAs} value. */
export type OpfsReadResult<T extends OpfsReadAs | undefined = undefined> =
  T extends 'text'
  ? string
  : T extends 'uint8array'
  ? Uint8Array<ArrayBuffer>
  : T extends 'blob'
  ? Blob
  : T extends 'stream'
  ? ReadableStream<Uint8Array<ArrayBuffer>>
  : T extends 'file'
  ? File
  : ArrayBuffer;

/** Options for reading a file. */
export interface OpfsReadOptions {
  /** Defaults to an {@link ArrayBuffer}. */
  as?: OpfsReadAs;
  /** Used when {@link OpfsReadOptions.as} is `text`. Defaults to UTF-8. */
  encoding?: OpfsEncoding;
  signal?: AbortSignal;
}

/**
 * A single command written to a {@link FileSystemWritableFileStream}.
 * `position` and `size` are byte offsets.
 */
export type OpfsWriteCommand =
  | {
    type: 'write';
    data: BufferSource | Blob | string;
    position?: number;
  }
  | {
    type: 'seek';
    position: number;
  }
  | {
    type: 'truncate';
    size: number;
  };

/** Data accepted by a file write: bytes, text, a blob, or a positioned command. */
export type OpfsWriteData = BufferSource | Blob | string | OpfsWriteCommand;

/** Options for creating or replacing a file. */
export interface OpfsWriteOptions {
  /**
   * Append to existing bytes.
   * When omitted, the write replaces the file.
   */
  append?: boolean;
  /**
   * Create the file and any missing parent directories.
   * @defaultValue true
   */
  create?: boolean;
  /** Fail when the file already exists. */
  exclusive?: boolean;
  /**
   * Keep the current bytes when opening the writable stream.
   * Corresponds to `FileSystemCreateWritableOptions.keepExistingData`.
   * Implied when {@link OpfsWriteOptions.append} is set.
   */
  keepExistingData?: boolean;
  /** Encoding used when the written data is a string. @defaultValue `'utf-8'` */
  encoding?: OpfsEncoding;
  signal?: AbortSignal;
}

/**
 * How a file is opened.
 *
 * - `r` — read an existing file
 * - `w` — create or truncate, then write
 * - `a` — create if needed, then append
 * - `wx` — create and write, failing when the file exists
 * - `ax` — create and append, failing when the file exists
 */
export type OpfsOpenFlag = 'r' | 'w' | 'a' | 'wx' | 'ax';

/** Options for opening a file handle or writable stream. */
export interface OpfsOpenOptions {
  /** @defaultValue `'r'` */
  flag?: OpfsOpenFlag;
  signal?: AbortSignal;
}

/** Options for creating directories. */
export interface OpfsMkdirOptions {
  /**
   * Create missing parent directories.
   * @defaultValue true
   */
  recursive?: boolean;
  signal?: AbortSignal;
}

/** Options for creating an empty file without changing one that already exists. */
export interface OpfsTouchOptions {
  /**
   * Create missing parent directories.
   * @defaultValue true
   */
  recursive?: boolean;
  /** Fail when the file already exists. */
  exclusive?: boolean;
  signal?: AbortSignal;
}

/** A directory listing entry. Call {@link OpfsDirent.isFile} to narrow the handle. */
export interface OpfsDirent {
  readonly name: string;
  /** Path relative to the OPFS root. */
  readonly path: OpfsPath;
  readonly kind: OpfsEntryKind;
  isFile(): this is OpfsFileDirent;
  isDirectory(): this is OpfsDirectoryDirent;
}

/** {@link OpfsDirent} for a file. */
export interface OpfsFileDirent extends OpfsDirent {
  readonly kind: 'file';
  readonly handle: FileSystemFileHandle;
}

/** {@link OpfsDirent} for a directory. */
export interface OpfsDirectoryDirent extends OpfsDirent {
  readonly kind: 'directory';
  readonly handle: FileSystemDirectoryHandle;
}

/** Options for listing a directory. */
export interface OpfsReadDirOptions {
  /** Walk nested directories. */
  recursive?: boolean;
  /** Return {@link OpfsDirent} values instead of paths. */
  withFileTypes?: boolean;
  signal?: AbortSignal;
}

/** Paths, or directory entries when `withFileTypes` is set. */
export type OpfsReadDirResult<
  Options extends OpfsReadDirOptions | undefined = undefined,
> = Options extends { withFileTypes: true; } ? OpfsDirent[] : OpfsPath[];

/** Metadata for a file. */
export interface OpfsFileStat {
  kind: 'file';
  name: string;
  path: OpfsPath;
  handle: FileSystemFileHandle;
  /** Length in bytes. */
  size: number;
  /** Last modified time, in milliseconds since the Unix epoch. */
  lastModified: number;
  /** MIME type reported by `File.type`. Empty when the browser cannot infer one. */
  type: string;
}

/** Metadata for a directory. Directories do not expose a size or mtime. */
export interface OpfsDirectoryStat {
  kind: 'directory';
  name: string;
  path: OpfsPath;
  handle: FileSystemDirectoryHandle;
}

/** Metadata returned for either kind of entry. */
export type OpfsStat = OpfsFileStat | OpfsDirectoryStat;

/** An entry visited while walking a directory tree. */
export interface OpfsWalkEntry {
  path: OpfsPath;
  kind: OpfsEntryKind;
  handle: FileSystemHandle;
}

/** Options for walking a directory tree. */
export interface OpfsWalkOptions {
  /** Include the starting directory in the results. */
  includeSelf?: boolean;
  signal?: AbortSignal;
}

/** Options for removing a file or directory. */
export interface OpfsRemoveOptions {
  /** Remove a directory and everything under it. */
  recursive?: boolean;
  /** Succeed when the entry is already gone. */
  force?: boolean;
  signal?: AbortSignal;
}

/** Options for resizing a file. */
export interface OpfsTruncateOptions {
  /** New size in bytes. @defaultValue 0 */
  size?: number;
  signal?: AbortSignal;
}

/** Options for copying a file or directory tree. */
export interface OpfsCopyOptions {
  /** Replace an existing file at the destination. */
  overwrite?: boolean;
  /** Copy directories. Required when the source is a directory. */
  recursive?: boolean;
  signal?: AbortSignal;
}

/** Options for moving or renaming an entry inside OPFS. */
export interface OpfsMoveOptions {
  /** Replace an existing file at the destination. */
  overwrite?: boolean;
  signal?: AbortSignal;
}

/** Options for matching paths inside OPFS. */
export interface OpfsGlobOptions {
  /**
   * Include directories in the results.
   * @defaultValue true
   */
  includeDirectories?: boolean;
  signal?: AbortSignal;
}

/** Options for opening a synchronous access handle. */
export interface OpfsSyncAccessOptions {
  /**
   * @defaultValue `'readwrite'`
   */
  mode?: OpfsSyncAccessMode;
}

/** A change observed in the origin private file system. */
export type OpfsChange = OpfsMovedChange | OpfsEntryChange;

interface OpfsChangeBase {
  /** Path of the changed entry relative to the OPFS root. */
  path: OpfsPath;
  /** Handle that was passed to `observe`. */
  root: FileSystemHandle;
  changedHandle: FileSystemHandle;
  /** Path components from {@link OpfsChangeBase.root} to the changed entry. */
  relativePathComponents: readonly string[];
}

/** A change that is not a move. */
export interface OpfsEntryChange extends OpfsChangeBase {
  type: Exclude<OpfsChangeType, 'moved'>;
}

/** A change recorded when an entry is renamed or moved. */
export interface OpfsMovedChange extends OpfsChangeBase {
  type: 'moved';
  /** Path components of the entry before the move, relative to `root`. */
  relativePathMovedFrom: readonly string[];
}

/** Called with a batch of {@link OpfsChange} records. */
export type OpfsWatchListener = (records: readonly OpfsChange[]) => void;

/** Options for watching a file or directory. */
export interface OpfsWatchOptions {
  /** Watch descendants of a directory as well as the directory itself. */
  recursive?: boolean;
  signal?: AbortSignal;
}

/**
 * Quota and persistence for the origin that owns this OPFS.
 * `usage` and `quota` are bytes.
 */
export interface OpfsStorageEstimate {
  usage: number;
  quota: number;
  /**
   * `usage / quota`, from 0 to 1.
   * Absent when the browser does not report a quota.
   */
  usageRatio?: number;
  /** Whether the origin has been granted persistent storage. */
  persisted: boolean;
}

/**
 * Which origin-private directory library calls start from.
 * Omit `bucket` to use `navigator.storage.getDirectory()`.
 */
export interface OpfsRootOptions {
  /** Named storage bucket to open instead of the default bucket. */
  bucket?: string;
}

/** Whether the origin private file system is supported. */
export interface OpfsSupported {
  opfs: boolean;
  observer: boolean;
}

/** FileSystemObserver callback */
export type OpfsObserverCallback = (
  records: FileSystemChangeRecord[],
  observer: FileSystemObserver,
) => void;

/** Options for watching a file or directory. */
export interface OpfsObserverOptions {
  recursive?: boolean;
}

/** Options for creating a writable stream. */
export interface OpfsCreateWritableOptions extends FileSystemCreateWritableOptions {
  /**
   * `exclusive` - Only one FileSystemWritableFileStream writer can be opened. Attempting to open subsequent writers before the first writer is closed results in a NoModificationAllowedError exception being thrown.
   * `siloed` - Multiple FileSystemWritableFileStream writers can be opened at the same time, each with its own swap file, for example when using the same app in multiple tabs. The last writer opened has its data written, as the data gets flushed when each writer is closed.
   */
  mode?: 'exclusive' | 'siloed';
}