<script setup lang="ts">
import { ref } from 'vue'
import OtherHeader from '../components/OtherHeader.vue'
import MovePageComponent from '@/components/MorePageComponent.vue'
import LoginComponent from '@/components/LoginComponent.vue'
import LoginComponentRow from '@/components/LoginComponentRow.vue'
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
  <div class="login-view">
    <MovePageComponent
      v-if="showMorePage"
      @close-button-clicked="onCloseButtonClicked"
      :color-flag="'black'"
    />
    <OtherHeader v-if="isMobile" @more-button-clicked="onMoreButtonClicked" />
    <HeaderComponent backgroundColor="transparent" :lightIcon="true" v-else />
    <div class="login-view-container">
      <div class="glow"></div>
      <div class="reflection"></div>
      <div class="login-view-logo" v-if="isMobile">
        <img src="../assets/icons/other_logo.png" alt="" />
      </div>
      <LoginComponent v-if="isMobile" />
      <LoginComponentRow v-else />
    </div>
    <FooterComponent v-if="!isMobile" />
  </div>
</template>

<style lang="stylus" scoped>
@media (max-width: 750px)
  .login-view
    height: 100%
    width: 100%
    background: url('../assets/icons/login.png') no-repeat
    background-size: 100% 100%
    .login-view-container
      padding: 0 .27rem .27rem
      .login-view-logo
        height: .3rem
        img
          height: 100%
@media (min-width: 1024px)
  .login-view
    background: url('../assets/icons/2.0x/login.png') no-repeat
    background-size: 100% 100%
</style>
