import { createRouter, createWebHistory } from "vue-router";
import TechHomePage from "../pages/tech/TechHomePage.vue";
import DiaryHomePage from "@/pages/diary/DiaryHomePage.vue";
import TechArticlePage from "@/pages/tech/TechArticlePage.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // 首页，需要有page参数
      path: "/tech/:page(\\d+)",
      name: "tech-home",
      component: TechHomePage
    },
    {
      // 首页，redirect到带页数
      path: "/tech",
      redirect: "/tech/1"
    },
    {
      // 首页，根据标签筛选，需要带页数的query参数
      path: "/tech/:tag",
      name: "tech-tag",
      component: TechHomePage
    },
    {
      // tech的文章页
      path: "/tech-article",
      name: "tech-post",
      component: TechArticlePage
    },
    {
      // daily 的首页
      path: "/diary",
      name: "diary-home",
      component: DiaryHomePage
    },
    {
      // 未匹配的到这里来
      path: "/:path(.*)",
      name: "not-found",
      component: NotFoundPage
    }
  ]
});

export default router;
