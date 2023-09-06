interface Options<Source> {
  getSource: () => Source;
}

export class Manager<Source extends Record<string, unknown>> {
  protected source: Source;

  constructor({ getSource }: Options<Source>) {
    this.source = getSource();
  }

  public get<Key extends keyof Source>(key: Key): Source[Key] | undefined {
    return this.source[key];
  }

  public getOrThrow<Key extends keyof Source>(key: Key): Source[Key] {
    const value = this.source[key];

    if (value === null || value === undefined) {
      throw new Error(`key: ${key.toString()} is not found`);
    }

    return value;
  }
}
