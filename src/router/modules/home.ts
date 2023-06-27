const { VITE_HIDE_HOME } = import.meta.env;
console.log(VITE_HIDE_HOME);
const Layout = () => import("@/layout/index.vue");
import { $t } from "@/plugins/i18n";

export default {
  path: "/",
  name: "Home",
  component: Layout,
  redirect: "/home",
  meta: {
    //icon: "home"
    title: $t("menus.home")
  },
  children: [
    {
      path: "/home",
      name: "Home",
      component: () => import("@/views/home/index.vue"),
      meta: {
        title: $t("menus.home")
      }
    }
  ]
} as RouteConfigsTable;
