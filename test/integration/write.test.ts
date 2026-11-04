import { expect, test } from '@playwright/test';
import { openHarness } from './helpers';

test.beforeEach(async ({ page }) => {
  await openHarness(page);
});

test.describe('write', () => {
  test('replaces the bytes of an existing file', async ({ page }) => {
    const text = await page.evaluate(async () => {
      await window.opfs.touch('notes/test.txt');
      await window.opfs.write('notes/test.txt', 'Hello World');
      await window.opfs.write('notes/test.txt', 'café ノート');

      return new TextDecoder().decode(await window.opfs.readFile('notes/test.txt'));
    });

    expect(text).toBe('café ノート');
  });

  test('writes bytes, an array buffer, and a blob', async ({ page }) => {
    const written = await page.evaluate(async () => {
      await window.opfs.touch('bytes.bin');
      await window.opfs.touch('buffer.bin');
      await window.opfs.touch('blob.txt');

      await window.opfs.write('bytes.bin', new Uint8Array([1, 2, 3, 255]));
      await window.opfs.write('buffer.bin', new Uint8Array([4, 5]).buffer);
      await window.opfs.write('blob.txt', new Blob(['blob-data']));

      const read = async (path: string) => [
        ...new Uint8Array(await window.opfs.readFile(path)),
      ];

      return {
        bytes: await read('bytes.bin'),
        buffer: await read('buffer.bin'),
        blob: new TextDecoder().decode(await window.opfs.readFile('blob.txt')),
      };
    });

    expect(written).toEqual({
      bytes: [1, 2, 3, 255],
      buffer: [4, 5],
      blob: 'blob-data',
    });
  });

  test('writes a positioned command, a seek, and a truncate', async ({ page }) => {
    const written = await page.evaluate(async () => {
      await window.opfs.touch('positioned.txt');
      await window.opfs.touch('seek.txt');
      await window.opfs.touch('truncated.txt');

      await window.opfs.write('positioned.txt', 'hello');
      await window.opfs.write('positioned.txt', {
        type: 'write',
        data: 'ab',
        position: 1,
      });
      await window.opfs.write('seek.txt', { type: 'seek', position: 3 });
      await window.opfs.write('truncated.txt', 'hello');
      await window.opfs.write('truncated.txt', { type: 'truncate', size: 3 });

      const read = async (path: string) => [
        ...new Uint8Array(await window.opfs.readFile(path)),
      ];

      return {
        positioned: await read('positioned.txt'),
        seek: await read('seek.txt'),
        truncated: await read('truncated.txt'),
      };
    });

    expect(written).toEqual({
      positioned: [0, 97, 98],
      seek: [],
      truncated: [0, 0, 0],
    });
  });

  test('writes through a file handle', async ({ page }) => {
    const text = await page.evaluate(async () => {
      const file = await window.opfs.touch('handle.txt');
      await window.opfs.write(file, 'from-handle');

      return new TextDecoder().decode(await window.opfs.readFile('handle.txt'));
    });

    expect(text).toBe('from-handle');
  });

  test('rejects a missing file and does not create it', async ({ page }) => {
    const created = await page.evaluate(async () => {
      const rejected: string[] = [];

      for (const path of ['missing.txt', 'missing/file.txt']) {
        try {
          await window.opfs.write(path, 'x');
          rejected.push('ok');
        } catch (error) {
          rejected.push((error as DOMException).name);
        }
      }

      return { rejected, root: await window.opfs.readDir('') };
    });

    expect(created).toEqual({
      rejected: ['NotFoundError', 'NotFoundError'],
      root: [],
    });
  });

  test('rejects a path that names a directory', async ({ page }) => {
    const name = await page.evaluate(async () => {
      await window.opfs.mkdir('notes');

      try {
        await window.opfs.write('notes', 'x');
        return 'ok';
      } catch (error) {
        return (error as DOMException).name;
      }
    });

    expect(name).toBe('TypeMismatchError');
  });
});
