<template>
  <main class="diary-post-page">
    <LogoText @onClickIcon="onClickIcon" />
    <div class="post-header">
      <div class="header-text">
        <div class="header-post-info">{{ res.article.time }}</div>
        <div class="header-post-title">{{ res.article.title }}</div>
      </div>
      <div class="header-image">
        <img
          v-show="res.article.hasImg"
          class="header-image-img"
          :src="res.article.hasImg ? res.article.coverImgUrl : '/images/diary-img1.jpg'"
        />
      </div>
    </div>
    <div class="post-content">
      <div v-highlight class="md-content diary-md-content" v-html="res.article.content"></div>
    </div>

    <div class="to-diary-home" @click="onClickToDiaryHome">
      <img class="to-diary-home-img" src="/icons/house-svgrepo-com.svg" />
    </div>
    <PageTail></PageTail>
  </main>
</template>

<script setup lang="ts">
import { useDiaryGetPost, useGetDiaryAllPost } from "@/store/diary/index";
import { onErrorCaptured, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import PageTail from "@/components/PageTail.vue";
import LogoText from "@/components/diary/LogoText.vue";

const route = useRoute();
const router = useRouter();

// 请求一次所有文章，得到所有文章
const { postList } = useGetDiaryAllPost();

// 从url路由得到postId
const postId = route.query.id?.toString() || "";
if (!postId || postId === "") {
  router.push("/404");
}

// 根据id请求文章
const res = useDiaryGetPost(postId);

watch(res, (newres) => {
  console.log(newres.article);
});

onErrorCaptured((e) => {
  // 出错直接抛404
  console.log("error article page", e);
  router.push("/404");
  return true;
});

const onClickIcon = () => {
  router.push("/diary");
};

// 进入页面必须在顶部
window.scrollTo({
  top: 0
});

const onClickToDiaryHome = () => {
  router.push("/diary");
};

// 修改主题为white
document.documentElement.setAttribute("data-theme", "white");
</script>
<style scoped lang="scss">
.diary-post-page {
  width: 100%;
  min-height: 100vh;
  position: relative;
  color: $d-font-color;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.post-header {
  width: 100vw;

  .header-text {
    flex-shrink: 0;
    flex-grow: 1;
    // background-color: rgb(196, 255, 255);
    background-color: white;
    display: flex;
    flex-direction: column;

    box-sizing: border-box;
    padding-left: 6vw;
    padding-right: 10vw;

    .header-post-title {
      z-index: 2;
      position: relative;
      width: fit-content;
      line-height: 1.2;
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
    background-color: aquamarine;
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
    height: 80vh;
    @include f-c;
    flex-direction: column-reverse;
  }

  .header-text {
    width: 100%;
    height: 30vh;
    // padding-top: 10vh;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
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
    height: 100vh;
    @include f-c;
    flex-direction: column-reverse;
  }

  .header-text {
    width: 100%;
    height: 40%;
    // padding-top: 10vh;
    align-items: center;
    justify-content: center;
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
    height: 60%;
  }
}

@media screen and (min-width: 1000px) {
  .post-header {
    height: 100vh;
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

.post-content {
  margin: 0vw;
  margin-top: 2vh;
  box-sizing: border-box;

  max-width: 900px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.to-diary-home {
  width: 40px;
  height: 40px;
  position: fixed;
  bottom: 130px;
  right: 10px;
  @include f-c;
  @include side-btn;
  transition: all 0.2s;

  cursor: pointer;
  @include bg-color-reverse($w-bg-color-reverse);
  &:hover {
    background-color: $theme-color;
  }
  .to-diary-home-img {
    width: 70%;
    height: 70%;
  }
}

@media screen and (max-width: 500px) {
  .post-content {
    width: 90%;
  }
}
@media screen and (min-width: 500px) and (max-width: 900px) {
  .post-content {
    width: 80%;
  }
}
@media screen and (min-width: 900px) {
  .post-content {
    width: 90%;
  }
  .post-content {
    margin-top: 10vh;
  }
}
</style>
