<template>
  <!-- 这个routerView 区分主页面和404 -->
  <RouterView :key="key" />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { RouterView } from "vue-router";
import { useRoute } from "vue-router";

const route = useRoute();
const key = computed(() => route.path + Math.random());

// console.log("route in app", route.path);
// alert("网站更新中，部分功能暂未能正常使用，还没找到好看的新icon。2023/6/21");
</script>

<style scoped lang="scss"></style>
