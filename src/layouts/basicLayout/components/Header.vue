<template>
  <div class="header-wrap">
    <a-icon
      class="trigger"
      :type="collapsed ? 'menu-unfold' : 'menu-fold'"
      @click="$emit('collapsed')"
    />
    <div class="header-content">
      头部内容待开发。。。
    </div>
  </div>
</template>

<script>
export default {
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less" scoped>
  .header-wrap {
    display: flex;
    height: 100%;
    align-items: center;
    overflow-x: hidden;

    .trigger {
      flex: none;
      font-size: 18px;
      padding: 0 18px;
      cursor: pointer;
      transition: color 0.3s;
      &:hover {
        color: #1890ff;
      }
    }

    .header-content {
      flex: 1;
    }
  }
</style>
