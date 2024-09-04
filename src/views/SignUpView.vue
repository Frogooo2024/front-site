<script setup lang="ts">
import { ref } from 'vue'
import OtherHeader from '@/components/OtherHeader.vue'
import MovePageComponent from '@/components/MorePageComponent.vue'
import SignUpComponent from '@/components/SignUpComponent.vue'
import SignUpComponentRow from '@/components/SignUpComponentRow.vue'
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
  <div class="signup-view">
    <MovePageComponent
      v-if="showMorePage"
      @close-button-clicked="onCloseButtonClicked"
      :color-flag="'black'"
    />
    <OtherHeader @more-button-clicked="onMoreButtonClicked" v-if="isMobile" />
    <HeaderComponent backgroundColor="transparent" :lightIcon="true" v-else />
    <div class="login-view-container">
      <div class="login-view-logo" v-if="isMobile">
        <img src="../assets/icons/other_logo.png" alt="" />
      </div>
      <SignUpComponent v-if="isMobile" />
      <SignUpComponentRow v-else />
    </div>
    <FooterComponent v-if="!isMobile" />
  </div>
</template>

<style lang="stylus" scoped>
.signup-view
  height: 100%
  width: 100%
  background: url('../assets/icons/sign_up.png') no-repeat
  background-size: 100% 100%
  .login-view-container
    padding: 0 .27rem .27rem
    .login-view-logo
      height: .3rem
      img
        height: 100%
@media (min-width: 1024px)
  .signup-view
    background: url('../assets/icons/2.0x/login.png') no-repeat
    background-size: 100% 100%
</style>
