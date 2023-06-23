<template>
  <div class="music-details-progress-bar-wrap">
    <div
      @mousedown="onMouseDownDrag"
      @mouseover="onMouseOverDrag"
      @mouseleave="onMouseLeaveDrag"
      ref="progressBar"
      class="progress-bar-all"
    >
      <div class="progress-bar-played" :style="{ width: `${progress}%` }"></div>
    </div>
    <div
      ref="drag"
      class="progress-bar-btn"
      :style="{ left: `${offsetPosi}px`, transform: dragScale }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted, ref, toRefs } from "vue";

const props = defineProps<{
  progress: number;
  player: HTMLAudioElement;
}>();

const { progress, player } = toRefs(props);
// 进度条相关：

// 进度条ref，用来获取进度条px长度
const progressBar = ref();
// 进度条拖动ref
const drag = ref();
// mouse down 时 按钮的位置
const startPosi = ref(0);
// mouse move 时 按钮的位置
const offsetPosi = ref(0);
// 标记正在拖动
const isDraging = ref(false);
// 拖动 mouse down 时的位置
const startX = ref(0); // 相对client的
const clientX = ref(0);
// 拖动中 mouse move 的位置
const offsetX = ref(0);
// 按钮放大效果
const dragScale = ref("");

const btnWidth = 6;

// 按钮的位置范围是[0, 进度条-16]
const onMouseDownDrag = (e: MouseEvent) => {
  // 标记正在拖动，标记开始时鼠标和按钮的px位置
  // console.log("mouse down ", e);
  isDraging.value = true;
  startX.value = e.clientX;
  // console.log(startX.value);
  clientX.value = e.clientX;

  const fullPosi = progressBar.value.clientWidth - btnWidth;
  progress.value = (e.offsetX / fullPosi) * 100;
  progress.value = Math.max(progress.value, 0);
  progress.value = Math.min(progress.value, 100);

  // 开始位置
  startPosi.value = fullPosi * progress.value * 0.01 - btnWidth / 2; // -8 是为了按钮中间跟随鼠标
  startPosi.value = Math.max(startPosi.value, 0);
  startPosi.value = Math.min(startPosi.value, fullPosi);
  // 将按钮移动到点击位置
  offsetPosi.value = startPosi.value;
  // 修改player进度
  if (player.value.duration) {
    player.value.currentTime = progress.value * 0.01 * player.value.duration;
  }
};

const onMouseMoveDrag = (e: MouseEvent) => {
  // if (e.target === progressBar.value) {
  //   dragScale.value = "scale(2)";
  // }
  if (isDraging.value) {
    e.preventDefault();
    dragScale.value = "scale(2)";
    // 更新拖动相对px
    // console.log("move:e.clientX", e.clientX);
    console.dir(e);
    offsetX.value = e.clientX - startX.value;
    // console.log("offsetX.value ", offsetX.value);
    // 更新播放百分比和进度条位置
    // const len = progressBar.value.clientWidth;
    // console.log("len", len);
    // console.log(offsetX.value / len);
    const fullPosi = progressBar.value.clientWidth - btnWidth;
    // 更新按钮px位置
    offsetPosi.value = startPosi.value + offsetX.value;
    console.log("offsetPosi.value", offsetPosi.value);
    offsetPosi.value = Math.max(offsetPosi.value, 0);
    offsetPosi.value = Math.min(offsetPosi.value, fullPosi);

    // 更新progress进度
    progress.value = (offsetPosi.value / fullPosi) * 100;
    console.log("progress", progress.value);
    progress.value = Math.max(progress.value, 0);
    progress.value = Math.min(progress.value, 100);

    // 修改player进度
    if (player.value.duration) {
      player.value.currentTime = progress.value * 0.01 * player.value.duration;
    }
  }
};

const onMouseUpDrag = (e: MouseEvent) => {
  isDraging.value = false;
  if (e.target == progressBar.value) {
    dragScale.value = "scale(2)";
  } else {
    dragScale.value = "";
  }

  // console.log("mouse up 进度百分比", progress.value);
};

const onMouseOverDrag = () => {
  dragScale.value = "scale(2)";
};

const onMouseLeaveDrag = () => {
  dragScale.value = "";
};

document.addEventListener("mousemove", onMouseMoveDrag);
document.addEventListener("mouseup", onMouseUpDrag);

onUnmounted(() => {
  document.removeEventListener("mousemove", onMouseMoveDrag);
  document.removeEventListener("mouseup", onMouseUpDrag);
});
</script>

<Style scoped lang="scss">
.music-details-progress-bar-wrap {
  width: 90%;
  height: 16px;
  // background-color: antiquewhite;
  margin-top: 0.5vw;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  .progress-bar-all {
    width: 100%;
    height: 6px;

    overflow: visible;
    background-color: rgba(128, 128, 128, 0.314);
    cursor: pointer;
    position: relative;
    .progress-bar-played {
      height: 100%;
      width: 0%;
      background-color: $theme-color;
    }
  }
  .progress-bar-btn {
    position: absolute;
    left: 0px;
    // top: -5px;
    background-color: black;
    @include bg-color-reverse($w-bg-color-reverse);
    width: 6px;
    height: 6px;
    cursor: pointer;
    pointer-events: none;
    transition: transform 0.2s ease;
  }
}
</Style>
