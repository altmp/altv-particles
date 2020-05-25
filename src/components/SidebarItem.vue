<template>
  <div class="nav-collapse">
    <div class="collapse-name">
      <i class="icon-right-open" />
      <div class="name" :class="{ selected }">
        {{ name }}
      </div>
    </div>

    <div class="collapse-content content-collapsed'"></div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    selected: {
      type: Boolean,
      default: false,
    },
  },
  setup() {},
};
</script>

<style lang="scss" scoped>
.selected {
  font-size: 20px !important;
}

$animTime: 50ms;
.nav-collapse {
  &:not(:first-child) {
    margin-top: 15px;
  }
  &:last-child {
    margin-bottom: 20px;
  }
  .collapse-name {
    display: flex;
    height: 20px;
    align-items: center;
    user-select: none;
    cursor: pointer;
    i {
      padding: 2px 0;
      height: 16px;
      transition: transform 0.1s ease;
    }
    &.opened i {
      transform: rotate(90deg);
    }
    .name {
      margin-left: 10px;
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      color: #ffffff;
    }
    &:hover {
      opacity: 0.7;
    }
  }
  .collapse-content {
    box-sizing: border-box;
    overflow: hidden;
    padding-left: 20px;
    padding-top: 10px;
  }
  .content-collapsed {
    padding-top: 0px;
    display: none;
  }
}
</style>
