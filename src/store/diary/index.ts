import { getBriefArticles, getArticle } from "@/network/post";

import { reactive, ref } from "vue";

interface Post {
  id: string;
  class: string;
  tags: string[];
  title: string;
  content: string;
  time: string;
  hasImg: boolean;
  coverImgUrl: string;
}
// 是否已经请求过数据
const gotPost = ref(false);

// 所有文章列表
const postList = reactive<(Post | any)[]>([]);

// 展示的文章列表
const showPostList = reactive<(Post | any)[]>([]);

// 根据tag得到对应文章列表和页数，如果未请求文章将会向后端请求所有文章
// 响应式变量同步返回，请求得到数据后更新
function useGetDiaryAllPost() {
  // 如果没请求过就请求
  if (!gotPost.value) {
    // 目前是请求得到所有文章的完整列表
    getBriefArticles("/diary").then((res) => {
      // 对每个文章检查有无图片
      for (const index in res) {
        let _url = "";
        // tags转为数组 string -> string[]
        res[index].tags = res[index].tags.split(",").filter((tag: string) => tag !== "");
        // console.log(res[index].tags);
        res[index].content.replace(/<img.*?>/, (s: string) =>
          s.replace(/src=".*?"/, (ss: string) => (_url = ss.slice(5, -1)))
        );
        if (_url !== "") {
          // 有图片
          const _item: Post = { ...res[index], hasImg: true, coverImgUrl: _url };
          postList.push(_item);
        } else {
          const _item: Post = { ...res[index], hasImg: false, coverImgUrl: _url };
          postList.push(_item);
        }
      }

      for (let i = 0; i < 4 && i < postList.length; i++) {
        showPostList.push(postList[i]);
      }
      gotPost.value = true;
    });
  }

  // 同步返回，但是异步请求
  return { postList, showPostList };
}

function showMore(num = 4) {
  // 最多加num个
  const len = showPostList.length;
  for (let i = len; i < len + num && i < postList.length; i++) {
    console.log("show more", i, num);
    showPostList.push(postList[i]);
  }
}

// 根据id请求某篇文章，无返回目录
function useDiaryGetPost(id: string) {
  const params = `id=${id}`;
  const ret = reactive({
    article: {
      id: "",
      class: "",
      tags: "",
      title: "",
      content: "",
      time: "",
      hasImg: false,
      coverImgUrl: ""
    }
  });
  getArticle(params)
    .then((res) => {
      // tags转为数组 string -> string[]
      res.data[0].tags = res.data[0].tags.split(",").filter((tag: string) => tag !== "");

      ret.article = res.data[0];

      // 检查有无图片
      let _url = "";
      // console.log(res[index].tags);
      res.data[0].content.replace(/<img.*?>/, (s: string) =>
        s.replace(/src=".*?"/, (ss: string) => (_url = ss.slice(5, -1)))
      );
      if (_url !== "") {
        // 有图片
        ret.article.hasImg = true;
        ret.article.coverImgUrl = _url;
      } else {
        ret.article.hasImg = false;
        ret.article.coverImgUrl = "";
      }
    })
    .catch((err) => {
      alert("请求文章失败，文章id：" + id);
      console.log(err);
    });
  return ret;
}
export { useGetDiaryAllPost, useDiaryGetPost, showMore };
