<template>
  <div
    ref="post"
    class="post-item-wrap"
    :class="{ 'post-show-up': showPost }"
    :style="{ flexDirection: postFlexDirection }"
  >
    <div class="post-item-text" :style="{ alignItems: postTextFlexDirecton }">
      <div class="post-item-info">{{ article.time }}</div>
      <div class="post-item-title" @click="onClickToArticlePage">{{ article.title }}</div>
      <div class="post-item-content" @click="onClickToArticlePage">
        {{ article.content }}
      </div>
    </div>
    <div class="post-item-image">
      <img
        v-show="article.hasImg"
        class="post-item-image-img"
        :src="article.hasImg ? article.coverImgUrl : '/images/diary-img1.jpg'"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, toRefs } from "vue";
import { useRouter } from "vue-router";
// textOnRight，样式 文字是否在右边，默认左边
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
  },
  textOnRight: {
    type: Boolean,
    required: false,
    default: false
  }
});

const { textOnRight } = toRefs(props);

const router = useRouter();
function onClickToArticlePage() {
  router.push({
    path: "/diary-article",
    query: {
      id: props.article.id
    }
  });
}

// 动效
const postFlexDirection = computed(() => {
  if (textOnRight.value) {
    return "row-reverse";
  } else {
    return "row";
  }
});
const postTextFlexDirecton = computed(() => {
  if (textOnRight.value) {
    return "flex-start";
  } else {
    return "flex-end";
  }
});

// 拿到post ref元素
const post = ref();
// 控制是否滑动
const showPost = ref(false);
// 是否第一次看到
const visited = ref(false);

// 滑动效果
const onScrollShowPost = () => {
  const y = window.scrollY; // 滚动位置
  const height = window.innerHeight; // 屏幕高度
  const postHeight = post.value.offsetTop;

  // 在顶部
  // 移动端直接true，否则false
  // 不在顶部时，已看过的true，没看过的false
  if (window.innerWidth < 500 && y < 100) {
    showPost.value = true;
  } else if (y < 100) {
    showPost.value = false;
  } else if (y >= 100 && visited.value) {
    showPost.value = true;
  } else {
    showPost.value = false;
  }

  // 非顶部，只有第一次看到的才会滑动
  if (!visited.value && y >= 100) {
    // 非顶层post，只会在第一次滑动看到时移动
    if (y + height <= postHeight + 10) {
      showPost.value = false;
    } else {
      showPost.value = true;
      visited.value = true;
    }
  }
};

onMounted(() => {
  onScrollShowPost();
  window.addEventListener("scroll", onScrollShowPost);
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScrollShowPost);
});
</script>
<style scoped lang="scss">
.post-item-wrap {
  width: 100%;
  height: 80vh;
  // background-color: rgb(230, 165, 165);
  box-sizing: border-box;
  border: none;
  transition: transform 1.2s ease;
  transform: translateY(10vh);
  display: flex;
  // flex-direction: row;
  justify-content: center;
  align-items: center;
}

// 移动端<500px
@media screen and (max-width: 500px) {
  .post-item-wrap {
    width: 80vw;
    height: 70vh;
    flex-direction: column-reverse !important;
    margin-bottom: 40px;
    width: 90vw;
    // transform: translateY(0vh);
  }
}
// 移动端>500px <1000px
@media screen and (min-width: 500px) and (max-width: 1000px) {
  .post-item-wrap {
    width: 80vw;
    height: 120vh;
    flex-direction: column-reverse !important;
    margin-bottom: 40px;
  }
}
// pc大屏1000px
@media screen and (min-width: 1000.1px) {
  .post-item-wrap {
    width: 100%;
    height: 80vh;
  }
}

.post-show-up {
  transform: translateY(-10vh) !important;
}

.post-item-text {
  background-color: rgb(248, 248, 248);
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-sizing: border-box;
  user-select: text;
  .post-item-title {
    position: relative;
    cursor: pointer;
    user-select: none;

    @include ellipse-n-line(1);

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
  .post-item-content {
    cursor: pointer;
    @include ellipse-n-line(4);
  }
}
.post-item-image {
  background-color: white;
  width: 50%;
  height: 100%;
  background-color: aquamarine;
  background-image: url("/images/diary-img1.jpg");
  background-position: center;
  background-size: cover;

  .post-item-image-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

// 移动端<500px
@media screen and (max-width: 500px) {
  .post-item-text {
    width: 100%;
    height: 45%;

    padding-left: 2%;
    padding-right: 2%;
    padding-top: 4vh;
    justify-content: flex-start;
    align-items: center !important;

    .post-item-title {
      font-size: 26px;
      margin-top: 1.5vh;
      margin-bottom: 1.5vh;
      max-width: 85%;
    }
    .post-item-content {
      max-width: 80%;
      -webkit-line-clamp: 3;
    }
  }
  .post-item-image {
    width: 100%;
    height: 55%;
  }
}
// 移动端<1000px
@media screen and (min-width: 500px) and (max-width: 1000px) {
  .post-item-text {
    width: 100%;
    height: 40%;

    padding-left: 5%;
    padding-right: 5%;
    padding-top: 8vh;
    justify-content: flex-start;
    align-items: center !important;

    .post-item-title {
      font-size: 30px;
      margin-top: 2vh;
      margin-bottom: 2vh;
      max-width: 70%;
    }
    .post-item-content {
      max-width: 80%;
    }
  }
  .post-item-image {
    width: 100%;
    height: 60%;
  }
}
// pc大屏1000px
@media screen and (min-width: 1000.1px) {
  .post-item-text {
    width: 50%;
    height: 100%;
    padding-left: 5%;
    padding-right: 5%;
    padding-top: 30vh;

    // .post-item-info {

    // }
    .post-item-title {
      font-size: 36px;
      margin-top: 4%;
      margin-bottom: 4%;
      max-width: 70%;
    }
    .post-item-content {
      max-width: 80%;
    }
  }
  .post-item-image {
    width: 50%;
    height: 100%;
  }
}
</style>
