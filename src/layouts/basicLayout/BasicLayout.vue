<template>
  <a-layout class="components-layout-demo-custom-trigger">
    <a-layout-sider
      v-model="collapsed"
      :trigger="null"
      collapsible
    >
      <div class="logo" />
      <SideMenu :collapsed="collapsed" />
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="header">
        <Header
          :collapsed="collapsed"
          @collapsed="collapsed = !collapsed"
        />
      </a-layout-header>
      <a-layout-content
        class="content"
      >
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import Header from './components/Header.vue'
import SideMenu from './components/SideMenu.vue'

export default {
  name: 'BasicLayout',
  components: {
    Header,
    SideMenu
  },
  data () {
    return {
      collapsed: false
    }
  }
}
</script>

<style lang="less" scoped>
.components-layout-demo-custom-trigger {
  height: 100%;
  .logo {
    height: 32px;
    background: url('~@/assets/logo.svg?inline') no-repeat center;
    margin: 16px;
  }
  .header {
    padding: 0;
    background-color: #fff;
  }
  .content {
    margin: 12px;
    padding: 20px;
    background: #fff;
    min-height: 280px
  }
}
</style>
