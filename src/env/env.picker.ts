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

export type DefaultForResponse<NodeEnv extends string, State, NewState, EnvOptions> = EnvOptions extends {
  rest: NewState;
}
  ? EnvPicker<NodeEnv, NonNullable<State> | EnvOptions[keyof EnvOptions] | EnvOptions['rest']>
  : EnvPicker<NodeEnv, State | NewState>;

export const wrapInEnvPickers = <NodeEnv extends string, Config extends BaseConfig>(
  config: Config,
  nodeEnv: NodeEnv,
): WrappedInEnvPickers<NodeEnv, Config> => {
  return Object.keys(config).reduce(
    (result, key) => {
      return { ...result, [key]: new EnvPicker(config[key], nodeEnv) };
    },
    {} as WrappedInEnvPickers<NodeEnv, Config>,
  );
};

export class EnvPicker<NodeEnv extends string, State> {
  constructor(
    private state: State,
    private nodeEnv: NodeEnv,
  ) {}

  public default<NewState extends State>(newState: NewState): EnvPicker<NodeEnv, NewState | NonNullable<State>> {
    this.state ??= newState;

    return this as EnvPicker<NodeEnv, NewState | NonNullable<State>>;
  }

  public defaultFor<NewState extends State, EnvOptions extends EnvRecord<NodeEnv, NewState>>(
    envRecord: EnvOptions,
  ): DefaultForResponse<NodeEnv, State, NewState, EnvOptions> {
    this.state ??= (envRecord[this.nodeEnv] ?? envRecord.rest) as State;

    return this as unknown as DefaultForResponse<NodeEnv, State, NewState, EnvOptions>;
  }

  public map<NewState>(mapper: (state: State) => NewState): EnvPicker<NodeEnv, NewState> {
    this.state = mapper(this.state) as unknown as State;

    return this as unknown as EnvPicker<NodeEnv, NewState>;
  }

  public mapIfExists<NewState>(
    mapper: (state: NonNullable<State>) => NewState,
  ): EnvPicker<NodeEnv, MoveOptional<State, NewState>> {
    if (this.state !== null && this.state !== undefined) {
      this.state = mapper(this.state as NonNullable<State>) as unknown as State;
    }

    return this as unknown as EnvPicker<NodeEnv, MoveOptional<State, NewState>>;
  }

  public value(): State {
    return this.state;
  }
}
