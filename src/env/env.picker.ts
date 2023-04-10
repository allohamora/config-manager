export type WrappedInEnvPickers<E extends string, T> = {
  [K in keyof T]: EnvPicker<E, T[K]>;
};

type MoveOptional<T, R> = T extends null
  ? T extends undefined
    ? R | null | undefined
    : R | null
  : T extends undefined
  ? R | undefined
  : R;

export type BaseConfig = Record<string, string | undefined>;

export const wrapInEnvPickers = <E extends string, C extends BaseConfig>(config: C, nodeEnv: E) => {
  return Object.keys(config).reduce((result, key) => {
    return { ...result, [key]: new EnvPicker(config[key], nodeEnv) };
  }, {} as WrappedInEnvPickers<E, C>);
};

export class EnvPicker<E extends string, S> {
  constructor(private state: S, private nodeEnv: E) {}

  public default<NS extends S>(newState: NS): EnvPicker<E, NS | NonNullable<S>> {
    this.state ??= newState;

    return this as unknown as EnvPicker<E, NS | NonNullable<S>>;
  }

  public defaultFor(envRecord: Partial<Record<E, S>>) {
    this.state ??= envRecord[this.nodeEnv] as S;

    return this;
  }

  public map<R>(mapper: (state: S) => R) {
    this.state = mapper(this.state) as unknown as S;

    return this as unknown as EnvPicker<E, R>;
  }

  public mapIfExists<R>(mapper: (state: NonNullable<S>) => R) {
    if (this.state !== null && this.state !== undefined) {
      this.state = mapper(this.state as NonNullable<S>) as unknown as S;
    }

    return this as unknown as EnvPicker<E, MoveOptional<S, R>>;
  }

  public value() {
    return this.state;
  }
}
