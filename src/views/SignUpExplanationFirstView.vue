<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import OtherHeaderLight from '@/components/OtherHeaderLight.vue'
import HeaderComponent from '../components/HeaderComponent.vue'
import MovePageComponent from '@/components/MorePageComponent.vue'
import { useUserIdStore } from '@/stores/userId'
import useIsMobile from '../hooks/useIsMobile'

const router = useRouter()
const isMobile = useIsMobile()
const showMorePage = ref(false)
const { userId } = useUserIdStore()

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
  setTimeout(() => {
    router.push({ path: '/signUpExplanationSecond' })
  }, 50)
}
</script>

<template>
  <div class="signup-explanation-first-view">
    <MovePageComponent v-if="showMorePage" @close-button-clicked="onCloseButtonClicked" />
    <OtherHeaderLight @more-button-clicked="onMoreButtonClicked" v-if="isMobile" />
    <HeaderComponent backgroundColor="white" :lightIcon="true" v-else />
    <div class="signup-explanation-first-container">
      <section class="successfully-registered-container">
        <p class="successfully-registered">{{ $t('Frogooo.SuccessfullyRegistered') }}</p>
        <div class="whats-app" @click="whatsAppClicked" v-if="isMobile">
          <img src="../assets/icons/whats_app.svg" alt="" />
        </div>
      </section>
      <div class="user-id">{{ userId }}</div>
      <section class="explanation-detail">
        <p>{{ $t('Frogooo.UniqueIdentificationCode') }}</p>
      </section>
      <div class="skip" @click="skipClicked">{{ $t('Frogooo.Skip') }}</div>
      <div class="signup-image">
        <img src="../assets/icons/signup_inset.png" alt="" v-if="isMobile" />
        <img src="../assets/icons/2.0x/signup_inset.png" alt="" v-else />
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
@media (max-width: 750px)
  .signup-explanation-first-view
    width: 100%
    height: 100%
    background: #fff
    overflow-y: auto
    .signup-explanation-first-container
      margin-top: .1rem
      display: flex
      flex-direction: column
      color: #0A0A0A
      .successfully-registered-container
        display: flex
        padding: 0 .2rem 0 .3rem
        justify-content: space-between
        .successfully-registered
          width: 2.5rem
          font-size: .24rem
          line-height: .26rem
          font-weight: 700
          color: #0A1B39
        .whats-app
          margin-top: .04rem
      .user-id
        margin: .3rem
        padding: .1rem .16rem
        border-radius: .08rem
        background: #05FE9F
        font-size: .2rem
        line-height: .18rem
        font-weight: 600
        color: #0A1B39
        width: fit-content
      .explanation-detail
        margin: 0 .3rem .3rem
        p
          font-size: .16rem
          line-height: .18rem
          color: #0A0A0A
      .skip
        margin: 0 .3rem
        padding: .06rem .24rem
        border-radius: .08rem
        border: 1px solid rgba(10, 27, 57, 0.2)
        font-size: .14rem
        line-height: .18rem
        font-weight: 500
        color: #000
        width: fit-content
      .skip:active
        background: #ccc
      .signup-image
        position: absolute
        bottom: 0
        left: 0
        right: 0
        img
          width: 100%
          height: 100%
@media (min-width: 1024px)
  .signup-explanation-first-view
    height: 100%
    width: 100%
    background: #fff
    overflow-y: auto
    position: relative
    .signup-explanation-first-container
      margin: 80px auto
      display: flex
      flex-direction: column
      width: 1100px
      .successfully-registered-container
        display: flex
        .successfully-registered
          font-size: 60px
          line-height: 72px
          font-weight: 700
          color: #0A1B39
          width: 1000px
      .user-id
        margin: 30px 0
        padding: 10px 16px
        border-radius: 8px
        background: #05FE9F
        font-size: 18px
        line-height: 18px
        font-weight: 700
        color: #0A1B39
        width: fit-content
      .explanation-detail
        margin: 0 0 30px
        p
          font-size: 16px
          line-height: 18px
          color: #0A1B39
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
      .signup-image
        position: absolute
        right: 0
        bottom: 0
        left: unset
        width: 700px
        height: 460px
        img
          width: 700px
          height: 460px
</style>
