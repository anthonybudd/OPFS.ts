import opfs from './../../src/index';

import {
  changeDir,
  getParentDirectory,
  resolveDirectoryFromPath,
  resolveFileFromPath,
} from './../../src/util/helpers';

// Expose library to Playwright.
Object.assign(window, {
  opfs: {
    exists: opfs.exists,
    mkdir: opfs.mkdir,
    touch: opfs.touch,
    readFile: opfs.readFile,
    readDir: opfs.readDir,
    write: opfs.write,
    unlink: opfs.unlink,
    walkDir: opfs.walkDir,
    rm: opfs.rm,
    rmrf: opfs.rmrf,
  },
  helpers: {
    changeDir,
    resolveFileFromPath,
    resolveDirectoryFromPath,
    getParentDirectory,
  },
});

// Signal that the harness has loaded.
document.querySelector('#status')!.textContent = 'Ready';
