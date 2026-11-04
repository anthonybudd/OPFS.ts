import type { OpfsDirectoryTarget, OpfsPath } from '../types/v1.ts';
import { changeDir } from '../util/helpers.ts';

/**
 * Lists the immediate children of a directory in the origin private file system (OPFS).
 *
 * @param pathOrHandle - An OPFS-relative path to the directory, or a
 *   {@link FileSystemDirectoryHandle} already obtained from OPFS (for example
 *   via {@link mkdir}). An empty path lists the OPFS root.
 * @returns A promise that resolves to the names of the directory's files and
 *   subdirectories, such as `'file.txt'`.
 *
 * @remarks
 * Only direct children are listed; nested entries are omitted. Iteration order
 * is not guaranteed. A missing directory rejects with `NotFoundError`. A path
 * that names a file rejects with `TypeMismatchError`.
 *
 * @example
 * ```ts
 * await opfs.mkdir('personal/notes');
 * await opfs.write('personal/notes/test.txt', 'Hello World');
 * const entries = await opfs.readDir('personal/notes');
 * // ['test.txt']
 * ```
 */
export async function readDir(pathOrHandle: OpfsDirectoryTarget): Promise<OpfsPath[]> {
  const entries: string[] = [];
  const dir = typeof pathOrHandle === 'string' ? await changeDir(pathOrHandle) : pathOrHandle;

  for await (const handle of dir.values()) {
    entries.push(handle.name);
  }

  return entries;
}
