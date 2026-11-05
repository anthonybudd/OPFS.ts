import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  basename,
  directories,
  dirname,
  normalize,
} from '../../src/util/helpers.ts';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('normalize', () => {
  it.each<[string, string]>([
    [' /personal//notes/ ', 'personal/notes'],
    ['', ''],
    ['   ', ''],
    ['/', ''],
    ['///', ''],
    ['personal/notes', 'personal/notes'],
    ['/personal/notes/', 'personal/notes'],
    ['///personal//notes///', 'personal/notes'],
    ['personal//notes///draft', 'personal/notes/draft'],
    ['  /personal/notes/  ', 'personal/notes'],
    ['personal / notes', 'personal / notes'],
    ['a / / b', 'a / / b'],
  ])('normalizes %j to %j', (input, expected) => {
    expect(normalize(input)).toBe(expected);
  });
});

describe('directories', () => {
  it.each<[string, string[]]>([
    ['personal//notes/test.txt', ['personal', 'notes', 'test.txt']],
    ['', []],
    ['/', []],
    ['///', []],
    ['   ', []],
    ['notes', ['notes']],
    ['  notes  ', ['notes']],
    ['personal/ notes /test.txt', ['personal', 'notes', 'test.txt']],
    ['a/   /b', ['a', 'b']],
    ['a / / b', ['a', 'b']],
    ['a/./b/../c', ['a', '.', 'b', '..', 'c']],
    ['/personal/notes/', ['personal', 'notes']],
  ])('splits %j into %j', (input, expected) => {
    expect(directories(input)).toEqual(expected);
  });
});

describe('basename', () => {
  it.each<[string, string]>([
    ['personal/notes/test.txt', 'test.txt'],
    ['', ''],
    ['/', ''],
    ['   ', ''],
    ['test.txt', 'test.txt'],
    ['  test.txt  ', 'test.txt'],
    ['personal//notes/', 'notes'],
    ['a/b/', 'b'],
    ['a/   /b', 'b'],
    ['a/../b', 'b'],
    ['.', '.'],
    ['..', '..'],
    [' /personal/notes/test.txt ', 'test.txt'],
  ])('basename(%j) is %j', (input, expected) => {
    expect(basename(input)).toBe(expected);
  });
});

describe('dirname', () => {
  it.each<[string, string]>([
    ['personal/notes/test.txt', 'personal/notes'],
    ['', ''],
    ['/', ''],
    ['test.txt', ''],
    ['personal/notes/', 'personal'],
    ['a/b/', 'a'],
    ['a/b/c/d', 'a/b/c'],
    ['personal//notes/test.txt', 'personal/notes'],
    ['personal/ notes /test.txt', 'personal/notes'],
    ['a/../b', 'a/..'],
    [' /personal/notes/test.txt ', 'personal/notes'],
    ['a/   /b', 'a'],
  ])('dirname(%j) is %j', (input, expected) => {
    expect(dirname(input)).toBe(expected);
  });
});