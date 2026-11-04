import { expect, test } from '@playwright/test';
import { openHarness } from './helpers';

test.beforeEach(async ({ page }) => {
  await openHarness(page);
});

test.describe('readDir', () => {
  test('lists direct children by name', async ({ page }) => {
    const entries = await page.evaluate(async () => {
      await window.opfs.mkdir('personal/notes/nested');
      await window.opfs.touch('personal/notes/test.txt');
      await window.opfs.touch('personal/notes/nested/deep.txt');
      await window.opfs.mkdir('personal/other');
      await window.opfs.touch('root.txt');

      const notes = await window.opfs.readDir('personal/notes');
      const root = await window.opfs.readDir('');

      return { notes: notes.sort(), root: root.sort() };
    });

    expect(entries).toEqual({
      notes: ['nested', 'test.txt'],
      root: ['personal', 'root.txt'],
    });
  });

  test('returns an empty list for an empty directory', async ({ page }) => {
    const entries = await page.evaluate(async () => {
      await window.opfs.mkdir('empty');
      return window.opfs.readDir('empty');
    });

    expect(entries).toEqual([]);
  });

  test('lists through a directory handle', async ({ page }) => {
    const entries = await page.evaluate(async () => {
      const notes = await window.opfs.mkdir('personal/notes');
      await window.opfs.touch('personal/notes/test.txt');
      await window.opfs.mkdir('personal/notes/nested');

      return window.opfs.readDir(notes);
    });

    expect(entries.sort()).toEqual(['nested', 'test.txt']);
  });

  test('normalizes the directory path', async ({ page }) => {
    const entries = await page.evaluate(async () => {
      await window.opfs.touch('personal/notes/test.txt');
      return window.opfs.readDir(' /personal//notes/ ');
    });

    expect(entries).toEqual(['test.txt']);
  });

  test('rejects a missing directory or a file path', async ({ page }) => {
    const rejected = await page.evaluate(async () => {
      await window.opfs.touch('notes/test.txt');
      const names: string[] = [];

      for (const path of ['missing', 'notes/missing', 'notes/test.txt']) {
        try {
          await window.opfs.readDir(path);
          names.push('ok');
        } catch (error) {
          names.push((error as DOMException).name);
        }
      }

      return names;
    });

    expect(rejected).toEqual(['NotFoundError', 'NotFoundError', 'TypeMismatchError']);
  });
});
