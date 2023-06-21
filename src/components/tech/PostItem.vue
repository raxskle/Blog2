<template>
  <!-- <div class="post" :style="{ height: postHeight }"> -->
  <div class="post" @click="onClickToArticlePage">
    <div class="text-area">
      <div class="post-title f-r">{{ article.title }}</div>

      <div class="digest f-r">
        <p>{{ article.content }}</p>
      </div>
      <div class="postInfo f-r">
        <div class="postTime">{{ article.time }}</div>
        <div class="postTags" v-for="(tag, index) in article.tags" :key="tag" :index="index">
          {{ tag }} {{ index !== article.tags.length - 1 ? ", " : null }}
        </div>
      </div>
    </div>
    <div v-if="hasImg" class="img-area">
      <img class="img-area-img" :src="article.coverImgUrl" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";
import { useRouter } from "vue-router";

interface Post {
  id: string;
  class: string;
  tags: string;
  title: string;
  content: string;
  time: string;
  hasImg: boolean;
  coverImgUrl: string;
}
let props = defineProps<{
  hasImg: boolean;
  article: Post;
}>();

const router = useRouter();

let { hasImg } = toRefs(props);

function onClickToArticlePage() {
  router.push({
    path: "/tech-article",
    query: {
      id: props.article.id
    }
  });
}
</script>

<style scoped lang="scss">
@import "@/assets/mixin.scss";

.post {
  width: 100%;
  margin-bottom: 20px;

  @include bg-color($w-bg-color);
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    border: 2px solid;
    border-image: linear-gradient(90deg, rgb(249, 68, 36) 0%, #00afed 100%) 2 2 2 2;
    .post-title {
      color: $theme-color;
    }
  }
}

.text-area {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  box-sizing: border-box;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 30px;
  padding-bottom: 25px;
  transition: all 0.2s;
}

.img-area {
  .img-area-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.post-title {
  font-size: 24px;
  font-family: "NOTO SERIF SC";
  transition: all 0.2s;
  // flex-grow: 1;
  text-overflow: ellipsis;
  display: -webkit-inline-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  word-break: nowrap;
  overflow: hidden;
  flex-wrap: nowrap;
}

.postInfo {
  // flex-shrink: 1;
  @include font-color-light($w-font-color-light);
  .postTime {
    padding-right: 10px;
    // border-right: 2px solid black;
    @include border-right-color($w-font-color-light);
    margin-right: 10px;
  }
}

.digest {
  // flex-grow: 1;
  @include font-color-light($w-font-color-light);
  > p {
    box-sizing: border-box;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    display: -webkit-inline-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
    user-select: none;
  }
}

@media screen and (min-width: 500px) {
  .post {
    flex-direction: row;
    // height: 200px;
    @include border-full-color;
  }
  .text-area {
    width: 50%;
    min-height: 200px;
  }
  .img-area {
    height: 280px;
    width: 50%;
  }
}

@media screen and (max-width: 500px) {
  .post {
    flex-direction: column-reverse;
    // height: 560px;
    border: 2px solid transparent;
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  }
  .text-area {
    width: 100%;
    height: 200px;
  }
  .img-area {
    width: 100%;
    height: 280px;
  }
}

.post {
  transition: all 0.1s;
  &:hover {
    border: 2px solid;
    border-image: linear-gradient(
        0deg,
        rgb(254, 99, 99) 0%,
        rgb(251, 192, 80) 50%,
        rgb(1, 190, 102) 80%,
        rgb(44, 23, 84) 100%
      )
      2 2 2 2;
    animation: border-anime 4s linear infinite;
    .post-title {
      color: $theme-color;
    }
  }
}

@keyframes border-anime {
  0% {
    border-image: linear-gradient(
        0deg,
        rgb(254, 99, 99) 0%,
        rgb(251, 192, 80) 50%,
        rgb(1, 190, 102) 80%,
        rgb(44, 23, 84) 100%
      )
      2 2 2 2;
  }
  25% {
    border-image: linear-gradient(
        90deg,
        rgb(254, 99, 99) 0%,
        rgb(251, 192, 80) 50%,
        rgb(1, 190, 102) 80%,
        rgb(44, 23, 84) 100%
      )
      2 2 2 2;
  }
  50% {
    border-image: linear-gradient(
        180deg,
        rgb(254, 99, 99) 0%,
        rgb(251, 192, 80) 50%,
        rgb(1, 190, 102) 80%,
        rgb(44, 23, 84) 100%
      )
      2 2 2 2;
  }
  75% {
    border-image: linear-gradient(
        270deg,
        rgb(254, 99, 99) 0%,
        rgb(251, 192, 80) 50%,
        rgb(1, 190, 102) 80%,
        rgb(44, 23, 84) 100%
      )
      2 2 2 2;
  }
  100% {
    border-image: linear-gradient(
        360deg,
        rgb(254, 99, 99) 0%,
        rgb(251, 192, 80) 50%,
        rgb(1, 190, 102) 80%,
        rgb(44, 23, 84) 100%
      )
      2 2 2 2;
  }
}
</style>
