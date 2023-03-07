import { flatten, Flatten } from './utils.js';

interface Options<C> {
  load: () => C;
}

export class ConfigManager<C extends Record<string, unknown>, FC = Flatten<C>> {
  public config: FC;

  constructor({ load }: Options<C>) {
    this.config = flatten(load()) as FC;
  }

  public get<K extends keyof FC>(key: K): FC[K] | undefined {
    return this.config[key];
  }

  public getOrThrow<K extends keyof FC>(key: K): FC[K] {
    if (key in (this.config as object)) {
      return this.config[key];
    }

    throw new Error(`key: ${key.toString()} is not found in the config`);
  }
}
