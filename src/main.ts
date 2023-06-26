import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/md-content.scss";

import "highlight.js/styles/github.css"; // 导入代码高亮样式
// import "highlight.js/styles/a11y-dark.css"; // 导入代码高亮样式
// import "highlight.js/styles/gradient-dark.css"; // 导入代码高亮样式

import hljs from "highlight.js";
hljs.configure({
  languages: ["JavaScript", "HTML", "CSS", "SCSS"],
  ignoreUnescapedHTML: true
});

const app = createApp(App);

app.directive("highlight", (node) => {
  node.querySelectorAll("pre code").forEach((el: HTMLElement) => {
    hljs.highlightElement(el);
    // hljs.highlightBlock(el as HTMLElement);
  });
});

app.use(router);

app.mount("#app");
