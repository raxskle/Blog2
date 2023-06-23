<template>
  <div
    :class="{
      'music-details-progress-bar-wrap-r': direction !== 'column',
      'music-details-progress-bar-wrap-c': direction === 'column'
    }"
  >
    <div
      @mousedown="onMouseDownDrag"
      @mouseover="onMouseOverDrag"
      @mouseleave="onMouseLeaveDrag"
      ref="progressBar"
      :class="{
        'progress-bar-all-r': direction !== 'column',
        'progress-bar-all-c': direction === 'column'
      }"
    >
      <div
        :class="{
          'progress-bar-played-r': direction !== 'column',
          'progress-bar-played-c': direction === 'column'
        }"
        :style="playedStyle"
      ></div>
    </div>
    <div
      ref="drag"
      :class="{
        'progress-bar-btn-r': direction !== 'column',
        'progress-bar-btn-c': direction === 'column'
      }"
      :style="{
        bottom: direction === 'column' ? `${offsetPosi}px` : '',
        left: direction !== 'column' ? `${offsetPosi}px` : '',
        transform: `${dragScale}`
      }"
    ></div>
  </div>
</template>

<!-- 组件与父组件通信数据只有进度百分比 -->
<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, toRefs, watch } from "vue";

const props = defineProps<{
  progress: number;
  direction: "row" | "column";
}>();
const { progress, direction } = toRefs(props);

const emit = defineEmits(["changeProgress"]);
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
const btnHeight = 6;

const playedStyle = computed(() => {
  if (direction.value === "column") {
    return `height: ${progress.value}%;`;
  } else {
    return `width: ${progress.value}%;`;
  }
});

const limit = (num: number, max: number, min: number) => {
  let res = Math.max(num, min);
  res = Math.min(res, max);
  return res;
};

onMounted(() => {
  if (direction.value == "column") {
    const fullPosi = progressBar.value.clientHeight - btnHeight;
    offsetPosi.value = limit(fullPosi * progress.value * 0.01, fullPosi, 0);
  }
});

watch(progress, (newProgress) => {
  if (direction.value == "column") {
    const fullPosi = progressBar.value.clientHeight - btnHeight;
    offsetPosi.value = limit(fullPosi * newProgress * 0.01, fullPosi, 0);
  } else {
    const fullPosi = progressBar.value.clientWidth - btnWidth;
    offsetPosi.value = limit(fullPosi * newProgress * 0.01 - btnWidth / 2, fullPosi, 0);
  }
});

// 按钮的位置范围是[0, 进度条-16]
const onMouseDownDrag = (e: MouseEvent) => {
  if (direction.value === "column") {
    // 标记正在拖动，标记开始时鼠标和按钮的px位置
    isDraging.value = true;
    startX.value = e.clientY;
    clientX.value = e.clientY;

    const fullPosi = progressBar.value.clientHeight - btnHeight;
    const _p = limit((1 - e.offsetY / fullPosi) * 100, 100, 0);
    emit("changeProgress", _p); // 这玩意儿居然是异步的
    // 开始位置
    startPosi.value = limit(fullPosi - e.offsetY + btnHeight, fullPosi, 0);
    // 将按钮移动到点击位置
    offsetPosi.value = startPosi.value;
  } else if (direction.value === "row") {
    // 标记正在拖动，标记开始时鼠标和按钮的px位置
    isDraging.value = true;
    startX.value = e.clientX;
    clientX.value = e.clientX;

    const fullPosi = progressBar.value.clientWidth - btnWidth;
    const _p = limit((e.offsetX / fullPosi) * 100, 100, 0);
    emit("changeProgress", _p); // 这玩意儿居然是异步的

    // 开始位置
    startPosi.value = limit(e.offsetX - btnWidth / 2, fullPosi, 0);
    // 将按钮移动到点击位置
    offsetPosi.value = startPosi.value;
  }
};

const onMouseMoveDrag = (e: MouseEvent) => {
  if (direction.value === "column") {
    if (isDraging.value) {
      e.preventDefault();
      dragScale.value = "scale(2)";
      // 更新拖动相对px
      offsetX.value = -(e.clientY - startX.value);

      // 更新播放百分比和进度条位置
      const fullPosi = progressBar.value.clientHeight - btnHeight;

      // 更新按钮px位置
      offsetPosi.value = limit(startPosi.value + offsetX.value, fullPosi, 0);
      // 更新progress进度
      const _p = limit((offsetPosi.value / fullPosi) * 100, 100, 0);
      emit("changeProgress", _p);
    }
  } else {
    if (isDraging.value) {
      e.preventDefault();
      dragScale.value = "scale(2)";
      // 更新拖动相对px
      offsetX.value = e.clientX - startX.value;
      // 更新播放百分比和进度条位置
      const fullPosi = progressBar.value.clientWidth - btnWidth;

      // 更新按钮px位置
      offsetPosi.value = limit(startPosi.value + offsetX.value, fullPosi, 0);
      // 更新progress进度
      const _p = limit((offsetPosi.value / fullPosi) * 100, 100, 0);
      emit("changeProgress", _p);
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
.music-details-progress-bar-wrap-r {
  width: 100%;
  height: 100%;
  // background-color: antiquewhite;
  margin-top: 0.5vw;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  .progress-bar-all-r {
    width: 100%;
    height: 6px;

    overflow: visible;
    background-color: rgba(128, 128, 128, 0.314);
    cursor: pointer;
    position: relative;
    .progress-bar-played-r {
      height: 100%;
      width: 0%;
      background-color: $theme-color;
      pointer-events: none;
    }
  }
  .progress-bar-btn-r {
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

.music-details-progress-bar-wrap-c {
  width: 100%;
  height: 100%;
  // background-color: antiquewhite;
  // margin-top: 0.5vw;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  .progress-bar-all-c {
    width: 6px;
    height: 100%;

    overflow: visible;
    background-color: rgba(128, 128, 128, 0.314);
    cursor: pointer;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    .progress-bar-played-c {
      height: 0%;
      width: 100%;
      background-color: $theme-color;
      pointer-events: none;
    }
  }
  .progress-bar-btn-c {
    position: absolute;
    bottom: 0px;
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
