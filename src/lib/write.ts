import type { OpfsFileTarget, OpfsWriteData } from '../types/v1.ts';
import { resolveFileFromPath } from '../util/helpers.ts';

/**
 * Replaces the contents of a file in the origin private file system (OPFS).
 *
 * @param pathOrHandle - An OPFS-relative path to the file, or a
 *   {@link FileSystemFileHandle} already obtained from OPFS (for example via
 *   {@link touch}).
 * @param data - Bytes, text, a blob, or a positioned {@link OpfsWriteCommand}.
 *   A string is encoded as UTF-8.
 * @returns A promise that resolves when the new contents have been written and
 *   the writable stream has been closed.
 *
 * @remarks
 * The file must already exist; this does not create it or any parent
 * directories. Use {@link touch} first. Opening the writable stream discards
 * the current bytes before `data` is written. A missing file rejects with
 * `NotFoundError`. A path that names a directory rejects with
 * `TypeMismatchError`.
 *
 * @example
 * ```ts
 * await opfs.touch('personal/notes/test.txt');
 * await opfs.write('personal/notes/test.txt', 'Hello World');
 * ```
 */
export async function write(
  pathOrHandle: OpfsFileTarget,
  data: OpfsWriteData,
): Promise<void> {
  const handle =
    typeof pathOrHandle === 'string'
      ? await resolveFileFromPath(pathOrHandle)
      : pathOrHandle;

  const stream = await handle.createWritable();
  await stream.write(data);
  await stream.close();
}
