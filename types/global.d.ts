import type {
  VNode,
  FunctionalComponent,
  PropType as VuePropType,
  ComponentPublicInstance
} from "vue";
import type { ECharts } from "echarts";
import type { IconifyIcon } from "@iconify/vue";
import type { TableColumns } from "@pureadmin/table";

/**
 * 全局类型声明，无需引入直接在 `.vue` 、`.ts` 、`.tsx` 文件使用即可获得类型提示
 */
declare global {
  /**
   * 平台的名称、版本、依赖、最后构建时间的类型提示
   */
  const __APP_INFO__: {
    pkg: {
      name: string;
      version: string;
      dependencies: Recordable<string>;
      devDependencies: Recordable<string>;
    };
    lastBuildTime: string;
  };

  /**
   * 打包压缩格式的类型声明
   */
  type ViteCompression =
    | "none"
    | "gzip"
    | "brotli"
    | "both"
    | "gzip-clear"
    | "brotli-clear"
    | "both-clear";

  /**
   * 全局自定义环境变量的类型声明
   */
  interface ViteEnv {
    VITE_PORT: number;
    VITE_PUBLIC_PATH: string;
    VITE_ROUTER_HISTORY: string;
    VITE_CDN: boolean;
    VITE_HIDE_HOME: string;
    VITE_COMPRESSION: ViteCompression;
  }

  /**
   * 对应 `public/serverConfig.json` 文件的类型声明
   */
  interface ServerConfigs {
    Locale?: string;
    ResponsiveStorageNameSpace?: string;
  }

  /**
   * 与 `ServerConfigs` 类型不同，这里是缓存到浏览器本地存储的类型声明
   */
  interface StorageConfigs {
    locale?: string;
  }

  /**
   * `responsive-storage` 本地响应式 `storage` 的类型声明
   */
  interface ResponsiveStorage {
    locale: {
      locale?: string;
    };
  }

  /**
   * 平台里所有组件实例都能访问到的全局属性对象的类型声明
   */
  interface GlobalPropertiesApi {
    $storage: ResponsiveStorage;
  }
}
