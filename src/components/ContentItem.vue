<template>
  <div class="item" @mouseover="play" @mouseleave="stop">
    <span class="index">{{ id }}</span>

    <img
      v-show="!isPlaying.value"
      :src="`https://cdn.altv.mp/particles/${id}.jpg`"
      loading="lazy"
    />

    <video
      v-show="isPlaying.value"
      ref="video"
      :src="`https://cdn.altv.mp/particles/${id}.mp4`"
      preload="none"
      muted
      loop
      loading="lazy"
    ></video>

    <div class="info">
      <input type="text" :value="`${dict}:${asset}`" readonly />
      <button class="copy" @click="copy(`${dict}:${asset}`)">Copy</button>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, computed, ref } from "vue";

export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
    dict: {
      type: String,
      required: true,
    },
    asset: {
      type: String,
      required: true,
    },
  },
  setup() {
    let isPlaying = reactive({ value: false });
    let video = ref(null);

    function play() {
      if (isPlaying.value) {
        return;
      }

      video.value.play();

      isPlaying.value = true;
    }

    function stop() {
      if (!isPlaying.value) {
        return;
      }

      video.value.pause();
      video.value.currentTime = 0;

      isPlaying.value = false;
    }

    function copy(str: string) {
      const el = document.createElement("textarea");
      el.value = str;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }

    return {
      isPlaying,
      play,
      stop,
      video,
      copy,
    };
  },
};
</script>

<style lang="scss" scoped>
.item {
  margin: 20px;
  width: 324px;
  height: 184px;
  background: gray;
  background-size: cover;

  .index {
    position: absolute;
    padding: 5px;
    padding-right: 8px;
    padding-left: 8px;
    background: black;
    font-size: 9px;
  }

  img,
  video {
    width: 100%;
    height: 100%;
  }

  .info {
    width: 100%;
    display: flex;
    input {
      width: 80%;
    }
    button {
      width: 20%;
      color: white;
      background-color: #141a23;
    }
  }
}
</style>
