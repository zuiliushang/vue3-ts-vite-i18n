import Cookies from "js-cookie";
export interface AuthInfo<T> {
  /** access token */
  accessToken: string;
  /** accessToken过期时间(时间戳) */
  expires: T;
  /** 用于刷新access token的 refreshToken */
  refreshToken: string;
  /** 用户名 */
  username?: string;
  /** 角色 */
  roles?: Array<string>;
}
export const sessionKey = "auth-info";
export const TokenKey = "authorization-token";

/** 获取 `token` */
export function getToken(): AuthInfo<number> {}
