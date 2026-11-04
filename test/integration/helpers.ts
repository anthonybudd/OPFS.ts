import { expect, type Page } from '@playwright/test';

import '../harness/types';

/** Opens the harness and empties the origin private file system. */
export async function openHarness(page: Page): Promise<void> {
  await page.goto('/');
  await expect(page.locator('#status')).toHaveText('Ready');

  await page.evaluate(async () => {
    const root = await navigator.storage.getDirectory();
    const listing = root as FileSystemDirectoryHandle & {
      keys(): AsyncIterable<string>;
    };

    for await (const name of listing.keys()) {
      await root.removeEntry(name, { recursive: true });
    }
  });
}
