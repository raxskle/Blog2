import { getTags } from "@/network/tags";
import { reactive } from "vue";

let gotTags = false;
let tags = reactive<string[]>([]);
function useTags() {
  if (!gotTags) {
    tags = getTags();
    gotTags = !gotTags;
  }
  // console.log(tags);
  return tags;
}

export { useTags, tags };
