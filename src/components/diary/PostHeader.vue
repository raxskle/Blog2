<template>
  <div class="post-header">
    <div class="header-text">
      <div class="header-post-info">{{ article.time }}</div>
      <div class="header-post-title" @click="onClickToArticlePage">{{ article.title }}</div>
      <div class="header-post-digest" @click="onClickToArticlePage">
        {{ article.content }}
      </div>
    </div>
    <div class="header-image">
      <img
        v-show="article.hasImg"
        class="header-image-img"
        :src="article.hasImg ? article.coverImgUrl : '/images/diary-img1.jpg'"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const props = defineProps({
  article: {
    default: {
      id: "",
      class: "",
      tags: "",
      title: "",
      content: "",
      time: "",
      hasImg: false,
      coverImgUrl: ""
    }
  }
});

const router = useRouter();
function onClickToArticlePage() {
  router.push({
    path: "/diary-article",
    query: {
      id: props.article.id
    }
  });
}
</script>
<style scoped lang="scss">
.post-header {
  width: 100vw;
  height: 100%;

  .header-text {
    flex-shrink: 0;
    flex-grow: 1;
    background-color: white;
    display: flex;
    flex-direction: column;

    box-sizing: border-box;
    padding-left: 6vw;
    padding-right: 10vw;

    .header-post-title {
      @include ellipse-n-line(1);
      cursor: pointer;
      z-index: 2;
      position: relative;
      width: fit-content;
      line-height: 1.2;

      // cursor: pointer;
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
      // width: 100%;
      cursor: pointer;
      @include ellipse-n-line(4);
    }
  }

  .header-image {
    flex-shrink: 0;
    flex-grow: 1;
    user-select: none;
    background-color: rgba(255, 255, 255, 0);
    background-image: url("/images/diary-img1.jpg");
    background-position: center;
    background-size: cover;
    .header-image-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      user-select: none;
      pointer-events: none;
    }
  }
}

@media screen and (max-width: 500px) {
  .post-header {
    @include f-c;
    flex-direction: column-reverse;
  }
  .header-text {
    width: 100%;
    height: 50vh;
    padding-top: 10vh;
    box-sizing: border-box;
    align-items: center;
    justify-content: flex-start;
    .header-post-title {
      // font-size: 30px;
      margin-top: 20px;
      margin-bottom: 20px;
      max-width: 90%;
    }
    .header-post-digest {
      -webkit-line-clamp: 3 !important;
      max-width: 80%;
    }
  }
  .header-image {
    width: 100%;
    height: 50vh;
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
      // font-size: 40px;
      margin-top: 25px;
      margin-bottom: 25px;
    }
    .header-post-digest {
      max-width: 70%;
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
    padding-top: 35vh;
    justify-content: flex-start;
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

// title 字体
@media screen and (max-width: 500px) {
  .header-post-title {
    font-size: 26px;
  }
}

@media screen and (min-width: 500px) and (max-width: 1000px) {
  .header-post-title {
    font-size: 30px;
  }
}

@media screen and (min-width: 1000px) and (max-width: 1200px) {
  .header-post-title {
    font-size: 40px;
  }
}

@media screen and (min-width: 1200px) {
  .header-post-title {
    font-size: 50px;
  }
}
</style>
