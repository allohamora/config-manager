import { Manager } from 'src/utils/manager.utils.js';
import { BaseConfig, EnvPicker, EnvRecord } from './env.picker.js';

interface Options<NodeEnv, Env> {
  getEnv?: () => Env;
  getNodeEnv?: () => NodeEnv;
}

export class EnvManager<NodeEnv extends string, Config extends BaseConfig = BaseConfig> extends Manager<Config> {
  private nodeEnv: NodeEnv;

  constructor({
    getEnv = () => process.env as Config,
    getNodeEnv = () => (process.env.NODE_ENV ?? 'development') as NodeEnv,
  }: Options<NodeEnv, Config> = {}) {
    super({ getSource: getEnv });

    this.nodeEnv = getNodeEnv();
  }

  private getEnvValue<Key extends keyof Config>(key: Key): Config[Key] | undefined {
    const value = this.source[key];

    if (value === null || value === undefined || value.trim() === '') {
      return;
    }

    return value;
  }

  private getKeyOrThrow<Key extends keyof Config>(envRecord: EnvRecord<NodeEnv, Key>): Key {
    const key = envRecord[this.nodeEnv] ?? envRecord.rest;

    if (!key) {
      throw new Error(`key is not found empty in nodeEnv: ${this.nodeEnv}`);
    }

    return key;
  }

  public pick<Key extends keyof Config>(key: Key): EnvPicker<NodeEnv, Config[Key] | undefined> {
    return new EnvPicker(this.getEnvValue(key), this.nodeEnv);
  }

  public pickOrThrow<Key extends keyof Config>(key: Key): EnvPicker<NodeEnv, NonNullable<Config[Key]>> {
    const value = this.source[key];

    if (value === null || value === undefined || value.trim() === '') {
      throw new Error(`key: ${key.toString()} is empty`);
    }

    return new EnvPicker(value, this.nodeEnv);
  }

  public pickFor<Key extends keyof Config>(
    envRecord: EnvRecord<NodeEnv, Key>,
  ): EnvPicker<NodeEnv, Config[Key] | undefined> {
    const key = envRecord[this.nodeEnv] ?? envRecord.rest;

    if (!key) {
      return new EnvPicker(undefined, this.nodeEnv);
    }

    return this.pick(key);
  }

  public pickForOrThrow<Key extends keyof Config>(
    envRecord: EnvRecord<NodeEnv, Key>,
  ): EnvPicker<NodeEnv, NonNullable<Config[Key]>> {
    const key = this.getKeyOrThrow(envRecord);

    return this.pickOrThrow(key);
  }

  public getFor<Key extends keyof Config>(envRecord: EnvRecord<NodeEnv, Key>): Config[Key] | undefined {
    const key = envRecord[this.nodeEnv] ?? envRecord.rest;

    if (!key) {
      return;
    }

    return this.get(key);
  }

  public getForOrThrow<Key extends keyof Config>(envRecord: EnvRecord<NodeEnv, Key>): NonNullable<Config[Key]> {
    const key = this.getKeyOrThrow(envRecord);

    return this.getOrThrow(key);
  }
}
