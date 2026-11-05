import { expect, test } from '@playwright/test';
import { openHarness } from './helpers';

test.beforeEach(async ({ page }) => {
  await openHarness(page);
});

test.describe('walkDir', () => {
  test('yields every file and directory under the root', async ({ page }) => {
    const entries = await page.evaluate(async () => {
      await window.opfs.mkdir('personal/notes/nested');
      await window.opfs.touch('personal/notes/test.txt');
      await window.opfs.touch('personal/notes/nested/deep.txt');
      await window.opfs.mkdir('personal/other');
      await window.opfs.touch('root.txt');

      const root = await navigator.storage.getDirectory();
      const walked: { path: string; kind: string; name: string; }[] = [];

      for await (const [path, handle] of window.opfs.walkDir(root)) {
        walked.push({ path, kind: handle.kind, name: handle.name });
      }

      walked.sort((a, b) => a.path.localeCompare(b.path));
      return walked;
    });

    expect(entries).toEqual([
      { path: 'personal', kind: 'directory', name: 'personal' },
      { path: 'root.txt', kind: 'file', name: 'root.txt' },
    ]);
  });

  test('yields nothing for an empty directory', async ({ page }) => {
    const paths = await page.evaluate(async () => {
      const empty = await window.opfs.mkdir('empty');
      const walked: string[] = [];

      for await (const [path] of window.opfs.walkDir(empty)) {
        walked.push(path);
      }

      return walked;
    });

    expect(paths).toEqual([]);
  });

  test('yields only top levelpaths relative to a subdirectory', async ({ page }) => {
    const entries = await page.evaluate(async () => {
      const notes = await window.opfs.mkdir('personal/notes');
      await window.opfs.touch('personal/notes/test.txt');
      await window.opfs.touch('personal/notes/nested/deep.txt');
      await window.opfs.touch('personal/other.txt');

      const walked: { path: string; kind: string; }[] = [];

      for await (const [path, handle] of window.opfs.walkDir(notes)) {
        walked.push({ path, kind: handle.kind });
      }

      walked.sort((a, b) => a.path.localeCompare(b.path));
      return walked;
    });

    expect(entries).toEqual([
      { path: 'nested', kind: 'directory' },
      { path: 'test.txt', kind: 'file' },
    ]);
  });
});
