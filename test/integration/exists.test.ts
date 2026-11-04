import { expect, test } from '@playwright/test';
import { openHarness } from './helpers';

test.beforeEach(async ({ page }) => {
  await openHarness(page);
});

test.describe('exists', () => {
  test('is true for a file, a directory, and the root', async ({ page }) => {
    const found = await page.evaluate(async () => {
      await window.opfs.touch('personal/notes/test.txt');
      await window.opfs.mkdir('personal/empty');

      return {
        file: await window.opfs.exists('personal/notes/test.txt'),
        directory: await window.opfs.exists('personal/notes'),
        empty: await window.opfs.exists('personal/empty'),
        root: [
          await window.opfs.exists(''),
          await window.opfs.exists('   '),
          await window.opfs.exists('/'),
          await window.opfs.exists('///'),
        ],
      };
    });

    expect(found).toEqual({
      file: true,
      directory: true,
      empty: true,
      root: [true, true, true, true],
    });
  });

  test('is false when the entry or a parent is missing', async ({ page }) => {
    const found = await page.evaluate(async () => {
      await window.opfs.mkdir('personal');

      return {
        file: await window.opfs.exists('personal/missing.txt'),
        directory: await window.opfs.exists('personal/missing'),
        parent: await window.opfs.exists('missing/test.txt'),
        dot: await window.opfs.exists('.'),
      };
    });

    expect(found).toEqual({
      file: false,
      directory: false,
      parent: false,
      dot: false,
    });
  });

  test('follows a file or directory handle', async ({ page }) => {
    const found = await page.evaluate(async () => {
      const file = await window.opfs.touch('notes/test.txt');
      const directory = await window.opfs.mkdir('notes');
      const root = await navigator.storage.getDirectory();

      const present = {
        file: await window.opfs.exists(file),
        directory: await window.opfs.exists(directory),
        root: await window.opfs.exists(root),
      };

      await window.opfs.unlink(file);

      return {
        present,
        removedFile: await window.opfs.exists(file),
      };
    });

    expect(found).toEqual({
      present: { file: true, directory: true, root: true },
      removedFile: false,
    });
  });

  test('is false for a value that is not a path or a handle', async ({ page }) => {
    const found = await page.evaluate(async () => {
      return window.opfs.exists({} as FileSystemHandle);
    });

    expect(found).toBe(false);
  });

  test('normalizes the path before checking', async ({ page }) => {
    const found = await page.evaluate(async () => {
      await window.opfs.touch('personal/notes/test.txt');

      return window.opfs.exists(' /personal//notes/test.txt ');
    });

    expect(found).toBe(true);
  });
});
