import axios from "./axios";

async function getBlogData() {
  const response = await axios.get(`/blog_data`);
  return response.data[0];
}

function postAddLikes() {
  return new Promise<any>((resolve, reject) => {
    axios
      .post(`/blog_data/addLikes`, {})
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
export { getBlogData, postAddLikes };
