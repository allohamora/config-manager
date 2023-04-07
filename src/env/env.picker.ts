export type WrappedInEnvPickers<T> = {
  [K in keyof T]: EnvPicker<T[K]>;
};

export const wrapInEnvPickers = <C extends Record<string, string | undefined>>(config: C, nodeEnv: string) => {
  return Object.keys(config).reduce((result, key) => {
    return { ...result, [key]: new EnvPicker(config[key], nodeEnv) };
  }, {} as WrappedInEnvPickers<C>);
};

export class EnvPicker<S> {
  constructor(private state: S, private nodeEnv: string) {}

  public default<NS extends NonNullable<S>>(newState: NonNullable<S>): EnvPicker<NS> {
    this.state ??= newState;

    return this as unknown as EnvPicker<NS>;
  }

  public defaultFor(envRecord: Record<string, S>) {
    this.state ??= envRecord[this.nodeEnv] as S;

    return this;
  }

  public map<R>(mapper: (state: S) => R) {
    this.state = mapper(this.state) as unknown as S;

    return this as unknown as EnvPicker<R>;
  }

  public value() {
    return this.state;
  }
}
