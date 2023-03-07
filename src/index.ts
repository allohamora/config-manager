interface Options<C> {
  load: () => C;
}

export class ConfigManager<C extends Record<string, unknown>> {
  public config: C;

  constructor({ load }: Options<C>) {
    this.config = load();
  }

  public get<K extends keyof C>(key: K): C[K] | undefined {
    return this.config[key];
  }

  public getOrThrow<K extends keyof C>(key: K): C[K] {
    if (key in this.config) {
      return this.config[key];
    }

    throw new Error(`key: ${key.toString()} is not found in the config`);
  }
}
