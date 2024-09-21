<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import HeaderComponent from '@/components/HeaderComponent.vue'
import BrandSwiper from '@/components/BrandSwiper.vue'
import WhyShopOverseas from '@/components/WhyShopOverseas.vue'
import MostAdvance from '@/components/MostAdvance.vue'
import AdvantageComponent from '@/components/AdvantageComponent.vue'
import ShoppingTripNow from '@/components/ShoppingTripNow.vue'
import ContactUs from '@/components/ContactUs.vue'
import MovePageComponent from '@/components/MorePageComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import AdvantageRow from '@/components/AdvantageRow.vue'
import vOtherIntersection from '@/directives/intersectionOtherDirective'
import vIntersection from '@/directives/intersectionDirective'

import { getLogoImageUrl, getTitleBgImageUrl } from '@/hooks/useGetImageUrl'
import useIsMobile from '@/hooks/useIsMobile'

import 'animate.css'

const router = useRouter()

const showMorePage = ref(false)
const isMobile = ref(useIsMobile())
onMounted(() => {
  window.scrollTo(0, 0)
})

const onMoreButtonClicked = () => {
  showMorePage.value = true
}
const onCloseButtonClicked = () => {
  showMorePage.value = false
}
const onShippingFeeCalculationClicked = () => {
  router.push({ path: '/freight' })
}

const viewPageClicked = () => {
  if (showMorePage.value) {
    showMorePage.value = false
  }
}
</script>

<template>
  <main>
    <MovePageComponent
      v-if="showMorePage"
      @close-button-clicked="onCloseButtonClicked"
      :color-flag="'black'"
    />
    <HeaderComponent @more-button-clicked="onMoreButtonClicked" />
    <div class="frogooo-container" @click="viewPageClicked">
      <div class="frogooo-title">
        <section class="title">
          <h3 class="best-overseas animate__animated animate__slideInDown">
            {{ $t('Frogooo.OverseasShopping') }}
          </h3>
          <span class="express-platform animate__animated animate__zoomIn">{{
            $t('Frogooo.Easier')
          }}</span>
        </section>
      </div>
      <div class="title-bg animate__animated animate__fadeInUp">
        <img :src="getTitleBgImageUrl()" alt="" />
        <section class="shopping-wrap">
          <h2 class="shopping-title">{{ $t('Frogooo.ShoppingTitle') }}</h2>
          <p class="shopping-from">{{ $t('Frogooo.FromTheseECommerce') }}</p>
        </section>
      </div>
      <div class="shopping-container">
        <BrandSwiper />
        <BrandSwiper :direction="'right'" v-if="isMobile" />
      </div>
      <div class="Shipping-fee-calculation-container" v-otherIntersection:fromName="'shipping-fee'">
        <h4 class="nationwide">{{ $t('Frogooo.Nationwide') }}</h4>
        <button class="shipping-fee-calculation" @click="onShippingFeeCalculationClicked">
          {{ $t('Frogooo.ShippingFeeCalculation') }}
        </button>
      </div>
      <div class="why-shop">
        <h1 class="why-shop-title">{{ $t('Frogooo.WhyShopOverseas') }}</h1>
        <h3 class="why-shop-title why-shop-subtitle">
          {{ $t('Frogooo.WhyShopOverseasSubtitle') }}
        </h3>
      </div>
      <div class="why-shop-overseas-container">
        <WhyShopOverseas />
      </div>
      <MostAdvance />
      <AdvantageComponent v-if="isMobile" />
      <AdvantageRow v-else />
      <!-- <ShoppingTripNow v-if="isMobile" /> -->
      <div class="frogooo-logo-container" v-if="isMobile">
        <div v-intersection:fromName="'frogoooLogo'">
          <img :src="getLogoImageUrl()" alt="" class="frogooo-logo" />
        </div>
        <div class="frogooo-logo-border"></div>
      </div>
      <ContactUs v-if="isMobile" />
      <FooterComponent v-else />
      <div class="copy-right" v-if="isMobile">
        Copyright © 2024 All Rights Reserved. SINGAPORE FROGOOO TECH PTE. LTD.
      </div>
      <div class="whatsapp">
        <a href="https://wa.me/message/UGN2RVXLNV4LH1" target="_blank" rel="noopener">
          <img src="../assets/icons/whatsapp.png" alt="" />
        </a>
      </div>
    </div>
  </main>
</template>

<style lang="stylus" scoped>
@media (max-width: 750px)
  .frogooo-container
    margin-top: .7rem
    overflow-x: hidden
    .frogooo-title
      margin: 0 .2rem
      .animate__animated, .animate__fadeOut, animate__fadeIn
        animation-duration: 3s
      .animate__slideInDown
        animation-duration: 1s
      .animate__zoomIn
        animation-duration: 1.3s
      .animate__fadeInUp
        animation-duration: 1s
      .title
        font-size: .38rem
        text-align: center
        line-height: .45rem
        color: #fff
        display: flex
        flex-direction: column
        align-items: center
        .best-overseas
          max-width: 2.5rem
        .shopping, .express-platform, .best-overseas
          font-weight: 700
        .express-platform
          color: #B438DF
          text-shadow: 0 8px 10px rgba(3, 0, 20, 0.8)
          text-stroke: 1px rgba(255, 255, 255, 0.2)
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.2)
    .title-bg
      position: relative
      img
        width: 100%
      .shopping-wrap
        text-align: center
        position: absolute
        left: 0
        bottom: 0
        .shopping-title
          font-size: .28rem
          line-height: .4rem
          font-weight: 700
          color: #fff
          padding: 0 .28rem
        .shopping-from
          font-size: .16rem
          line-height: .2rem
          color: rgba(255, 255, 255, 0.8)
    .Shipping-fee-calculation-container
      margin: .56rem .2rem 0
      border-bottom-left-radius: .4rem
      border-top-left-radius: .4rem
      border-top-right-radius: .4rem
      background: linear-gradient(45deg, #5927B8, #B438DF, #DCA3F0)
      background-size: 200% 200%
      padding: .24rem
      transform-origin: bottom right
      transform: scale(0)
      opacity: 0
      transition: transform 0.3s ease-out, opacity 0.3s ease-out
      animation: rotateBackground 5s linear infinite

      @keyframes rotateBackground {
        0% {
          background-position: 0% 0%
        }
        25% {
          background-position: 100% 0%
        }
        50% {
          background-position: 100% 100%
        }
        75% {
          background-position: 0% 100%
        }
        100% {
          background-position: 0% 0%
        }
      }
      .nationwide
        font-size: .13rem
        font-weight: 500
        line-height: .15rem
        color: #FFF
        text-align: center
      .shipping-fee-calculation
        border: 1px solid rgba(255, 255, 255, 0.2)
        border-radius: .4rem
        background: transparent
        padding: .12rem .24rem
        width: 100%
        margin-top: .2rem
        font-size: .16rem
        font-weight: 700
        line-height: .2rem
        color: #05FE9F
        text-shadow: 0 4px 4px #8A25C7
        -webkit-tap-highlight-color: rgba(255, 255, 255, 0.3)
        touch-action: manipulation
      .shipping-fee-calculation:active
        background: rgba(255, 255, 255, 0.3)
    .why-shop
      margin: .64rem 0 .4rem
      .why-shop-title
        padding: 0 .2rem
        font-size: .28rem
        line-height: .3rem
        font-weight: 700
        text-align: center
        color: #fff
      .why-shop-subtitle
        font-size: .16rem
    .frogooo-logo-container
      display: flex
      flex-direction: column
      margin: .4rem .2rem 0
      .frogooo-logo
        height: 0.28rem
      .frogooo-logo-border
        margin-top: .15rem
        border-bottom: 1px solid rgba(255, 255, 255, 0.15)
    .copy-right
      margin: .2rem
      padding-bottom: .2rem
      font-size: .1rem
      line-height: .12rem
      color: rgba(255, 255, 255, 0.4)
    .whatsapp
      position: fixed
      bottom: .2rem
      right: .1rem
      z-index: 100
      a
        img
          width: 0.4rem
          height: 0.4rem
@media (min-width: 1024px)
  .frogooo-container
    margin-top: 100px
    display: flex
    flex-direction: column
    align-items: center
    .frogooo-title
      margin: 0 20px
      .animate__animated, .animate__fadeOut, animate__fadeIn
        animation-duration: 3s
      .animate__slideInDown
        animation-duration: 1s
      .animate__zoomIn
        animation-duration: 9s
      .animate__fadeInUp
        animation-duration: 1s
      .title
        font-size: 64px
        text-align: center
        line-height: 83px
        color: #fff
        .shopping, .express-platform, .best-overseas
          font-weight: 700
        .express-platform
          color: #B438DF
          text-shadow: 0 8px 10px rgba(3, 0, 20, 0.8)
          text-stroke: 1px rgba(255, 255, 255, 0.2)
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.2)
    .title-bg
      margin-top: 80px
      position: relative
      display: flex
      align-items: center
      flex-direction: column
      img
        width: 100%
      .shopping-wrap
        position: absolute
        bottom: 40px
        text-align: center
        .shopping-title
          font-size: 48px
          line-height: 58px
          font-weight: 700
          color: #fff
        .shopping-from
          margin-top: 10px
          font-size: 20px
          line-height: 24px
          font-weight: 500
          color: rgba(255, 255, 255, 0.6)
    .Shipping-fee-calculation-container
        margin: 80px 20px 0
        border-bottom-left-radius: 40px
        border-top-left-radius: 40px
        border-top-right-radius: 40px
        background: linear-gradient(45deg, #5927B8, #B438DF, #DCA3F0)
        background-size: 200% 200%
        padding: 32px 80px
        transform-origin: bottom right
        transform: scale(0)
        opacity: 0
        transition: transform 0.3s ease-out, opacity 0.3s ease-out
        display: flex
        align-items: center
        animation: rotateBackground 5s linear infinite

        @keyframes rotateBackground {
          0% {
            background-position: 0% 0%
          }
          25% {
            background-position: 100% 0%
          }
          50% {
            background-position: 100% 100%
          }
          75% {
            background-position: 0% 100%
          }
          100% {
            background-position: 0% 0%
          }
        }
        .nationwide
          font-size: 20px
          font-weight: 500
          line-height: 24px
          color: #FFF
          text-align: center
          margin-right: 64px
        .shipping-fee-calculation
          border: 1px solid rgba(255, 255, 255, 0.2)
          border-radius: 16px
          background: transparent
          padding: 12px 24px
          font-size: 20px
          font-weight: 700
          line-height: 24px
          color: #05FE9F
          text-shadow: 0 4px 4px #8A25C7
    .why-shop
      margin: 80px auto 0px
      .why-shop-title
        width: 900px
        font-size: 48px
        line-height: 62px
        font-weight: 700
        text-align: center
        color: #fff
      .why-shop-subtitle
        font-size: 28px
    .whatsapp
      position: fixed
      bottom: 20px
      right: 20px
      z-index: 100
      a
        img
          width: 56px
          height: 56px
</style>
