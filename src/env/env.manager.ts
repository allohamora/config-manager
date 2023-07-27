import { Manager } from 'src/utils/manager.utils.js';
import { BaseConfig, AtLeastOne, EnvPicker } from './env.picker.js';

interface Options<NodeEnv, Env> {
  getEnv?: () => Env;
  getNodeEnv?: () => NodeEnv;
}

export class EnvManager<NodeEnv extends string, Config extends BaseConfig = BaseConfig> extends Manager<Config> {
  private nodeEnv: string;
  private cache = new Map<keyof Config, EnvPicker<NodeEnv, string | undefined>>();

  constructor({
    getEnv = () => process.env as Config,
    getNodeEnv = () => (process.env.NODE_ENV ?? 'development') as NodeEnv,
  }: Options<NodeEnv, Config> = {}) {
    super({ getSource: getEnv });

    this.nodeEnv = getNodeEnv();
  }

  private getEnvValue<Key extends keyof Config>(key: Key) {
    const value = this.source[key];

    if (value === null || value === undefined || value.trim() === '') {
      return;
    }

    return value;
  }

  private getKeyOrThrow<Key extends keyof Config>(envRecord: AtLeastOne<Record<NodeEnv, Key>>) {
    const key = envRecord[this.nodeEnv as NodeEnv] as string | undefined;

    if (!key) {
      throw new Error(`key is not found empty in nodeEnv: ${this.nodeEnv}`);
    }

    return key as Key;
  }

  public pick<Key extends keyof Config>(key: Key) {
    if (!this.cache.has(key)) {
      this.cache.set(
        key,
        new EnvPicker(this.getEnvValue(key), this.nodeEnv) as EnvPicker<NodeEnv, Config[Key] | undefined>,
      );
    }

    return this.cache.get(key) as EnvPicker<NodeEnv, Config[Key] | undefined>;
  }

  public pickOrThrow<Key extends keyof Config>(key: Key) {
    const value = this.source[key];

    if (value === null || value === undefined || value.trim() === '') {
      throw new Error(`key: ${key.toString()} is empty`);
    }

    return this.pick(key) as EnvPicker<NodeEnv, NonNullable<Config[Key]>>;
  }

  public pickFor<Key extends keyof Config>(envRecord: AtLeastOne<Record<NodeEnv, Key>>) {
    const key = envRecord[this.nodeEnv as NodeEnv] as string | undefined;

    if (!key) {
      return new EnvPicker(undefined, this.nodeEnv) as EnvPicker<NodeEnv, undefined>;
    }

    return this.pick(key) as EnvPicker<NodeEnv, Config[Key] | undefined>;
  }

  public pickForOrThrow<Key extends keyof Config>(envRecord: AtLeastOne<Record<NodeEnv, Key>>) {
    const key = this.getKeyOrThrow(envRecord);

    return this.pickOrThrow(key as Key);
  }

  public getFor<Key extends keyof Config>(envRecord: AtLeastOne<Record<NodeEnv, Key>>) {
    const key = envRecord[this.nodeEnv as NodeEnv] as string | undefined;

    if (!key) {
      return;
    }

    return this.get(key as Key);
  }

  public getForOrThrow<Key extends keyof Config>(envRecord: AtLeastOne<Record<NodeEnv, Key>>) {
    const key = this.getKeyOrThrow(envRecord);

    return this.getOrThrow(key as Key);
  }
}
