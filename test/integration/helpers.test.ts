import { expect, test } from '@playwright/test';
import { openHarness } from './helpers';

test.beforeEach(async ({ page }) => {
  await openHarness(page);
});

test.describe('changeDir', () => {
  test('returns the root for an empty path', async ({ page }) => {
    const same = await page.evaluate(async () => {
      const root = await navigator.storage.getDirectory();
      const found: boolean[] = [];

      for (const path of ['', '/', ' /// ']) {
        found.push(await root.isSameEntry(await window.helpers.changeDir(path)));
      }

      return found;
    });

    expect(same).toEqual([true, true, true]);
  });

  test('returns the directory at a nested path', async ({ page }) => {
    const found = await page.evaluate(async () => {
      await window.opfs.touch('personal/notes/archive/deep.txt');
      const personal = await window.opfs.mkdir('personal');
      const notes = await window.opfs.mkdir('personal/notes');
      const archive = await window.opfs.mkdir('personal/notes/archive');

      const personalDir = await window.helpers.changeDir('personal');
      const notesDir = await window.helpers.changeDir('personal/notes');
      const archiveDir = await window.helpers.changeDir('personal/notes/archive');

      return {
        personal: {
          same: await personal.isSameEntry(personalDir),
          name: personalDir.name,
          kind: personalDir.kind,
        },
        notes: {
          same: await notes.isSameEntry(notesDir),
          name: notesDir.name,
          kind: notesDir.kind,
          entries: await window.opfs.readDir(notesDir),
        },
        archive: {
          same: await archive.isSameEntry(archiveDir),
          name: archiveDir.name,
          kind: archiveDir.kind,
        },
      };
    });

    expect(found).toEqual({
      personal: { same: true, name: 'personal', kind: 'directory' },
      notes: {
        same: true,
        name: 'notes',
        kind: 'directory',
        entries: ['archive'],
      },
      archive: { same: true, name: 'archive', kind: 'directory' },
    });
  });

  test('normalizes the path before walking', async ({ page }) => {
    const same = await page.evaluate(async () => {
      const notes = await window.opfs.mkdir('personal/notes');
      const archive = await window.opfs.mkdir('personal/notes/archive');

      return {
        notes: await notes.isSameEntry(
          await window.helpers.changeDir(' /personal//notes/ '),
        ),
        archive: await archive.isSameEntry(
          await window.helpers.changeDir('personal/ notes /archive'),
        ),
      };
    });

    expect(same).toEqual({ notes: true, archive: true });
  });

  test('rejects with NotFoundError when a directory is missing and creates nothing', async ({
    page,
  }) => {
    const result = await page.evaluate(async () => {
      await window.opfs.mkdir('personal');
      const rejected: string[] = [];

      for (const path of ['missing', 'personal/missing/notes']) {
        try {
          await window.helpers.changeDir(path);
          rejected.push('ok');
        } catch (error) {
          rejected.push((error as DOMException).name);
        }
      }

      return {
        rejected,
        root: await window.opfs.readDir(''),
        personal: await window.opfs.readDir('personal'),
      };
    });

    expect(result).toEqual({
      rejected: ['NotFoundError', 'NotFoundError'],
      root: ['personal'],
      personal: [],
    });
  });

  test('rejects with TypeMismatchError when a segment is a file', async ({ page }) => {
    const rejected = await page.evaluate(async () => {
      await window.opfs.touch('personal/notes/test.txt');
      await window.opfs.touch('personal/readme.txt');
      const names: string[] = [];

      for (const path of ['personal/notes/test.txt', 'personal/readme.txt/extra']) {
        try {
          await window.helpers.changeDir(path);
          names.push('ok');
        } catch (error) {
          names.push((error as DOMException).name);
        }
      }

      return names;
    });

    expect(rejected).toEqual(['TypeMismatchError', 'TypeMismatchError']);
  });
});

test.describe('resolveFileFromPath', () => {
  test('returns the file handle for a nested path', async ({ page }) => {
    const found = await page.evaluate(async () => {
      const file = await window.opfs.touch('personal/notes/test.txt');
      const deep = await window.opfs.touch('personal/notes/archive/deep.txt');
      await window.opfs.write(file, 'hello');

      const resolved = await window.helpers.resolveFileFromPath(
        'personal/notes/test.txt',
      );
      const resolvedDeep = await window.helpers.resolveFileFromPath(
        'personal/notes/archive/deep.txt',
      );

      return {
        file: {
          same: await file.isSameEntry(resolved),
          name: resolved.name,
          kind: resolved.kind,
          text: new TextDecoder().decode(await window.opfs.readFile(resolved)),
        },
        deep: {
          same: await deep.isSameEntry(resolvedDeep),
          name: resolvedDeep.name,
          kind: resolvedDeep.kind,
        },
      };
    });

    expect(found).toEqual({
      file: { same: true, name: 'test.txt', kind: 'file', text: 'hello' },
      deep: { same: true, name: 'deep.txt', kind: 'file' },
    });
  });

  test('returns a file that sits in the root', async ({ page }) => {
    const found = await page.evaluate(async () => {
      const file = await window.opfs.touch('root.txt');
      const resolved = await window.helpers.resolveFileFromPath('root.txt');

      return {
        same: await file.isSameEntry(resolved),
        name: resolved.name,
        kind: resolved.kind,
      };
    });

    expect(found).toEqual({ same: true, name: 'root.txt', kind: 'file' });
  });

  test('normalizes the path before resolving', async ({ page }) => {
    const same = await page.evaluate(async () => {
      const file = await window.opfs.touch('personal/notes/test.txt');
      const resolved = await window.helpers.resolveFileFromPath(
        ' /personal//notes/test.txt ',
      );

      return file.isSameEntry(resolved);
    });

    expect(same).toBe(true);
  });

  test('rejects with NotFoundError when the file or a parent is missing', async ({
    page,
  }) => {
    const result = await page.evaluate(async () => {
      await window.opfs.mkdir('personal');
      const rejected: string[] = [];

      for (const path of ['personal/notes/missing.txt', 'missing/test.txt']) {
        try {
          await window.helpers.resolveFileFromPath(path);
          rejected.push('ok');
        } catch (error) {
          rejected.push((error as DOMException).name);
        }
      }

      return {
        rejected,
        personal: await window.opfs.readDir('personal'),
      };
    });

    expect(result).toEqual({
      rejected: ['NotFoundError', 'NotFoundError'],
      personal: [],
    });
  });

  test('rejects with TypeMismatchError when the path names a directory', async ({
    page,
  }) => {
    const name = await page.evaluate(async () => {
      await window.opfs.mkdir('personal/notes');

      try {
        await window.helpers.resolveFileFromPath('personal/notes');
        return 'ok';
      } catch (error) {
        return (error as DOMException).name;
      }
    });

    expect(name).toBe('TypeMismatchError');
  });
});

test.describe('resolveDirectoryFromPath', () => {
  test('returns the root for an empty path', async ({ page }) => {
    const same = await page.evaluate(async () => {
      const root = await navigator.storage.getDirectory();
      const found: boolean[] = [];

      for (const path of ['', '/', ' /// ']) {
        found.push(
          await root.isSameEntry(await window.helpers.resolveDirectoryFromPath(path)),
        );
      }

      return found;
    });

    expect(same).toEqual([true, true, true]);
  });

  test('returns the directory at a nested path', async ({ page }) => {
    const found = await page.evaluate(async () => {
      await window.opfs.touch('box/notes/archive/deep.txt');
      const box = await window.opfs.mkdir('box');
      const notes = await window.opfs.mkdir('box/notes');
      const archive = await window.opfs.mkdir('box/notes/archive');

      const boxDir = await window.helpers.resolveDirectoryFromPath('box');
      const notesDir = await window.helpers.resolveDirectoryFromPath('box/notes');
      const archiveDir = await window.helpers.resolveDirectoryFromPath(
        'box/notes/archive',
      );

      return {
        box: {
          same: await box.isSameEntry(boxDir),
          name: boxDir.name,
          kind: boxDir.kind,
        },
        notes: {
          same: await notes.isSameEntry(notesDir),
          name: notesDir.name,
          kind: notesDir.kind,
          entries: await window.opfs.readDir(notesDir),
        },
        archive: {
          same: await archive.isSameEntry(archiveDir),
          name: archiveDir.name,
          kind: archiveDir.kind,
        },
      };
    });

    expect(found).toEqual({
      box: { same: true, name: 'box', kind: 'directory' },
      notes: {
        same: true,
        name: 'notes',
        kind: 'directory',
        entries: ['archive'],
      },
      archive: { same: true, name: 'archive', kind: 'directory' },
    });
  });

  test('normalizes the path before resolving', async ({ page }) => {
    const same = await page.evaluate(async () => {
      const notes = await window.opfs.mkdir('personal/notes');
      const archive = await window.opfs.mkdir('personal/notes/archive');

      return {
        notes: await notes.isSameEntry(
          await window.helpers.resolveDirectoryFromPath(' /personal//notes/ '),
        ),
        archive: await archive.isSameEntry(
          await window.helpers.resolveDirectoryFromPath('personal/ notes /archive'),
        ),
      };
    });

    expect(same).toEqual({ notes: true, archive: true });
  });

  test('rejects with NotFoundError when a directory is missing and creates nothing', async ({
    page,
  }) => {
    const result = await page.evaluate(async () => {
      await window.opfs.mkdir('personal');
      const rejected: string[] = [];

      for (const path of ['missing', 'personal/missing/notes']) {
        try {
          await window.helpers.resolveDirectoryFromPath(path);
          rejected.push('ok');
        } catch (error) {
          rejected.push((error as DOMException).name);
        }
      }

      return {
        rejected,
        root: await window.opfs.readDir(''),
        personal: await window.opfs.readDir('personal'),
      };
    });

    expect(result).toEqual({
      rejected: ['NotFoundError', 'NotFoundError'],
      root: ['personal'],
      personal: [],
    });
  });

  test('rejects with TypeMismatchError when a segment is a file', async ({ page }) => {
    const rejected = await page.evaluate(async () => {
      await window.opfs.touch('personal/notes/test.txt');
      await window.opfs.touch('personal/readme.txt');
      const names: string[] = [];

      for (const path of ['personal/notes/test.txt', 'personal/readme.txt/extra']) {
        try {
          await window.helpers.resolveDirectoryFromPath(path);
          names.push('ok');
        } catch (error) {
          names.push((error as DOMException).name);
        }
      }

      return names;
    });

    expect(rejected).toEqual(['TypeMismatchError', 'TypeMismatchError']);
  });
});

test.describe('getParentDirectory', () => {
  test('returns the directory that contains a file or directory', async ({ page }) => {
    const found = await page.evaluate(async () => {
      const file = await window.opfs.touch('personal/notes/archive/deep.txt');
      const archive = await window.opfs.mkdir('personal/notes/archive');
      const notes = await window.opfs.mkdir('personal/notes');

      const fileParent = await window.helpers.getParentDirectory(file);
      const directoryParent = await window.helpers.getParentDirectory(archive);

      return {
        file: {
          same: await archive.isSameEntry(fileParent),
          name: fileParent.name,
          kind: fileParent.kind,
          entries: await window.opfs.readDir(fileParent),
        },
        directory: {
          same: await notes.isSameEntry(directoryParent),
          name: directoryParent.name,
          kind: directoryParent.kind,
        },
      };
    });

    expect(found).toEqual({
      file: {
        same: true,
        name: 'archive',
        kind: 'directory',
        entries: ['deep.txt'],
      },
      directory: { same: true, name: 'notes', kind: 'directory' },
    });
  });

  test('returns the root for the root and its direct children', async ({ page }) => {
    const same = await page.evaluate(async () => {
      const root = await navigator.storage.getDirectory();
      const file = await window.opfs.touch('root.txt');
      const directory = await window.opfs.mkdir('personal');

      return {
        root: await root.isSameEntry(await window.helpers.getParentDirectory(root)),
        file: await root.isSameEntry(await window.helpers.getParentDirectory(file)),
        directory: await root.isSameEntry(
          await window.helpers.getParentDirectory(directory),
        ),
      };
    });

    expect(same).toEqual({ root: true, file: true, directory: true });
  });
});
