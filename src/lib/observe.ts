import type { OpfsEntryTarget, OpfsObserverCallback, OpfsObserverOptions } from '../types/v1.ts';
import { resolveFileFromPath } from '../util/helpers.ts';

/**
 * Creates a new instance of a FileSystemObserver to watch for changes to a file or directory.
 *
 * @param pathOrHandle - An OPFS-relative path to a file, a directory, 
 *   {@link FileSystemFileHandle} or {@link FileSystemDirectoryHandle}.
 * @param callback - A function to call when a change is detected.
 * @param options - Optional options for the observer.
 * @returns A promise that resolves to the new FileSystemObserver instance.
 *
 * @remarks
 * This feature is not standardized. API and may change in the future.
 *
 * @example
 * ```ts
 * const observer = await opfs.observe('personal/notes/test.txt', (records, observer) => {
 *   for (const record of records) {
 *     console.log('Change detected:', record);
 *   }
 * });
 * ```
 */
export async function observe(
    pathOrHandle: OpfsEntryTarget,
    callback: OpfsObserverCallback,
    options?: OpfsObserverOptions,
): Promise<FileSystemObserver> {
    const handle =
        typeof pathOrHandle === 'string'
            ? await resolveFileFromPath(pathOrHandle)
            : pathOrHandle;

    const observer = new FileSystemObserver(callback);
    await observer.observe(handle, options);
    return observer;
}
