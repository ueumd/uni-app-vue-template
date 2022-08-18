<template>
  <template v-if="!system.isWeixinClient">
    <uni-nav-bar dark :fixed="true" background-color="#007AFF" height="44" status-bar left-icon="left" left-text="返回" :title="title" @clic-left="back" />
  </template>
</template>
<script setup lang="ts">
  import useStore from '@/store/index'
  const { system } = useStore()
  const props = defineProps({
    leftText: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '自定义导航栏'
    },
    // 返回回调事件
    callback: {
      type: Boolean,
      default: false
    },
    // 没有icon
    noIcon: {
      type: Boolean,
      default: false
    },
    // 返回首页
    isBackToHome: {
      type: Boolean,
      default: false
    },
    border: {
      type: [Boolean, String],
      default: true
    },
    color: {
      type: String,
      default: '#000000'
    },
    backgroundColor: {
      type: String,
      default: '#fff'
    }
  })

  const goHome = () => {
    uni.switchTab({
      url: '/pages/index/index'
    })
  }
  const back = () => {
    uni.navigateBack()
  }
</script>
<style lang="scss" scoped></style>
