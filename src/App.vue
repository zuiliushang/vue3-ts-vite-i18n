<script setup lang="ts">
import { computed } from "vue";
import { RouterView } from "vue-router";
//import HelloWorld from "@/components/HelloWorld.vue";
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
//import en from "element-plus/lib/locale/lang/en";
const currentLocale = computed(function () {
  console.log(this.$storage);
  return zhCn;
});
</script>
<template>
  123123
  <el-config-provider :locale="currentLocale">
    <RouterView />
  </el-config-provider>
  <!-- <header>
    <div class="wrapper">
      <HelloWorld msg="You did it!" />
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView /> -->
</template>

<style scoped></style>
