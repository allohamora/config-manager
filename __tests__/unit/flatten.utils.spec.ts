import { describe, it, expect } from 'vitest';
import { flatten } from 'src/utils/flatten.utils.js';

describe('flatten', () => {
  class User {
    public name = 'test';
  }

  const flattensTest = <T>(value: T) => {
    expect(flatten({ root: { inner: value } })).toEqual({ root: { inner: value }, 'root.inner': value });
    expect(flatten({ root: { inner: value }, root2: { inner: value }, root3: { inner: value } })).toEqual({
      root: { inner: value },
      'root.inner': value,
      root2: { inner: value },
      'root2.inner': value,
      root3: { inner: value },
      'root3.inner': value,
    });
    expect(flatten({ root: { sub: { inner: value } }, root2: { inner: value }, root3: value })).toEqual({
      root: { sub: { inner: value } },
      'root.sub': { inner: value },
      'root.sub.inner': value,
      root2: { inner: value },
      'root2.inner': value,
      root3: value,
    });
  };

  it('flattens deep objects', () => {
    flattensTest(1);
    flattensTest(123n);
    flattensTest(true);
    flattensTest(false);
    flattensTest(null);
    flattensTest(undefined);
    flattensTest([1, 2, 3]);
    flattensTest(new Map());
    flattensTest(new Set());
    flattensTest(new User());
    flattensTest(new Date());
  });

  it('does not flatten not plain objects', () => {
    const date = new Date();

    expect(flatten({ map: new Map(), set: new Set(), user: new User(), date })).toEqual({
      map: new Map(),
      set: new Set(),
      user: new User(),
      date,
    });

    expect(flatten({ root: { map: new Map(), set: new Set(), user: new User(), date } })).toEqual({
      root: { map: new Map(), set: new Set(), user: new User(), date },
      'root.map': new Map(),
      'root.set': new Set(),
      'root.user': new User(),
      'root.date': date,
    });
  });
});
