<script setup lang="ts">
import { ref } from 'vue'
import OtherHeader from '@/components/OtherHeader.vue'
import MovePageComponent from '@/components/MorePageComponent.vue'
import ForgetPasswordComponent from '@/components/ForgetPasswordComponent.vue'
import ForgetPasswordComponentRow from '@/components/ForgetPasswordComponentRow.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import HeaderComponent from '../components/HeaderComponent.vue'
import useIsMobile from '../hooks/useIsMobile'

const showMorePage = ref(false)
const isMobile = useIsMobile()

const onMoreButtonClicked = () => {
  showMorePage.value = true
}
const onCloseButtonClicked = () => {
  showMorePage.value = false
}
</script>

<template>
  <div class="forget-password-view">
    <MovePageComponent
      v-if="showMorePage"
      @close-button-clicked="onCloseButtonClicked"
      :color-flag="'black'"
    />
    <OtherHeader @more-button-clicked="onMoreButtonClicked" v-if="isMobile" />
    <HeaderComponent backgroundColor="transparent" :lightIcon="true" v-else />
    <div class="forget-password-view-container">
      <div class="forget-password-view-logo" v-if="isMobile">
        <img src="../assets/icons/other_logo.png" alt="" />
      </div>
      <ForgetPasswordComponent v-if="isMobile" />
      <ForgetPasswordComponentRow v-else />
    </div>
    <FooterComponent v-if="!isMobile" />
  </div>
</template>

<style lang="stylus" scoped>
.forget-password-view
  height: 100%
  width: 100%
  background: url('../assets/icons/sign_up.png') no-repeat
  background-size: 100% 100%
  .forget-password-view-container
    padding: 0 .27rem .27rem
    .forget-password-view-logo
      height: .3rem
      img
        height: 100%
@media (min-width: 1024px)
  .forget-password-view
    background: url('../assets/icons/2.0x/login.png') no-repeat
    background-size: 100% 100%
</style>
