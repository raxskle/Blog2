<template>
  <div class="main" id="app">
    <!-- 这个routerView 包含所有 -->
    <RouterView :key="key"></RouterView>
    <MusicBtn></MusicBtn>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import MusicBtn from "@/components/tech/MusicBtn.vue";
const route = useRoute();
const key = computed(() => route.path + Math.random());

// 进入diary将主题设置为white
</script>

<style scoped lang="scss">
.main {
  width: 100vw;
  position: relative;
  min-height: 100vh;
}
</style>
