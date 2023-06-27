import axios from "axios";
const webURL = "https://blog.raxskle.fun";
const ConfigBaseURL = `${webURL}/api`;
// https://blog.raxskle.fun/api
const instance = axios.create({
  headers: {
    "Content-Type": "application/json;charset=UTF-8"
  },
  timeout: 10000,
  baseURL: ConfigBaseURL //接口请求地址
});

export default instance;
