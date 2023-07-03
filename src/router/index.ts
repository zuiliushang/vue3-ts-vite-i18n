import {
  RouteComponent,
  RouteRecordRaw,
  Router,
  createRouter
} from "vue-router";
import {
  ascending,
  getTopMenu,
  initRouter,
  isOneOfArray,
  getHistoryMode,
  findRouteByPath,
  handleAliveRoute,
  formatTwoStageRoutes,
  formatFlatteningRoutes
} from "./utils";
import { whiteList } from "./whiteList";
import { buildHierarchyTree } from "@/utils/tree";
import remainingRouter from "./modules/remaining";
import { AuthInfo, sessionKey } from "@/utils/auth";
import { isUrl, openLink, storageSession, isAllEmpty } from "@pureadmin/utils";
import { transformI18n } from "@/plugins/i18n";
import { title } from "@/utils/config";
import NProgress from "@/utils/progress";
import { usePermissionStoreHook } from "@/stores/modules/permission";
import { useMultiTagsStoreHook } from "@/stores/modules/multiTags";
const { VITE_HIDE_HOME } = import.meta.env;
console.log(VITE_HIDE_HOME, "====");
/**
 * 添加modules下所有.ts路由文件
 */
const modules: Record<string, any> = import.meta.glob(
  ["./modules/**/*.ts", "!./modules/**/remaining.ts"],
  {
    eager: true
  }
);
/**
 * 路由对象
 */
const routes = [];

Object.keys(modules).forEach(key => {
  routes.push(modules[key].default);
});

/**
 * 导出处理后的静态路由（三级及以上的路由变成二级）
 */
export const constantRoutes: Array<RouteRecordRaw> = formatTwoStageRoutes(
  formatFlatteningRoutes(buildHierarchyTree(ascending(routes.flat(Infinity))))
);
/** 用于渲染的菜单，多层菜单数组变成一层 */
export const constantMenus: Array<RouteComponent> = ascending(
  routes.flat(Infinity)
).concat(...remainingRouter);

/**
 * 不参与菜单组件的路由
 */
export const remainingPaths = Object.keys(remainingRouter).map(v => {
  return remainingRouter[v].path;
});
/** 实例路由 */
export const router: Router = createRouter({
  history: getHistoryMode(import.meta.env.VITE_ROUTER_HISTORY),
  routes: constantRoutes.concat(...(remainingRouter as any)),
  strict: true,
  // 路由自定义滚动行为
  scrollBehavior(to, from, savedPosition) {
    return new Promise(resolve => {
      if (savedPosition) {
        //路由前进后退操作则不定制化行为
        return savedPosition;
      } else {
        //其他操作
        if (from.meta.saveSrollTop) {
          const top: number =
            document.documentElement.scrollTop || document.body.scrollTop;
          resolve({ left: 0, top });
        }
      }
    });
  }
});

//const { VITE_HIDE_HOME } = import.meta.env;
/** 重置路由 */
/** 重置路由 */
export function resetRouter() {
  router.getRoutes().forEach(route => {
    const { name, meta } = route;
    if (name && router.hasRoute(name) && meta?.backstage) {
      router.removeRoute(name);
      router.options.routes = formatTwoStageRoutes(
        formatFlatteningRoutes(
          buildHierarchyTree(ascending(routes.flat(Infinity)))
        )
      );
    }
  });
  usePermissionStoreHook().clearAllCachePage();
}
/**
 * 路由前置
 */
router.beforeEach((to: toRouteType, _from, next) => {
  //自定义属性，可用于在多个组件之间动态切换时缓存组件实例
  if (to.meta?.keepAlive) {
    handleAliveRoute(to, "add");
    // 页面整体刷新和点击标签页刷新
    if (_from.name === undefined || _from.name === "Redirect") {
      handleAliveRoute(to);
    }
  }
  const userInfo = storageSession().getItem<AuthInfo<number>>(sessionKey);
  NProgress.start(); //进度条展示
  //判断是否是链接
  const externalLink = isUrl(to?.name as string);
  console.log("router beforeEach=============== to:", to);
  if (!externalLink) {
    to.matched.some(item => {
      if (!item.meta.title) return "";
      const Title = title; // 有标题使用标题 没有则使用系统全局默认
      if (Title)
        document.title = `${transformI18n(item.meta.title)} | ${Title}`;
      else document.title = transformI18n(item.meta.title);
    });
  }
  function toCorrectRoute() {
    whiteList.includes(to.fullPath) ? next(_from.fullPath) : next();
  }
  /** 如果已经登录并存在登录信息后继续保持在当前页面，其他情况直接跳转到login */
  if (userInfo) {
    // 根据用户信息进行路由跳转
    // 无权限跳转403页面
    if (to.meta?.roles && !isOneOfArray(to.meta?.roles, userInfo?.roles)) {
      next({ path: "/error/403" });
    }
    // 访问未知路径跳转404
    // 开启隐藏首页后在浏览器地址栏手动输入首页welcome路由则跳转到404页面
    // if (未知路径) { //TODO：
    //   next({ path: "/error/404" });
    // }
    if (_from?.name) {
      // name为超链接直接跳转
      if (externalLink) {
        openLink(to?.name as string);
        NProgress.done();
      } else {
        toCorrectRoute();
      }
    } else {
      // 刷新
      if (
        usePermissionStoreHook().wholeMenus.length === 0 &&
        to.path !== "/login"
      ) {
        initRouter().then((router: Router) => {
          if (!useMultiTagsStoreHook().getMultiTagsCache) {
            const { path } = to;
            const route = findRouteByPath(
              path,
              router.options.routes[0].children
            );
            getTopMenu(true);
            // query、params模式路由传参数的标签页不在此处处理
            if (route && route.meta?.title) {
              if (isAllEmpty(route.parentId) && route.meta?.backstage) {
                // 此处为动态顶级路由（目录）
                const { path, name, meta } = route.children[0];
                useMultiTagsStoreHook().handleTags("push", {
                  path,
                  name,
                  meta
                });
              } else {
                const { path, name, meta } = route;
                useMultiTagsStoreHook().handleTags("push", {
                  path,
                  name,
                  meta
                });
              }
            }
          }
          router.push(to.fullPath);
        });
      }
      toCorrectRoute();
    }
  } else {
    if (to.path !== "/login") {
      if (whiteList.indexOf(to.path) !== -1) {
        next();
      } else {
        next({ path: "/login" });
      }
    } else {
      next();
    }
  }
});
router.afterEach(() => {
  NProgress.done();
});

export default router;
