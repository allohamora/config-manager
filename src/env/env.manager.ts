import { Manager } from 'src/utils/manager.utils.js';
import { BaseConfig, AtLeastOne, EnvPicker } from './env.picker.js';

interface Options<E, C> {
  getEnv?: () => C;
  getNodeEnv?: () => E;
}

export class EnvManager<E extends string, C extends BaseConfig = BaseConfig> extends Manager<C> {
  private nodeEnv: string;
  private cache = new Map<keyof C, EnvPicker<E, string | undefined>>();

  constructor({
    getEnv = () => process.env as C,
    getNodeEnv = () => (process.env.NODE_ENV ?? 'development') as E,
  }: Options<E, C> = {}) {
    super({ getSource: getEnv });

    this.nodeEnv = getNodeEnv();
  }

  private getEnvValue<K extends keyof C>(key: K) {
    const value = this.source[key];

    if (value === null || value === undefined || value.trim() === '') {
      return;
    }

    return value;
  }

  private getKeyOrThrow<K extends keyof C>(envRecord: AtLeastOne<Record<E, K>>): K {
    const key = envRecord[this.nodeEnv as E] as string | undefined;

    if (!key) {
      throw new Error(`key is not found empty in nodeEnv: ${this.nodeEnv}`);
    }

    return key as K;
  }

  public pick<K extends keyof C>(key: K): EnvPicker<E, C[K] | undefined> {
    if (!this.cache.has(key)) {
      this.cache.set(key, new EnvPicker(this.getEnvValue(key), this.nodeEnv) as EnvPicker<E, C[K] | undefined>);
    }

    return this.cache.get(key) as EnvPicker<E, C[K] | undefined>;
  }

  public pickOrThrow<K extends keyof C>(key: K): EnvPicker<E, C[K]> {
    const value = this.source[key];

    if (value === null || value === undefined || value.trim() === '') {
      throw new Error(`key: ${key.toString()} is empty`);
    }

    return this.pick(key) as EnvPicker<E, C[K]>;
  }

  public pickFor<K extends keyof C>(envRecord: AtLeastOne<Record<E, K>>): EnvPicker<E, C[K] | undefined> {
    const key = envRecord[this.nodeEnv as E] as string | undefined;

    if (!key) {
      return new EnvPicker(undefined, this.nodeEnv) as EnvPicker<E, undefined>;
    }

    return this.pick(key) as EnvPicker<E, C[K] | undefined>;
  }

  public pickForOrThrow<K extends keyof C>(envRecord: AtLeastOne<Record<E, K>>): EnvPicker<E, C[K]> {
    const key = this.getKeyOrThrow(envRecord);

    return this.pickOrThrow(key as K);
  }

  public getFor<K extends keyof C>(envRecord: AtLeastOne<Record<E, K>>) {
    const key = envRecord[this.nodeEnv as E] as string | undefined;

    if (!key) {
      return;
    }

    return this.get(key as K);
  }

  public getForOrThrow<K extends keyof C>(envRecord: AtLeastOne<Record<E, K>>) {
    const key = this.getKeyOrThrow(envRecord);

    return this.getOrThrow(key as K);
  }
}
