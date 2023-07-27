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

// original https://stackoverflow.com/a/59987826/15681288
export type AtLeastOne<T> = { [K in keyof T]: Pick<T, K> }[keyof T];

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

  public default<NewState extends State>(newState: NewState) {
    this.state ??= newState;

    return this as unknown as EnvPicker<NodeEnv, NewState | NonNullable<State>>;
  }

  public defaultFor(envRecord: AtLeastOne<Record<NodeEnv, State>>) {
    this.state ??= envRecord[this.nodeEnv] as State;

    return this;
  }

  public map<Result>(mapper: (state: State) => Result) {
    this.state = mapper(this.state) as unknown as State;

    return this as unknown as EnvPicker<NodeEnv, Result>;
  }

  public mapIfExists<Result>(mapper: (state: NonNullable<State>) => Result) {
    if (this.state !== null && this.state !== undefined) {
      this.state = mapper(this.state as NonNullable<State>) as unknown as State;
    }

    return this as unknown as EnvPicker<NodeEnv, MoveOptional<State, Result>>;
  }

  public value() {
    return this.state;
  }
}
