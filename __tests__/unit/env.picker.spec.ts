import { EnvPicker } from 'src/env/env.picker.js';
import { describe, expect, it } from 'vitest';

describe('EnvPicker', () => {
  describe('default', () => {
    it('sets default value', () => {
      expect(new EnvPicker(undefined as string | undefined, 'test').default('123').value()).toBe('123');
      expect(new EnvPicker(null as string | null, 'test').default('123').value()).toBe('123');
    });

    it('doesn`t set default value', () => {
      expect(new EnvPicker(false as boolean | undefined, 'test').default(true).value()).toBe(false);
      expect(new EnvPicker('', 'test').default('123').value()).toBe('');
    });
  });

  describe('defaultFor', () => {
    it('sets default value for environment', () => {
      expect(new EnvPicker(undefined as string | undefined, 'test').defaultFor({ test: '123' }).value()).toBe('123');
      expect(new EnvPicker(null as string | null, 'test').defaultFor({ test: '123' }).value()).toBe('123');
    });

    it('doesn`t set default value for environment', () => {
      expect(new EnvPicker(undefined as string | undefined, 'test').defaultFor({ production: '123' }).value()).toBe(
        undefined,
      );
      expect(new EnvPicker(undefined as string | undefined, 'test').defaultFor({ development: '123' }).value()).toBe(
        undefined,
      );

      expect(new EnvPicker(false as boolean | undefined, 'test').defaultFor({ test: true }).value()).toBe(false);
      expect(new EnvPicker('', 'test').defaultFor({ test: '123' }).value()).toBe('');
    });
  });

  describe('map', () => {
    it('maps state', () => {
      expect(new EnvPicker('123', 'test').map(Number).value()).toBe(123);
      expect(new EnvPicker(undefined as string | undefined, 'test').default('123').map(Number).value()).toBe(123);
      expect(new EnvPicker('false', 'test').default('123').map(JSON.parse).value()).toBe(false);
      expect(new EnvPicker(undefined as string | undefined, 'test').map((state) => !!state).value()).toBe(false);
    });
  });

  describe('mapIfExist', () => {
    it('maps state if it exists', () => {
      expect(new EnvPicker('123' as string | undefined, 'test').mapIfExist(Number).value()).toBe(123);
      expect(new EnvPicker(undefined as string | undefined, 'test').default('123').mapIfExist(Number).value()).toBe(
        123,
      );
      expect(new EnvPicker('false', 'test').default('123').mapIfExist(JSON.parse).value()).toBe(false);

      expect(new EnvPicker(undefined as string | undefined, 'test').mapIfExist((state) => !!state).value()).toBe(
        undefined,
      );
      expect(new EnvPicker(null as string | null, 'test').mapIfExist((state) => !!state).value()).toBe(null);
    });
  });

  describe('value', () => {
    it('returns value', () => {
      expect(new EnvPicker('123', 'test').value()).toBe('123');
      expect(new EnvPicker('', 'test').value()).toBe('');
      expect(new EnvPicker({}, 'test').value()).toEqual({});
      expect(new EnvPicker([], 'test').value()).toEqual([]);

      expect(new EnvPicker(undefined, 'test').value()).toBe(undefined);
      expect(new EnvPicker(null, 'test').value()).toBe(null);
    });
  });
});
