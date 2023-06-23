<template>
  <div class="music-player">
    <div class="music-top-box">
      <div class="close-music-btn" @click="onClickClose">X</div>
      <div v-show="!showDetails" class="music-list">
        <div class="playlist-title">播放列表</div>
        <div class="playlist-wrap">
          <div
            v-for="song in songList"
            class="playlist-item"
            :key="song._id"
            @click="onClickSonglistItem(song)"
          >
            <div v-if="song._id == currentSong._id" class="playlist-item-current-icon">
              {{ ">" }}
            </div>
            <div
              class="playlist-item-song-name"
              :class="{ 'playlist-item-current': song._id == currentSong._id }"
            >
              {{ song.title }}
            </div>
            <div class="playlist-item-singer-name">
              {{ song.artist }}
            </div>
          </div>
        </div>
      </div>

      <div class="music-details" :style="{ visibility: showDetails ? 'visible' : 'hidden' }">
        <div class="music-details-back" @click="() => (showDetails = false)">{{ "<" }}</div>
        <div
          class="music-details-image playing-spin"
          :style="{ 'animation-play-state': isPlaying ? 'running' : 'paused' }"
        >
          <img class="music-details-image-img" :src="currentSong.coverLink" />
        </div>
        <div class="music-details-song-name">{{ currentSong.title }}</div>
        <div class="music-details-singer-name">{{ currentSong.artist }}</div>
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
        <!-- <ProgressBar :player="player" :progress="progress"></ProgressBar> -->
      </div>
    </div>

    <div class="music-ctrl-bar">
      <div class="music-btn music-volume">
        音
        <div class="music-volume-ctrl">
          <div></div>
        </div>
      </div>
      <div class="music-btn music-prev-song">←</div>
      <div class="music-btn music-toggle" @click="togglePlay">{{ isPlaying ? "P" : "N" }}</div>
      <div class="music-btn music-next-song">→</div>
      <div class="music-btn music-list-mode">循</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from "vue";
// import ProgressBar from "./ProgressBar.vue";

interface Song {
  _id: number;
  title: string;
  artist: string;
  coverLink: string;
  link: string;
  time: number;
}

const emit = defineEmits(["closePlayer"]);
// 关闭
const onClickClose = () => {
  emit("closePlayer");
};

// 所有歌曲列表
const songList = reactive<Song[]>([
  {
    _id: 1,
    title: "Let It Out Let It Out Let It Out Let It Out",
    artist: "陈奕迅陈奕迅陈奕迅陈奕迅陈奕迅陈奕迅陈奕迅陈奕迅陈奕迅",
    coverLink: "/songs/陈奕迅 - Let It Out.jpg",
    link: "/songs/陈奕迅 - Let It Out.mp3",
    time: 0
  },
  {
    _id: 2,
    title: "Let It Out 2",
    artist: "陈奕迅2",
    coverLink: "/songs/陈奕迅 - Let It Out.jpg",
    link: "/songs/陈奕迅 - Let It Out.mp3",
    time: 0
  },
  {
    _id: 3,
    title: "Let It Out",
    artist: "陈奕迅",
    coverLink: "/songs/陈奕迅 - Let It Out.jpg",
    link: "/songs/陈奕迅 - Let It Out.mp3",
    time: 0
  },
  {
    _id: 4,
    title: "Let It Out 2",
    artist: "陈奕迅2",
    coverLink: "/songs/陈奕迅 - Let It Out.jpg",
    link: "/songs/陈奕迅 - Let It Out.mp3",
    time: 0
  },
  {
    _id: 5,
    title: "Let It Out",
    artist: "陈奕迅",
    coverLink: "/songs/陈奕迅 - Let It Out.jpg",
    link: "/songs/陈奕迅 - Let It Out.mp3",
    time: 0
  },
  {
    _id: 6,
    title: "Let It Out 2",
    artist: "陈奕迅2",
    coverLink: "/songs/陈奕迅 - Let It Out.jpg",
    link: "/songs/陈奕迅 - Let It Out.mp3",
    time: 0
  },
  {
    _id: 7,
    title: "Let It Out",
    artist: "陈奕迅",
    coverLink: "/songs/陈奕迅 - Let It Out.jpg",
    link: "/songs/陈奕迅 - Let It Out.mp3",
    time: 0
  },
  {
    _id: 8,
    title: "Let It Out 2",
    artist: "陈奕迅2",
    coverLink: "/songs/陈奕迅 - Let It Out.jpg",
    link: "/songs/陈奕迅 - Let It Out.mp3",
    time: 0
  },
  {
    _id: 9,
    title: "Let It Out",
    artist: "陈奕迅",
    coverLink: "/songs/陈奕迅 - Let It Out.jpg",
    link: "/songs/陈奕迅 - Let It Out.mp3",
    time: 0
  },
  {
    _id: 10,
    title: "Let It Out 2",
    artist: "陈奕迅2",
    coverLink: "/songs/陈奕迅 - Let It Out.jpg",
    link: "/songs/陈奕迅 - Let It Out.mp3",
    time: 0
  }
]);

// 显示list还是details
const showDetails = ref(true);

// 是否正在播放
const isPlaying = ref(false);

// 正在播放/待播放的歌曲
const currentSong = reactive<Song>({ ...songList[0] });

// 目前的播放进度百分比
const progress = ref(0);

// 目前的音量
const volume = ref(0.2);

// 目前的播放模式 1单曲循环，2列表循环，3随机播放
// const listMode = ref(1);

// audio player DOM
const player = reactive(new Audio());

// 初始化player
const initPlayer = () => {
  // 设置audio player
  player.autoplay = false;
  player.preload = "auto";
  player.volume = volume.value;

  loadSong();
};

// 加载currentSong歌曲到player
const loadSong = () => {
  progress.value = 0;
  player.src = currentSong.link; // 加载链接
  player.currentTime = 0; // 播放进度置零
  currentSong.time = player.duration; // 置时长
};

const chagneCurrentSong = (song: Song) => {
  if (song.link) {
    currentSong._id = song._id;
    currentSong.artist = song.artist;
    currentSong.coverLink = song.coverLink;
    currentSong.link = song.link;
    currentSong.time = song.time;
    currentSong.title = song.title;
  }
};

onMounted(() => {
  initPlayer();
});

// --
// 播放时定时计算progress
const progressInterval = () => {
  if (player.currentTime) {
    // console.log("playing", player.currentTime);
    progress.value = (player.currentTime / player.duration) * 100;

    const fullPosi = progressBar.value.clientWidth - 6;
    offsetPosi.value = fullPosi * progress.value * 0.01 - 3;
    console.log("playing", progress.value, offsetPosi.value);
  }
};

let intervalId = 0;

const play = () => {
  // 播放
  console.log("toggle play");
  player.play();
  isPlaying.value = true;
  currentSong.time = player.duration;
  // console.log(player.duration);

  intervalId = setInterval(progressInterval, 400);
  // player.oncanplaythrough = () => {
  //   console.log("play song");
  //   player.play();
  //   isPlaying.value = true;
  // };
};

const pause = () => {
  // 暂停
  console.log("pause song");
  player.pause();
  isPlaying.value = false;
  clearInterval(intervalId);
};

// 点击播放
const togglePlay = () => {
  if (!isPlaying.value && player.src) {
    play();
  } else if (isPlaying.value) {
    pause();
  }
};

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
  if (player.duration) {
    player.currentTime = progress.value * 0.01 * player.duration;
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
    if (player.duration) {
      player.currentTime = progress.value * 0.01 * player.duration;
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

// 显示details，如果id不同则切换歌曲
const onClickSonglistItem = (song: Song) => {
  showDetails.value = true;
  if (currentSong._id === song._id) {
    // 同一首歌
  } else {
    chagneCurrentSong(song);
    loadSong();
    play();
  }
};

onUnmounted(() => {
  document.removeEventListener("mousemove", onMouseMoveDrag);
  document.removeEventListener("mouseup", onMouseUpDrag);
});
</script>

<style scoped lang="scss">
.music-player {
  position: fixed;
  display: flex;
  flex-direction: column;
  @include bg-color($w-bg-color);
  // background-color: rgb(238, 150, 150);
  // border: 2px solid rgb(83, 83, 83);
  box-sizing: border-box;
  border-radius: 14px;
  overflow: hidden;
  z-index: 20;
  // box-shadow: 0px 0px 5px 4px $theme-color-light;
  box-shadow: 6px 6px 6px 0.1px rgba(255, 49, 49, 0.2), -6px -6px 6px 0.1px rgba(238, 255, 49, 0.2);
  // box-shadow: ;
  // box-shadow: 10px 10px 5px 4px rgb(254, 99, 99);
  // box-shadow: 0px 0px 5px 4px
  //   linear-gradient(
  //     360deg,
  //     rgb(254, 99, 99) 0%,
  //     rgb(251, 192, 80) 50%,
  //     rgb(1, 190, 102) 80%,
  //     rgb(44, 23, 84) 100%
  //   );
}

.music-top-box {
  flex-grow: 1;
  width: 100%;
  height: auto;
  overflow: hidden;
  position: relative;
  .close-music-btn {
    position: absolute;
    right: 0px;
    top: 0px;
    width: 30px;
    height: 30px;
    background-color: $theme-color;
    @include f-c;
    cursor: pointer;
    z-index: 3;
  }

  .music-list {
    width: 100%;
    height: 100%;
    max-height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    overflow-x: hidden;
    scrollbar-width: 0;
    .playlist-title {
      height: 40px;
      width: 100%;
      // background-color: rgb(165, 255, 165);
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      padding-left: 20px;
      user-select: none;
    }

    .playlist-wrap {
      // flex-grow: 1;
      width: 100%;
      height: 100%;
      max-height: 100%;
      // background-color: rgb(115, 115, 255);
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      overflow-y: scroll;
      .playlist-item {
        width: 100%;
        display: flex;
        flex-shrink: 0;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        height: 38px;
        box-sizing: border-box;
        padding: 0;
        padding-left: 10%;
        padding-right: 4%;
        position: relative;
        cursor: pointer;
        @include bg-color($w-bg-color);

        &:nth-child(even) {
          @include page-bg-color($w-page-bg-color);
        } //偶数行

        .playlist-item-current-icon {
          position: absolute;
          left: 6px;
          width: 16px;
          height: 16px;
          background-color: $theme-color;
          @include f-c;
        }

        .playlist-item-song-name {
          width: 60%;
          font-size: 14px;
          @include ellipse-n-line(1);
          transition: color 0.2s ease;
          &:hover {
            color: $theme-color;
          }
        }
        .playlist-item-singer-name {
          max-width: 35%;
          font-size: 13px;
          font-family: "";
          @include ellipse-n-line(1);
          @include font-color-light($w-font-color-light);
        }
        .playlist-item-current {
          color: $theme-color;
        }
      }
    }
    .playlist-wrap::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
  }
  .music-list::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }

  .music-details {
    width: 100%;
    height: 100%;
    // background-color: rgb(255, 255, 255);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    box-sizing: border-box;
    padding-top: 30px;
    .music-details-back {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 30px;
      height: 30px;
      background-color: $theme-color;
      cursor: pointer;
      @include f-c;
    }
    .music-details-image {
      height: 7vw;
      width: 7vw;
      // background-color: red;
      // border: 2px solid black;
      @include border-full-color;
      border-radius: 50%;
      overflow: hidden;
      .music-details-image-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .playing-spin {
      animation: spin 8s infinite linear;
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      50% {
        transform: rotate(180deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    .music-details-song-name {
      margin-top: 0.6vw;
      margin-bottom: 0.4vw;
      max-width: 60%;
      @include ellipse-n-line(1);
    }
    .music-details-singer-name {
      color: grey;
      font-family: "";
      font-size: 14px;
      max-width: 60%;
      @include ellipse-n-line(1);
    }
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
  }
}

.music-ctrl-bar {
  width: 100%;
  height: 80px;
  flex-grow: 0;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  // border: 1px solid black;
  box-sizing: border-box;
  user-select: none;
  @include bg-color($w-bg-color);
  .music-btn {
    width: 30px;
    height: 30px;
    background-color: $theme-color-light;
    @include f-c;
    cursor: pointer;
  }
  .music-toggle {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
  }
}

// 移动端
@media screen and (max-width: 900px) {
  .music-player {
    right: 0px;
    bottom: 0px;
    width: 100vw;
    height: 80px;
  }
}

// pc端
@media screen and (min-width: 900px) {
  .music-player {
    right: 65px;
    bottom: 20px;
    width: 24vw;
    height: 26vw;

    max-width: 330px;
    min-width: 240px;
    max-height: 340px;
    min-height: 300px;
  }
}
</style>
