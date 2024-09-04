<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import OtherHeaderLight from '../components/OtherHeaderLight.vue'
import MovePageComponent from '../components/MorePageComponent.vue'
import HeaderComponent from '../components/HeaderComponent.vue'
import useIsMobile from '../hooks/useIsMobile'
import FooterComponent from '@/components/FooterComponent.vue'

const router = useRouter()
const showMorePage = ref(false)
const isMobile = useIsMobile()
const onMoreButtonClicked = () => {
  showMorePage.value = true
}
const onCloseButtonClicked = () => {
  showMorePage.value = false
}
const buttonClicked = () => {
  router.push({ path: '/userCenter' })
}
</script>

<template>
  <div class="payment-status-view">
    <MovePageComponent v-if="showMorePage" @close-button-clicked="onCloseButtonClicked" />
    <OtherHeaderLight @more-button-clicked="onMoreButtonClicked" v-if="isMobile"></OtherHeaderLight>
    <HeaderComponent backgroundColor="white" :lightIcon="true" v-else />
    <div class="payment-status-container">
      <img src="../assets/icons/successfully.png" alt="" class="payment-image" />
      <h1 class="payment-title">{{ $t('Frogooo.Payment') }}</h1>
      <h1 class="payment-title">{{ $t('Frogooo.Successfully') }}</h1>
      <button class="payment-button" @click="buttonClicked">{{ $t('Frogooo.OK') }}</button>
    </div>
    <div class="footer">
      <FooterComponent backgroundColor="white" v-if="!isMobile" />
    </div>
  </div>
</template>

<style lang="stylus" scoped>
@media (max-width: 750px)
  .payment-status-view
    width: 100%
    height: 100%
    background: #fff
    .payment-status-container
      display: flex
      flex-direction: column
      align-items: center
      padding: 0 .2rem
      .payment-image
          margin-top: 1rem
          width: 1.3rem
          height: 1.3rem
      .payment-title
          font-size: .24rem
          line-height: .29rem
          font-weight: 700
          color: #0A1B39
      .payment-title:nth-of-type(1)
          margin-top: .2rem
      .payment-button
          border-radius: .16rem
          padding: .12rem .24rem
          color: #0A1B39
          text-align: center
          font-size: .18rem
          line-height: .24rem
          width: 100%
          background: #05FE9F
          margin-top: .5rem
      .payment-button:active
          background: #e9ecef
          transform: scale(0.99)
@media (min-width: 1024px)
  .payment-status-view
      width: 100%
      height: 100%
      overflow-y: auto
      background: #F2F4F8
      .payment-status-container
        width: 335px
        margin: 90px auto
        display: flex
        flex-direction: column
        align-items: center
        .payment-image
            margin-top: 10px
            width: 130px
            height: 130px
        .payment-title
            font-size: 24px
            line-height: 29px
            font-weight: 700
            color: #0A1B39
        .payment-title:nth-of-type(1)
            margin-top: 20px
        .payment-button
            border-radius: 16px
            padding: 12px 24px
            color: #0A1B39
            text-align: center
            font-size: 18px
            line-height: 21px
            width: 335px
            background: #05FE9F
            margin-top: 50px
        .payment-button:active
            background: #e9ecef
            transform: scale(0.99)
    .footer
      position: absolute
      bottom: 0
      left: 0
      right: 0
</style>
