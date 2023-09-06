import { Manager } from 'src/utils/manager.utils.js';
import { BaseConfig, EnvPicker, EnvRecord } from './env.picker.js';

interface Options<NodeEnv, Env> {
  getEnv?: () => Env;
  getNodeEnv?: () => NodeEnv;
}

export class EnvManager<NodeEnv extends string, Config extends BaseConfig = BaseConfig> extends Manager<Config> {
  private nodeEnv: string;

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

  private getKeyOrThrow<Key extends keyof Config>(envRecord: EnvRecord<NodeEnv, Key>) {
    const key: Key | undefined = envRecord[this.nodeEnv as NodeEnv] ?? envRecord.rest;

    if (!key) {
      throw new Error(`key is not found empty in nodeEnv: ${this.nodeEnv}`);
    }

    return key;
  }

  public pick<Key extends keyof Config>(key: Key) {
    return new EnvPicker(this.getEnvValue(key), this.nodeEnv) as EnvPicker<NodeEnv, Config[Key] | undefined>;
  }

  public pickOrThrow<Key extends keyof Config>(key: Key) {
    const value = this.source[key];

    if (value === null || value === undefined || value.trim() === '') {
      throw new Error(`key: ${key.toString()} is empty`);
    }

    return this.pick(key) as EnvPicker<NodeEnv, NonNullable<Config[Key]>>;
  }

  public pickFor<Key extends keyof Config>(envRecord: EnvRecord<NodeEnv, Key>) {
    const key: Key | undefined = envRecord[this.nodeEnv as NodeEnv] ?? envRecord.rest;

    if (!key) {
      return new EnvPicker(undefined, this.nodeEnv) as EnvPicker<NodeEnv, undefined>;
    }

    return this.pick(key) as EnvPicker<NodeEnv, Config[Key] | undefined>;
  }

  public pickForOrThrow<Key extends keyof Config>(envRecord: EnvRecord<NodeEnv, Key>) {
    const key = this.getKeyOrThrow(envRecord);

    return this.pickOrThrow(key);
  }

  public getFor<Key extends keyof Config>(envRecord: EnvRecord<NodeEnv, Key>) {
    const key: Key | undefined = envRecord[this.nodeEnv as NodeEnv] ?? envRecord.rest;

    if (!key) {
      return;
    }

    return this.get(key);
  }

  public getForOrThrow<Key extends keyof Config>(envRecord: EnvRecord<NodeEnv, Key>) {
    const key: Key | undefined = this.getKeyOrThrow(envRecord);

    return this.getOrThrow(key);
  }
}
