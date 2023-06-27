import { $t } from "@/plugins/i18n";

export default {
  path: "/about",
  redirect: "/about/index",
  meta: {
    title: $t("menus.about")
  },
  children: [
    {
      path: "/about/index",
      name: "about",
      component: () => import("@/views/about/index.vue"),
      meta: {
        title: $t("menus.about")
      }
    }
  ]
} as RouteConfigsTable;
