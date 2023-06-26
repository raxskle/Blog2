import axios from "./axios";

function getArticle(params: string) {
  console.log("http getArticle", params);
  // Promise后面的<any>指代的resolve里的类型，也就是之后的then的参数res
  return new Promise<any>((resolve, reject): void => {
    axios
      .get(`/article?${params}`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

// 根据分类来获取文章列表 "all"是所有tech， "diary"是所有diary
function getBriefArticles(params: string) {
  console.log("http getBriefArticles", params);
  return new Promise<any>((resolve, reject) => {
    axios
      .get(`/articles${params}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export { getArticle, getBriefArticles };
