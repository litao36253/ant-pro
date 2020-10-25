<template>
  <a-spin
    :spinning="$store.state.common.globalLoading"
    class="global-wrap"
  >
    <router-view />
  </a-spin>
</template>
<style lang="less" scoped>
  .global-wrap {
    height: 100%;
    /deep/ .ant-spin-container {
      height: 100%;
    }
  }
</style>
