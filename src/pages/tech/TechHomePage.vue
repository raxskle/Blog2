<template>
  <div class="tech-home-wrap">
    <main class="">
      <NavigationBar></NavigationBar>
      <div class="post-container">
        <div class="current-tags">
          {{ route.params.tag ? `当前tag：${route.params.tag}` : "所有文章" }}
        </div>
        <PostItem
          v-for="post of postList.slice((currentPage - 1) * 6, (currentPage - 1) * 6 + 6)"
          :key="post.id"
          :hasImg="post.hasImg"
          :article="post"
        ></PostItem>
        <TurnPageBar :current="currentPage" :total="totalPageNum"></TurnPageBar>
      </div>

      <div class="tags-container">
        <div class="tags-box">
          <div
            class="tag-item"
            :class="{ 'active-tag': route.params.tag == tag }"
            v-for="tag of tags"
            :key="tag"
            @click="onClickToTags(tag)"
          >
            <div class="tag-text">{{ tag }}</div>
          </div>
        </div>
      </div>
    </main>

    <PageTail></PageTail>

    <SettingBar
      :posi="{
        right: '10px',
        position: 'fixed'
      }"
    ></SettingBar>
  </div>
</template>

<script setup lang="ts">
import NavigationBar from "@/components/tech/NavigationBar.vue";
import PostItem from "@/components/tech/PostItem.vue";
import PageTail from "@/components/PageTail.vue";

import TurnPageBar from "@/components/tech/TurnPageBar.vue";
import SettingBar from "@/components/tech/SettingBar.vue";

import { useRoute, useRouter } from "vue-router";

import { useGetAllPost } from "@/store/post-store";
import { computed, watch } from "vue";
import { useTags } from "@/store/tags-store";

const route = useRoute();
const router = useRouter();
// console.log("route in tech home", route.fullPath);
// console.log("current page", route.params.page, route.query.page);

if (!route.params.page && !route.query.page) {
  // 如果没有页数
  router.push("/tech");
}

const tag = route.params.tag ? route.params.tag.toString() : "all";

// 得到 文章列表 和 总页数
const { postList, totalPageNum } = useGetAllPost(tag);

// 从url路由得到 当前页数
const currentPage = computed(() => {
  if (tag === "all") {
    if (typeof route.params.page === "string") {
      return parseInt(route.params.page);
    } else {
      return parseInt(route.params.page[0]);
    }
  } else {
    // if (typeof route.query.page?.toString() === "string") {
    return parseInt(route.query.page?.toString() || "all");
    // } else {
    //   return parseInt(route.query.page[0]);
    // }
  }
});

// url输入页数 大于 总页数，自动跳转第一页
watch(totalPageNum, (newVal) => {
  if (currentPage.value > newVal) {
    router.push("/tech");
  }
});

// 得到tags
const tags = useTags();

// tags点击跳转
function onClickToTags(tag: string) {
  router.push({
    path: "/tech/" + tag,
    query: {
      page: 1
    }
  });
}
</script>
<style scoped lang="scss">
@import "@/assets/mixin.scss";
.tech-home-wrap {
  width: 100%;
  position: relative;
  @include f-c;
}
main {
  width: 100%;
  margin-top: 120px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
}
.post-container {
  // background-color: rgb(100, 195, 226);
  min-height: 100px;
}
.tags-container {
  // background-color: rgb(191, 232, 174);
  min-height: 100px;
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

// 移动端适配
@media screen and (max-width: 500px) {
  .post-container {
    width: 95%;
  }
  .tags-container {
    display: none;
  }
}

// 中等屏适配
@media screen and (min-width: 500px) and (max-width: 900px) {
  .post-container {
    width: 85%;
  }
  .tags-container {
    display: none;
  }
}

// pc适配
@media screen and (min-width: 900px) {
  .post-container {
    width: 60%;
    max-width: 750px;
    margin-right: 20px;
  }
  .tags-container {
    width: 30%;
    max-width: 300px;
  }
}

.current-tags {
  font-size: 30px;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 10px;
  user-select: none;
  // height: 50px;
  position: relative;
  width: fit-content;
  z-index: 2;
  &::before {
    content: "";
    @include bg-color-t;
    position: absolute;
    left: 0px;
    bottom: 0px;
    width: 0%;
    height: 18px;
    z-index: 1;
    transition: all 0.4s;
  }
  &:hover {
    &::before {
      width: 100%;
    }
  }
}

.tags-box {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.tag-item {
  height: 40px;
  width: auto;
  margin-left: 15px;
  margin-right: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
  .tag-text {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &::before {
      content: "";
      background-color: $theme-color-tag-light;
      position: absolute;
      left: 0px;
      bottom: 0px;
      width: 100%;
      height: 40%;
      z-index: 1;
      transition: all 0.4s;
    }
  }
}

.active-tag {
  .tag-text {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &::before {
      content: "";
      background-color: $theme-color-tag;
      position: absolute;
      left: 0px;
      bottom: 0px;
      width: 100%;
      height: 40%;
      z-index: 1;
      transition: all 0.4s;
    }
  }
}
</style>
