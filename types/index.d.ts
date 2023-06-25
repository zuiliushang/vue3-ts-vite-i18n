type Nullable<T> = T | null;

type NonNullable<T> = T extends null | undefined ? never : T;

type Recordable<T = any> = Record<string, T>;

type ReadonlyRecordable<T = any> = {
  readonly [key: string]: T;
};

function parseInt(s: string | number, radix?: number): number;

function parseFloat(string: string | number): number;

interface packageOpt {
  /** 文件夹名（默认：`dist`） */
  folder?: string;
  /** 是否返回已经转化好单位的包总大小（默认：`true`） */
  format?: boolean;
  /** 回调函数，返回包总大小（单位：字节） */
  callback: CallableFunction;
}
/**
 * @description 获取指定文件夹中所有文件的总大小
 */
function getPackageSize(options: packageOpt): void;
