type SupportedValues = bigint | boolean | null | number | string | symbol | undefined | Record<string, any>;

// original https://github.com/ghoullier/awesome-template-literal-types#dot-notation-string-type-safe
export type PathImpl<T, K extends keyof T> = K extends string
  ? T[K] extends Record<string, SupportedValues>
    ? K | `${K}.${PathImpl<T[K], keyof T[K]>}`
    : K
  : never;

export type Path<T> = PathImpl<T, keyof T> | keyof T;

export type PathValue<T, P extends Path<T>> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? Rest extends Path<T[K]>
      ? PathValue<T[K], Rest>
      : never
    : never
  : P extends keyof T
  ? T[P]
  : never;

export type Flatten<T> = {
  [key in Path<T>]: PathValue<T, key>;
};

export const isObject = (value: unknown): value is Record<string, unknown> => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  return Object.getPrototypeOf(value) === Object.prototype;
};

export const flatten = <T extends Record<string, unknown>>(object: T, parentKey?: string): Flatten<T> => {
  return Object.entries(object).reduce((state, [key, value]) => {
    const currentKey = parentKey ? `${parentKey}.${key}` : key;
    const base = { ...state, [currentKey]: value };

    if (isObject(value)) {
      return { ...base, ...flatten(value, currentKey) };
    }

    return base;
  }, {} as Flatten<T>);
};
