<template>
  <div class="search-view" @touchmove.prevent @click.self="() => emit('close')">
    <div class="search-box">
      <div class="search-input">
        <input
          class="search-input-dom"
          v-model="searchText"
          @input="onInput"
          placeholder="搜索标题、文章和tags，支持正则"
        />
        <div class="search-input-btn" @click="() => emit('close')">
          <svg
            width="800px"
            height="800px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M19.207 6.207a1 1 0 0 0-1.414-1.414L12 10.586 6.207 4.793a1 1 0 0 0-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 1 0 1.414 1.414L12 13.414l5.793 5.793a1 1 0 0 0 1.414-1.414L13.414 12l5.793-5.793z"
              fill="#000000"
            />
          </svg>
        </div>
      </div>
      <div class="result-wrap">
        <div class="result-no" v-if="resultList.post.length === 0 && resultList.tags.length === 0">
          暂无搜索结果
        </div>

        <div
          class="result-item result-post"
          v-for="post in resultList.post"
          :key="post.id"
          @click="onClickToPost(post.id)"
        >
          <div class="res-post-icon">
            <img class="res-icon-img" src="/icons/file-1-svgrepo-com.svg" />
          </div>
          <div class="res-post-value">
            <div class="res-title">{{ post.title }}</div>
            <div class="res-content">{{ post.content }}</div>
          </div>
        </div>

        <div
          class="result-item result-tags"
          v-for="tag in resultList.tags"
          :key="tag"
          @click="onClickToTags(tag)"
        >
          <div class="res-tag-icon">
            <img class="res-icon-img" src="/icons/price-tag-svgrepo-com.svg" />
          </div>
          <div class="res-tag-value">
            {{ tag }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import { debounce } from "../../utils/debounce";
import { search } from "@/store/search-store";
import { useRouter } from "vue-router";

const emit = defineEmits(["close"]);

const router = useRouter();

const searchText = ref("");

const resultList = reactive<{ post: any[]; tags: any[] }>({ post: [], tags: [] });

// 输入做个防抖
const onInput = debounce(() => {
  // console.log(searchText.value);

  const res = search(searchText.value);
  // console.log(res);
  resultList.post = res.post;
  resultList.tags = res.tags;
}, 500);

const onClickToPost = (id: string) => {
  router.push({
    path: "/tech-article",
    query: {
      id: id
    }
  });
};

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
.search-view {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.727);
  @include f-c;
}

.search-box {
  height: 80vh;
  box-sizing: border-box;
  border: 4px solid black;
  @include f-c;
  justify-content: space-between;
  @include search-border;
  @include bg-color($w-bg-color);
}

.search-input {
  width: 100%;
  height: 50px;
  box-sizing: content-box;
  border-bottom: 4px solid rgb(150, 150, 150);
  flex-shrink: 0;
  @include f-r;
  .search-input-dom {
    outline: none;
    // width: 90%;
    background-color: transparent;
    @include font-color($w-font-color);
    flex-grow: 1;
    height: 90%;
    padding: 0px;
    border: none;
    padding-left: 20px;
    padding-right: 20px;
    box-sizing: border-box;
    font-size: 16px;
  }
  .search-input-btn {
    cursor: pointer;
    width: 25px;
    height: 25px;
    margin-right: 10px;
    // background-color: $theme-color;
    @include f-c;
    @include svg-path-100;
  }
}

.result-wrap {
  width: 100%;
  flex-grow: 1;
  overflow: scroll;
  scrollbar-width: 0px; /* Firefox */

  .result-no {
    width: 100%;
    margin-top: 20px;
    @include f-c;
  }

  .result-item {
    width: 100%;

    cursor: pointer;

    &:hover {
      background-color: $theme-color-light;
    }
  }
}

.result-wrap::-webkit-scrollbar {
  display: none;
  width: 0px;
  height: 0px;
}

.result-post {
  @include f-r;
  justify-content: flex-start;
  height: 80px;
  .res-post-icon {
    height: 30px;
    width: 30px;
    margin-left: 10px;
    margin-right: 10px;
    // background-color: yellow;
    @include f-c;
  }
  .res-post-value {
    flex-grow: 1;
    height: 100%;
    width: 80%;
    margin-right: 10px;
    @include f-c;
  }
  .res-title {
    width: 100%;
  }
  .res-content {
    width: 100%;
    // height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    white-space: nowrap;
    @include font-color-light($w-font-color-light);
  }
}

.result-tags {
  @include f-r;
  justify-content: flex-start;
  height: 50px;
  .res-tag-icon {
    height: 30px;
    width: 30px;
    margin-left: 10px;
    margin-right: 10px;
    // background-color: yellow;
    @include f-c;
  }
  .res-tag-value {
    flex-grow: 1;
    height: 100%;
    width: 80%;
    margin-right: 10px;
    @include f-c;
    align-items: flex-start;
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    white-space: nowrap;
    @include font-color($w-font-color);
  }
}

@media screen and (max-width: 600px) {
  .search-box {
    width: 100%;
  }
}

@media screen and (min-width: 600px) {
  .search-box {
    width: 500px;
  }
}

.res-icon-img {
  width: 100%;
  height: 100%;
}
</style>
