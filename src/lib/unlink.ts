import type { OpfsFileTarget } from '../types/v1.ts';
import { getParentDirectory, resolveFileFromPath } from '../util/helpers.ts';

/**
 * Removes a file from the origin private file system (OPFS).
 *
 * @param pathOrHandle - An OPFS-relative path to the file, or a
 *   {@link FileSystemFileHandle} already obtained from OPFS (for example via
 *   {@link touch}).
 * @returns A promise that resolves to `true` when the file is removed or was
 *   already absent, and `false` when removal fails for another reason.
 *
 * @remarks
 * A missing file is treated as success, so calling this again with the same
 * path still resolves to `true`. Other failures, including a path that names a
 * directory, are logged with `console.error` and resolve to `false`. Parent
 * directories are left in place.
 *
 * @example
 * ```ts
 * await opfs.touch('personal/notes/test.txt');
 * const removed = await opfs.unlink('personal/notes/test.txt');
 * // true
 * ```
 */
export async function unlink(pathOrHandle: OpfsFileTarget): Promise<boolean> {
  try {
    const file =
      typeof pathOrHandle === 'string'
        ? await resolveFileFromPath(pathOrHandle)
        : pathOrHandle;
    const directory = await getParentDirectory(file);

    await directory.removeEntry(file.name, { recursive: false });

    return true;
  } catch (error) {
    // ensure function's idempotency
    if (error instanceof DOMException && error.name === 'NotFoundError') {
      return true;
    }
    console.error(
      `The following error occurred while trying to remove file ${pathOrHandle}: ${error}`,
    );
    return false;
  }
}
