import { EnvManager } from 'src/env/env.manager';
import { describe, expect, it } from 'vitest';

describe('EnvManager', () => {
  const envStub = {
    EMPTY_STRING: '',
    SPACE_STRING: '   ',
    EMAIL: 'example@example.com',
    INTEGER: '123',
  } as Record<string, string | undefined>;

  const env = new EnvManager({ load: () => envStub });

  describe('pick', () => {
    it('returns values', () => {
      expect(env.pick('EMAIL').value()).toBe(envStub.EMAIL);
      expect(env.pick('INTEGER').value()).toBe(envStub.INTEGER);

      expect(env.pick('EMPTY_STRING').value()).toEqual(undefined);
      expect(env.pick('SPACE_STRING').value()).toEqual(undefined);
      expect(env.pick('OPTIONAL').value()).toEqual(undefined);
    });
  });

  describe('pickOrThrow', () => {
    it('returns values', () => {
      expect(env.pickOrThrow('EMAIL').value()).toBe(envStub.EMAIL);
      expect(env.pickOrThrow('INTEGER').value()).toBe(envStub.INTEGER);
    });

    it('throws errors', () => {
      expect(() => env.pickOrThrow('EMPTY_STRING')).toThrowError();
      expect(() => env.pickOrThrow('SPACE_STRING')).toThrowError();
      expect(() => env.pickOrThrow('OPTIONAL')).toThrowError();
    });
  });
});
