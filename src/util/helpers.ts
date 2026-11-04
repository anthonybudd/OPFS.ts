/**
 * Returns a handle to the directory at `path`, without creating it.
 *
 * @param path - An OPFS-relative directory path. An empty path is the OPFS root.
 * @returns A promise that resolves to the {@link FileSystemDirectoryHandle}.
 *
 * @remarks
 * A missing directory rejects with `NotFoundError`. A segment that names a
 * file rejects with `TypeMismatchError`.
 */
export async function changeDir(path: string): Promise<FileSystemDirectoryHandle> {
  let dir = await navigator.storage.getDirectory();
  let p = directories(normalize(path));
  for (const name of p) {
    if (!name) break;
    dir = await dir.getDirectoryHandle(name);
  }
  return dir;
}

/**
 * Returns a handle to the file at `path`, without creating it.
 *
 * @param path - An OPFS-relative file path.
 * @returns A promise that resolves to the {@link FileSystemFileHandle}.
 *
 * @remarks
 * A missing file rejects with `NotFoundError`. A path that names a directory
 * rejects with `TypeMismatchError`.
 */
export async function resolveFileFromPath(path: string): Promise<FileSystemFileHandle> {
  const filepath = normalize(path);
  const filename = basename(filepath);

  const directory = await changeDir(dirname(filepath));
  const handle = await directory.getFileHandle(filename);

  return handle;
}

/**
 * Returns a handle to the directory at `path`, without creating it.
 *
 * @param path - An OPFS-relative directory path. An empty path is the OPFS root.
 * @returns A promise that resolves to the {@link FileSystemDirectoryHandle}.
 *
 * @remarks
 * A missing directory rejects with `NotFoundError`. A segment that names a
 * file rejects with `TypeMismatchError`.
 */
export async function resolveDirectoryFromPath(path: string): Promise<FileSystemDirectoryHandle> {
  const dirpath = normalize(path);
  const dirname = basename(dirpath);

  const directory = await changeDir(dirname);
  return directory;
}

/**
 * Splits a path into directory and file segments.
 *
 * @param path - A file or directory path.
 * @returns Trimmed segments, with empty segments removed.
 */
export const directories = (path: string): string[] => (path
  .split('/')
  .map((dir) => dir.trim())
  .filter((dir) => dir !== ''));


/**
 * Returns the directory that contains `handle`.
 *
 * @param handle - A file or directory handle already obtained from OPFS.
 * @returns A promise that resolves to the parent
 *   {@link FileSystemDirectoryHandle}. The OPFS root is returned when `handle`
 *   is the root or a direct child of it.
 *
 * @remarks
 * Rejects with `NotFoundError` when the handle cannot be resolved against the
 * OPFS root, including when the entry was already removed.
 */
export async function getParentDirectory(
  handle: FileSystemHandle,
): Promise<FileSystemDirectoryHandle> {
  const root = await navigator.storage.getDirectory();
  const path = await root.resolve(handle);

  if (!path) throw new DOMException('Failed to resolve file', 'NotFoundError');
  if (path.length < 2) return root;
  path.pop();

  const directory = await changeDir(path.join('/'));
  return directory;
}


/**
 * Trims a path and collapses it to a relative OPFS path.
 *
 * Repeated slashes become one slash, and a leading or trailing `/` is removed.
 * Individual segments are left as written; {@link directories} trims those.
 *
 * @param path - A file or directory path.
 * @returns The normalized path, or an empty string when `path` has no segments.
 */
export const normalize = (path: string): string => (path.trim().replace(/\/+/g, '/').replace(/^\//, '').replace(/\/$/, ''));

/**
 * Returns the last segment of a path.
 *
 * @param path - A file or directory path. Empty segments are dropped the same
 *   way as in {@link directories}.
 * @returns The final segment, or an empty string when `path` has none.
 */
export const basename = (path: string): string => (directories(path).pop() || '');

/**
 * Returns every segment of a path except the last.
 *
 * @param path - A file or directory path. Segments are trimmed and empty
 *   segments are dropped, as in {@link directories}.
 * @returns The parent path joined with `/`, or an empty string when `path`
 *   has fewer than two segments.
 */
export const dirname = (path: string): string => (directories(path).slice(0, -1).join('/') || '');
