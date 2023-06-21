import { reactive } from "vue";
import axios from "./axios";

function getTags() {
  console.log("http getTags");
  const requireTags = new Promise<any>((resolve, reject) => {
    axios
      .get(`/tags`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

  const tagsText = reactive<string[]>([]);
  requireTags.then((res) => {
    res.forEach((val: { tag_name: string }) => {
      tagsText.push(val.tag_name);
    });
  });
  // console.log(tagsText.value)
  return tagsText;
}

export { getTags };
