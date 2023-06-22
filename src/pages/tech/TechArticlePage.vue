<template>
  <main class="tech-post-wrap">
    <NavigationBar></NavigationBar>
    <Suspense>
      <template #default>
        <ArticlePageAsync></ArticlePageAsync>
      </template>
      <template #fallback>
        <div class="loading">Loading...</div>
      </template>
    </Suspense>

    <PageTail></PageTail>
  </main>
</template>

<script setup lang="ts">
import NavigationBar from "@/components/tech/NavigationBar.vue";
import PageTail from "@/components/PageTail.vue";

import ArticlePageAsync from "@/components/tech/ArticlePageAsync.vue";

import { useRoute, useRouter } from "vue-router";
import { onErrorCaptured } from "vue";

// 在文章页页请求一次所有文章
import { useGetAllPost } from "@/store/post-store";
useGetAllPost("all");

const route = useRoute();
const router = useRouter();

// 从url路由得到postId
const postId = route.query.id?.toString() || "";
// console.log(postId, route);

if (!postId || postId === "") {
  router.push("/404");
}

onErrorCaptured((e) => {
  // 出错直接抛404
  console.log("error article page", e);
  router.push("/404");
  return true;
});
</script>
<style scoped lang="scss">
.tech-post-wrap {
  width: 100vw;
  position: relative;
  @include f-c;
}
.loading {
  width: 100vw;
  height: 80vh;
  margin-top: 60px;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>
