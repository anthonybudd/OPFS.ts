import { basename, changeDir, dirname, normalize } from '../util/helpers.ts';
import type { OpfsEntryTarget } from '../types/v1.ts';

/**
 * Tests whether a file or directory exists in the origin private file system (OPFS).
 *
 * @param pathOrHandle - Either an OPFS-relative path to the entry to check, or a
 *   {@link FileSystemFileHandle} for a file that was already obtained from OPFS
 *   (for example via {@link touch} or {@link readFile}).
 * @returns A promise that resolves to `true` when the target file or directory is
 *   present, or `false` when it is missing or cannot be resolved without error.
 *
 * @remarks
 * This is a presence check only; it does not read file bytes or enumerate a
 * directory. Prefer {@link readFile} or {@link readDir} when you need contents.
 * For file paths, a missing entry should yield `false` rather than rejecting with
 * `NotFoundError`, so callers can branch without try/catch.
 *
 * @example
 * ```ts
 * if (await opfs.exists('cache/index.json')) {
 *   await opfs.readFile('cache/index.json');
 * }
 * ```
 */
export async function exists(pathOrHandle: OpfsEntryTarget): Promise<boolean> {
  try {
    if (typeof pathOrHandle !== 'string') {
      if (pathOrHandle instanceof FileSystemFileHandle) {
        return !!(await pathOrHandle.getFile());
      }
      if (pathOrHandle instanceof FileSystemDirectoryHandle) {
        const root = await navigator.storage.getDirectory();
        if (await root.isSameEntry(pathOrHandle)) return true;
        return Array.isArray(await root.resolve(pathOrHandle));
      }
      return false;
    }

    const path = normalize(pathOrHandle);
    const name = basename(path);
    if (name === '') return true;

    const directory = await changeDir(dirname(path));
    try {
      await directory.getFileHandle(name);
      return true;
    } catch (error) {
      if (!(error instanceof DOMException) || error.name !== 'TypeMismatchError') {
        return false;
      }
    }

    await directory.getDirectoryHandle(name);
    return true;
  } catch {
    return false;
  }
}
