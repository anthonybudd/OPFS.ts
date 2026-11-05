import type { OpfsRemoveOptions, OpfsWriteData, OpfsSupported, OpfsObserverCallback, OpfsObserverOptions } from '../../src/types/v1';

export interface OPFS {
  exists(target: string | FileSystemHandle): Promise<boolean>;
  mkdir(path: string): Promise<FileSystemDirectoryHandle>;
  touch(path: string): Promise<FileSystemFileHandle>;
  readFile(target: string | FileSystemFileHandle): Promise<ArrayBuffer>;
  readDir(target: string | FileSystemDirectoryHandle): Promise<string[]>;
  write(target: string | FileSystemFileHandle, data: OpfsWriteData): Promise<void>;
  unlink(target: string | FileSystemFileHandle): Promise<boolean>;
  walkDir(pathOrHandle: string | FileSystemDirectoryHandle): AsyncGenerator<[string, FileSystemHandle]>;
  rm(
    target: string | FileSystemDirectoryHandle,
    options?: OpfsRemoveOptions,
  ): Promise<boolean>;
  rmrf(target: string | FileSystemDirectoryHandle): Promise<boolean>;
  supported(): Promise<OpfsSupported>;
  observe(target: string | FileSystemHandle, callback: OpfsObserverCallback, options?: OpfsObserverOptions): Promise<FileSystemObserver>;
}

export interface Helpers {
  changeDir(path: string): Promise<FileSystemDirectoryHandle>;
  resolveFileFromPath(path: string): Promise<FileSystemFileHandle>;
  resolveDirectoryFromPath(path: string): Promise<FileSystemDirectoryHandle>;
  getParentDirectory(handle: FileSystemHandle): Promise<FileSystemDirectoryHandle>;
}

declare global {
  interface Window {
    opfs: OPFS;
    helpers: Helpers;
  }
}
