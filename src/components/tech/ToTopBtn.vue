<template>
  <Transition name="fade">
    <div v-if="showToTop" class="to-top f-c" @click="moveToTop">
      <div class="to-top-icon f-c">T</div>
    </div>
  </Transition>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

let scrollTop = window.scrollY;
let showToTop = ref(false);

let showToTopBtn = () => {
  scrollTop = window.scrollY;
  if (scrollTop > 400) {
    showToTop.value = true;
  } else if (scrollTop < 400) {
    showToTop.value = false;
  }
};

// 点击上移
let moveToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};

//  控制按钮显隐
onMounted(() => {
  window.addEventListener("scroll", showToTopBtn);
});
onUnmounted(() => {
  window.removeEventListener("scroll", showToTopBtn);
});
</script>
<style scoped lang="scss">
.to-top {
  width: 40px;
  height: 40px;
  // position: absolute;
  // right: 0px;
  // bottom: 0px;
  @include bg-color-reverse($w-bg-color-reverse);
  cursor: pointer;
}

.to-top-icon {
  @include font-color-reverse($w-font-color-reverse);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: rotate(45deg) scale(0);
}
</style>
