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
</script>

<style scoped lang="scss"></style>
