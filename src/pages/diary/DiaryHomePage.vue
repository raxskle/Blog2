<template>
  <main class="diary-page">
    <div class="flickity-slider">
      <div
        class="flickity-all"
        :style="{ transform: `translateX(${sliderX}px)`, transition: sliderTransition }"
        @mousedown="onMouseDownSlider"
        @mousemove="onMouseMoveSlider"
        @mouseup="onMouseUpSlider"
        @touchstart="onTouchStartSlider"
        @touchmove="onTouchMoveSlider"
        @touchend="onTouchEndSlider"
        @click.prevent=""
      >
        <PostHeader
          :time="'2023/6/23'"
          :title="'标题标题1'"
          :content="'一段文本一段文本一段文本一段文本一段文本'"
        ></PostHeader>
        <PostHeader
          :time="'2023/6/23'"
          :title="'标题标题2'"
          :content="'一段文本一段文本一段文本一段文本一段文本'"
        >
        </PostHeader>
        <PostHeader
          :time="'2023/6/23'"
          :title="'标题标题1'"
          :content="'一段文本一段文本一段文本一段文本一段文本'"
        ></PostHeader>
        <PostHeader
          :time="'2023/6/23'"
          :title="'标题标题2'"
          :content="'一段文本一段文本一段文本一段文本一段文本'"
        >
        </PostHeader>
      </div>
    </div>

    <PostItem></PostItem>
    <PostItem></PostItem>
    <PostItem></PostItem>
    <PostItem></PostItem>

    <div class="load-more-btn"></div>

    <div></div>
    <PageTail></PageTail>
  </main>
</template>

<script setup lang="ts">
import PostItem from "@/components/diary/PostItem.vue";
import PageTail from "@/components/PageTail.vue";
import PostHeader from "@/components/diary/PostHeader.vue";

import { ref } from "vue";

const clientWidth = window.innerWidth;
console.log(clientWidth);

// slider的实际滑动位置
const sliderX = ref(-clientWidth);
// 本次mouse down时的slider位置
const startX = ref(-clientWidth);
// 是否鼠标按住
const grabing = ref(false);
// 是否移动端
const touching = ref(false);
// 本次拖拽的相对滑动距离
const distance = ref(0);
// 本次mouse down时的x位置
const startMouse = ref(0);

const sliderTransition = ref("");

function onMouseDownSlider(e: MouseEvent) {
  // 防止与移动端冲突
  if (!touching.value) {
    // 标记拖拽中
    grabing.value = true;
    // 记录鼠标开始位置
    startMouse.value = e.clientX;
    // 取消slider的滑动动画
    sliderTransition.value = "";

    // 防止滑过位置的关键：
    // 如果在第一和第四张拖拽，直接变为第三和第二
    if (sliderX.value > -1 * clientWidth) {
      sliderX.value -= 2 * clientWidth;
    } else if (sliderX.value < -2 * clientWidth) {
      sliderX.value += 2 * clientWidth;
    }
    // 记录原本silderX的位置
    startX.value = sliderX.value;
  }
}

function onMouseMoveSlider(e: MouseEvent) {
  // 防止与移动端冲突
  if (grabing.value && !touching.value) {
    // 记录当前拖拽距离
    distance.value = e.clientX - startMouse.value;
    // 使slider跟随
    sliderX.value = startX.value + distance.value;
  }
}

function onMouseUpSlider() {
  // 标记取消拖拽
  grabing.value = false;
  // 防止与移动端冲突
  if (!touching.value) {
    // 防止超出范围
    if (sliderX.value >= 0) {
      sliderX.value = 0;
    } else if (sliderX.value <= -3 * clientWidth) {
      sliderX.value = -3 * clientWidth;
    }
    // 松手时判断是否切换
    else if (sliderX.value - startX.value >= 150) {
      sliderX.value = startX.value + clientWidth;
    } else if (sliderX.value - startX.value <= -150) {
      sliderX.value = startX.value - clientWidth;
    } else {
      sliderX.value = startX.value;
    }

    // console.log("最终slider位置", sliderX.value);
    // 等slider自己滑回去
    sliderTransition.value = "all 0.2s ease";

    setTimeout(() => {
      // 取消滑动效果，悄悄移动
      sliderTransition.value = "";
      // 切换后如果是1变为3，如果是4变为2
      if (sliderX.value === 0) {
        sliderX.value = -2 * clientWidth;
      } else if (sliderX.value === -3 * clientWidth) {
        sliderX.value = -1 * clientWidth;
      }
    }, 200);
  }
}

function onTouchStartSlider(e: TouchEvent) {
  // 阻止默认事件
  e.preventDefault();
  // 标记移动端拖拽中
  touching.value = true;
  // 记录touch开始位置
  startMouse.value = e.targetTouches[0].clientX;
  // 取消slider的滑动动画
  sliderTransition.value = "";

  // 防止滑过位置的关键：
  // 如果在第一和第四张拖拽，直接变为第三和第二
  if (sliderX.value > -1 * clientWidth) {
    sliderX.value -= 2 * clientWidth;
  } else if (sliderX.value < -2 * clientWidth) {
    sliderX.value += 2 * clientWidth;
  }
  // 记录原本silderX的位置
  startX.value = sliderX.value;
}

function onTouchMoveSlider(e: TouchEvent) {
  // 阻止默认事件
  e.preventDefault();
  if (touching.value) {
    // 记录当前拖拽距离
    distance.value = e.targetTouches[0].clientX - startMouse.value;
    // 使slider跟随
    sliderX.value = startX.value + distance.value;
  }
}

function onTouchEndSlider(e: TouchEvent) {
  e.preventDefault();
  // 标记取消拖拽
  touching.value = false;

  // 防止超出范围
  if (sliderX.value >= 0) {
    sliderX.value = 0;
  } else if (sliderX.value <= -3 * clientWidth) {
    sliderX.value = -3 * clientWidth;
  }
  // 松手时判断是否切换
  else if (sliderX.value - startX.value >= 150) {
    sliderX.value = startX.value + clientWidth;
  } else if (sliderX.value - startX.value <= -150) {
    sliderX.value = startX.value - clientWidth;
  } else {
    sliderX.value = startX.value;
  }

  // console.log("最终slider位置", sliderX.value);
  // 等slider自己滑回去
  sliderTransition.value = "all 0.2s ease";

  setTimeout(() => {
    // 取消滑动效果，悄悄移动
    sliderTransition.value = "";
    // 切换后如果是1变为3，如果是4变为2
    if (sliderX.value === 0) {
      sliderX.value = -2 * clientWidth;
    } else if (sliderX.value === -3 * clientWidth) {
      sliderX.value = -1 * clientWidth;
    }
  }, 200);
}
</script>
<style scoped lang="scss">
.diary-page {
  width: 100%;
  min-height: 100vh;
  position: relative;
  color: $d-font-color;
  user-select: none;
}

.flickity-slider {
  width: 100vw;
  overflow-x: scroll;
  // background-color: rgb(243, 167, 167);
  // @include f-r;
}

.flickity-all {
  width: 400vw;
  height: 100%;
  @include f-r;
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
  // transition: all 0.3s ease;
}

.flickity-slider::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}

@media screen and (max-width: 500px) {
  .flickity-slider {
    height: 100vh;
  }
}

@media screen and (min-width: 500px) and (max-width: 1000px) {
  .flickity-slider {
    height: 140vh;
  }
}

@media screen and (min-width: 1000px) {
  .flickity-slider {
    height: 100vh;
  }
}
</style>
