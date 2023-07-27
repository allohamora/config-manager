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

  public default<NewState extends State>(newState: NewState) {
    this.state ??= newState;

    return this as unknown as EnvPicker<NodeEnv, NewState | NonNullable<State>>;
  }

  public defaultFor<NewState extends State, EnvOptions extends EnvRecord<NodeEnv, NewState>>(envRecord: EnvOptions) {
    this.state ??= (envRecord[this.nodeEnv] ?? envRecord.rest) as NewState;

    return this as unknown as EnvOptions extends { rest: NewState }
      ? EnvPicker<NodeEnv, NonNullable<NewState>>
      : EnvPicker<NodeEnv, NewState>;
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
