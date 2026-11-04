import { expect, test } from '@playwright/test';
import { openHarness } from './helpers';

test.beforeEach(async ({ page }) => {
  await openHarness(page);
});

test.describe('unlink', () => {
  test('removes a file and leaves its parent directory', async ({ page }) => {
    const removed = await page.evaluate(async () => {
      await window.opfs.touch('notes/keep.txt');
      await window.opfs.touch('notes/drop.txt');
      await window.opfs.write('notes/drop.txt', 'gone');

      const result = await window.opfs.unlink('notes/drop.txt');

      return {
        result,
        entries: await window.opfs.readDir('notes'),
        parent: await window.opfs.exists('notes'),
        file: await window.opfs.exists('notes/drop.txt'),
      };
    });

    expect(removed).toEqual({
      result: true,
      entries: ['keep.txt'],
      parent: true,
      file: false,
    });
  });

  test('removes a file through its handle', async ({ page }) => {
    const removed = await page.evaluate(async () => {
      const file = await window.opfs.touch('notes/drop.txt');
      const result = await window.opfs.unlink(file);

      return {
        result,
        file: await window.opfs.exists('notes/drop.txt'),
        parent: await window.opfs.exists('notes'),
      };
    });

    expect(removed).toEqual({ result: true, file: false, parent: true });
  });

  test('returns true when the file is already absent', async ({ page }) => {
    const removed = await page.evaluate(async () => {
      await window.opfs.touch('notes/drop.txt');
      const first = await window.opfs.unlink('notes/drop.txt');
      const second = await window.opfs.unlink('notes/drop.txt');
      const missing = await window.opfs.unlink('never.txt');

      return { first, second, missing };
    });

    expect(removed).toEqual({ first: true, second: true, missing: true });
  });

  test('returns false for a directory and leaves it in place', async ({ page }) => {
    const removed = await page.evaluate(async () => {
      await window.opfs.touch('notes/keep.txt');
      const result = await window.opfs.unlink('notes');

      return {
        result,
        parent: await window.opfs.exists('notes'),
        file: await window.opfs.exists('notes/keep.txt'),
      };
    });

    expect(removed).toEqual({ result: false, parent: true, file: true });
  });

  test('returns false for an empty path', async ({ page }) => {
    const result = await page.evaluate(async () => window.opfs.unlink(''));

    expect(result).toBe(false);
  });
});
