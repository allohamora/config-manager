import { EnvManager } from 'src/env/env.manager';
import { describe, expect, it } from 'vitest';

describe('EnvManager', () => {
  const envStub = {
    EMPTY_STRING: '',
    SPACE_STRING: '   ',
    EMAIL: 'example@example.com',
    INTEGER: '123',
  } as Record<string, string | undefined>;

  const env = new EnvManager({ getEnv: () => envStub, getNodeEnv: () => 'test' as 'test' | 'production' });

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

  describe('pickFor', () => {
    it('returns values', () => {
      expect(env.pickFor({ test: 'EMAIL' }).value()).toBe(envStub.EMAIL);
      expect(env.pickFor({ test: 'INTEGER' }).value()).toBe(envStub.INTEGER);

      expect(env.pickFor({ production: 'EMAIL' }).value()).toEqual(undefined);
      expect(env.pickFor({ production: 'INTEGER' }).value()).toEqual(undefined);

      expect(env.pickFor({ test: 'EMPTY_STRING' }).value()).toEqual(undefined);
      expect(env.pickFor({ test: 'SPACE_STRING' }).value()).toEqual(undefined);
      expect(env.pickFor({ test: 'OPTIONAL' }).value()).toEqual(undefined);
    });

    it('returns default values', () => {
      expect(env.pickFor({ production: 'INTEGER', rest: 'EMAIL' }).value()).toBe(envStub.EMAIL);
      expect(env.pickFor({ production: 'EMAIL', rest: 'INTEGER' }).value()).toBe(envStub.INTEGER);
    });

    it('returns environment values instead of default', () => {
      expect(env.pickFor({ test: 'INTEGER', rest: 'EMAIL' }).value()).toBe(envStub.INTEGER);
      expect(env.pickFor({ test: 'EMAIL', rest: 'INTEGER' }).value()).toBe(envStub.EMAIL);
    });

    it('returns undefined', () => {
      expect(env.pickFor({ production: 'INTEGER', rest: '__TEST__' }).value()).toBe(undefined);
      expect(env.pickFor({ production: 'EMAIL', rest: '__TEST__' }).value()).toBe(undefined);
    });
  });

  describe('pickForOrThrow', () => {
    it('returns values', () => {
      expect(env.pickForOrThrow({ test: 'EMAIL' }).value()).toBe(envStub.EMAIL);
      expect(env.pickForOrThrow({ test: 'INTEGER' }).value()).toBe(envStub.INTEGER);
    });

    it('returns default values', () => {
      expect(env.pickForOrThrow({ production: 'INTEGER', rest: 'EMAIL' }).value()).toBe(envStub.EMAIL);
      expect(env.pickForOrThrow({ production: 'EMAIL', rest: 'INTEGER' }).value()).toBe(envStub.INTEGER);
    });

    it('returns environment values instead of default', () => {
      expect(env.pickForOrThrow({ test: 'INTEGER', rest: 'EMAIL' }).value()).toBe(envStub.INTEGER);
      expect(env.pickForOrThrow({ test: 'EMAIL', rest: 'INTEGER' }).value()).toBe(envStub.EMAIL);
    });

    it('throws errors', () => {
      expect(() => env.pickForOrThrow({ test: 'EMPTY_STRING' })).toThrowError();
      expect(() => env.pickForOrThrow({ test: 'SPACE_STRING' })).toThrowError();
      expect(() => env.pickForOrThrow({ test: 'OPTIONAL' })).toThrowError();

      expect(() => env.pickForOrThrow({ production: 'EMAIL' })).toThrowError();
      expect(() => env.pickForOrThrow({ production: 'production' })).toThrowError();

      expect(() => env.pickForOrThrow({ production: 'EMAIL', rest: '__TEST__' })).toThrowError();
      expect(() => env.pickForOrThrow({ production: 'EMAIL', rest: 'rest' })).toThrowError();
    });
  });

  describe('getFor', () => {
    it('returns values', () => {
      expect(env.getFor({ test: 'EMAIL' })).toBe(envStub.EMAIL);
      expect(env.getFor({ test: 'INTEGER' })).toBe(envStub.INTEGER);

      expect(env.getFor({ production: 'EMAIL' })).toEqual(undefined);
      expect(env.getFor({ production: 'INTEGER' })).toEqual(undefined);

      expect(env.getFor({ test: 'EMPTY_STRING' })).toEqual(envStub.EMPTY_STRING);
      expect(env.getFor({ test: 'SPACE_STRING' })).toEqual(envStub.SPACE_STRING);
      expect(env.getFor({ test: 'OPTIONAL' })).toEqual(undefined);
    });

    it('returns default values', () => {
      expect(env.getFor({ production: 'INTEGER', rest: 'EMAIL' })).toBe(envStub.EMAIL);
      expect(env.getFor({ production: 'EMAIL', rest: 'INTEGER' })).toBe(envStub.INTEGER);
    });

    it('returns environment values instead of default', () => {
      expect(env.getFor({ test: 'INTEGER', rest: 'EMAIL' })).toBe(envStub.INTEGER);
      expect(env.getFor({ test: 'EMAIL', rest: 'INTEGER' })).toBe(envStub.EMAIL);
    });

    it('returns undefined', () => {
      expect(env.getFor({ production: 'INTEGER', rest: '__TEST__' })).toBe(undefined);
      expect(env.getFor({ production: 'EMAIL', rest: '__TEST__' })).toBe(undefined);
    });
  });

  describe('getForOrThrow', () => {
    it('returns values', () => {
      expect(env.getForOrThrow({ test: 'EMAIL' })).toBe(envStub.EMAIL);
      expect(env.getForOrThrow({ test: 'INTEGER' })).toBe(envStub.INTEGER);
      expect(env.getForOrThrow({ test: 'EMPTY_STRING' })).toEqual(envStub.EMPTY_STRING);
      expect(env.getForOrThrow({ test: 'SPACE_STRING' })).toEqual(envStub.SPACE_STRING);
    });

    it('returns default values', () => {
      expect(env.getForOrThrow({ production: 'INTEGER', rest: 'EMAIL' })).toBe(envStub.EMAIL);
      expect(env.getForOrThrow({ production: 'EMAIL', rest: 'INTEGER' })).toBe(envStub.INTEGER);
    });

    it('returns environment values instead of default', () => {
      expect(env.getForOrThrow({ test: 'INTEGER', rest: 'EMAIL' })).toBe(envStub.INTEGER);
      expect(env.getForOrThrow({ test: 'EMAIL', rest: 'INTEGER' })).toBe(envStub.EMAIL);
    });

    it('throws errors', () => {
      expect(() => env.getForOrThrow({ test: 'OPTIONAL' })).toThrowError();
      expect(() => env.getForOrThrow({ test: 'OPTIONAL', rest: '__TEST__' })).toThrowError();
      expect(() => env.getForOrThrow({ production: 'EMAIL' })).toThrowError();
      expect(() => env.getForOrThrow({ production: 'production' })).toThrowError();
      expect(() => env.getForOrThrow({ production: 'production', rest: 'rest' })).toThrowError();
    });
  });
});
