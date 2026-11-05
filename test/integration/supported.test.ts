import { expect, test } from '@playwright/test';
import { openHarness } from './helpers';

test.beforeEach(async ({ page }) => {
  await openHarness(page);
});

test.describe('supported', () => {
  test('reports origin private file system and observer support', async ({ page }) => {
    const support = await page.evaluate(async () => window.opfs.supported());

    expect(support).toEqual({
      opfs: true,
      observer: true,
    });
  });

  test('reports the file system as unsupported when getDirectory rejects', async ({
    page,
  }) => {
    const support = await page.evaluate(async () => {
      Object.defineProperty(navigator, 'storage', {
        configurable: true,
        value: {
          getDirectory: () => Promise.reject(new DOMException('blocked', 'SecurityError')),
        },
      });

      return window.opfs.supported();
    });

    expect(support).toEqual({
      opfs: false,
      observer: true,
    });
  });

  test('reports the file system as unsupported when storage is missing', async ({ page }) => {
    const support = await page.evaluate(async () => {
      Object.defineProperty(navigator, 'storage', {
        configurable: true,
        get: () => undefined,
      });

      return window.opfs.supported();
    });

    expect(support).toEqual({
      opfs: false,
      observer: true,
    });
  });

  test('reports the observer as unsupported when FileSystemObserver is missing', async ({
    page,
  }) => {
    const support = await page.evaluate(async () => {
      let current: object | null = window;

      while (current) {
        if (Object.prototype.hasOwnProperty.call(current, 'FileSystemObserver')) {
          Reflect.deleteProperty(current, 'FileSystemObserver');
        }

        current = Object.getPrototypeOf(current);
      }

      return window.opfs.supported();
    });

    expect(support).toEqual({
      opfs: true,
      observer: false,
    });
  });

  test('does not create files or directories', async ({ page }) => {
    const root = await page.evaluate(async () => {
      await window.opfs.supported();

      return window.opfs.readDir('');
    });

    expect(root).toEqual([]);
  });
});
