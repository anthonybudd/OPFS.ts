import { expect, test } from '@playwright/test';
import { openHarness } from './helpers';

test.beforeEach(async ({ page }) => {
  await openHarness(page);
});

test.describe('readFile', () => {
  test('reads the bytes of a text file and of an empty file', async ({ page }) => {
    const read = await page.evaluate(async () => {
      await window.opfs.touch('notes/test.txt');
      await window.opfs.write('notes/test.txt', 'Hello World');
      await window.opfs.touch('notes/empty.txt');

      return {
        text: new TextDecoder().decode(await window.opfs.readFile('notes/test.txt')),
        empty: (await window.opfs.readFile('notes/empty.txt')).byteLength,
      };
    });

    expect(read).toEqual({ text: 'Hello World', empty: 0 });
  });

  test('reads binary contents unchanged', async ({ page }) => {
    const bytes = await page.evaluate(async () => {
      await window.opfs.touch('data.bin');
      await window.opfs.write('data.bin', new Uint8Array([0, 255, 10]));

      return [...new Uint8Array(await window.opfs.readFile(' /data.bin '))];
    });

    expect(bytes).toEqual([0, 255, 10]);
  });

  test('reads through a file handle', async ({ page }) => {
    const text = await page.evaluate(async () => {
      const file = await window.opfs.touch('handle.txt');
      await window.opfs.write(file, 'from-handle');

      return new TextDecoder().decode(await window.opfs.readFile(file));
    });

    expect(text).toBe('from-handle');
  });

  test('rejects a missing file or a directory', async ({ page }) => {
    const rejected = await page.evaluate(async () => {
      await window.opfs.mkdir('notes');
      const names: string[] = [];

      for (const path of ['missing.txt', 'notes/missing.txt', 'notes']) {
        try {
          await window.opfs.readFile(path);
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
