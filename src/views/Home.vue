<template>
  <div class="home">
    <Sidebar />
    <Content />
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";

import Sidebar from "@/components/Sidebar.vue";
import Content from "@/components/Content.vue";

export default {
  components: {
    Sidebar,
    Content,
  },
  setup(props, context) {
    // const store = useStore();
    // console.log(store);
  },
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex: 1 1;
}
</style>
