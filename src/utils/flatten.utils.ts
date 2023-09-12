type SupportedValues = bigint | boolean | null | number | string | symbol | undefined | object;

// original https://github.com/ghoullier/awesome-template-literal-types#dot-notation-string-type-safe
export type PathImpl<Obj, Key extends keyof Obj> = Key extends string
  ? Obj[Key] extends Record<string, SupportedValues>
    ? Key | `${Key}.${PathImpl<Obj[Key], keyof Obj[Key]>}`
    : Key
  : never;

export type Path<T> = PathImpl<T, keyof T> | keyof T;

export type PathValue<Obj, PathKey extends Path<Obj>> = PathKey extends `${infer Key}.${infer Rest}`
  ? Key extends keyof Obj
    ? Rest extends Path<Obj[Key]>
      ? PathValue<Obj[Key], Rest>
      : never
    : never
  : PathKey extends keyof Obj
  ? Obj[PathKey]
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
