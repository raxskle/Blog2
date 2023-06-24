<template>
  <div class="bar-wrap" :style="posi">
    <ToTopBtn></ToTopBtn>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { type StyleValue } from "vue";
import ToTopBtn from "./ToTopBtn.vue";

defineProps<{
  posi: StyleValue | undefined;
}>();
</script>

<style scoped lang="scss">
.bar-wrap {
  bottom: 130px;
}
</style>
