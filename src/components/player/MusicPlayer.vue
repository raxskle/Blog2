<template>
  <div class="music-player">
    <div v-show="showTopBox" class="music-top-box">
      <div class="music-list-mode-mobile" @click="onClickChangeMode">
        <svg v-if="listMode === 0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            d="M8 19.9999V21.9323C8 22.2085 7.77614 22.4323 7.5 22.4323C7.38303 22.4323 7.26977 22.3913 7.17991 22.3165L3.06093 18.884C2.84879 18.7072 2.82013 18.3919 2.99691 18.1798C3.09191 18.0658 3.23264 17.9999 3.38103 17.9999L18 17.9999C19.1046 17.9999 20 17.1044 20 15.9999V7.99987H22V15.9999C22 18.209 20.2091 19.9999 18 19.9999H8ZM16 2.06738C16 1.79124 16.2239 1.56738 16.5 1.56738C16.617 1.56738 16.7302 1.60839 16.8201 1.68327L20.9391 5.11575C21.1512 5.29253 21.1799 5.60782 21.0031 5.81995C20.9081 5.93395 20.7674 5.99986 20.619 5.99986L6 5.99987C4.89543 5.99987 4 6.89531 4 7.99987V15.9999H2V7.99987C2 5.79074 3.79086 3.99987 6 3.99987H16V2.06738ZM11 7.99987H13V15.9999H11V9.99987H9V8.99987L11 7.99987Z"
          ></path>
        </svg>
        <svg v-if="listMode === 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            d="M8 19.9999V21.9323C8 22.2085 7.77614 22.4323 7.5 22.4323C7.38303 22.4323 7.26977 22.3913 7.17991 22.3165L3.06093 18.884C2.84879 18.7072 2.82013 18.3919 2.99691 18.1798C3.09191 18.0658 3.23264 17.9999 3.38103 17.9999L18 17.9999C19.1046 17.9999 20 17.1044 20 15.9999V7.99987H22V15.9999C22 18.209 20.2091 19.9999 18 19.9999H8ZM16 3.99987V2.06738C16 1.79124 16.2239 1.56738 16.5 1.56738C16.617 1.56738 16.7302 1.60839 16.8201 1.68327L20.9391 5.11575C21.1512 5.29253 21.1799 5.60782 21.0031 5.81995C20.9081 5.93395 20.7674 5.99986 20.619 5.99986L6 5.99987C4.89543 5.99987 4 6.89531 4 7.99987V15.9999H2V7.99987C2 5.79074 3.79086 3.99987 6 3.99987H16Z"
          ></path>
        </svg>
        <svg v-if="listMode === 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            d="M18 17.8832V16L23 19L18 22V19.9095C14.9224 19.4698 12.2513 17.4584 11.0029 14.5453L11 14.5386L10.9971 14.5453C9.57893 17.8544 6.32508 20 2.72483 20H2V18H2.72483C5.52503 18 8.05579 16.3312 9.15885 13.7574L9.91203 12L9.15885 10.2426C8.05579 7.66878 5.52503 6 2.72483 6H2V4H2.72483C6.32508 4 9.57893 6.14557 10.9971 9.45473L11 9.46141L11.0029 9.45473C12.2513 6.5416 14.9224 4.53022 18 4.09051V2L23 5L18 8V6.11684C15.7266 6.53763 13.7737 8.0667 12.8412 10.2426L12.088 12L12.8412 13.7574C13.7737 15.9333 15.7266 17.4624 18 17.8832Z"
          ></path>
        </svg>
      </div>
      <div class="close-music-btn" @click="onClickClose">
        <svg
          width="800px"
          height="800px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M19.207 6.207a1 1 0 0 0-1.414-1.414L12 10.586 6.207 4.793a1 1 0 0 0-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 1 0 1.414 1.414L12 13.414l5.793 5.793a1 1 0 0 0 1.414-1.414L13.414 12l5.793-5.793z"
            fill="#000000"
          />
        </svg>
      </div>
      <div v-show="!showDetails" class="music-list">
        <div class="playlist-title">播放列表</div>
        <div class="playlist-wrap">
          <div
            v-for="song in songList"
            class="playlist-item"
            :key="song._id"
            @click="onClickSonglistItem(song)"
            :class="{ 'playlist-item-current': song._id == currentSong._id }"
          >
            <div v-if="song._id == currentSong._id" class="playlist-item-current-icon">
              {{ ">" }}
            </div>
            <div class="playlist-item-song-name">
              {{ song.title }}
            </div>
            <div class="playlist-item-singer-name">
              {{ song.artist }}
            </div>
          </div>
        </div>
      </div>

      <div
        @touchmove.prevent=""
        class="music-details"
        :style="{ visibility: showDetails ? 'visible' : 'hidden' }"
      >
        <div class="music-details-back" @click="() => (showDetails = false)">
          <svg
            width="800px"
            height="800px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2.407 13.058a1.495 1.495 0 0 1 0-2.116L8.04 5.3c.39-.39 1.03-.39 1.42 0 .39.39.39 1.02 0 1.41L6.744 9.427a9.992 9.992 0 0 1-1.768 1.406l-.342.214.208.207A10 10 0 0 1 7.082 11h13.92a1 1 0 1 1 0 2H7.083a10 10 0 0 1-2.24-.254l-.208.207.342.214c.641.4 1.233.872 1.768 1.406L9.46 17.29c.39.39.39 1.02 0 1.41-.39.39-1.03.39-1.42 0l-5.633-5.642z"
              fill="#000000"
            />
          </svg>
        </div>
        <div
          class="music-details-image playing-spin"
          :style="{ 'animation-play-state': isPlaying ? 'running' : 'paused' }"
        >
          <img class="music-details-image-img" :src="currentSong.coverLink" />
        </div>
        <div class="music-details-song-name">{{ currentSong.title }}</div>
        <div class="music-details-singer-name">{{ currentSong.artist }}</div>
        <div class="music-details-progress-wrap">
          <div class="music-details-progress-box">
            <ProgressBar
              :direction="'row'"
              :progress="progress"
              @changeProgress="changeProgress"
            ></ProgressBar>
          </div>
          <div class="music-details-progress-time-bar">
            <div class="progress-time-current">
              {{ isNaN(currentSong.time) ? "" : formatTime(currentSong.time * progress * 0.01) }}
            </div>
            <div class="progress-time-total">
              {{ isNaN(currentSong.time) ? "" : formatTime(currentSong.time) }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="music-ctrl-bar">
      <div
        @mouseover="() => (showVolumeCtrl = true)"
        @mouseleave="() => (showVolumeCtrl = false)"
        class="music-btn music-volume"
      >
        <svg
          version="1.0"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="800px"
          height="800px"
          viewBox="0 0 64 64"
          enable-background="new 0 0 64 64"
          xml:space="preserve"
        >
          <g>
            <path
              fill="#231F20"
              d="M59.998,28.001h-7.999c-2.211,0-4,1.789-4,4s1.789,4,4,4h7.999c2.211,0,4-1.789,4-4
		S62.209,28.001,59.998,28.001z"
            />
            <path
              fill="#231F20"
              d="M49.71,19.466l6.929-4c1.914-1.105,2.57-3.551,1.461-5.465c-1.102-1.914-3.547-2.57-5.46-1.465l-6.93,4
		c-1.914,1.105-2.57,3.551-1.461,5.464C45.351,19.915,47.796,20.571,49.71,19.466z"
            />
            <path
              fill="#231F20"
              d="M56.639,48.535l-6.929-3.999c-1.914-1.105-4.355-0.449-5.461,1.464c-1.105,1.914-0.453,4.359,1.461,5.465
		l6.93,4c1.913,1.105,4.358,0.449,5.464-1.465S58.553,49.641,56.639,48.535z"
            />
            <path
              fill="#231F20"
              d="M37.53,0.307c-1.492-0.625-3.211-0.277-4.359,0.867L18.343,16.001H4c-2.211,0-4,1.789-4,4v24
		C0,46.211,1.789,48,4,48h14.343l14.828,14.828C33.937,63.594,34.96,64,35.999,64c0.516,0,1.035-0.098,1.531-0.305
		c1.496-0.617,2.469-2.078,2.469-3.695V4.001C39.999,2.384,39.026,0.924,37.53,0.307z"
            />
          </g>
        </svg>
        <div v-if="showVolumeCtrl" class="music-volume-ctrl">
          <ProgressBar
            :progress="volumeP"
            @changeProgress="changeVolumeP"
            :direction="'column'"
          ></ProgressBar>
        </div>
      </div>
      <div class="music-btn music-prev-song" @click="onClickPrevSong">
        <svg
          viewBox="0 0 600 600"
          version="1.1"
          id="svg9724"
          sodipodi:docname="back.svg"
          inkscape:version="1.2.2 (1:1.2.2+202212051550+b0a8486541)"
          width="600"
          height="600"
          xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
          xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:svg="http://www.w3.org/2000/svg"
        >
          <defs id="defs9728" />

          <g
            id="g10449"
            transform="matrix(0.95173205,0,0,0.95115787,13.901174,12.168794)"
            style="stroke-width: 1.05103"
          >
            <g
              id="path10026"
              inkscape:transform-center-x="-0.59233046"
              inkscape:transform-center-y="-20.347403"
              transform="matrix(1.3807551,0,0,1.2700888,273.60014,263.99768)"
            />
            <g
              id="g11314"
              transform="matrix(1.5092301,0,0,1.3955555,36.774048,-9.4503933)"
              style="stroke-width: 50.6951"
            />
            <path
              style="
                color: #000000;
                fill: #000000;
                stroke-linecap: round;
                stroke-linejoin: round;
                -inkscape-stroke: none;
                paint-order: stroke fill markers;
              "
              d="m 90.466801,-12.792969 c 36.277529,0 64.405259,24.022117 80.667969,51.148438 16.2627,27.126321 24.40429,60.141321 24.40429,96.027341 v 336.45703 c 0,35.88603 -8.14159,68.90103 -24.40429,96.02735 -16.26271,27.12632 -44.39044,51.14844 -80.667969,51.14843 -36.27754,10e-6 -64.40527,-24.02211 -80.66797,-51.14843 -16.2627,-27.12632 -24.4043,-60.14132 -24.4043,-96.02735 V 134.38281 c 0,-35.88602 8.1416,-68.90102 24.4043,-96.027341 16.2627,-27.126321 44.39043,-51.148438 80.66797,-51.148438 z"
              id="rect528"
              sodipodi:nodetypes="sssssssssss"
            />
            <path
              style="
                color: #000000;
                fill: #000000;
                stroke-linecap: round;
                stroke-linejoin: round;
                -inkscape-stroke: none;
              "
              d="m 577.62305,-12.617188 c 21.63744,1.986691 38.197,20.1328701 38.20117,41.861329 V 575.97852 c -0.003,15.95776 -9.03992,30.53831 -23.32949,37.6417 -14.28958,7.10339 -31.36881,5.50515 -44.09239,-4.12608 L 187.43164,336.12695 c -22.21061,-16.82418 -22.21061,-50.20707 0,-67.03125 L 548.40234,-4.2714844 c 8.3591,-6.3276786 18.78063,-9.3041646 29.22071,-8.3457036 z"
              id="path584"
              sodipodi:nodetypes="cccsccccc"
            />
          </g>
        </svg>
      </div>
      <div class="music-btn music-toggle" @click="togglePlay">
        <svg
          v-if="!isPlaying"
          width="800px"
          height="800px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.286 3.407A1.5 1.5 0 0 0 6 4.684v14.632a1.5 1.5 0 0 0 2.286 1.277l11.888-7.316a1.5 1.5 0 0 0 0-2.555L8.286 3.407z"
            fill="#000000"
          />
        </svg>
        <svg
          v-if="isPlaying"
          width="800px"
          height="800px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5.163 3.819C5 4.139 5 4.559 5 5.4v13.2c0 .84 0 1.26.163 1.581a1.5 1.5 0 0 0 .656.655c.32.164.74.164 1.581.164h.2c.84 0 1.26 0 1.581-.163a1.5 1.5 0 0 0 .656-.656c.163-.32.163-.74.163-1.581V5.4c0-.84 0-1.26-.163-1.581a1.5 1.5 0 0 0-.656-.656C8.861 3 8.441 3 7.6 3h-.2c-.84 0-1.26 0-1.581.163a1.5 1.5 0 0 0-.656.656zm9 0C14 4.139 14 4.559 14 5.4v13.2c0 .84 0 1.26.164 1.581a1.5 1.5 0 0 0 .655.655c.32.164.74.164 1.581.164h.2c.84 0 1.26 0 1.581-.163a1.5 1.5 0 0 0 .655-.656c.164-.32.164-.74.164-1.581V5.4c0-.84 0-1.26-.163-1.581a1.5 1.5 0 0 0-.656-.656C17.861 3 17.441 3 16.6 3h-.2c-.84 0-1.26 0-1.581.163a1.5 1.5 0 0 0-.655.656z"
            fill="#000000"
          />
        </svg>
      </div>
      <div class="music-btn music-next-song" @click="onClickNextSong">
        <svg
          viewBox="0 0 600 600"
          version="1.1"
          id="svg9724"
          sodipodi:docname="forward.svg"
          inkscape:version="1.2.2 (1:1.2.2+202212051550+b0a8486541)"
          width="600"
          height="600"
          xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
          xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:svg="http://www.w3.org/2000/svg"
        >
          <defs id="defs9728" />

          <g
            id="g10449"
            transform="matrix(0.95173205,0,0,0.95115787,13.901174,12.168794)"
            style="stroke-width: 1.05103"
          >
            <g
              id="path10026"
              inkscape:transform-center-x="-0.59233046"
              inkscape:transform-center-y="-20.347403"
              transform="matrix(1.3807551,0,0,1.2700888,273.60014,263.99768)"
            />
            <g
              id="g11314"
              transform="matrix(1.5092301,0,0,1.3955555,36.774048,-9.4503933)"
              style="stroke-width: 50.6951"
            />
            <path
              style="
                color: #000000;
                fill: #000000;
                stroke-linecap: round;
                stroke-linejoin: round;
                -inkscape-stroke: none;
                paint-order: stroke fill markers;
              "
              d="m 510.75195,-12.792969 c -36.27753,0 -64.40526,24.022117 -80.66797,51.148438 -16.2627,27.126321 -24.40429,60.141321 -24.40429,96.027341 v 336.45703 c 0,35.88603 8.14159,68.90103 24.40429,96.02735 16.26271,27.12632 44.39044,51.14844 80.66797,51.14843 36.27754,10e-6 64.40527,-24.02211 80.66797,-51.14843 16.2627,-27.12632 24.4043,-60.14132 24.4043,-96.02735 V 134.38281 c 0,-35.88602 -8.1416,-68.90102 -24.4043,-96.027341 -16.2627,-27.126321 -44.39043,-51.148438 -80.66797,-51.148438 z"
              id="rect528"
              sodipodi:nodetypes="sssssssssss"
            />
            <path
              style="
                color: #000000;
                fill: #000000;
                stroke-linecap: round;
                stroke-linejoin: round;
                -inkscape-stroke: none;
              "
              d="M 23.595703,-12.617188 C 1.9582586,-10.630497 -14.601304,7.5156821 -14.605469,29.244141 V 575.97852 c 0.0032,15.95776 9.0399155,30.53831 23.3294904,37.6417 14.2895746,7.10339 31.3688046,5.50515 44.0923846,-4.12608 L 413.78711,336.12695 c 22.21061,-16.82418 22.21061,-50.20707 0,-67.03125 L 52.816406,-4.2714844 C 44.457314,-10.599163 34.035784,-13.575649 23.595703,-12.617188 Z"
              id="path584"
              sodipodi:nodetypes="cccsccccc"
            />
          </g>
        </svg>
      </div>
      <div class="music-btn music-list-mode" @click="onClickChangeMode">
        <svg v-if="listMode === 0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            d="M8 19.9999V21.9323C8 22.2085 7.77614 22.4323 7.5 22.4323C7.38303 22.4323 7.26977 22.3913 7.17991 22.3165L3.06093 18.884C2.84879 18.7072 2.82013 18.3919 2.99691 18.1798C3.09191 18.0658 3.23264 17.9999 3.38103 17.9999L18 17.9999C19.1046 17.9999 20 17.1044 20 15.9999V7.99987H22V15.9999C22 18.209 20.2091 19.9999 18 19.9999H8ZM16 2.06738C16 1.79124 16.2239 1.56738 16.5 1.56738C16.617 1.56738 16.7302 1.60839 16.8201 1.68327L20.9391 5.11575C21.1512 5.29253 21.1799 5.60782 21.0031 5.81995C20.9081 5.93395 20.7674 5.99986 20.619 5.99986L6 5.99987C4.89543 5.99987 4 6.89531 4 7.99987V15.9999H2V7.99987C2 5.79074 3.79086 3.99987 6 3.99987H16V2.06738ZM11 7.99987H13V15.9999H11V9.99987H9V8.99987L11 7.99987Z"
          ></path>
        </svg>
        <svg v-if="listMode === 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            d="M8 19.9999V21.9323C8 22.2085 7.77614 22.4323 7.5 22.4323C7.38303 22.4323 7.26977 22.3913 7.17991 22.3165L3.06093 18.884C2.84879 18.7072 2.82013 18.3919 2.99691 18.1798C3.09191 18.0658 3.23264 17.9999 3.38103 17.9999L18 17.9999C19.1046 17.9999 20 17.1044 20 15.9999V7.99987H22V15.9999C22 18.209 20.2091 19.9999 18 19.9999H8ZM16 3.99987V2.06738C16 1.79124 16.2239 1.56738 16.5 1.56738C16.617 1.56738 16.7302 1.60839 16.8201 1.68327L20.9391 5.11575C21.1512 5.29253 21.1799 5.60782 21.0031 5.81995C20.9081 5.93395 20.7674 5.99986 20.619 5.99986L6 5.99987C4.89543 5.99987 4 6.89531 4 7.99987V15.9999H2V7.99987C2 5.79074 3.79086 3.99987 6 3.99987H16Z"
          ></path>
        </svg>
        <svg v-if="listMode === 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            d="M18 17.8832V16L23 19L18 22V19.9095C14.9224 19.4698 12.2513 17.4584 11.0029 14.5453L11 14.5386L10.9971 14.5453C9.57893 17.8544 6.32508 20 2.72483 20H2V18H2.72483C5.52503 18 8.05579 16.3312 9.15885 13.7574L9.91203 12L9.15885 10.2426C8.05579 7.66878 5.52503 6 2.72483 6H2V4H2.72483C6.32508 4 9.57893 6.14557 10.9971 9.45473L11 9.46141L11.0029 9.45473C12.2513 6.5416 14.9224 4.53022 18 4.09051V2L23 5L18 8V6.11684C15.7266 6.53763 13.7737 8.0667 12.8412 10.2426L12.088 12L12.8412 13.7574C13.7737 15.9333 15.7266 17.4624 18 17.8832Z"
          ></path>
        </svg>
      </div>
      <div class="music-btn music-list-show-top" @click="onClickShowTop">
        <svg
          v-if="!showTopBox"
          width="800px"
          height="800px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M18 4.654v.291a10 10 0 0 0-1.763 1.404l-2.944 2.944a1 1 0 0 0 1.414 1.414l2.933-2.932A9.995 9.995 0 0 0 19.05 6h.296l-.09.39A9.998 9.998 0 0 0 19 8.64v.857a1 1 0 1 0 2 0V4.503a1.5 1.5 0 0 0-1.5-1.5L14.5 3a1 1 0 1 0 0 2h.861a10 10 0 0 0 2.249-.256l.39-.09zM4.95 18a10 10 0 0 1 1.41-1.775l2.933-2.932a1 1 0 0 1 1.414 1.414l-2.944 2.944A9.998 9.998 0 0 1 6 19.055v.291l.39-.09A9.998 9.998 0 0 1 8.64 19H9.5a1 1 0 1 1 0 2l-5-.003a1.5 1.5 0 0 1-1.5-1.5V14.5a1 1 0 1 1 2 0v.861a10 10 0 0 1-.256 2.249l-.09.39h.295z"
            fill="#000000"
          />
        </svg>
        <svg
          v-if="showTopBox"
          width="800px"
          height="800px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M19.293 3.293a1 1 0 1 1 1.414 1.414l-2.944 2.944A10 10 0 0 1 16 9.055v.291l.39-.09A10 10 0 0 1 18.64 9h.861a1 1 0 1 1 0 2l-5-.003a1.5 1.5 0 0 1-1.5-1.5V4.5a1 1 0 1 1 2 0v.861c0 .757-.086 1.511-.256 2.249l-.09.39h.295a9.995 9.995 0 0 1 1.411-1.775l2.933-2.932zM8 14.653v.292c-.638.4-1.23.87-1.763 1.404l-2.944 2.944a1 1 0 1 0 1.414 1.414l2.933-2.932A10 10 0 0 0 9.05 16h.296l-.09.39A10 10 0 0 0 9 18.64v.861a1 1 0 1 0 2 0v-4.997a1.5 1.5 0 0 0-1.5-1.5L4.5 13a1 1 0 1 0 0 2h.861c.757 0 1.511-.086 2.249-.256l.39-.09z"
            fill="#000000"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from "vue";
import ProgressBar from "./ProgressBar.vue";
import { formatTime } from "../../utils/formatTime";
import { songlist } from "./songlist";

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
const songList = reactive<Song[]>(songlist);

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
// 目前的播放模式 0单曲循环，1列表循环，2随机播放
const listMode = ref(1);

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
  // console.log("currentSong.time", player.duration);
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
    console.log("new current song", currentSong._id);
  }
};

onMounted(() => {
  initPlayer();
});

// --
// 播放时定时计算progress
const progressInterval = () => {
  if (player.currentTime) {
    currentSong.time = player.duration;
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

// 点击播放上一首
const onClickPrevSong = () => {
  const currentIndex = songList.findIndex((song) => {
    return song._id === currentSong._id;
  });
  const targetIndex = (currentIndex - 1 + songList.length) % songList.length;
  // console.log("song index", targetIndex);
  chagneCurrentSong(songList[targetIndex]);
  loadSong();
  play();
};

// 点击播放上一首
const onClickNextSong = () => {
  const currentIndex = songList.findIndex((song) => {
    return song._id === currentSong._id;
  });
  const targetIndex = (currentIndex + 1 + songList.length) % songList.length;
  // console.log("song index", targetIndex);
  chagneCurrentSong(songList[targetIndex]);
  loadSong();
  play();
};

const showTopBox = ref(true);
const onClickShowTop = () => {
  showTopBox.value = !showTopBox.value;
};

player.onended = () => {
  console.log("play ended");
  pause();
  if (listMode.value === 0) {
    // 单曲循环
    player.loop = true;
    play();
  } else if (listMode.value === 1) {
    // 循环下一首
    player.loop = false;
    onClickNextSong();
  } else if (listMode.value === 2) {
    // 随机循环
    player.loop = false;
    let randomIndex = Math.floor(Math.random() * songList.length);
    while (songList[randomIndex]._id === currentSong._id) {
      randomIndex = Math.floor(Math.random() * songList.length);
    }
    chagneCurrentSong(songList[randomIndex]);
    loadSong();
    play();
  }
};

// 修改列表播放模式
const onClickChangeMode = () => {
  listMode.value = (listMode.value + 1) % 3;
  // console.log("change mode", listMode.value);
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

  overflow: hidden;
  z-index: 20;
}

.music-top-box {
  flex-grow: 1;
  width: 100%;
  // height: auto;
  overflow: hidden;
  position: relative;
  .music-list-mode-mobile {
    position: absolute;
    right: 40px;
    top: 5px;
    width: 20px;
    height: 20px;
    // background-color: $theme-color;
    cursor: pointer;
    z-index: 3;
  }
  > div {
    @include svg-path-100;
  }

  .close-music-btn {
    position: absolute;
    right: 8px;
    top: 5px;
    width: 20px;
    height: 20px;
    // background-color: $theme-color;
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
      height: 48px;
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
          // background-color: $theme-color;
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
      }
      .playlist-item-current {
        color: $theme-color;
        // background-color: $theme-color-light !important;
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
    justify-content: flex-end;
    align-items: center;
    position: relative;
    box-sizing: border-box;
    padding-top: 30px;
    .music-details-back {
      position: absolute;
      top: 5px;
      left: 8px;
      width: 20px;
      height: 20px;
      // background-color: $theme-color;
      cursor: pointer;
      @include f-c;
      @include svg-path-100;
    }
    .music-details-image {
      height: 12vh;
      width: 12vh;
      aspect-ratio: 1;
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
      margin-top: 1vh;
      margin-bottom: 0.5vh;
      max-width: 60%;
      @include ellipse-n-line(1);
    }
    .music-details-singer-name {
      color: grey;
      font-family: "";
      font-size: 13px;
      max-width: 50%;
      @include ellipse-n-line(1);
    }
    .music-details-progress-wrap {
      margin-top: 1vh;
      width: 85%;
      height: 38px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;

      .music-details-progress-box {
        width: 100%;
        max-width: 600px;
        height: 16px;
      }
      .music-details-progress-time-bar {
        height: 16px;
        width: 100%;
        // background-color: red;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .progress-time-current {
          font-size: 10px;
        }
        .progress-time-total {
          font-size: 10px;
        }
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
  > div {
    width: 25px;
    height: 25px;
    // background-color: $theme-color-light;
    display: flex;
    cursor: pointer;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
    @include svg-g-path-80;
  }
  .music-prev-song {
    @include svg-g-path-80;
  }
  .music-next-song {
    @include svg-g-path-80;
  }
  .music-toggle {
    width: 50px;
    height: 50px;
    background-color: $theme-color-light;
    border-radius: 50%;
    overflow: hidden;
    transition: all 0.1s;
    > svg {
      width: 50%;
      height: 50%;
      transition: all 0.1s;
      > path {
        @include svg-font-color;
        transition: all 0.1s;
      }
    }
  }
}

// 移动端
@media screen and (max-width: 800px) {
  .music-player {
    right: 0px;
    bottom: 0px;
    width: 100%;

    box-shadow: 0px 0px 8px 1px rgba(128, 128, 128, 0.342);
  }
  .music-top-box {
    height: 35vh;
    max-height: 260px;
    min-height: 210px;
  }
  .music-list-mode {
    display: none !important;
  }
  .music-list-show-top {
    display: flex !important;
    @include svg-path-100;
  }
  .music-list-mode-mobile {
    @include f-c;
  }
}

// pc端
@media screen and (min-width: 800px) {
  .music-player {
    right: 65px;
    bottom: 20px;
    width: 24vw;

    max-width: 320px;
    min-width: 260px;

    border-radius: 14px;
    box-shadow: 4px 4px 8px 0.1px rgba(218, 42, 42, 0.2),
      -4px -4px 8px 0.1px rgba(205, 220, 40, 0.2);
  }
  .music-top-box {
    height: 35vh;
    max-height: 260px;
    min-height: 210px;
  }
  .music-list-mode {
    display: flex !important;
    @include svg-path-100;
    > svg {
      width: 95%;
      height: 95%;
    }
  }
  .music-list-show-top {
    display: none !important;
  }
  .music-list-mode-mobile {
    display: none;
  }
}
</style>
