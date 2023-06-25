import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
//import Storage from "responsive-storage";
//import { useI18n } from "@/plugins/i18n";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import { useI18n } from "@/plugins/i18n";

// 引入重置样式

// 公共样式

// 插件样式

// 字体

// 字体图标

const app = createApp(App);
// 自定义指令

// 全局注册按钮按钮权限组件
app.use(createPinia());

// 注册路由
app.use(router);

// 注册缓存配置

// 注册elementplus
app.use(ElementPlus);
// 使用I18N
app.use(useI18n);
// 全局配置
app.mount("#app");
