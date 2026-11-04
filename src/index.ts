/**
 * A TypeScript API for the origin private file system.
 *
 * @packageDocumentation
 */

export type {
    OpfsChange,
    OpfsChangeType,
    OpfsCopyOptions,
    OpfsDirectoryDirent,
    OpfsDirectoryStat,
    OpfsDirectoryTarget,
    OpfsDirent,
    OpfsEncoding,
    OpfsEntryChange,
    OpfsEntryKind,
    OpfsEntryTarget,
    OpfsFileDirent,
    OpfsFileStat,
    OpfsFileTarget,
    OpfsGlobOptions,
    OpfsMkdirOptions,
    OpfsMoveOptions,
    OpfsMovedChange,
    OpfsOpenFlag,
    OpfsOpenOptions,
    OpfsPath,
    OpfsReadAs,
    OpfsReadDirOptions,
    OpfsReadDirResult,
    OpfsReadOptions,
    OpfsReadResult,
    OpfsRemoveOptions,
    OpfsRootOptions,
    OpfsStat,
    OpfsStorageEstimate,
    OpfsSyncAccessMode,
    OpfsSyncAccessOptions,
    OpfsTouchOptions,
    OpfsTruncateOptions,
    OpfsWalkEntry,
    OpfsWalkOptions,
    OpfsWatchListener,
    OpfsWatchOptions,
    OpfsWriteCommand,
    OpfsWriteData,
    OpfsWriteOptions,
} from './types/v1.ts';

export {
    OpfsAbortError,
    OpfsError,
    OpfsInvalidStateError,
    OpfsNotAllowedError,
    OpfsNotFoundError,
    OpfsNotReadableError,
    OpfsQuotaExceededError,
    OpfsReadError,
    OpfsReadOnlyError,
    OpfsTypeMismatchError,
    OpfsWriteError,
    toOpfsError,
} from './errors/errors.ts';

import { exists } from './lib/exists.ts';
import { mkdir } from './lib/mkdir.ts';
import { readDir } from './lib/readDir.ts';
import { readFile } from './lib/readFile.ts';
import { touch } from './lib/touch.ts';
import { unlink } from './lib/unlink.ts';
import { write } from './lib/write.ts';
import { walkDir } from './lib/walkDir.ts';
import { rm, rmrf } from './lib/rm.ts';

export default {
    exists,
    mkdir,
    readDir,
    readFile,
    touch,
    unlink,
    write,
    walkDir,
    rm,
    rmrf,
};