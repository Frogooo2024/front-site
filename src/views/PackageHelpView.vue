<script setup lang="ts">
import { ref, onUnmounted, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import OtherHeaderLight from '../components/OtherHeaderLight.vue'
import MovePageComponent from '../components/MorePageComponent.vue'
import HeaderComponent from '../components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import useIsMobile from '../hooks/useIsMobile'

const router = useRouter()
const showMorePage = ref(false)
const isMobile = useIsMobile()
const eventName = isMobile ? ref('touchend') : ref('click')

onMounted(() => {
  document.body.classList.add('background-white')
})

onUnmounted(() => {
  document.body.classList.remove('background-white')
})

const onMoreButtonClicked = () => {
  showMorePage.value = true
}
const onCloseButtonClicked = () => {
  showMorePage.value = false
}
const whatsAppClicked = () => {
  window.open('https://wa.me/message/UGN2RVXLNV4LH1', '_blank')
}

const goBack = () => {
  router.go(-1)
}

const viewPageClicked = () => {
  if (showMorePage.value) {
    showMorePage.value = false
  }
}
</script>

<template>
  <div class="package-help-view">
    <MovePageComponent v-if="showMorePage" @close-button-clicked="onCloseButtonClicked" />
    <OtherHeaderLight @more-button-clicked="onMoreButtonClicked" v-if="isMobile">
    </OtherHeaderLight>
    <HeaderComponent backgroundColor="white" :lightIcon="true" v-else />
    <div class="package-help-wrapper">
      <div class="package-help-container" @click="viewPageClicked">
        <section class="select-address-container">
          <p class="select-address">{{ $t('Frogooo.FindTheTrackingNumber') }}</p>
        </section>
        <section class="item-wrapper">
          <p class="item-title">{{ $t('Frogooo.PackageHelpOne') }}</p>
          <p class="item-title">{{ $t('Frogooo.PackageHelpTwo') }}</p>
          <p class="item-title">{{ $t('Frogooo.PackageHelpThree') }}</p>
          <p class="item-title">{{ $t('Frogooo.PackageHelpFour') }}</p>
          <div class="item-title-wrapper">
            <p class="item-title">{{ $t('Frogooo.PleaseContact') }}</p>
            <div class="whats-app" @click="whatsAppClicked" v-if="isMobile">
              <img src="../assets/icons/whats_app.svg" alt="" />
            </div>
          </div>
        </section>
        <section class="item-submit">
          <button class="item-submit-button" v-on:[eventName]="goBack">
            {{ $t('Frogooo.OK') }}
          </button>
        </section>
      </div>
      <div v-if="!isMobile">
        <FooterComponent backgroundColor="white" />
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
@media (max-width: 750px)
  .package-help-view
    width: 100%
    background: #fff
    height: 100%
    overflow-y: auto
    padding-bottom: .84rem
    .package-help-container
        margin: .1rem 0
        display: flex
        flex-direction: column
        color: #000
        border-radius: .24rem
        padding: .2rem .4rem
        background: #fff
        .select-address-container
            display: flex
            justify-content: space-between
            .select-address
                font-size: .24rem
                line-height: .31rem
                font-weight: 500
        .item-wrapper
            margin-top: .4rem
            .item-title-wrapper
              display: flex
              justify-content: space-between
              align-items: center
              .whats-app
                margin-top: .1rem
            .item-title
                font-size: .14rem
                line-height: .18rem
                color: #0A0A0A
                margin-top: .1rem
        .item-submit
            margin-top: .8rem
            .item-submit-button
                border-radius: .16rem
                padding: .12rem .24rem
                text-align: center
                background: #05FE9F
                color: #0A1B39
                font-size: .18rem
                line-height: .24rem
                font-weight: 500
                width: 100%
            .item-submit-button:active
                background: #e9ecef
                transform: scale(0.99)
@media (min-width: 1024px)
  .package-help-view
      width: 100%
      background: #fff
      height: 100%
      overflow-y: auto
      .package-help-wrapper
        position: relative
        display: flex
        flex-direction: column
        min-height: calc(100% - 56px)
        .footer
          position: absolute
          bottom: 0
          left: 0
          right: 0
        .package-help-container
          margin: 48px auto
          display: flex
          flex-direction: column
          width: 800px
          color: #000
          border-radius: 24px
          padding: 48px
          background: #fff
          .select-address-container
              display: flex
              justify-content: space-between
              .select-address
                  font-size: 26px
                  line-height: 31px
                  font-weight: 700
                  text-align: center
                  width: 100%
          .item-wrapper
              margin-top: 40px
              .item-title
                  font-size: 14px
                  line-height: 18px
                  color: #0A0A0A
                  margin-top: 20px
          .item-submit
              margin: 48px auto 0
              .item-submit-button
                  border-radius: 16px
                  text-align: center
                  background: #05FE9F
                  color: #0A1B39
                  font-size: 20px
                  line-height: 28px
                  font-weight: 500
                  width: 400px
                  height: 48px
              .item-submit-button:active
                  background: #e9ecef
                  transform: scale(0.99)
</style>
