import type {
  VNode,
  FunctionalComponent,
  PropType as VuePropType,
  ComponentPublicInstance
} from "vue";
import type { ECharts } from "echarts";
import type { IconifyIcon } from "@iconify/vue";
import type { TableColumns } from "@pureadmin/table";
import { type RouteComponent, type RouteLocationNormalized } from "vue-router";
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
   * `src/router` 文件夹里的类型声明
   */
  interface toRouteType extends RouteLocationNormalized {
    meta: {
      roles: Array<string>;
      keepAlive?: boolean;
      dynamicLevel?: string;
    };
  }

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
   * 缓存到浏览器本地存储的类型声明
   */
  interface StorageConfigs {
    locale?: string; // 国际化标识
    multiTagsCache?: boolean; //存储标签页信息（路由信息）
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
   * @description 整体路由配置表（包括完整子路由）
   */
  interface RouteConfigsTable {
    /** 路由地址 `必填` */
    path: string;
    /** 路由名字（保持唯一）`可选` */
    name?: string;
    /** `Layout`组件 `可选` */
    component?: RouteComponent;
    /** 路由重定向 `可选` */
    redirect?: string;
    meta?: {
      /** 菜单名称（兼容国际化、非国际化，如何用国际化的写法就必须在根目录的`locales`文件夹下对应添加）`必填` */
      title: string;
      /** 菜单图标 `可选` */
      icon?: string | FunctionalComponent | IconifyIcon;
      /** 是否在菜单中显示（默认`true`）`可选` */
      showLink?: boolean;
      /** 菜单升序排序，值越高排的越后（只针对顶级路由）`可选` */
      rank?: number;
    };
    /** 子路由配置项 */
    children?: Array<RouteChildrenConfigsTable>;
  }

  /**
   * 平台里所有组件实例都能访问到的全局属性对象的类型声明
   */
  interface GlobalPropertiesApi {
    $storage: ResponsiveStorage;
  }
}
