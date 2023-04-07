import { describe, it, expect } from 'vitest';
import { ConfigManager } from 'src/index.js';

describe('ConfigManager', () => {
  const manager = new ConfigManager({
    load: () => ({
      root: { sub: { inner: 1, arr: [1, 2, 3] } },
      root2: { empty: undefined, nullable: null },
      false: false,
      emptyString: '',
    }),
  });

  describe('getOrThrow', () => {
    it('returns root', () => {
      expect(manager.getOrThrow('root')).toEqual({ sub: { inner: 1, arr: [1, 2, 3] } });
    });

    it('returns sub', () => {
      expect(manager.getOrThrow('root.sub')).toEqual({ inner: 1, arr: [1, 2, 3] });
    });

    it('returns inner', () => {
      expect(manager.getOrThrow('root.sub.inner')).toEqual(1);
    });

    it('returns arr', () => {
      expect(manager.getOrThrow('root.sub.arr')).toEqual([1, 2, 3]);
    });

    it('returns root2', () => {
      expect(manager.getOrThrow('root2')).toEqual({ empty: undefined, nullable: null });
    });

    it('returns false', () => {
      expect(manager.getOrThrow('false')).toBe(false);
    });

    it('returns empty string', () => {
      expect(manager.getOrThrow('emptyString')).toBe('');
    });

    it('throws and error for undefined', () => {
      expect(() => manager.getOrThrow('root2.empty')).toThrowError();
    });

    it('throws an error for null', () => {
      expect(() => manager.getOrThrow('root2.nullable')).toThrowError();
    });

    it('throws an error for not defined', () => {
      expect(() => manager.getOrThrow('hello' as 'root')).toThrow();
    });
  });

  describe('get', () => {
    it('returns null', () => {
      expect(manager.get('root2.nullable')).toEqual(null);
    });

    it('returns undefined', () => {
      expect(manager.get('root2.empty')).toEqual(undefined);
    });
  });
});
