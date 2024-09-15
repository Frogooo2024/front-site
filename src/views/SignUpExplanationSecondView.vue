<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import OtherHeaderLight from '@/components/OtherHeaderLight.vue'
import HeaderComponent from '../components/HeaderComponent.vue'
import MovePageComponent from '@/components/MorePageComponent.vue'
import useIsMobile from '../hooks/useIsMobile'

const router = useRouter()
const isMobile = useIsMobile()
const showMorePage = ref(false)
const eventName = isMobile ? ref('touchend') : ref('click')

const onMoreButtonClicked = () => {
  showMorePage.value = true
}
const onCloseButtonClicked = () => {
  showMorePage.value = false
}
const whatsAppClicked = () => {
  window.open('https://wa.me/message/UGN2RVXLNV4LH1', '_blank')
}
const skipClicked = () => {
  router.push({ path: '/signUpExplanationThird' })
}

const singaporeConsigneeClicked = () => {
  router.push({ path: '/singaporeAddress' })
}
</script>

<template>
  <div class="signup-explanation-second-view">
    <MovePageComponent v-if="showMorePage" @close-button-clicked="onCloseButtonClicked" />
    <OtherHeaderLight @more-button-clicked="onMoreButtonClicked" v-if="isMobile" />
    <HeaderComponent backgroundColor="white" :lightIcon="true" v-else />
    <div class="signup-explanation-second-container">
      <section class="overseas-shopping-package-container">
        <p class="overseas-shopping-package">{{ $t('Frogooo.OverseasShoppingPackage') }}</p>
        <div class="whats-app" @click="whatsAppClicked" v-if="isMobile">
          <img src="../assets/icons/whats_app.svg" alt="" />
        </div>
      </section>
      <section class="explanation-detail">
        <p>{{ $t('Frogooo.FavoriteEcommerce') }}</p>
      </section>
      <section class="singapore-consignee-container">
        <div class="consignee-container" v-on:[eventName]="singaporeConsigneeClicked">
          {{ $t('Frogooo.SingaporeConsignee') }}
        </div>
        <div class="skip" v-on:[eventName]="skipClicked">{{ $t('Frogooo.Skip') }}</div>
      </section>
      <div class="singapore-image">
        <img src="../assets/icons/singapore_inset.png" alt="" v-if="isMobile" />
        <img src="../assets/icons/2.0x/singapore_inset.png" alt="" v-else />
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
@media (max-width: 750px)
  .signup-explanation-second-view
    height: 100%
    width: 100%
    background: #fff
    .signup-explanation-second-container
      margin-top: .1rem
      display: flex
      flex-direction: column
      color: #0A0A0A
      .overseas-shopping-package-container
        display: flex
        padding: 0 .2rem 0 .3rem
        justify-content: space-between
        .overseas-shopping-package
          width: 2.5rem
          font-size: .24rem
          line-height: .26rem
          font-weight: 700
          color: #0A1B39
        .whats-app
          margin-top: .07rem
      .explanation-detail
        margin: .3rem .3rem 0
        p
          font-size: .16rem
          line-height: .18rem
          color: #0A0A0A
      .singapore-consignee-container
        margin: .3rem
        display: flex
        justify-content: space-between
        .consignee-container
          padding: .1rem
          border-radius: .08rem
          font-size: .14rem
          line-height: .18rem
          font-weight: 500
          color: #fff
          background: #000
          width: fit-content
        .consignee-container:active
          background: rgba(0, 0, 0, 0.3)
        .skip
          padding: .1rem .24rem
          border-radius: .08rem
          border: 1px solid rgba(10, 27, 57, 0.2)
          font-size: .14rem
          line-height: .18rem
          font-weight: 500
          color: #000
          width: fit-content
        .skip:active
          background: #ccc
      .singapore-image
        position: absolute
        bottom: 0
        left: 0
        right: 0
        img
          width: 100%
          height: 100%
@media (min-width: 1024px)
  .signup-explanation-second-view
    height: 100%
    width: 100%
    background: #fff
    position: relative
    .signup-explanation-second-container
      margin: 80px auto
      display: flex
      flex-direction: column
      width: 1100px
      .overseas-shopping-package-container
        .overseas-shopping-package
          font-size: 60px
          line-height: 72px
          font-weight: 700
          color: #0A1B39
          width: 1000px
      .explanation-detail
        margin: 30px 0 0
        p
          font-size: 16px
          line-height: 18px
          color: #0A1B39
      .singapore-consignee-container
        margin-top: 30px
        display: flex
        justify-content: start
        .consignee-container
          padding: 0 24px
          border-radius: 16px
          font-size: 18px
          line-height: 48px
          font-weight: 500
          color: #fff
          background: #000
          width: fit-content
          margin-right: 20px
        .skip
          padding: 0 24px
          border-radius: 16px
          border: 1px solid rgba(10, 27, 57, 0.2)
          font-size: 18px
          line-height: 48px
          font-weight: 500
          color: #0A1B39
          width: fit-content
          width: 200px
          height: 48px
          text-align: center
        .skip:hover
          background: rgba(10, 27, 57, 0.1)
      .singapore-image
        position: absolute
        bottom: 0
        left: unset
        right: 0
        width: 700px
        height: 460px
        img
          width: 700px
          height: 460px
</style>
