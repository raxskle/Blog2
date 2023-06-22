<template>
  <div class="post-header">
    <div class="header-text">
      <div class="header-post-info">{{ time }}</div>
      <div class="header-post-title">{{ title }}</div>
      <div class="header-post-digest">
        {{ content }}
      </div>
    </div>
    <div class="header-image"></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  time: string;
  title: string;
  content: string;
}>();
</script>
<style scoped lang="scss">
.post-header {
  width: 100vw;
  height: 100%;

  .header-text {
    flex-shrink: 0;
    flex-grow: 1;
    background-color: rgb(196, 255, 255);
    display: flex;
    flex-direction: column;

    box-sizing: border-box;
    padding-left: 6vw;
    padding-right: 10vw;

    .header-post-title {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      display: -webkit-inline-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      word-break: break-all;

      z-index: 2;
      position: relative;
      width: fit-content;
      line-height: 1.2;

      cursor: pointer;
      &::before {
        content: "";
        background-color: rgba(0, 0, 0, 0.6);
        position: absolute;
        left: 0px;
        bottom: 0px;
        width: 0%;
        height: 40%;
        z-index: 1;
        transition: all 0.4s ease;
      }
      &:hover {
        &::before {
          width: 100%;
        }
      }
    }
    .header-post-digest {
      width: 100%;

      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      display: -webkit-inline-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      word-break: break-all;
    }
  }

  .header-image {
    flex-shrink: 0;
    flex-grow: 1;
    // background-color: aquamarine;
    background-image: url("/images/diary-img1.jpg");
    background-position: center;
    background-size: cover;
  }
}

@media screen and (max-width: 500px) {
  .post-header {
    @include f-c;
    flex-direction: column-reverse;
  }
  .header-text {
    width: 100%;
    height: 50%;
    padding-top: 5vh;
    align-items: center;
    justify-content: center;
    .header-post-title {
      font-size: 30px;
      margin-top: 20px;
      margin-bottom: 20px;
    }
  }
  .header-image {
    width: 100%;
    height: 50%;
  }
}

@media screen and (min-width: 500px) and (max-width: 1000px) {
  .post-header {
    @include f-c;
    flex-direction: column-reverse;
  }
  .header-text {
    width: 100%;
    height: 50%;
    padding-top: 10vh;
    align-items: center;
    justify-content: flex-start;
    .header-post-title {
      font-size: 40px;
      margin-top: 25px;
      margin-bottom: 25px;
    }
  }
  .header-image {
    width: 100%;
    height: 50%;
  }
}

@media screen and (min-width: 1000px) {
  .post-header {
    @include f-r;
  }
  .header-text {
    width: 50%;
    height: 100%;
    padding-top: 5vh;
    justify-content: center;
    align-items: flex-start;
    .header-post-title {
      margin-top: 30px;
      margin-bottom: 30px;
    }
  }
  .header-image {
    width: 50%;
    height: 100%;
  }
}

@media screen and (min-width: 500px) and (max-width: 1000px) {
  .header-post-title {
    font-size: 40px;
  }
}

@media screen and (min-width: 1000px) and (max-width: 1200px) {
  .header-post-title {
    font-size: 42px;
  }
}

@media screen and (min-width: 1200px) {
  .header-post-title {
    font-size: 50px;
  }
}
</style>
