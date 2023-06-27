import { cdn } from "./cdn";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { viteMockServe } from "vite-plugin-mock";
import { configCompressPlugin } from "./compress";
import { type PluginOption } from "vite";
import { visualizer } from "rollup-plugin-visualizer";
import removeConsole from "vite-plugin-remove-console";
//import themePreprocessorPlugin from "@pureadmin/theme";
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
//import { genScssMultipleScopeVars } from "../src/layout/theme";
/**
 * vite 启动加载所有插件
 * @param command vite启动时携带的命令
 * @param VITE_CDN 是否开启CDN
 * @param VITE_COMPRESSION 文件压缩技术
 */
export function getPluginsList(
  command: string,
  VITE_CDN: boolean,
  VITE_COMPRESSION: ViteCompression
) {
  const prodMock = true;
  const lifecycle = process.env.npm_lifecycle_event;
  console.log(lifecycle);
  return [
    vue(),
    // jsx、tsx语法支持
    vueJsx(),
    VueI18nPlugin({
      runtimeOnly: true,
      compositionOnly: true,
      include: [resolve("locales/**")]
    }),
    VITE_CDN ? cdn : null,
    configCompressPlugin(VITE_COMPRESSION),
    // 线上环境删除console
    removeConsole({ external: ["src/assets/iconfont/iconfont.js"] }),
    // svg组件化支持
    svgLoader(),
    // mock支持
    viteMockServe({
      mockPath: "mock",
      localEnabled: command === "serve",
      prodEnabled: command !== "serve" && prodMock,
      injectCode: `
          import { setupProdMockServer } from './mockProdServer';
          setupProdMockServer();
        `,
      logger: false
    }),
    lifecycle === "report"
      ? (visualizer({
          open: true,
          brotliSize: true,
          filename: "report.html"
        }) as unknown as PluginOption)
      : null
  ];
}
