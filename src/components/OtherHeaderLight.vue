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

const onLogoClicked = () => router.push({ path: '/' })
</script>
<template>
  <div class="other-header" :class="{ 'other-header-background': hasBackgroundColor }">
    <section class="other-header-left">
      <img
        src="../assets/icons/arrow_narrow_left.svg"
        alt=""
        class="other-header-arrow"
        @click="onArrowClicked"
        v-if="showArrowLeft"
      />
      <img
        src="../assets/icons/user_logo.svg"
        alt=""
        class="other-header-arrow"
        v-if="showLogo"
        @click="onLogoClicked"
      />
    </section>
    <slot></slot>
    <section class="other-header-right">
      <img src="../assets/icons/more.svg" alt="" @click="moreButtonClicked" />
    </section>
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
    background: #fff
.other-header-background
  background: #f2f4f8
</style>
