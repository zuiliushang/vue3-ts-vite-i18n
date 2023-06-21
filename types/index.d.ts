type Nullable<T> = T | null;

type NonNullable<T> = T extends null | undefined ? never : T;

type Recordable<T = any> = Record<string, T>;

type ReadonlyRecordable<T = any> = {
  readonly [key: string]: T;
};

function parseInt(s: string | number, radix?: number): number;

function parseFloat(string: string | number): number;
