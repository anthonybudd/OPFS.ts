import { basename, directories, dirname, normalize } from '../util/helpers.ts';
import type { OpfsPath } from '../types/v1.ts';
import { mkdir } from './mkdir.js';

/**
 * Creates an empty file in the origin private file system (OPFS), including
 * any missing parent directories.
 *
 * @param filepath - An OPFS-relative path to the file. Missing parent
 *   directories are created.
 * @returns A promise that resolves to the {@link FileSystemFileHandle} for the
 *   file at `filepath`.
 *
 * @remarks
 * If the file already exists, its contents are left unchanged. An empty path,
 * or a path with a `.` or `..` segment, rejects with `TypeError` and creates
 * nothing. A path that already names a directory, or a parent segment that is
 * a file, rejects with `TypeMismatchError`.
 *
 * @example
 * ```ts
 * const file = await opfs.touch('personal/notes/test.txt');
 * await opfs.write(file, 'Hello World');
 * ```
 */
export async function touch(filepath: OpfsPath): Promise<FileSystemFileHandle> {
  const path = normalize(filepath);
  const segments = directories(path);

  if (
    segments.length === 0 ||
    segments.some((segment) => segment === '.' || segment === '..')
  ) {
    throw new TypeError(`Invalid file path: ${JSON.stringify(filepath)}`);
  }

  const dir = await mkdir(dirname(path));
  return dir.getFileHandle(basename(path), { create: true });
}
