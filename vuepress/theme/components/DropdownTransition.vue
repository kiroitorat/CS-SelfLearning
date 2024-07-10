<template>
  <transition
    name="dropdown"
    @enter="setHeight"
    @after-enter="unsetHeight"
    @before-leave="setHeight"
  >
    <slot />
  </transition>
</template>

<script>
export default {
  name: 'DropdownTransition',

  methods: {
    setHeight (items) {
      // 显式设置高度以便进行过渡
      items.style.height = items.scrollHeight + 'px'
    },

    unsetHeight (items) {
      // 清除高度设置
      items.style.height = ''
    }
  }
}
</script>

<style lang="stylus">
.dropdown-enter, .dropdown-leave-to
  height 0 !important

</style>