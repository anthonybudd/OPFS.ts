import type { OpfsSupported } from '../types/v1.ts';

/**
 * Returns whether the origin private file system is supported.
 *
 * @example
 * ```ts
 * await opfs.supported();
 * ```
 */
export async function supported(): Promise<OpfsSupported> {
    let opfs = false;
    let observer = (
        typeof window !== "undefined" &&
        "FileSystemObserver" in window
    );

    try {
        await navigator.storage.getDirectory();
        opfs = true;
    } catch (error) { }

    return {
        opfs,
        observer,
    };
}
