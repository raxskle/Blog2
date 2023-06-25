<template>
  <div class="pop-up">
    <div class="pop-up-text">
      {{ text }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

defineProps<{
  text: string;
}>();

const emit = defineEmits(["callback"]);
onMounted(() => {
  setTimeout(() => {
    emit("callback");
  }, 3000);
});
</script>

<style scoped lang="scss">
.pop-up {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translate(-50%, 0%);
  width: 75vw;
  max-width: 400px;
  height: 80px;
  @include f-c;
  background-color: rgba(128, 128, 128, 0.37);
}

.pop-up-text {
  font-size: 16px;
  color: black;
}
</style>
