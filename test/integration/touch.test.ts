import { expect, test } from '@playwright/test';
import { openHarness } from './helpers';

test.beforeEach(async ({ page }) => {
  await openHarness(page);
});

test.describe('touch', () => {
  test('creates an empty file and any missing parent directories', async ({ page }) => {
    const created = await page.evaluate(async () => {
      const file = await window.opfs.touch('personal/notes/test.txt');
      const bytes = await window.opfs.readFile(file);

      return {
        name: file.name,
        kind: file.kind,
        byteLength: bytes.byteLength,
        parents: await window.opfs.readDir('personal/notes'),
      };
    });

    expect(created).toEqual({
      name: 'test.txt',
      kind: 'file',
      byteLength: 0,
      parents: ['test.txt'],
    });
  });

  test('leaves an existing file unchanged', async ({ page }) => {
    const text = await page.evaluate(async () => {
      const file = await window.opfs.touch('notes/keep.txt');
      await window.opfs.write(file, 'stay');
      const again = await window.opfs.touch('notes/keep.txt');

      return {
        same: await file.isSameEntry(again),
        text: new TextDecoder().decode(await window.opfs.readFile(again)),
      };
    });

    expect(text).toEqual({ same: true, text: 'stay' });
  });

  test('creates files whose names contain spaces, dots, or unicode', async ({ page }) => {
    const entries = await page.evaluate(async () => {
      const names = ['my notes.txt', '.hidden', 'café.txt', 'ノート.txt'];

      for (const name of names) {
        const file = await window.opfs.touch(`box/${name}`);
        if (file.name !== name || file.kind !== 'file') {
          throw new Error(`Unexpected handle for ${name}`);
        }
      }

      return window.opfs.readDir('box');
    });

    expect(entries.sort()).toEqual(
      ['.hidden', 'café.txt', 'my notes.txt', 'ノート.txt'].sort(),
    );
  });

  test('rejects an empty path or a dot segment and creates nothing', async ({ page }) => {
    const created = await page.evaluate(async () => {
      const rejected: string[] = [];

      for (const path of ['', '   ', '/', '.', '..', 'a/../b.txt', 'a/./b.txt']) {
        try {
          await window.opfs.touch(path);
          rejected.push('ok');
        } catch (error) {
          rejected.push(`${(error as Error).name}: ${(error as Error).message}`);
        }
      }

      return { rejected, root: await window.opfs.readDir('') };
    });

    expect(created.root).toEqual([]);
    expect(created.rejected).toEqual([
      'TypeError: Invalid file path: ""',
      'TypeError: Invalid file path: "   "',
      'TypeError: Invalid file path: "/"',
      'TypeError: Invalid file path: "."',
      'TypeError: Invalid file path: ".."',
      'TypeError: Invalid file path: "a/../b.txt"',
      'TypeError: Invalid file path: "a/./b.txt"',
    ]);
  });

  test('rejects a directory path or a parent that is a file', async ({ page }) => {
    const created = await page.evaluate(async () => {
      await window.opfs.mkdir('notes');
      await window.opfs.touch('notes/blocked');

      const rejected: string[] = [];
      for (const path of ['notes', 'notes/blocked/child.txt']) {
        try {
          await window.opfs.touch(path);
          rejected.push('ok');
        } catch (error) {
          rejected.push((error as DOMException).name);
        }
      }

      return {
        rejected,
        notes: await window.opfs.readDir('notes'),
      };
    });

    expect(created).toEqual({
      rejected: ['TypeMismatchError', 'TypeMismatchError'],
      notes: ['blocked'],
    });
  });
});
