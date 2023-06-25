<template>
  <div class="not-found">
    <div class="title-404">404</div>
    <div class="title-2">Page not found</div>
    <div class="box-wrap">
      <div
        ref="box"
        class="box"
        :style="{ '--X': `${rotateX}deg`, '--Y': `${rotateY}deg` }"
        @mouseenter="onMouseEnter"
        @mousemove="onMouseMove"
        @mouseleave="onMouseLeave"
      >
        <img class="img" src="/images/404.png" />
      </div>
    </div>
    <div class="title-3">你已登陆火星</div>
    <div class="toHomeBtn" @click="toHome">返回地球</div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
let router = useRouter();
let toHome = () => {
  router.push("/");
};

// 元素
const box = ref();

const maxRotateDeg = 35;

const rotateX = ref(0);
const rotateY = ref(0);

onMounted(() => {});

const onMouseEnter = (e: MouseEvent) => {
  const halfW = box.value.clientWidth / 2;
  const halfH = box.value.clientHeight / 2;
  const dxPercent = (e.offsetX - halfW) / halfW;
  const dyPercent = (e.offsetY - halfH) / halfH;

  rotateX.value = maxRotateDeg * dxPercent;
  rotateY.value = maxRotateDeg * dyPercent;
};

const onMouseMove = (e: MouseEvent) => {
  const halfW = box.value.clientWidth / 2;
  const halfH = box.value.clientHeight / 2;
  const dxPercent = (e.offsetX - halfW) / halfW;
  const dyPercent = (e.offsetY - halfH) / halfH;

  rotateX.value = maxRotateDeg * dxPercent;
  rotateY.value = maxRotateDeg * dyPercent;
};

const onMouseLeave = () => {
  rotateX.value = 0;
  rotateY.value = 0;
};
</script>

<style scoped lang="scss">
.not-found {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: white;
}

.title-404 {
  font-size: 80px;
}
.title-2 {
  font-size: 20px;
}

.box-wrap {
  width: 80vw;
  height: 60vh;
  perspective: 1000px;
  // background-color: rgb(255, 162, 162);
  transform-style: preserve-3d;
  transform-origin: 0 0;
  position: relative;
  user-select: none;
}
.box {
  --X: 0;
  --Y: 0;
  position: relative;
  width: 100%;
  height: 100%;

  // height: 500px;
  // background-color: rgb(227, 238, 132);
  transform-style: preserve-3d;
  transform: rotateX(var(--X)) rotateY(var(--Y));
  transition: all 0.5s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
}

.img {
  height: 75%;
  user-select: none;
}

.toHomeBtn {
  border: 2px solid black;
  cursor: pointer;
  margin-top: 1vh;
  &:hover {
    color: $theme-color;
  }
}
</style>
