import type { OpfsDirectoryTarget, OpfsRemoveOptions } from '../types/v1.ts';
import { changeDir, getParentDirectory } from '../util/helpers.ts';

/**
 * Removes a directory from the origin private file system (OPFS).
 *
 * @param pathOrHandle - An OPFS-relative path to the directory, or a
 *   {@link FileSystemDirectoryHandle} already obtained from OPFS (for example
 *   via {@link mkdir}).
 * @param options - {@link OpfsRemoveOptions}. Set `recursive` to remove a
 *   directory that still has children. Set `force` to succeed when the
 *   directory is already absent.
 * @returns A promise that resolves to `true` when the directory is removed, or
 *   when `force` is set and it was already absent. Resolves to `false` when
 *   removal fails.
 *
 * @remarks
 * An empty directory is removed without `recursive`. A directory that still
 * has children stays in place unless `recursive` is `true`, in which case the
 * directory and everything under it are removed. Parent directories are left
 * in place. The OPFS root cannot be removed. A missing directory resolves to
 * `false` unless `force` is `true`. A path that names a file is left in place
 * and resolves to `false`. Those failures are logged with `console.error`. An
 * already-aborted `signal` resolves to `false` and removes nothing. Use
 * {@link unlink} to remove a file.
 *
 * @example
 * ```ts
 * await opfs.mkdir('personal/notes');
 * await opfs.touch('personal/notes/test.txt');
 * const removed = await opfs.rm('personal/notes', { recursive: true });
 * // true
 * ```
 */
export async function rm(
  pathOrHandle: OpfsDirectoryTarget,
  options: OpfsRemoveOptions = {},
): Promise<boolean> {
  const recursive = options.recursive ?? false;
  const force = options.force ?? false;

  if (options.signal?.aborted) return false;

  try {
    const directory =
      typeof pathOrHandle === 'string' ? await changeDir(pathOrHandle) : pathOrHandle;
    const root = await navigator.storage.getDirectory();

    if (await root.isSameEntry(directory)) {
      throw new DOMException('Cannot remove the OPFS root', 'InvalidModificationError');
    }

    if (options.signal?.aborted) return false;

    const parent = await getParentDirectory(directory);
    await parent.removeEntry(directory.name, { recursive });

    return true;
  } catch (error) {
    if (error instanceof DOMException && error.name === 'NotFoundError') {
      return force;
    }

    const target = typeof pathOrHandle === 'string' ? pathOrHandle : pathOrHandle.name;
    console.error(
      `The following error occurred while trying to remove directory ${target}: ${error}`,
    );
    return false;
  }
}


/**
 * Forcibly recursively removes a directory and everything under it from the origin private file
 * system (OPFS).
 *
 * Shorthand for {@link rm | rm(pathOrHandle, { recursive: true, force: true })}.
 *
 * @param pathOrHandle - An OPFS-relative path to the directory, or a
 *   {@link FileSystemDirectoryHandle} already obtained from OPFS (for example
 *   via {@link mkdir}).
 * @returns A promise that always resolves to `true` when the directory and its
 *   contents are removed. 
 *
 * @example
 * ```ts
 * await opfs.mkdir('personal/notes');
 * await opfs.touch('personal/notes/test.txt');
 * const removed = await opfs.rmrf('personal/notes');
 * // true
 * ```
 */
export async function rmrf(pathOrHandle: OpfsDirectoryTarget): Promise<boolean> {
  return rm(pathOrHandle, { recursive: true, force: true });
}