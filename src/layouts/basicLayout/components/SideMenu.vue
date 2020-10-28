<template>
  <a-menu
    :selected-keys="selectedKeys"
    :open-keys.sync="openKeys"
    mode="inline"
    theme="dark"
    :inline-collapsed="collapsed"
    @select="handleSelect"
  >
    <template v-for="item in menuData">
      <a-menu-item
        v-if="!item.children"
        :key="item.path"
      >
        <a-icon
          v-if="item.meta.icon"
          :type="item.meta.icon"
        />
        <span>{{ item.meta.title }}</span>
      </a-menu-item>
      <SubMenu
        v-else
        :menu-info="item"
        :key="item.path"
      />
    </template>
  </a-menu>
</template>

<script>
import SubMenu from './SubMenu.vue'
export default {
  components: {
    SubMenu
  },
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      list: [],
      menuData: [],
      selectedKeys: [],
      openKeys: []
    }
  },
  created () {
    this.menuData = this.getMenuData(this.$router.options.routes)
  },
  methods: {
    getMenuData (routes) {
      const menuData = []
      routes.forEach(item => {
        if (!item.hideInMenu) {
          const newItem = { ...item }
          delete newItem.children
          if (item.children) {
            newItem.children = this.getMenuData(item.children)
          }
          menuData.push(newItem)
        }
      })
      return menuData
    },
    handleSelect (item) {
      item.keyPath.length && this.$router.push(item.keyPath[0])
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler (to) {
        const matched = to.matched
        const openKeys = this.openKeys.concat(matched.map(item => item.path))
        this.openKeys = [...new Set(openKeys)]
        this.selectedKeys = [matched[matched.length - 1].path]
      }
    }
  }
}
</script>
