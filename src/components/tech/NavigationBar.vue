<template>
  <div class="navContainer">
    <div class="navIcon" @click="onClickToHome">
      <img class="navIconImg" src="/images/mie.png" />
    </div>
    <div class="nav toDaily">游牧人</div>
    <div class="nav toAbout">关于我</div>
    <div class="navBtn">
      <div class="searchBtn" @click="openSearch">S</div>
      <div class="changeThemeBtn" @click="onClickChangeTheme">C</div>
    </div>
  </div>

  <SearchBox v-if="showSearch" @close="closeSearch"></SearchBox>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import SearchBox from "./SearchBox.vue";

let theme = ref("white");

const router = useRouter();
const onClickChangeTheme = () => {
  theme.value = theme.value === "white" ? "black" : "white";
  // 通过setAttribute设置data-theme主题进行切换
  setTheme(theme.value);
  // console.log("theme", theme.value);
};

// 从本地获取保存的主题，否则默认白色主题
const localTheme = localStorage.getItem("color-theme");
if (localTheme) {
  setTheme(localTheme);
} else {
  setTheme("white");
}

function setTheme(_theme: string) {
  theme.value = _theme;
  document.documentElement.setAttribute("data-theme", _theme);
  localStorage.setItem("color-theme", _theme);
}

const onClickToHome = () => {
  router.push("/tech/1");
};

const showSearch = ref(false);

// 打开搜索栏
const openSearch = () => {
  showSearch.value = true;
};

// 关闭搜索栏
const closeSearch = () => {
  showSearch.value = false;
};
</script>
<style scoped lang="scss">
.navContainer {
  width: 100vw;
  height: 60px;
  position: fixed;
  top: 0px;
  // border-bottom: 1px solid rgb(244, 244, 244);
  @include border-color($w-border-color);
  @include bg-color($w-bg-color);
  z-index: 10;
  @include f-r;
  // justify-content: space-between;
  .nav {
    height: 35px;
    width: 60px;
    box-sizing: border-box;
    border-bottom: 4px solid transparent;
    transition: all 0.2s;
    user-select: none;
    @include f-r;
    cursor: pointer;
    &:hover {
      background-color: $theme-color-light;
      border-bottom: 4px solid $theme-color;
    }

    // margin-right: 20px;
  }
  & :nth-child(2) {
    margin-right: 20px;
  }
  & :nth-child(3) {
    margin-left: 20px;
  }
}

.navIcon {
  position: absolute;
  height: 40px;
  width: 40px;
  user-select: none;
  cursor: pointer;
  .navIconImg {
    width: 100%;
    height: 100%;
    user-select: none;
  }
  &:hover {
    -webkit-animation: vibrate-1 0.3s linear infinite both;
    animation: vibrate-1 0.3s linear infinite both;
  }
}

@-webkit-keyframes vibrate-1 {
  0% {
    -webkit-transform: translate(0);
    transform: translate(0);
  }
  20% {
    -webkit-transform: translate(-2px, 2px);
    transform: translate(-2px, 2px);
  }
  40% {
    -webkit-transform: translate(-2px, -2px);
    transform: translate(-2px, -2px);
  }
  60% {
    -webkit-transform: translate(2px, 2px);
    transform: translate(2px, 2px);
  }
  80% {
    -webkit-transform: translate(2px, -2px);
    transform: translate(2px, -2px);
  }
  100% {
    -webkit-transform: translate(0);
    transform: translate(0);
  }
}
@keyframes vibrate-1 {
  0% {
    -webkit-transform: translate(0);
    transform: translate(0);
  }
  20% {
    -webkit-transform: translate(-2px, 2px);
    transform: translate(-2px, 2px);
  }
  40% {
    -webkit-transform: translate(-2px, -2px);
    transform: translate(-2px, -2px);
  }
  60% {
    -webkit-transform: translate(2px, 2px);
    transform: translate(2px, 2px);
  }
  80% {
    -webkit-transform: translate(2px, -2px);
    transform: translate(2px, -2px);
  }
  100% {
    -webkit-transform: translate(0);
    transform: translate(0);
  }
}

.navBtn {
  position: absolute;

  @include f-r;

  .searchBtn {
    width: 28px;
    height: 28px;
    margin-right: 20px;
    background-color: $theme-color;
    cursor: pointer;
    @include f-c;
  }
}

.changeThemeBtn {
  background-color: $theme-color;
  cursor: pointer;
}

@media screen and (max-width: 500px) {
  .navIcon {
    left: 10px;
  }
  .navBtn {
    right: 0px;
  }
  .changeThemeBtn {
    display: none;
  }
}

@media screen and (min-width: 500px) {
  .navIcon {
    left: 20px;
  }
  .navBtn {
    right: 20px;
  }
  .changeThemeBtn {
    @include f-c;
    width: 28px;
    height: 28px;
  }
}
</style>
