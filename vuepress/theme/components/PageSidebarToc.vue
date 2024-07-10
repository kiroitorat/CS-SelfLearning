<template>
 <!-- 下拉过渡组件 -->
 <DropdownTransition>
    <!-- 侧边栏链接列表，仅当有子项时显示 -->
    <ul class="toc-sidebar-links" v-if="items[0].children.length">
        <!-- 遍历子项并生成链接 -->
        <li v-for="(item, i) in items[0].children" :key="i">
            <PageSidebarTocLink  :sidebarDepth="sidebarDepth" :item="item"/>
        </li>
    </ul>
  </DropdownTransition>
</template>

<script>
import PageSidebarTocLink from '@theme/components/PageSidebarTocLink.vue'
import DropdownTransition from '@theme/components/DropdownTransition.vue'
import { isActive } from '../util'

export default {
  name: 'PageSidebarToc', // 组件名称

  components: { PageSidebarTocLink, DropdownTransition }, // 引入的组件

  props: [
    'items', // 侧边栏项
    'depth',  // 当前侧边栏链接的深度
    'sidebarDepth' // 要提取的标题深度
  ],

  data () {
    return {
      openGroupIndex: 0 // 当前打开的组索引
    }
  },

  created () {
    this.refreshIndex() // 组件创建时刷新索引
  },

  watch: {
    '$route' () {
      this.refreshIndex() // 路由变化时刷新索引
    }
  },

  methods: {
    refreshIndex () {
      // 刷新打开的组索引
      const index = resolveOpenGroupIndex(
        this.$route,
        this.items[0].children
      )
      if (index > -1) {
        this.openGroupIndex = index
      }
    },

    toggleGroup (index) {
      // 切换组显示状态
      this.openGroupIndex = index === this.openGroupIndex ? -1 : index
    },

    isActive (page) {
      // 检查页面是否激活
      return isActive(this.$route, page.regularPath)
    }
  }
}

function resolveOpenGroupIndex (route, items) {
  // 解析打开的组索引
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    if (descendantIsActive(route, item)) {
      return i
    }
  }
  return -1
}

function descendantIsActive (route, item) {
  // 检查子项是否激活
  if (item.type === 'group') {
    return item.children.some(child => {
      if (child.type === 'group') {
        return descendantIsActive(route, child)
      } else {
        return child.type === 'page' && isActive(route, child.path)
      }
    })
  }
  return false
}
</script>