<script setup lang="ts">
import { useRouter } from 'vue-router'

defineProps({
  showArrowLeft: {
    type: Boolean,
    default: true
  },
  showLogo: {
    type: Boolean,
    default: false
  },
  hasBackgroundColor: {
    type: Boolean,
    default: false
  }
})

const router = useRouter()

const emit = defineEmits(['more-button-clicked'])

const moreButtonClicked = () => emit('more-button-clicked')

const onArrowClicked = () => router.go(-1)
</script>
<template>
  <div class="other-header" :class="{ 'other-header-background': hasBackgroundColor }">
    <section class="other-header-left">
      <img
        src="../assets/icons/arrow_narrow_left.png"
        alt=""
        class="other-header-arrow"
        @click="onArrowClicked"
      />
    </section>
    <slot></slot>
    <img
      src="../assets/icons/more_white.svg"
      class="other-header-right-image"
      alt=""
      @click="moreButtonClicked"
    />
  </div>
</template>

<style lang="stylus" scoped>
.other-header
    position: sticky
    top: 0
    display: flex
    justify-content: space-between
    padding: .14rem .2rem
    align-items: center
    z-index: 99
  .other-header-right-image
    width: .32rem
    height: .28rem
.other-header-background
  background: #000
</style>
