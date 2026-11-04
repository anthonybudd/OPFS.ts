/**
 * Options for {@link OpfsError} and its subclasses.
 */
export interface OpfsErrorOptions {
  /** OPFS path the operation was acting on, when known. */
  path?: string;
  /** Underlying DOMException or other failure. */
  cause?: unknown;
}

/**
 * Which OPFS operation failed. Used by {@link toOpfsError} when a DOMException
 * is not specific to reading or writing.
 */
export type OpfsOperation = 'read' | 'write';

/**
 * Path and operation to attach when converting a thrown value into an {@link OpfsError}.
 */
export interface OpfsErrorContext {
  operation: OpfsOperation;
  path?: string;
}

/**
 * Base class for failures while reading or writing the origin private file system.
 *
 * The `path` is appended to `message` when it is provided. `cause` preserves the
 * original {@link DOMException} so callers can still inspect the browser error.
 */
export class OpfsError extends Error {
  readonly path?: string;

  constructor(message: string, options: OpfsErrorOptions = {}) {
    const text =
      options.path === undefined
        ? message
        : `${message}: ${JSON.stringify(options.path)}`;
    super(text, options.cause === undefined ? undefined : { cause: options.cause });
    this.name = new.target.name;
    if (options.path !== undefined) {
      this.path = options.path;
    }
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * Reading a file or directory failed.
 *
 * Use a more specific subclass when the browser error identifies the reason
 * ({@link OpfsNotFoundError}, {@link OpfsNotReadableError}, {@link OpfsTypeMismatchError}).
 */
export class OpfsReadError extends OpfsError {
  constructor(message = 'Failed to read from OPFS', options: OpfsErrorOptions = {}) {
    super(message, options);
  }
}

/**
 * Writing a file failed.
 *
 * Use a more specific subclass when the browser error identifies the reason
 * ({@link OpfsQuotaExceededError}, {@link OpfsReadOnlyError}, {@link OpfsNotFoundError}).
 */
export class OpfsWriteError extends OpfsError {
  constructor(message = 'Failed to write to OPFS', options: OpfsErrorOptions = {}) {
    super(message, options);
  }
}

/**
 * The file or directory does not exist.
 *
 * Corresponds to the File System API `NotFoundError` DOMException, raised by
 * both reads (`getFile`, `getFileHandle`) and writes when a parent or target
 * entry is missing.
 */
export class OpfsNotFoundError extends OpfsError {
  constructor(message = 'File or directory not found', options: OpfsErrorOptions = {}) {
    super(message, options);
  }
}

/**
 * A file exists but its bytes could not be read.
 *
 * Corresponds to `NotReadableError`, for example when the underlying file
 * disappears or becomes unreadable after the handle was obtained.
 */
export class OpfsNotReadableError extends OpfsReadError {
  constructor(message = 'File is not readable', options: OpfsErrorOptions = {}) {
    super(message, options);
  }
}

/**
 * An entry exists but is the wrong kind.
 *
 * Corresponds to `TypeMismatchError`: a directory where a file was required,
 * or a file where a directory was required.
 */
export class OpfsTypeMismatchError extends OpfsError {
  constructor(
    message = 'Path exists but is the wrong entry type',
    options: OpfsErrorOptions = {},
  ) {
    super(message, options);
  }
}

/**
 * The origin is not allowed to read or write the entry.
 *
 * Corresponds to `NotAllowedError` and `SecurityError`.
 */
export class OpfsNotAllowedError extends OpfsError {
  constructor(message = 'OPFS access was denied', options: OpfsErrorOptions = {}) {
    super(message, options);
  }
}

/**
 * The write would exceed the origin storage quota.
 *
 * Corresponds to `QuotaExceededError` from `FileSystemWritableFileStream.write()`.
 */
export class OpfsQuotaExceededError extends OpfsWriteError {
  constructor(message = 'Storage quota exceeded', options: OpfsErrorOptions = {}) {
    super(message, options);
  }
}

/**
 * The entry cannot be modified.
 *
 * Corresponds to `NoModificationAllowedError`.
 */
export class OpfsReadOnlyError extends OpfsWriteError {
  constructor(message = 'File is read-only', options: OpfsErrorOptions = {}) {
    super(message, options);
  }
}

/**
 * The handle or writable stream is closed or locked.
 *
 * Corresponds to `InvalidStateError`, for example writing after `close()`, or
 * calling `createWritable()` while a sync access handle already locks the file.
 */
export class OpfsInvalidStateError extends OpfsError {
  constructor(
    message = 'File handle is closed or locked',
    options: OpfsErrorOptions = {},
  ) {
    super(message, options);
  }
}

/**
 * The read or write was aborted.
 *
 * Corresponds to `AbortError`.
 */
export class OpfsAbortError extends OpfsError {
  constructor(message = 'OPFS operation was aborted', options: OpfsErrorOptions = {}) {
    super(message, options);
  }
}

function errorOptions(error: unknown, context: OpfsErrorContext): OpfsErrorOptions {
  const options: OpfsErrorOptions = {};
  if (error !== undefined) options.cause = error;
  if (context.path !== undefined) options.path = context.path;
  return options;
}

function errorMessage(error: unknown): string | undefined {
  if (error instanceof Error && error.message !== '') return error.message;
  return undefined;
}

/**
 * Maps a thrown value from a read or write into an {@link OpfsError}.
 *
 * `DOMException` names used by the File System API are mapped to a subclass.
 * Any other failure becomes {@link OpfsReadError} or {@link OpfsWriteError}
 * according to `context.operation`. Values that are already an {@link OpfsError}
 * are returned unchanged.
 */
export function toOpfsError(error: unknown, context: OpfsErrorContext): OpfsError {
  if (error instanceof OpfsError) return error;

  const options = errorOptions(error, context);
  const message = errorMessage(error);

  if (error instanceof DOMException) {
    switch (error.name) {
      case 'NotFoundError':
        return new OpfsNotFoundError(message, options);
      case 'NotReadableError':
        return new OpfsNotReadableError(message, options);
      case 'TypeMismatchError':
        return new OpfsTypeMismatchError(message, options);
      case 'NotAllowedError':
      case 'SecurityError':
        return new OpfsNotAllowedError(message, options);
      case 'QuotaExceededError':
        return new OpfsQuotaExceededError(message, options);
      case 'NoModificationAllowedError':
        return new OpfsReadOnlyError(message, options);
      case 'InvalidStateError':
        return new OpfsInvalidStateError(message, options);
      case 'AbortError':
        return new OpfsAbortError(message, options);
      default:
        break;
    }
  }

  return context.operation === 'read'
    ? new OpfsReadError(message, options)
    : new OpfsWriteError(message, options);
}
