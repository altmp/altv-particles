<template>
  <div class="header">
    <router-link to="/" class="logo">
      <img src="@/assets/v_logo.svg" />
    </router-link>
    <div class="nativesStats">
      <div v-if="store.state.assetCount">
        Assets: {{ store.state.assetCount }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";

export default {
  setup(props, context) {
    const store = useStore();
    return {
      store,
    };
  },
};
</script>

<style lang="scss" scoped>
.header {
  background: rgba(34, 34, 34, 0.7);
  border-bottom: 1px solid rgba(238, 238, 238, 0.02);
  height: 65px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 20px;
  width: 100%;
}
.logo {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  img {
    height: 32px;
    width: 32px;
  }
}
.nativesStats {
  div {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.7);
    text-align: left;
  }
}
</style>
