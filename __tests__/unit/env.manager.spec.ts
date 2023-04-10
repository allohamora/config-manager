import { EnvManager } from 'src/env/env.manager';
import { describe, expect, it } from 'vitest';

describe('EnvManager', () => {
  const envStub = {
    EMPTY_STRING: '',
    SPACE_STRING: '   ',
    EMAIL: 'example@example.com',
    INTEGER: '123',
  } as Record<string, string | undefined>;

  const env = new EnvManager({ load: () => envStub, nodeEnv: () => 'test' as 'test' | 'production' });

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
      expect(env.pickFor({ test: 'EMAIL' })?.value()).toBe(envStub.EMAIL);
      expect(env.pickFor({ test: 'INTEGER' })?.value()).toBe(envStub.INTEGER);

      expect(env.pickFor({ production: 'EMAIL' })?.value()).toEqual(undefined);
      expect(env.pickFor({ production: 'INTEGER' })?.value()).toEqual(undefined);

      expect(env.pickFor({ test: 'EMPTY_STRING' })?.value()).toEqual(undefined);
      expect(env.pickFor({ test: 'SPACE_STRING' })?.value()).toEqual(undefined);
      expect(env.pickFor({ test: 'OPTIONAL' })?.value()).toEqual(undefined);
    });
  });

  describe('pickForOrThrow', () => {
    it('returns values', () => {
      expect(env.pickForOrThrow({ test: 'EMAIL' }).value()).toBe(envStub.EMAIL);
      expect(env.pickForOrThrow({ test: 'INTEGER' }).value()).toBe(envStub.INTEGER);
    });

    it('throws errors', () => {
      expect(() => env.pickForOrThrow({ test: 'EMPTY_STRING' })).toThrowError();
      expect(() => env.pickForOrThrow({ test: 'SPACE_STRING' })).toThrowError();
      expect(() => env.pickForOrThrow({ test: 'OPTIONAL' })).toThrowError();

      expect(() => env.pickForOrThrow({ production: 'EMAIL' })).toThrowError();
      expect(() => env.pickForOrThrow({ production: 'production' })).toThrowError();
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
  });

  describe('getForOrThrow', () => {
    it('returns values', () => {
      expect(env.getForOrThrow({ test: 'EMAIL' })).toBe(envStub.EMAIL);
      expect(env.getForOrThrow({ test: 'INTEGER' })).toBe(envStub.INTEGER);
      expect(env.getForOrThrow({ test: 'EMPTY_STRING' })).toEqual(envStub.EMPTY_STRING);
      expect(env.getForOrThrow({ test: 'SPACE_STRING' })).toEqual(envStub.SPACE_STRING);
    });

    it('throws errors', () => {
      expect(() => env.getForOrThrow({ test: 'OPTIONAL' })).toThrowError();
      expect(() => env.getForOrThrow({ production: 'EMAIL' })).toThrowError();
      expect(() => env.getForOrThrow({ production: 'production' })).toThrowError();
    });
  });
});
