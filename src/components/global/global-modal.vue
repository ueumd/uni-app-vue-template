<template>
  <uni-popup ref="popupRef" type="bottom">
    <view class="show-modal">
      <view class="title">{{ props.title }}</view>
      <view v-if="content" class="content">{{ props.content }}</view>
      <view class="btn-box rowBC">
        <view class="cc cancel" @click="onCancel">{{ cancelText }}</view>
        <view class="cc sure" @click="onConfirm">{{ confirmText }}</view>
      </view>
    </view>
  </uni-popup>
</template>

<script setup lang="ts">
  /**
   * UI 需要自定义的modal
   */
  import { ref } from 'vue'
  const popupRef = ref()
  const $emit = defineEmits(['cancel', 'confirm'])
  const props = defineProps({
    type: {
      type: String,
      default: 'center'
    },
    title: {
      type: String,
      default: '提示'
    },
    content: {
      type: String,
      default: ''
    },
    confirmText: {
      type: String,
      default: '确认'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmColor: {
      type: String,
      default: '#007aff'
    },
    cancelColor: {
      type: String,
      default: '#000'
    },
    width: {
      type: [String, Number],
      default: 600
    },
    height: {
      type: [String, Number],
      default: 350
    }
  })
  const onCancel = () => {
    hideModal()
    $emit('cancel')
  }
  const onConfirm = () => {
    hideModal()
    $emit('confirm')
  }

  const showModal = () => {
    popupRef.value.open(props.type)
  }
  const hideModal = () => {
    popupRef.value.close()
  }

  // 父组件调用子组件必须要暴露出去
  defineExpose({
    showModal,
    hideModal
  })
</script>

<style lang="scss" scoped>
  .show-modal {
    width: 630rpx;
    margin: 0 30px;
    padding: 50rpx;
    box-sizing: border-box;
    background: white;
    border-radius: 28rpx;

    .title {
      margin-bottom: 24rpx;
      text-align: center;
      font-size: 40rpx;
      color: #333333;
      font-weight: bold;
    }

    .content {
      margin-bottom: 54rpx;
      font-size: 28rpx;
      font-weight: 400;
      color: #666666;
      line-height: 48rpx;
    }

    .btn-box {
      .cc {
        width: 252rpx;
        height: 96rpx;
        line-height: 96rpx;
        background: #e5eeff;
        text-align: center;
        font-weight: 500;
        font-size: 32rpx;
        border-radius: 60rpx;
      }
      .cancel {
        color: #4989fe;
      }
      .sure {
        background: linear-gradient(270deg, #4989fe 0%, #49adfe 100%);
        color: white;
      }
    }
  }
</style>
