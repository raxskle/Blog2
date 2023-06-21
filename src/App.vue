<template>
  <RouterView :key="key" />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { RouterView } from "vue-router";
import { useRoute } from "vue-router";

const route = useRoute();
const key = computed(() => route.path + Math.random());

// alert("网站维护中，部分功能暂未能正常使用，icon还没找到好看的。2023/6/21");
</script>

<style scoped lang="scss"></style>
./store/tags-store
