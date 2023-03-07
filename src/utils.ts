// original https://twitter.com/diegohaz/status/1309489079378219009
export type PathImpl<T, K extends keyof T> = K extends string
  ? T[K] extends Record<string, any>
    ? T[K] extends ArrayLike<any>
      ? K
      : K | `${K}.${PathImpl<T[K], keyof T[K]>}`
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

export const flatten = <T extends Record<string, unknown>>(object: T, parentKey?: string): Flatten<T> => {
  return Object.entries(object).reduce((state, [key, value]) => {
    const currentKey = parentKey ? `${parentKey}.${key}` : key;
    const base = { ...state, [currentKey]: value };

    if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
      return { ...base, ...flatten(value as Record<string, unknown>, currentKey) };
    }

    return base;
  }, {} as Flatten<T>);
};
