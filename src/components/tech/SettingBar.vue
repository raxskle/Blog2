<template>
  <div class="bar-wrap" :style="posi">
    <ToTopBtn></ToTopBtn>
    <slot></slot>
    <div class="music-btn" @click="musicPlayerCtrl">
      <div class="music-btn-icon">M</div>
    </div>
  </div>
  <MusicPlayer v-show="showMusicPlayer" @closePlayer="musicPlayerCtrl"></MusicPlayer>
</template>

<script setup lang="ts">
import { ref, type StyleValue } from "vue";
import ToTopBtn from "./ToTopBtn.vue";
import MusicPlayer from "../player/MusicPlayer.vue";
defineProps<{
  posi: StyleValue | undefined;
}>();

const showMusicPlayer = ref(true);

const musicPlayerCtrl = () => {
  console.log("click music btn", !showMusicPlayer.value);
  showMusicPlayer.value = !showMusicPlayer.value;
};
</script>

<style scoped lang="scss">
.bar-wrap {
  bottom: 90px;
}

.music-btn {
  width: 40px;
  height: 40px;
  @include f-c;
  // position: absolute;
  // right: 0px;
  // bottom: 0px;
  @include bg-color-reverse($w-bg-color-reverse);
  cursor: pointer;
}

.music-btn-icon {
  @include f-c;
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
