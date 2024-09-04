<script setup lang="ts">
import { getBrandImageUrl } from '../hooks/useGetImageUrl'
import { ref, computed, onBeforeMount } from 'vue'

import useIsMobile from '@/hooks/useIsMobile'

const props = defineProps({
  direction: {
    type: String,
    default: 'left'
  }
})
const images = ref<Array<string>>([])
const containerWidth = ref(0)
const itemWidths = ref<Array<number>>([])
const isMobile = useIsMobile()

onBeforeMount(async () => {
  let imageArr = getBrandImageUrl()
  if (isMobile && props.direction == 'left') {
    images.value = imageArr.slice(0, 4)
  } else if (isMobile && props.direction == 'right') {
    images.value = imageArr.slice(4, imageArr.length)
  } else {
    images.value = imageArr
  }
  await Promise.all(
    images.value.map(async (item) => {
      const img = new Image()
      img.src = item
      await new Promise<void>((resolve) => {
        img.onload = () => {
          itemWidths.value.push(img.width)
          resolve()
        }
      })
    })
  )
  containerWidth.value = document.querySelector('.carousel')?.clientWidth || 0
})
const animationDuration = computed(() => {
  const totalWidth = itemWidths.value.reduce((acc, width) => acc + width, 0)
  return (totalWidth / containerWidth.value) * 10
})
</script>
<template>
  <div class="brand-swiper">
    <div class="carousel" :style="{ '--animation-duration': animationDuration + 's' }">
      <div class="image-list" :class="{ 'image-list-right': direction == 'right' }">
        <div v-for="(item, index) in images" :key="index">
          <img :src="item" alt="" />
        </div>
      </div>
      <div class="image-list" :class="{ 'image-list-right': direction == 'right' }">
        <div v-for="item in images" :key="item">
          <img :src="item" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
@media (max-width: 750px)
  .brand-swiper
      margin-top: .2rem
      .carousel
          position: relative
          overflow: hidden
          display: flex
          .image-list
              display: flex
              align-items: center
              will-change: transform
              animation-duration: var(--animation-duration)
              animation-timing-function: linear
              animation-delay: 0s
              animation-iteration-count: infinite
              animation-direction: normal
              animation-fill-mode: none
              animation-play-state: running
              animation-name: carouselMoving
              animation-timeline: auto
              animation-range-start: normal
              animation-range-end: normal
              img
                margin-right: .2rem
          @keyframes carouselMoving {
              0% {
                  transform: translateX(0px)
              }
              100% {
                  transform: translateX(-100%)
              }
          }
          .image-list-right
            animation-name: carouselRightMoving
          @keyframes carouselRightMoving {
            0% {
                transform: translateX(-100%)
            }
            100% {
                transform: translateX(0px)
            }
          }
      .carousel::before
          position: absolute
          display: block
          content: ""
          height: 100%
          width: 1.48rem
          left: 0
          top: 0
          background: linear-gradient(90deg, #030014, #03001400)
          z-index: 98
      .carousel::after
          position: absolute
          display: block
          content: ""
          height: 100%
          width: 1.48rem
          right: 0
          top: 0
          background: linear-gradient(90deg, #03001400, #030014)
          z-index: 98
  .brand-swiper:nth-of-type(2)
      margin-top: 0
@media (min-width: 1024px)
  .brand-swiper
    margin: 50px 360px 0px
    .carousel
        position: relative
        overflow: hidden
        display: flex
        width: 1200px
        .image-list
            display: flex
            align-items: center
            will-change: transform
            animation-duration: var(--animation-duration)
            animation-timing-function: linear
            animation-delay: 0s
            animation-iteration-count: infinite
            animation-direction: normal
            animation-fill-mode: none
            animation-play-state: running
            animation-name: carouselMoving
            animation-timeline: auto
            animation-range-start: normal
            animation-range-end: normal
            img
              margin-right: 40px
        @keyframes carouselMoving {
            0% {
                transform: translateX(0px)
            }
            100% {
                transform: translateX(-100%)
            }
        }
    .carousel::before
        position: absolute
        display: block
        content: ""
        height: 100%
        width: 327px
        left: 0
        top: 0
        background: linear-gradient(90deg, #030014, #03001400)
        z-index: 98
    .carousel::after
        position: absolute
        display: block
        content: ""
        height: 100%
        width: 327px
        right: 0
        top: 0
        background: linear-gradient(90deg, #03001400, #030014)
        z-index: 98
</style>
