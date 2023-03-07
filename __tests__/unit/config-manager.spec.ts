import { describe, it, expect } from 'vitest';
import { ConfigManager } from 'src/index.js';

describe('ConfigManager', () => {
  const manager = new ConfigManager({
    load: () => ({ root: { sub: { inner: 1, arr: [1, 2, 3] } }, root2: { missed: undefined, nullable: null } }),
  });

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
    expect(manager.getOrThrow('root2')).toEqual({ missed: undefined, nullable: null });
  });

  it('returns missed', () => {
    expect(manager.getOrThrow('root2.missed')).toEqual(undefined);
  });

  it('returns nullable', () => {
    expect(manager.getOrThrow('root2.nullable')).toEqual(null);
  });
});
