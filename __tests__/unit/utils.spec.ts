import { describe, it, expect } from 'vitest';
import { flatten } from 'src/utils.js';

describe('flatten', () => {
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
  });
});
