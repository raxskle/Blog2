import { getBriefArticles, getArticle } from "@/network/post";

import { computed, reactive, ref } from "vue";

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
const _postList = reactive<(Post | any)[]>([]);
// 总页数
const _totalPageNum = ref(0);

// 根据tag得到对应文章列表和页数，如果未请求文章将会向后端请求所有文章
// 响应式变量同步返回，请求得到数据后更新
function useGetAllPost(tag: string) {
  if (gotPost.value) {
    // 已经得到文章，根据tag返回列表
    return postFilter(tag);
  }

  // 当前tag的文章列表
  const tagPostList = reactive<Post[]>([]);
  // 当前tag的页数
  const tagTotalPageNum = ref(0);
  //
  // 目前是请求得到所有文章的完整列表
  getBriefArticles("/all").then((res) => {
    // console.log("获取文章：", res);
    _totalPageNum.value = Math.ceil(res.length / 6);

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
        const _item: Post = { ...res[index], hasImg: true, coverImgUrl: _url };
        _postList.push(_item);
      } else {
        const _item: Post = { ...res[index], hasImg: false, coverImgUrl: _url };
        _postList.push(_item);
      }
    }
    gotPost.value = true;

    const { postList, totalPageNum } = postFilter(tag);
    tagPostList.push(...postList);
    tagTotalPageNum.value = totalPageNum.value;
  });
  return { postList: tagPostList, totalPageNum: tagTotalPageNum };
}

// 获取已经请求的文章，根据传入tag筛选
function postFilter(tag: string) {
  if (tag === "all") {
    // 返回所有文章，直接返回
    return { postList: _postList, totalPageNum: _totalPageNum };
  } else {
    // 根据tag筛选
    const postList = reactive<(Post | any)[]>([]);
    _postList.forEach((post) => {
      if (post.tags.indexOf(tag) >= 0) {
        postList.push(post);
      }
    });
    const totalPageNum = ref(Math.ceil(postList.length / 6));

    return { postList, totalPageNum };
  }
}

// 根据id请求某一篇文章
// return: {post, cata } // 文章 和 h2标签目录
async function useGetPost(id: string) {
  const params = `id=${id}`;

  const articleCatalogueList = ref<string[]>([]);
  return await getArticle(params)
    .then((res) => {
      // tags转为数组 string -> string[]
      res.data[0].tags = res.data[0].tags.split(",").filter((tag: string) => tag !== "");
      // 生成目录
      const rawText = res.data[0].content;
      articleCatalogueList.value = [];
      rawText.replace(/<h2.*?h2>/g, (match: string) => {
        const catalogue = match.replace(/<.*?>/g, "");
        articleCatalogueList.value.push(catalogue);
      });

      return { post: reactive(res.data[0]), cata: articleCatalogueList };
    })
    .catch((err) => {
      alert("请求文章失败，文章id：" + id);
      console.log(err);
      return { post: reactive({}), cata: articleCatalogueList };
    });
  // return post;
}

// 根据当前id得到前后文章的title和id
function useReadMore(id: string) {
  // console.log("use read more", id);
  const res = computed(() => {
    const _res = { prev: { id: -1, title: "" }, next: { id: -1, title: "" } };
    // console.log(gotPost.value);
    if (gotPost.value) {
      const index = _postList.findIndex((post) => {
        return post.id === id;
      });
      // 如果当前是第一篇之后，设置前一篇
      if (index > 0) {
        _res.prev.id = _postList[index - 1].id;
        _res.prev.title = _postList[index - 1].title;
      }
      // 如果当前是最后一篇之前，设置后一篇
      if (index < _postList.length - 1) {
        _res.next.id = _postList[index + 1].id;
        _res.next.title = _postList[index + 1].title;
      }
      return _res;
    } else {
      return _res;
    }
  });

  return res;
}

const postList = _postList;

export { useGetAllPost, useGetPost, useReadMore, postList };
