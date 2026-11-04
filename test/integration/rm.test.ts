import { expect, test } from '@playwright/test';
import { openHarness } from './helpers';

test.beforeEach(async ({ page }) => {
  await openHarness(page);
});

test.describe('rm', () => {
  test('removes an empty directory and leaves its parent', async ({ page }) => {
    const removed = await page.evaluate(async () => {
      await window.opfs.mkdir('personal/notes');
      await window.opfs.mkdir('personal/keep');

      const result = await window.opfs.rm('personal/notes');

      return {
        result,
        notes: await window.opfs.exists('personal/notes'),
        parent: await window.opfs.exists('personal'),
        sibling: await window.opfs.exists('personal/keep'),
        entries: await window.opfs.readDir('personal'),
      };
    });

    expect(removed).toEqual({
      result: true,
      notes: false,
      parent: true,
      sibling: true,
      entries: ['keep'],
    });
  });

  test('removes a directory through its handle', async ({ page }) => {
    const removed = await page.evaluate(async () => {
      const notes = await window.opfs.mkdir('personal/notes');
      const result = await window.opfs.rm(notes);

      return {
        result,
        notes: await window.opfs.exists('personal/notes'),
        parent: await window.opfs.exists('personal'),
      };
    });

    expect(removed).toEqual({ result: true, notes: false, parent: true });
  });

  test('removes a directory and everything under it when recursive', async ({ page }) => {
    const removed = await page.evaluate(async () => {
      await window.opfs.touch('personal/notes/archive/deep.txt');
      await window.opfs.write('personal/notes/archive/deep.txt', 'gone');
      await window.opfs.touch('personal/keep.txt');

      const result = await window.opfs.rm('personal/notes', { recursive: true });

      return {
        result,
        notes: await window.opfs.exists('personal/notes'),
        archive: await window.opfs.exists('personal/notes/archive'),
        file: await window.opfs.exists('personal/notes/archive/deep.txt'),
        parent: await window.opfs.exists('personal'),
        sibling: await window.opfs.exists('personal/keep.txt'),
        entries: await window.opfs.readDir('personal'),
      };
    });

    expect(removed).toEqual({
      result: true,
      notes: false,
      archive: false,
      file: false,
      parent: true,
      sibling: true,
      entries: ['keep.txt'],
    });
  });

  test('returns false for a non-empty directory unless recursive', async ({ page }) => {
    const removed = await page.evaluate(async () => {
      await window.opfs.touch('notes/keep.txt');
      const result = await window.opfs.rm('notes');

      return {
        result,
        notes: await window.opfs.exists('notes'),
        file: await window.opfs.exists('notes/keep.txt'),
        entries: await window.opfs.readDir('notes'),
      };
    });

    expect(removed).toEqual({
      result: false,
      notes: true,
      file: true,
      entries: ['keep.txt'],
    });
  });

  test('returns false when the directory is already absent', async ({ page }) => {
    const removed = await page.evaluate(async () => {
      await window.opfs.mkdir('notes');
      const first = await window.opfs.rm('notes');
      const second = await window.opfs.rm('notes');
      const missing = await window.opfs.rm('never');

      return { first, second, missing };
    });

    expect(removed).toEqual({ first: true, second: false, missing: false });
  });

  test('returns true when force is set and the directory is already absent', async ({
    page,
  }) => {
    const removed = await page.evaluate(async () => {
      await window.opfs.mkdir('notes');
      const first = await window.opfs.rm('notes', { force: true });
      const second = await window.opfs.rm('notes', { force: true });
      const missing = await window.opfs.rm('never', { force: true });

      return { first, second, missing };
    });

    expect(removed).toEqual({ first: true, second: true, missing: true });
  });

  test('returns false for a file and leaves it in place', async ({ page }) => {
    const removed = await page.evaluate(async () => {
      await window.opfs.touch('notes/keep.txt');
      await window.opfs.write('notes/keep.txt', 'stay');
      const result = await window.opfs.rm('notes/keep.txt');

      return {
        result,
        file: await window.opfs.exists('notes/keep.txt'),
        parent: await window.opfs.exists('notes'),
        text: new TextDecoder().decode(await window.opfs.readFile('notes/keep.txt')),
      };
    });

    expect(removed).toEqual({
      result: false,
      file: true,
      parent: true,
      text: 'stay',
    });
  });

  test('returns false for the root and leaves its children', async ({ page }) => {
    const removed = await page.evaluate(async () => {
      await window.opfs.touch('keep.txt');
      const root = await navigator.storage.getDirectory();
      const paths = ['', '   ', '/', '///'];
      const results: boolean[] = [];

      for (const path of paths) {
        results.push(await window.opfs.rm(path, { recursive: true }));
      }

      results.push(await window.opfs.rm(root, { recursive: true }));

      return {
        results,
        file: await window.opfs.exists('keep.txt'),
        entries: await window.opfs.readDir(''),
      };
    });

    expect(removed).toEqual({
      results: [false, false, false, false, false],
      file: true,
      entries: ['keep.txt'],
    });
  });

  test('returns false when the signal is already aborted', async ({ page }) => {
    const removed = await page.evaluate(async () => {
      await window.opfs.mkdir('notes');
      const result = await window.opfs.rm('notes', { signal: AbortSignal.abort() });

      return {
        result,
        notes: await window.opfs.exists('notes'),
      };
    });

    expect(removed).toEqual({ result: false, notes: true });
  });

  test('normalizes the path before removing', async ({ page }) => {
    const removed = await page.evaluate(async () => {
      await window.opfs.mkdir('personal/notes');
      const result = await window.opfs.rm(' /personal//notes/ ');

      return {
        result,
        notes: await window.opfs.exists('personal/notes'),
        parent: await window.opfs.exists('personal'),
      };
    });

    expect(removed).toEqual({ result: true, notes: false, parent: true });
  });
});
