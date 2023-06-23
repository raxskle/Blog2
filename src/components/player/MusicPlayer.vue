<template>
  <div class="music-player">s</div>
</template>
<script setup lang="ts"></script>

<style scoped lang="scss">
.music-player {
  position: fixed;

  background-color: rgb(238, 150, 150);
}

// 移动端
@media screen and (max-width: 900px) {
  .music-player {
    right: 0px;
    bottom: 0px;
    width: 100vw;
    height: 80px;
  }
}

@media screen and (min-width: 900px) {
  .music-player {
    right: 80px;
    bottom: 20px;
    width: 22vw;
    height: 45vmin;
    min-width: 300px;
  }
}
</style>
