import { Manager } from 'src/utils/manager.utils.js';
import { EnvPicker } from './env.picker.js';

interface Options<C> {
  load?: () => C;
  nodeEnv?: () => string;
}

export class EnvManager<C extends Record<string, string | undefined>> extends Manager<C> {
  private nodeEnv: string;
  private cache = new Map<keyof C, EnvPicker<string | undefined>>();

  constructor({
    load = () => process.env as C,
    nodeEnv = () => process.env.NODE_ENV ?? 'development',
  }: Options<C> = {}) {
    super({ load });

    this.nodeEnv = nodeEnv();
  }

  private getEnvValue<K extends keyof C>(key: K) {
    const value = this.source[key];

    if (value === null || value === undefined || value.trim() === '') {
      return;
    }

    return value;
  }

  public pick<K extends keyof C>(key: K): EnvPicker<C[K] | undefined> {
    if (!this.cache.has(key)) {
      this.cache.set(key, new EnvPicker(this.getEnvValue(key), this.nodeEnv));
    }

    return this.cache.get(key) as EnvPicker<C[K] | undefined>;
  }

  public pickOrThrow<K extends keyof C>(key: K): EnvPicker<C[K]> {
    const value = this.source[key];

    if (value === null || value === undefined || value === '') {
      throw new Error(`key: ${key.toString()} is empty`);
    }

    return this.pick(key) as EnvPicker<C[K]>;
  }
}
