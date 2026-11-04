import type { OpfsFileTarget, OpfsReadResult } from '../types/v1.ts';
import { resolveFileFromPath } from '../util/helpers.ts';

/**
 * Reads the bytes of a file in the origin private file system (OPFS).
 *
 * @param pathOrHandle - An OPFS-relative path to the file, or a
 *   {@link FileSystemFileHandle} already obtained from OPFS (for example via
 *   {@link touch}).
 * @returns A promise that resolves to an {@link ArrayBuffer} containing the
 *   file's bytes.
 *
 * @remarks
 * The file must already exist. A missing file rejects with `NotFoundError`. A
 * path that names a directory rejects with `TypeMismatchError`. The bytes are
 * returned as-is; decode them with `TextDecoder` when the file holds text.
 *
 * @example
 * ```ts
 * await opfs.touch('personal/notes/test.txt');
 * await opfs.write('personal/notes/test.txt', 'Hello World');
 * const bytes = await opfs.readFile('personal/notes/test.txt');
 * const text = new TextDecoder().decode(bytes);
 * // 'Hello World'
 * ```
 */
export async function readFile(pathOrHandle: OpfsFileTarget): Promise<OpfsReadResult> {
  const handle =
    typeof pathOrHandle === 'string'
      ? await resolveFileFromPath(pathOrHandle)
      : pathOrHandle;

  const file = await handle.getFile();
  return file.arrayBuffer();
}
