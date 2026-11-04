import { expect, test } from '@playwright/test';
import { openHarness } from './helpers';

test.beforeEach(async ({ page }) => {
  await openHarness(page);
});

test.describe('mkdir', () => {
  test('creates every missing directory and returns the last one', async ({ page }) => {
    const created = await page.evaluate(async () => {
      const dir = await window.opfs.mkdir('personal/notes/archive');

      return {
        name: dir.name,
        kind: dir.kind,
        personal: await window.opfs.readDir('personal'),
        notes: await window.opfs.readDir('personal/notes'),
        archive: await window.opfs.readDir('personal/notes/archive'),
      };
    });

    expect(created).toEqual({
      name: 'archive',
      kind: 'directory',
      personal: ['notes'],
      notes: ['archive'],
      archive: [],
    });
  });

  test('reuses an existing directory and keeps its children', async ({ page }) => {
    const created = await page.evaluate(async () => {
      const first = await window.opfs.mkdir('notes');
      const file = await window.opfs.touch('notes/keep.txt');
      await window.opfs.write(file, 'stay');
      const second = await window.opfs.mkdir('notes');

      return {
        same: await first.isSameEntry(second),
        name: second.name,
        kind: second.kind,
        entries: await window.opfs.readDir('notes'),
        text: new TextDecoder().decode(await window.opfs.readFile('notes/keep.txt')),
      };
    });

    expect(created).toEqual({
      same: true,
      name: 'notes',
      kind: 'directory',
      entries: ['keep.txt'],
      text: 'stay',
    });
  });

  test('normalizes slashes and trims segments', async ({ page }) => {
    const created = await page.evaluate(async () => {
      const dir = await window.opfs.mkdir('  /personal// notes ///leaf/  ');

      return {
        name: dir.name,
        kind: dir.kind,
        root: await window.opfs.readDir(''),
        nested: await window.opfs.readDir('personal/notes'),
      };
    });

    expect(created).toEqual({
      name: 'leaf',
      kind: 'directory',
      root: ['personal'],
      nested: ['leaf'],
    });
  });

  test('returns the root for an empty path', async ({ page }) => {
    const created = await page.evaluate(async () => {
      const root = await navigator.storage.getDirectory();
      const paths = ['', '   ', '/', '///', ' / / '];
      const matches: boolean[] = [];

      for (const path of paths) {
        const dir = await window.opfs.mkdir(path);
        matches.push(await root.isSameEntry(dir));
      }

      return { matches, entries: await window.opfs.readDir('') };
    });

    expect(created.matches).toEqual([true, true, true, true, true]);
    expect(created.entries).toEqual([]);
  });

  test('creates directories whose names contain spaces, dots, or unicode', async ({
    page,
  }) => {
    const names = await page.evaluate(async () => {
      const names = ['my notes', '.hidden', '...', 'café', 'ノート'];

      for (const name of names) {
        const dir = await window.opfs.mkdir(`box/${name}`);
        if (dir.name !== name || dir.kind !== 'directory') {
          throw new Error(`Unexpected handle for ${name}`);
        }
      }

      return window.opfs.readDir('box');
    });

    expect(names.sort()).toEqual(
      ['...', '.hidden', 'café', 'my notes', 'ノート'].sort(),
    );
  });

  test('rejects a dot segment and keeps directories created before it', async ({
    page,
  }) => {
    const created = await page.evaluate(async () => {
      const rejected: string[] = [];

      for (const path of ['.', '..', '  .  ', '  ..  ']) {
        try {
          await window.opfs.mkdir(path);
          rejected.push('ok');
        } catch (error) {
          rejected.push((error as DOMException).name);
        }
      }

      try {
        await window.opfs.mkdir('foo/..');
        rejected.push('ok');
      } catch (error) {
        rejected.push((error as DOMException).name);
      }

      try {
        await window.opfs.mkdir('bar/../escape');
        rejected.push('ok');
      } catch (error) {
        rejected.push((error as DOMException).name);
      }

      return {
        rejected,
        root: await window.opfs.readDir(''),
        foo: await window.opfs.readDir('foo'),
        bar: await window.opfs.readDir('bar'),
      };
    });

    expect(created.rejected).toEqual([
      'TypeError',
      'TypeError',
      'TypeError',
      'TypeError',
      'TypeError',
      'TypeError',
    ]);
    expect(created.root.sort()).toEqual(['bar', 'foo']);
    expect(created.foo).toEqual([]);
    expect(created.bar).toEqual([]);
  });

  test('rejects a path whose segment is already a file', async ({ page }) => {
    const created = await page.evaluate(async () => {
      await window.opfs.touch('personal/blocked');
      await window.opfs.write('personal/blocked', 'original');

      const rejected: string[] = [];
      for (const path of ['personal/blocked', 'personal/blocked/child']) {
        try {
          await window.opfs.mkdir(path);
          rejected.push('ok');
        } catch (error) {
          rejected.push((error as DOMException).name);
        }
      }

      return {
        rejected,
        entries: await window.opfs.readDir('personal'),
        text: new TextDecoder().decode(await window.opfs.readFile('personal/blocked')),
      };
    });

    expect(created).toEqual({
      rejected: ['TypeMismatchError', 'TypeMismatchError'],
      entries: ['blocked'],
      text: 'original',
    });
  });
});
