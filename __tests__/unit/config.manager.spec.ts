import { describe, it, expect } from 'vitest';
import { ConfigManager } from 'src/config/config.manager.js';

describe('ConfigManager', () => {
  class User {
    public name = 'test';
  }

  const notPlain = {
    map: new Map(),
    date: new Date(),
    set: new Set(),
    user: new User(),
  };

  const manager = new ConfigManager({
    getConfig: () => ({
      root: { sub: { inner: 1, arr: [1, 2, 3] } },
      root2: { empty: undefined, nullable: null },
      false: false,
      emptyString: '',
      notPlain,
      ...notPlain,
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

    it('returns not plain objects', () => {
      expect(manager.getOrThrow('map')).toEqual(notPlain.map);
      expect(manager.getOrThrow('notPlain.map')).toEqual(notPlain.map);
      expect(() => manager.getOrThrow('map.size' as any)).toThrowError();
      expect(() => manager.getOrThrow('notPlain.map.size' as any)).toThrowError();

      expect(manager.getOrThrow('set')).toEqual(notPlain.set);
      expect(manager.getOrThrow('notPlain.set')).toEqual(notPlain.set);
      expect(() => manager.getOrThrow('set.size' as any)).toThrowError();
      expect(() => manager.getOrThrow('notPlain.set.size' as any)).toThrowError();

      expect(manager.getOrThrow('user')).toEqual(notPlain.user);
      expect(manager.getOrThrow('notPlain.user')).toEqual(notPlain.user);
      expect(() => manager.getOrThrow('user.name' as any)).toThrowError();
      expect(() => manager.getOrThrow('notPlain.user.name' as any)).toThrowError();

      expect(manager.getOrThrow('date')).toEqual(notPlain.date);
      expect(manager.getOrThrow('notPlain.date')).toEqual(notPlain.date);
      expect(() => manager.getOrThrow('date.toISOString' as any)).toThrowError();
      expect(() => manager.getOrThrow('notPlain.date.toISOString' as any)).toThrowError();
    });
  });

  describe('get', () => {
    it('returns null', () => {
      expect(manager.get('root2.nullable')).toEqual(null);
    });

    it('returns undefined', () => {
      expect(manager.get('root2.empty')).toEqual(undefined);
    });

    it('returns not plain objects', () => {
      expect(manager.get('map')).toEqual(notPlain.map);
      expect(manager.get('notPlain.map')).toEqual(notPlain.map);
      expect(manager.get('map.size' as any)).toEqual(undefined);
      expect(manager.get('notPlain.map.size' as any)).toEqual(undefined);

      expect(manager.get('set')).toEqual(notPlain.set);
      expect(manager.get('notPlain.set')).toEqual(notPlain.set);
      expect(manager.get('set.size' as any)).toEqual(undefined);
      expect(manager.get('notPlain.set.size' as any)).toEqual(undefined);

      expect(manager.get('user')).toEqual(notPlain.user);
      expect(manager.get('notPlain.user')).toEqual(notPlain.user);
      expect(manager.get('user.name' as any)).toEqual(undefined);
      expect(manager.get('notPlain.user.name' as any)).toEqual(undefined);

      expect(manager.get('date')).toEqual(notPlain.date);
      expect(manager.get('notPlain.date')).toEqual(notPlain.date);
      expect(manager.get('date.toISOString' as any)).toEqual(undefined);
      expect(manager.get('notPlain.date.toISOString' as any)).toEqual(undefined);
    });
  });
});
