export type WrappedInEnvPickers<NodeEnv extends string, Config> = {
  [Key in keyof Config]: EnvPicker<NodeEnv, Config[Key]>;
};

type MoveOptional<Type, Value> = Type extends null
  ? Type extends undefined
    ? Value | null | undefined
    : Value | null
  : Type extends undefined
  ? Value | undefined
  : Value;

export type BaseConfig = Record<string, string | undefined>;
export type EnvRecord<NodeEnv extends string, Value> = Partial<Record<NodeEnv | 'rest', Value>>;

export const wrapInEnvPickers = <NodeEnv extends string, Config extends BaseConfig>(
  config: Config,
  nodeEnv: NodeEnv,
) => {
  return Object.keys(config).reduce((result, key) => {
    return { ...result, [key]: new EnvPicker(config[key], nodeEnv) };
  }, {} as WrappedInEnvPickers<NodeEnv, Config>);
};

export class EnvPicker<NodeEnv extends string, State> {
  constructor(private state: State, private nodeEnv: NodeEnv) {}

  public default(newState: State): EnvPicker<NodeEnv, NonNullable<State>> {
    this.state ??= newState;

    return this as EnvPicker<NodeEnv, NonNullable<State>>;
  }

  public defaultFor<E extends EnvRecord<NodeEnv, State>>(
    envRecord: E,
  ): E extends { rest: State } ? EnvPicker<NodeEnv, NonNullable<State>> : EnvPicker<NodeEnv, State> {
    this.state ??= (envRecord[this.nodeEnv] ?? envRecord.rest) as State;

    return this as unknown as E extends { rest: State }
      ? EnvPicker<NodeEnv, NonNullable<State>>
      : EnvPicker<NodeEnv, State>;
  }

  public map<Result>(mapper: (state: State) => Result): EnvPicker<NodeEnv, Result> {
    this.state = mapper(this.state) as unknown as State;

    return this as unknown as EnvPicker<NodeEnv, Result>;
  }

  public mapIfExists<Result>(
    mapper: (state: NonNullable<State>) => Result,
  ): EnvPicker<NodeEnv, MoveOptional<State, Result>> {
    if (this.state !== null && this.state !== undefined) {
      this.state = mapper(this.state as NonNullable<State>) as unknown as State;
    }

    return this as unknown as EnvPicker<NodeEnv, MoveOptional<State, Result>>;
  }

  public value(): State {
    return this.state;
  }
}
