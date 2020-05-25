<template>
  <div class="content">
    <div class="pages">
      <button @click="prev">Prev</button>
      <button @click="next">Next</button>
    </div>
    <div class="preview">
      <ContentItem
        v-for="(particle, index) of particles"
        :key="index"
        :id="particle.id"
        :dict="particle.dict"
        :asset="particle.asset"
      />
    </div>
  </div>
</template>

<script>
import { computed, reactive, watchEffect, watch } from "vue";
import { useStore } from "vuex";

import ContentItem from "@/components/ContentItem.vue";

const perPage = 16;

export default {
  components: {
    ContentItem,
  },
  setup() {
    const store = useStore();

    const curPage = reactive({ value: 0 });

    const particles = computed(() => {
      const output = store.state.queryList.slice(
        curPage.value * perPage,
        curPage.value * perPage + perPage
      );

      return output;
    });

    watchEffect(() => {
      if (store.state.queryList) {
        curPage.value = 0;
      }
    });

    function next() {
      if (store.state.queryList.length - (curPage.value + 1) * perPage <= 0) {
        return;
      }

      curPage.value++;
    }

    function prev() {
      if (curPage.value == 0) {
        return;
      }

      curPage.value--;
    }

    return {
      store,
      particles,
      prev,
      next,
    };
  },
};
</script>

<style lang="scss" scoped>
.preview {
  display: flex;
  flex-wrap: wrap;
}

.content {
  .pages {
    margin: 20px;
    align-self: flex-end;
  }

  display: flex;
  flex: 1 1;
  background: rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  padding: 20px 0 0 20px;
  flex-direction: column;
  &.credits {
    justify-content: flex-end;
    align-items: center;
    padding-bottom: 20px;
  }
  .thanks {
    font-size: 16px;
    margin-bottom: 5px;
  }
  .credits-link {
    &:visited {
      color: rgba(125, 125, 255, 0.5);
    }
    &:hover {
      color: rgba(125, 125, 255, 0.8);
    }
    color: rgba(125, 125, 255, 0.5);
    font-weight: bold;
    text-decoration: none;
    transition: 200ms color ease;
  }
  .function-type {
    margin-left: 10px;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 28px;
    overflow: hidden;
  }
  .function-color {
    color: #569cd6;
  }
  .function-name {
    color: #fff;
  }
  .function-arg-type {
    color: #4ec9b0;
  }
  .function-result-type {
    color: #4ec9b0;
  }
  .function-arg span {
    white-space: nowrap;
  }
  .code {
    font-family: monospace;
    font-size: 1.2rem;
    display: inline-flex;
    flex-wrap: wrap;
    background: #292b36;
    border: 1px solid rgba(136, 136, 136, 0.5);
    box-sizing: border-box;
    border-radius: 5px;
    width: 100%;
    box-sizing: border-box;
    padding: 5px;
    text-align: start;
    word-wrap: break-word;
    margin-top: 10px;
  }
  .doc-header {
    display: flex;
    margin-bottom: 20px;
    height: 45px;
    align-items: center;
    .quality-circle {
      display: block;
      min-height: 16px;
      min-width: 16px;
      background-color: black;
      background-color: black;
      border-radius: 50%;
    }
    .good {
      background: #4dbf60;
    }
    .medium {
      background: #ce8b09;
    }
    .low {
      background: #bf544d;
    }
  }
  .doc-data-out {
    display: flex;
    flex: 1 1;
    position: relative;
  }
  .doc-data-in {
    display: flex;
    position: absolute;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    box-sizing: border-box;
    justify-content: center;
    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #aaa;
      min-height: 40px;
    }
    .content-placeholder {
      display: flex;
      flex: 1 1;
    }
    .content-native-info {
      display: flex;
      min-width: 400px;
      width: 840px;
      flex-direction: column;
      .divider {
        margin: 20px 0 20px 0;
        min-height: 2px;
        background: rgba(255, 255, 255, 0.05);
      }
      .description-section {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-bottom: 30px;
        pre {
          white-space: pre-wrap;
          font-family: "Roboto", -apple-system, BlinkMacSystemFont, Helvetica,
            sans-serif;
        }
        .section-header {
          font-style: normal;
          font-weight: bold;
          font-size: 32px;
          color: #ffffff;
        }
        .no-description {
          font-style: italic;
          color: rgba(255, 255, 255, 0.5);
        }
        .arg-data {
          display: flex;
          flex-direction: column;
          .arg-declaration {
            font-size: 24px;
            margin-bottom: 5px;
            margin-top: 10px;
          }
          .arg-description-text {
            text-align: start;
            font-size: 18px;
            color: rgba(255, 255, 255, 0.8);
          }
          .empty {
            font-style: italic;
            color: rgba(255, 255, 255, 0.5);
          }
        }
      }
      .summary-info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
      .category-name {
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        color: rgba(255, 255, 255, 0.7);
        text-transform: capitalize;
      }
      .native-name {
        font-style: normal;
        font-weight: bold;
        font-size: 32px;
        color: #ffffff;
      }
      .native-summary {
        margin-top: 5px;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        color: #ffffff;
      }
      .empty {
        font-style: italic;
        color: rgba(255, 255, 255, 0.5);
      }
    }
    .content-hash-history {
      display: flex;
      min-width: 200px;
      width: 330px;
      margin-right: 20px;
      .history-hashes-list {
        padding-bottom: 20px;
        box-sizing: border-box;
      }
      .history-title {
        font-style: normal;
        font-weight: bold;
        font-size: 14px;
        text-align: center;
      }
      .hashes-list-item {
        display: flex;
        margin-top: 10px;
        .version-ellipse {
          display: flex;
          width: 60px;
          height: 22px;
          background: rgba(79, 79, 79, 0.5);
          border-radius: 10px;
          text-align: center;
          justify-content: center;
          align-items: center;
          font-style: normal;
          font-weight: bold;
          font-size: 14px;
        }
        .version-hash {
          display: flex;
          margin-left: 10px;
          font-style: normal;
          font-weight: bold;
          font-size: 14px;
          align-items: center;
        }
      }
    }
  }
}
</style>
