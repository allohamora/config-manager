import { flatten, Flatten } from './utils.js';

interface Options<C> {
  load: () => C;
}

export class ConfigManager<C extends Record<string, unknown>, FC = Flatten<C>> {
  private config: FC;

  constructor({ load }: Options<C>) {
    this.config = flatten(load()) as FC;
  }

  public get<K extends keyof FC>(key: K): FC[K] | undefined {
    return this.config[key];
  }

  public getOrThrow<K extends keyof FC>(key: K): FC[K] {
    const value = this.config[key];

    if (value === null || value === undefined) {
      throw new Error(`key: ${key.toString()} is not found in the config`);
    }

    return value;
  }
}
