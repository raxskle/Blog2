<template>
  <div class="post">
    <div class="article">
      <div class="post-title">{{ article.title }}</div>
      <div class="post-info">
        <div class="post-time">📅 {{ article.time }}</div>
        <div class="post-tags">
          标签：
          <span
            class="tag-link"
            v-for="(tag, index) in article.tags"
            :key="tag"
            @click="onClickToHomeByTag(tag)"
            >{{ tag }}{{ index !== article.tags.length - 1 ? "," : null }}</span
          >
        </div>
      </div>
      <div class="post-content">
        <div v-highlight class="md-content" v-html="article.content"></div>
      </div>

      <div class="read-more">
        <div class="choice prev-post" @click="onClickToPostById(res.prev.id)">
          <div class="tips">上一篇</div>
          <div class="title">{{ res.prev.id != -1 ? res.prev.title : "暂无更多" }}</div>
        </div>
        <div class="choice next-post" @click="onClickToPostById(res.next.id)">
          <div class="tips">下一篇</div>
          <div class="title">{{ res.next.id != -1 ? res.next.title : "暂无更多" }}</div>
        </div>
      </div>
    </div>

    <div
      class="catalogue-block"
      :class="{ 'cata-active': cataActive && articleCatalogueList.length > 0 }"
    ></div>
    <div
      class="catalogue"
      :class="{ 'cata-active': cataActive && articleCatalogueList.length > 0 }"
    >
      <Transition name="cata">
        <div v-show="cataActive && articleCatalogueList.length > 0" class="cata-wrap">
          <div class="cata-title">CONTENTS</div>
          <div class="cata-item-wrap">
            <div
              class="cata-item"
              v-for="(catalogue, index) of articleCatalogueList"
              :key="catalogue"
              @click="toH2posi"
              :class="{ 'cata-item-current': currentCata[index] }"
            >
              {{ catalogue }}
            </div>
          </div>
        </div>
      </Transition>

      <SettingBar
        :posi="{
          // left: cataActive && articleCatalogueList.length > 0 ? '-40px' : '-50px',
          right: '10px',
          position: 'fixed'
        }"
      >
        <div
          v-if="articleCatalogueList.length > 0"
          class="fade-catalogue-btn"
          @click="onClickFadeCatalogue"
        >
          <!-- {{ cataActive ? "→" : "←" }} -->
          <img
            v-if="cataActive"
            class="fade-catalogue-btn-img"
            src="/icons/arrow-right-svgrepo-com.svg"
          />
          <img
            v-if="!cataActive"
            class="fade-catalogue-btn-img"
            src="/icons/arrow-left-svgrepo-com.svg"
          />
        </div>
      </SettingBar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGetPost, useReadMore } from "@/store/post-store";
import SettingBar from "./SettingBar.vue";
import { useRoute, useRouter } from "vue-router";
import { onMounted, onUnmounted, ref } from "vue";

import { addHandleClickImg } from "./useDOM/md-img";

const route = useRoute();
const router = useRouter();

const postId = route.query.id?.toString() || "";
// console.log(postId, route);

if (!postId || postId === "") {
  router.push("/404");
}

let { post: article, cata: articleCatalogueList } = await useGetPost(postId);

// console.log("article page got post", article);

// 点击标签回到首页按标签分类
function onClickToHomeByTag(tag: string) {
  if (tag != "") {
    router.push(`/tech/${tag}?page=1`);
  }
}

const cataActive = ref(window.innerWidth < 950 ? false : true);

// 隐藏目录
function onClickFadeCatalogue() {
  cataActive.value = !cataActive.value;
}

let h2List: NodeListOf<HTMLElement>;

// 点击目录移动到位置
const toH2posi = (e: MouseEvent) => {
  // console.log(e.target.parentNode.children[3] == e.target);
  if ((e.target as HTMLElement).parentNode !== null) {
    // i是第几个h2标题
    let i = 0;
    // 找到第几个h2
    for (; i < (e.target as HTMLElement).parentNode!.children.length; i++) {
      if ((e.target as HTMLElement).parentNode!.children[i] == e.target) {
        break;
      }
    }
    if (i < (e.target as HTMLElement).parentNode!.children.length) {
      if (h2List) {
        window.scrollTo({
          top: h2List[i].offsetTop - 100,
          behavior: "smooth"
        });
      }
    }
  }
};

// 当前滚动到的目录
const currentCata = ref<boolean[]>([]);
let len = articleCatalogueList.value.length;
currentCata.value.push(...new Array(len).fill(false));

// 得到前一篇和后一篇的id
const res = useReadMore(article.id);

// 点击前一篇和后一篇
function onClickToPostById(id: number) {
  if (id !== -1) {
    router.push({
      path: "/tech-article",
      query: {
        id: id
      }
    });
  }
}

function onScroll() {
  // 滚动的时候目录显示当前滚到的h2
  if (h2List.length > 0) {
    const currentY = window.scrollY + 100;

    for (let i = 0; i < h2List.length - 1; i++) {
      currentCata.value[i] = false;
      if (currentY < h2List[i + 1].offsetTop && currentY >= h2List[i].offsetTop) {
        currentCata.value[i] = true;
      }
    }
    // 显示滚到最后一个标题
    currentCata.value[h2List.length - 1] = false;
    if (currentY > h2List[h2List.length - 1].offsetTop) {
      currentCata.value[h2List.length - 1] = true;
    }

    // 如果触底了也是显示滚到最后一个标题
    //窗口高度
    var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
    //滚动高度
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    //页面高度
    var documentHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

    if (windowHeight + scrollTop >= documentHeight - 100) {
      currentCata.value.forEach((value, index) => {
        currentCata.value[index] = false;
      });
      currentCata.value[currentCata.value.length - 1] = true;
    }
  }
}

function onResize() {
  // 窗口宽度变化时控制显示样式
  if (window.innerWidth <= 950) {
    cataActive.value = false;
  }
}

onMounted(() => {
  window.addEventListener("resize", onResize);
  window.addEventListener("scroll", onScroll);
  // 得到h2列表
  h2List = document.querySelectorAll(".md-content >h2");
  // console.log(h2List);

  // 刚加载时滚回页顶
  window.scrollTo({
    top: 0
  });

  // 处理加载后的md-html
  addHandleClickImg();
});

onUnmounted(() => {
  window.removeEventListener("resize", onResize);
  window.removeEventListener("scroll", onScroll);
});
</script>
<style scoped lang="scss">
@import "@/assets/mixin.scss";
.tech-post-wrap {
  width: 100vw;
  position: relative;
}
.post {
  width: 100vw;
  overflow: hidden;
  // height: 120vh;
  margin-top: 60px;
  // background-color: rgb(155, 240, 212);
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
}

.article {
  max-width: 1200px;
  // flex-grow: 1;
  box-sizing: border-box;
  padding-left: 8vw;
  padding-right: 8vw;
  padding-top: 2vh;
  padding-bottom: 2vh;
  position: relative;
  // flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  overflow: hidden;
  // background-color: aquamarine;
}

.post-title {
  // width: 100%;
  font-size: 36px;
  margin-top: 50px;
  margin-bottom: 20px;
  font-weight: 900;
  // margin-left: 5vw;
}

.post-info {
  // width: 100%;
  // margin-left: 5vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 10px;
  @include font-color-light($w-font-color-light);

  .post-tags {
    margin-top: 10px;
    font-style: italic;
    // background-color: #494949;
    .tag-link {
      cursor: pointer;
      &:hover {
        color: $theme-color;
      }
    }
  }
}

.post-content {
  margin: 0vw;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.catalogue-block {
  width: 18%;
  min-width: 250px;
  width: 0%;
  min-width: 0px;
  min-height: 100vh;
  // height: 100%;
  transition: all 0.4s;
  overflow: hidden;
  // display: none;
}

.catalogue {
  width: 18%;
  min-width: 250px;
  width: 0%;
  min-width: 0px;
  height: 100vh;
  box-sizing: border-box;
  padding-top: 70px;
  position: fixed;
  right: 0px;
  top: 0px;

  transition: all 0.4s;

  // display: none;
}

.cata-wrap {
  width: 18vw;
  min-width: 250px;
  height: 100%;
  @include f-c;
  justify-content: flex-start;
  align-items: flex-start;
  .cata-title {
    width: 90%;
    height: auto;
    font-size: 24px;
    margin-top: 20px;
    margin-bottom: 20px;
    @include f-c;
  }

  .cata-item-wrap {
    width: 90%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    max-height: 42vh;
    overflow-y: scroll;
    .cata-item {
      max-width: 90%;
      cursor: pointer;
      border-left: 4px solid transparent;
      padding-top: 4px;
      padding-bottom: 4px;
      padding-left: 5px;

      box-sizing: border-box;
      transition: all 0.1s;
      // 点击
      &:hover {
        color: $theme-color;
        border-left: 4px solid $theme-color;
      }
    }
    .cata-item-current {
      color: $theme-color;
      border-left: 4px solid $theme-color;
    }
  }

  .cata-item-wrap::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
}

.fade-catalogue-btn {
  width: 40px;
  height: 40px;
  // background-color: black;
  cursor: pointer;
  @include bg-color-reverse($w-bg-color-reverse);
  @include font-color-reverse($w-font-color-reverse);
  @include f-c;
  transition: all 0.2s;
  &:hover {
    background-color: $theme-color;
  }
  .fade-catalogue-btn-img {
    width: 75%;
    height: 75%;
    transition: all 0.2s;
  }
}

@media screen and (max-width: 950px) {
  .article {
    width: 98vw;
  }
  .cata-active {
    width: 0%;
    min-width: 0px;
  }

  .fade-catalogue-btn {
    display: none;
  }
  .cata-wrap {
    display: none;
  }
}
@media screen and (min-width: 950px) {
  .article {
    width: 80vw;
  }
  .cata-active {
    width: 18%;
    min-width: 250px;
  }
  .fade-catalogue-btn {
    width: 40px;
    height: 40px;
  }
}

//  transition
.cata-enter-active,
.cata-leave-active {
  transition: all 0.2s ease;
}

.cata-enter-from,
.cata-leave-to {
  transform: translateX(18vw);
  opacity: 0;
}
//

.read-more {
  margin-top: 80px;
  border-top: 1px solid grey;
  align-self: center;
  width: 100%;
  // height: 150px;
  padding-top: 20px;
  @include f-r;
  align-items: flex-start;
  .choice {
    width: 50%;
    @include f-c;

    cursor: pointer;
    &:first-child {
      border-right: 2px solid grey;
    }

    .tips {
      border: 1px solid grey;
      padding: 4px;
    }
    .title {
      margin-top: 10px;
      max-width: 90%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
