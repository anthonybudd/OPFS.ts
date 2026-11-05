import { directories, normalize } from '../util/helpers.ts';
import type { OpfsPath } from '../types/v1.ts';

/**
 * Creates every directory in an origin private file system (OPFS) path and
 * returns a handle to the last one.
 *
 * @param path - An OPFS-relative path. Missing segments are created. An empty
 *   path returns the OPFS root.
 * @returns A promise that resolves to the {@link FileSystemDirectoryHandle} for
 *   the final directory in `path`.
 *
 * @remarks
 * Directories that already exist along the path are reused, so calling this
 * again with the same path does not fail. Parent directories are always
 * created. A segment that is already a file rejects with `TypeMismatchError`.
 * Use {@link touch} or {@link write} to create a file inside the new directory.
 *
 * @example
 * ```ts
 * const dir = await opfs.mkdir('personal/notes');
 * await opfs.write('personal/notes/test.txt', 'Hello World');
 * ```
 */
export async function mkdir(path: OpfsPath): Promise<FileSystemDirectoryHandle> {
  const root = await navigator.storage.getDirectory();

  const mkdir_p = async function (
    parent: FileSystemDirectoryHandle,
    path: string[],
  ): Promise<FileSystemDirectoryHandle> {
    const name = path.shift();
    if (!name) return parent;

    const child = await parent.getDirectoryHandle(name, { create: true });
    const dir = await mkdir_p(child, path);

    return dir;
  };

  return mkdir_p(root, directories(normalize(path)));
}
