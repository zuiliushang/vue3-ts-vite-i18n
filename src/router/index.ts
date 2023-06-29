import {
  RouteComponent,
  RouteRecordRaw,
  Router,
  createRouter,
  createWebHistory
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
  scrollBehavior(to, from, savedPosition) {
    return new Promise(resolve => {
      if (savedPosition) {
        return savedPosition;
      } else {
        if (from.meta.saveSrollTop) {
          const top: number =
            document.documentElement.scrollTop || document.body.scrollTop;
          resolve({ left: 0, top }); //TODO：
        }
      }
    });
  }
});

const { VITE_HIDE_HOME } = import.meta.env;

/**
 * 路由前置
 */
router.beforeEach((to: toRouteType, _from, next) => {
  if (to.meta?.keepAlive) {
    handleAliveRoute(to, "add");
    // 压面整体刷新和点击标签页刷新
    if (_from.name === undefined || _from.name === "Redirect") {
      handleAliveRoute(to);
    }
  }
  // 获取用户信息
  const userInfo = storageSession().getItem<DataInfo<number>>(sessionKey);
});
