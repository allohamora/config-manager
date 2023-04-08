import { Manager } from 'src/utils/manager.utils.js';
import { describe, expect, it } from 'vitest';

describe('Manager', () => {
  const manager = new Manager({
    load: () => ({
      emptyString: '',
      nullable: null,
      empty: undefined,
      string: 'value',
      object: {},
      array: [],
      number: 123,
      bigNumber: 12n,
      symbol: Symbol.for('test'),
      false: false,
      true: true,
    }),
  });

  describe('get', () => {
    it('gets values', () => {
      expect(manager.get('emptyString')).toEqual('');
      expect(manager.get('nullable')).toEqual(null);
      expect(manager.get('empty')).toEqual(undefined);
      expect(manager.get('string')).toEqual('value');
      expect(manager.get('object')).toEqual({});
      expect(manager.get('array')).toEqual([]);
      expect(manager.get('number')).toEqual(123);
      expect(manager.get('bigNumber')).toEqual(12n);
      expect(manager.get('symbol')).toEqual(Symbol.for('test'));
      expect(manager.get('false')).toEqual(false);
      expect(manager.get('true')).toEqual(true);
    });
  });

  describe('getOrThrow', () => {
    it('gets values', () => {
      expect(manager.getOrThrow('emptyString')).toEqual('');
      expect(manager.getOrThrow('string')).toEqual('value');
      expect(manager.getOrThrow('object')).toEqual({});
      expect(manager.getOrThrow('array')).toEqual([]);
      expect(manager.getOrThrow('number')).toEqual(123);
      expect(manager.getOrThrow('bigNumber')).toEqual(12n);
      expect(manager.getOrThrow('symbol')).toEqual(Symbol.for('test'));
      expect(manager.getOrThrow('false')).toEqual(false);
      expect(manager.getOrThrow('true')).toEqual(true);
    });

    it('throws errors', () => {
      expect(() => manager.getOrThrow('nullable')).toThrowError();
      expect(() => manager.getOrThrow('empty')).toThrowError();
    });
  });
});
