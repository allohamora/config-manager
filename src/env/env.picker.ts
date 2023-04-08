export type WrappedInEnvPickers<T> = {
  [K in keyof T]: EnvPicker<T[K]>;
};

type MoveOptional<T, R> = T extends null
  ? T extends undefined
    ? R | null | undefined
    : R | null
  : T extends undefined
  ? R | undefined
  : R;

export const wrapInEnvPickers = <C extends Record<string, string | undefined>>(config: C, nodeEnv: string) => {
  return Object.keys(config).reduce((result, key) => {
    return { ...result, [key]: new EnvPicker(config[key], nodeEnv) };
  }, {} as WrappedInEnvPickers<C>);
};

export class EnvPicker<S> {
  constructor(private state: S, private nodeEnv: string) {}

  public default<NS extends S>(newState: NS): EnvPicker<NS | NonNullable<S>> {
    this.state ??= newState;

    return this as unknown as EnvPicker<NS | NonNullable<S>>;
  }

  public defaultFor(envRecord: Record<string, S>) {
    this.state ??= envRecord[this.nodeEnv] as S;

    return this;
  }

  public map<R>(mapper: (state: S) => R) {
    this.state = mapper(this.state) as unknown as S;

    return this as unknown as EnvPicker<R>;
  }

  public mapIfExist<R>(mapper: (state: NonNullable<S>) => R) {
    if (this.state !== null && this.state !== undefined) {
      this.state = mapper(this.state as NonNullable<S>) as unknown as S;
    }

    return this as unknown as EnvPicker<MoveOptional<S, R>>;
  }

  public value() {
    return this.state;
  }
}
