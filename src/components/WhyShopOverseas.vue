<script setup lang="ts">
import { onMounted, ref } from 'vue'
import useIsMobile from '@/hooks/useIsMobile'
import vIntersection from '@/directives/intersectionDirective'

const isMobile: boolean = useIsMobile()
const isHovered = ref(false)
const hoveredItemIndex = ref<number | null>(null)

onMounted(() => {})

const whyShopData = [
  {
    imageUrl: new URL('../assets/icons/number1.png', import.meta.url).href,
    title: 'Frogooo.CrownTitle',
    subtitle: 'Frogooo.CrownSubtitle',
    description: 'Frogooo.CrownDescription'
  },
  {
    imageUrl: new URL('../assets/icons/number2.png', import.meta.url).href,
    title: isMobile ? 'Frogooo.ChoiceTitle' : 'Frogooo.ChoicePcTitle',
    titleOther: 'Frogooo.ChoiceTitleOther',
    subtitle: 'Frogooo.FreeStorage',
    description: 'Frogooo.ChoiceDescription'
  },
  {
    imageUrl: new URL('../assets/icons/number3.png', import.meta.url).href,
    title: 'Frogooo.WiderTitle',
    subtitle: 'Frogooo.Days',
    description: 'Frogooo.WiderDescription'
  }
]
</script>
<template>
  <div class="why-shop-wrapper">
    <div
      v-intersection:fromName="'overseasIntersection'"
      class="why-shop-container"
      :class="{ hovered: isHovered }"
      v-for="(item, index) in whyShopData"
      :key="item.imageUrl"
      @mouseover="hoveredItemIndex = index"
      @mouseleave="hoveredItemIndex = null"
    >
      <section class="why-shop-title-container">
        <img class="why-shop-image" :src="item.imageUrl" alt="" v-if="!isMobile" />
        <div class="special-treatment" v-if="isMobile">
          <h3 class="why-shop-title">{{ $t(item.title) }}</h3>
          <h3 class="why-shop-title" v-if="item.titleOther">{{ $t(item.titleOther) }}</h3>
        </div>
        <h3 class="why-shop-title" v-else>{{ $t(item.title) }}</h3>
        <img class="why-shop-image" :src="item.imageUrl" alt="" v-if="isMobile" />
      </section>
      <section class="why-shop-description-container">
        <p class="why-shop-subtitle">{{ $t(item.subtitle) }}</p>
        <p class="why-shop-description">{{ $t(item.description) }}</p>
      </section>
      <svg
        class="hover-border"
        v-if="hoveredItemIndex === index && !isMobile"
        width="100%"
        height="100%"
        viewBox="0 0 418.4 493"
        fill="none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#5927B8">
              <animate
                attributeName="stop-color"
                values="#5927B8; #8630CB; #B438DF; #FFFFFF"
                dur="5s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stop-color="#B438DF">
              <animate
                attributeName="stop-color"
                values="#B438DF; #5927B8; #8630CB; #B438DF"
                dur="5s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
        </defs>
        <rect
          x="4"
          y="4"
          width="410.4"
          height="485"
          rx="17.6"
          ry="17.6"
          fill="none"
          stroke="url(#gradient1)"
          stroke-width="8"
        >
          <animate
            attributeName="stroke-dasharray"
            from="0, 1000"
            to="1000, 0"
            dur="0.5s"
            begin="mouseover"
            fill="freeze"
          />
        </rect>
      </svg>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
@media (max-width: 750px)
  .why-shop-container
      margin: .2rem
      padding: .24rem 0 0 .24rem
      display: flex
      flex-direction: column
      justify-content: flex-start
      border-radius: .16rem
      border: 1px solid rgba(255, 255, 255, 0.08)
      background: rgba(255, 255, 255, 0.04)
      position: relative
      overflow: hidden
      height: 2.8rem
      .why-shop-title-container
        display: flex
        justify-content: space-between
        align-items: center
        .special-treatment
          .why-shop-title
            font-size: .17rem
            line-height: .26rem
            font-weight: 500
            width: 1.9rem
            color: transparent
            background: linear-gradient(to right, #D99CEF, #EFD5F8)
            background-clip: text
            -webkit-background-clip: text
        .why-shop-image
          width: .8rem
          height: .8rem
      .why-shop-description-container
        margin-top: .15rem
        .why-shop-subtitle
          font-size: .14rem
          line-height: .2rem
          color: #00F99A
        .why-shop-description
            margin-top: .1rem
            padding-right: .24rem
            font-size: .16rem
            line-height: .24rem
            color: rgba(255, 255, 255, 0.8)
  .el-intersection:before
      content: "";
      position: absolute;
      top: 0;
      left: 150%;
      width: 100%;
      height: 100%;
      opacity: 0;
      pointer-events: none;
      background-image: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%,  rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0) 100%);
      transform: skew(-35deg);
      z-index: 1;
      animation-name: glow-animation
      animation-duration: 1s
      animation-timing-function: ease-in-out

      @keyframes glow-animation {
          0% {
            left: -150%;
            opacity: 1
          }
          100% {
            left: 150%;
            opacity: 0
          }
        }
@media (min-width: 1024px)
  .why-shop-wrapper
    display: flex
    justify-content: center
    margin: 80px auto 0
    .why-shop-container:hover
      transform: scale(1.1)
    .why-shop-container
        margin: 20px
        padding: 40px
        display: flex
        flex-direction: column
        justify-content: flex-start
        border-radius: 16px
        border: 1px solid rgba(255, 255, 255, 0.08)
        background: rgba(255, 255, 255, 0.04)
        position: relative
        overflow: hidden
        width: 368px
        height: 400px
        transition: transform 1s cubic-bezier(.19,1,.22,1)
        transform-origin: center center
        .hover-border
          position: absolute
          top: 0
          left: 0
          pointer-events: none
      .why-shop-title-container
        display: flex
        flex-direction: column
        .why-shop-title
          margin-top: 40px
          font-size: 20px
          line-height: 26px
          font-weight: 500
          color: transparent
          background: linear-gradient(to right, #D99CEF, #EFD5F8)
          background-clip: text
          -webkit-background-clip: text
        .why-shop-image
          width: 80px
          height: 80px
      .why-shop-description-container
          margin-top: 40px
          .why-shop-subtitle
            font-size: 14px
            line-height: 20px
            color: #00F99A
          .why-shop-description
              margin-top: 10px
              font-size: 16px
              line-height: 24px
              color: rgba(255, 255, 255, 0.8)
    .el-intersection:before
        content: "";
        position: absolute;
        top: 0;
        left: 150%;
        width: 100%;
        height: 100%;
        opacity: 0;
        pointer-events: none;
        background-image: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%,  rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0) 100%);
        transform: skew(-35deg);
        z-index: 1;
        animation-name: glow-animation
        animation-duration: 1s
        animation-timing-function: ease-in-out

        @keyframes glow-animation {
            0% {
              left: -150%;
              opacity: 1
            }
            100% {
              left: 150%;
              opacity: 0
            }
          }
</style>
