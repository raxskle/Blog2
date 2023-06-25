<template>
  <div v-if="showMusicBtn" class="music-btn-wrap">
    <div class="music-btn" @click="musicPlayerCtrl">
      <div class="music-btn-icon">
        <img class="music-btn-icon-img" src="/icons/headphones-svgrepo-com.svg" />
      </div>
    </div>
  </div>
  <MusicPlayer v-show="showMusicPlayer" @closePlayer="musicPlayerCtrl"></MusicPlayer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MusicPlayer from "../player/MusicPlayer.vue";
// import { useRoute, useRouter } from "vue-router";

const showMusicPlayer = ref(false);

const musicPlayerCtrl = () => {
  // console.log("click music btn", !showMusicPlayer.value);
  showMusicPlayer.value = !showMusicPlayer.value;
};

const showMusicBtn = ref(true);
// const router = useRouter();
// const route = useRoute();
</script>

<style scoped lang="scss">
.music-btn-wrap {
  position: fixed;
  bottom: 90px;
  right: 10px;
}

.music-btn {
  width: 40px;
  height: 40px;

  @include f-c;
  // position: absolute;
  // right: 0px;
  // bottom: 0px;
  @include bg-color-reverse($w-bg-color-reverse);
  transition: all 0.2s;
  &:hover {
    background-color: $theme-color;
  }
  cursor: pointer;
}

.music-btn-icon {
  @include f-c;
  // @include font-color-reverse($w-font-color-reverse);

  .music-btn-icon-img {
    width: 85%;
    height: 85%;
  }
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
