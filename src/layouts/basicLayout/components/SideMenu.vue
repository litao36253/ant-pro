<template>
  <a-menu
    :default-selected-keys="['1']"
    :default-open-keys="['sub1']"
    mode="inline"
    theme="dark"
    :inline-collapsed="collapsed"
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
      menuData: []
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
    }
  }
}
</script>
