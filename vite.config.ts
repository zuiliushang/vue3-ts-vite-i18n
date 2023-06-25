import { resolve } from "path";
import pkg from "./package.json";
import { UserConfigExport, ConfigEnv, loadEnv } from "vite";
import { dayjs } from "element-plus";
import { warpperEnv } from "./build";
import { getPluginsList } from "./build/plugins";
/**
 * node命令工作目录
 */
const root: string = process.cwd();

/** 路径查找 */
const pathResolve = (dir: string): string => {
  return resolve(__dirname, ".", dir);
};

/**
 * 别名设置
 */
const alias: Record<string, string> = {
  "@": pathResolve("src"),
  "@build": pathResolve("build")
};

const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")
};

// https://vitejs.dev/config/
//export default defineConfig({
export default ({ mode, command }: ConfigEnv): UserConfigExport => {
  const { VITE_PORT, VITE_CDN, VITE_COMPRESSION } = warpperEnv(
    loadEnv(mode, root)
  );
  return {
    root,
    resolve: {
      alias
    },
    server: {
      // https
      https: false,
      port: VITE_PORT,
      host: "0.0.0.0",
      // 本地跨域代理 https://cn.vitejs.dev/config/server-options.html#server-proxy
      proxy: {}
    },
    plugins: getPluginsList(command, VITE_CDN, VITE_COMPRESSION), //[vue(), vueJsx()],
    define: {
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    }
  };
};
