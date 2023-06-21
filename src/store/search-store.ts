import { tags } from "./tags-store";
import { postList } from "./post-store";

function search(text: string) {
  const res: { post: any[]; tags: any[] } = { post: [], tags: [] };
  const targetReg = new RegExp(text);
  // console.log(targetReg);

  if (text.trim() !== "") {
    // 搜索标题
    if (postList.length > 0) {
      postList.forEach((post) => {
        const titleHit = post.title.search(targetReg);
        if (titleHit != -1) {
          res.post.push(post);
        }
      });
    }

    // 搜索tags
    if (tags.length > 0) {
      tags.forEach((tag) => {
        const titleHit = tag.search(targetReg);
        if (titleHit != -1) {
          res.tags.push(tag);
        }
      });
    }
  }

  // console.log(res);
  return res;
}

export { search };
