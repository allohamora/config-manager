interface Options<C> {
  getSource: () => C;
}

export class Manager<C extends Record<string, unknown>> {
  protected source: C;

  constructor({ getSource }: Options<C>) {
    this.source = getSource();
  }

  public get<K extends keyof C>(key: K): C[K] {
    return this.source[key];
  }

  public getOrThrow<K extends keyof C>(key: K): NonNullable<C[K]> {
    const value = this.source[key];

    if (value === null || value === undefined) {
      throw new Error(`key: ${key.toString()} is not found`);
    }

    return value;
  }
}
