import { createRouter, createWebHistory } from "vue-router";
import TechHomePage from "../pages/tech/TechHomePage.vue";
import DiaryHomePage from "@/pages/diary/DiaryHomePage.vue";
import TechArticlePage from "@/pages/tech/TechArticlePage.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";
import MainPage from "@/pages/MainPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // 索引页
      path: "/",
      name: "main",
      component: MainPage,
      children: [
        {
          // 根路由，直接去首页
          path: "",
          redirect: "/tech/1" + "?time=" + Date.now(),
          name: "toHome"
        },
        {
          // 首页，需要有page参数
          path: "tech/:page(\\d+)",
          name: "tech-home",
          component: TechHomePage
        },
        {
          // 缺少page参数，直接去首页
          path: "tech",
          redirect: "/tech/1" + "?time=" + Date.now()
        },
        {
          // tag页，根据标签筛选，需要带tag页数的query参数
          path: "tech/:tag",
          name: "tech-tag",
          component: TechHomePage
        },
        {
          // tech 文章页
          path: "tech-article",
          name: "tech-post",
          component: TechArticlePage
        },
        {
          // daily 首页
          path: "diary",
          name: "diary-home",
          component: DiaryHomePage
        },
        {
          // 非法路由去404
          path: ":path(.*)",
          redirect: "/404"
        }
      ]
    },
    {
      // 404页
      path: "/404",
      name: "not-found",
      component: NotFoundPage
    },
    {
      // 非法路由去404
      path: "/:path(.*)",
      redirect: "/404"
    }
  ]
});

export default router;
