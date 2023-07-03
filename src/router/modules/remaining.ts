import { $t } from "@/plugins/i18n";

export default [
  {
    path: "login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: $t("menus.login")
    }
  },
  {
    path: "register",
    name: "Register",
    component: () => import("@/views/register/index.vue")
  }
];
