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
        <div class="music-details-progress-box">
          <ProgressBar
            :direction="'row'"
            :progress="progress"
            @changeProgress="changeProgress"
          ></ProgressBar>
        </div>
      </div>
    </div>

    <div class="music-ctrl-bar">
      <div
        @mouseover="() => (showVolumeCtrl = true)"
        @mouseleave="() => (showVolumeCtrl = false)"
        class="music-btn music-volume"
      >
        音
        <div v-if="showVolumeCtrl" class="music-volume-ctrl">
          <ProgressBar
            :progress="volumeP"
            @changeProgress="changeVolumeP"
            :direction="'column'"
          ></ProgressBar>
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
import { computed, onMounted, reactive, ref, watch } from "vue";
import ProgressBar from "./ProgressBar.vue";

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
// progressBar子组件修改progress
const changeProgress = (p: number) => {
  progress.value = p;
  // 修改player播放进度
  if (player.paused) {
    play(progress.value);
  }
  if (player.duration && player.currentTime) {
    player.currentTime = progress.value * 0.01 * player.duration;
  }
};

// 目前的音量百分比
const volumeP = ref(20);
// 实际的音量
const volume = computed(() => volumeP.value * 0.01 * 0.2);
// 修改音量
const changeVolumeP = (_v: number) => {
  // console.log("音量：", volume.value);
  volumeP.value = _v;
};
// 修改player的真实音量
watch(volume, (_v) => {
  player.volume = _v;
});

const showVolumeCtrl = ref(false);
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

// 切换currentSong歌曲
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
    progress.value = (player.currentTime / player.duration) * 100;
  }
};

// 定时器id
let intervalId = 0;

const play = (_p?: number) => {
  // 播放
  // console.log("toggle play");
  player.play();
  isPlaying.value = true;
  currentSong.time = player.duration;
  if (_p) {
    // 如果传入的progress就跳到对应进度
    player.currentTime = _p * 0.01 * player.duration;
  }
  // console.log(player.duration);

  if (intervalId != 0) {
    clearInterval(intervalId);
    intervalId = 0;
  }
  intervalId = setInterval(progressInterval, 1000);
};

const pause = () => {
  // 暂停
  // console.log("pause song");
  player.pause();
  isPlaying.value = false;
  clearInterval(intervalId);
  intervalId = 0;
};

// 点击按钮播放或暂停
const togglePlay = () => {
  if (!isPlaying.value && player.src) {
    play();
  } else if (isPlaying.value) {
    pause();
  }
};

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
    .music-details-progress-box {
      width: 90%;
      height: 16px;
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
  .music-volume {
    position: relative;
    z-index: 3;
    .music-volume-ctrl {
      position: absolute;
      top: -100px;
      box-shadow: 0px 0px 6px 2px rgba(128, 128, 128, 0.367);
      @include bg-color($w-bg-color); // border: 1px solid black;
      width: 30px;
      height: 100px;
      box-sizing: border-box;
      padding-top: 10px;
      padding-bottom: 10px;
      z-index: 2;
    }
  }
  .music-toggle {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
  }
}

// 移动端
@media screen and (max-width: 950px) {
  .music-player {
    right: 0px;
    bottom: 0px;
    width: 100vw;
    height: 80px;
  }
}

// pc端
@media screen and (min-width: 950px) {
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
