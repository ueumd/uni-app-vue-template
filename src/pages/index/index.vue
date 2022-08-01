<template>
  <global-title></global-title>
  <view class="content">
    <image class="logo" src="/static/logo.png" />
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
    <view class="box" @click="getShowModal">
      <text class="title">显示modal</text>
    </view>
    <view class="box">
      <text class="title">user phone: {{ user.phone }}</text>
      <button @click="user.setPhone(Date.now())">change phone</button>
    </view>
    <global-modal ref="popupModal" title="标题" content="标题内容" @confirm="onConfirm" />
  </view>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import useStore from '@/store'
  import api from '@/api'

  // store
  const { system, user } = useStore()
  console.log('system store: ', system, system.isH5)

  const popupModal = ref()
  const title = ref('Hello')

  const getShowModal = () => {
    popupModal.value.showModal()
  }

  const onConfirm = () => {
    console.log('onConfirm')
  }

  onMounted(() => {
    api.user.getUserId(1).then((res) => {
      console.log('userId: ', res)
    })
  })
</script>

<style>
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .logo {
    height: 200rpx;
    width: 200rpx;
    margin-top: 200rpx;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50rpx;
  }

  .box {
    width: 100%;
    margin: 20rpx;
    padding: 20rpx;
    border: 1px dashed skyblue;
    box-sizing: border-box;
  }
  .title {
    font-size: 36rpx;
    color: #8f8f94;
  }
</style>
