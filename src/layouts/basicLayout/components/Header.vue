<template>
  <div class="header-wrap">
    <a-icon
      class="trigger"
      :type="collapsed ? 'menu-unfold' : 'menu-fold'"
      @click="$emit('collapsed')"
    />
    <div class="header-content">
      头部内容待开发。。。
      <a-button @click="logout">
        退出登录
      </a-button>
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
  },
  methods: {
    logout () {
      this.$request('/user/logout', undefined, {
        errorTips: false
      }).then(res => {
        console.log(res)
      })
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
