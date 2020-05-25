<template>
  <div class="navbar">
    <div class="find-input">
      <input
        type="text"
        placeholder="Search particles"
        v-model="search.value"
      />
      <i
        v-show="search.value"
        class="icon-cancel"
        @click="search.value = null"
      />
    </div>

    <div class="natives-list-out">
      <div class="natives-list">
        <SidebarItem
          v-for="dict in Object.keys(store.state.particles)"
          :key="dict"
          :name="dict"
          @click="selectDict(dict)"
          :selected="dict == selected.value"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, watchEffect } from "vue";
import { useStore } from "vuex";

import SidebarItem from "@/components/SidebarItem.vue";

export default {
  components: {
    SidebarItem,
  },
  setup() {
    const store = useStore();

    const search = reactive({ value: null });
    const selected = reactive({ value: "" });

    watchEffect(() => {
      store.dispatch("search", search.value);
    });

    function selectDict(dict: string) {
      if (selected.value == dict) {
        store.dispatch("dict", null);
        selected.value = "";
        return;
      }

      selected.value = dict;
      store.dispatch("dict", dict);
    }

    return {
      store,
      search,
      selectDict,
      selected,
    };
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  width: 300px;
  height: 100%;
  background: rgba(196, 196, 196, 0.2);
  display: flex;
  flex-direction: column;
}
.find-input {
  position: relative;
  margin: 20px 20px 15px 20px;
  input {
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: #969696;
      user-select: none;
    }
    color: white;
    padding-left: 20px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.4);
    border: 0px solid black;
    height: 35px;
  }
  .icon-cancel {
    position: absolute;
    padding: 8.5px;
    top: 0;
    right: 0;
    opacity: 0.5;
    cursor: pointer;
    &:hover {
      opacity: 0.6;
    }
  }
}
.natives-list-out {
  display: block;
  position: relative;
  flex: 1 1;
}
.natives-list {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0px 20px 0px 20px;
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #aaa transparent;
}
.natives-list::-webkit-scrollbar {
  width: 5px;
}
.natives-list::-webkit-scrollbar-thumb {
  background-color: #aaa;
  min-height: 40px;
}
.footer {
  height: 40px;
}
</style>
