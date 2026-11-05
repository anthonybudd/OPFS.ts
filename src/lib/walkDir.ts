import { resolveDirectoryFromPath } from '../util/helpers.ts';
import type { OpfsDirectoryTarget } from '../types/v1.ts';

/**
 * Yields each file in a directory. Subdirectories are not entered.
 *
 * @param root - Directory the paths are resolved against. Paths are relative to
 *   this handle.
 * @param parent - Directory to list. Defaults to `root`. Pass a child directory
 *   to list its files while keeping paths relative to `root`.
 * @returns An async iterable of `[path, handle]` pairs. `path` is `/`-separated
 *   and relative to `root`.
 *
 * @remarks
 * Only files in the listed directory are yielded. The starting directory itself
 * is not yielded, and nested entries are omitted. Iteration order is not
 * guaranteed. An entry that cannot be resolved is skipped and a warning is
 * written to the console.
 *
 * @example
 * ```ts
 * for await (const [path, handle] of opfs.walkDir(root)) {
 *   console.log(path, handle.kind);
 * }
 * ```
 */
export async function* walkDir(
    pathOrHandle: OpfsDirectoryTarget,
): AsyncGenerator<[string, FileSystemHandle]> {
    const dir =
        typeof pathOrHandle === 'string'
            ? await resolveDirectoryFromPath(pathOrHandle)
            : pathOrHandle;

    for await (const [name, handle] of dir.entries()) {
        yield [name, handle];
    }
}
