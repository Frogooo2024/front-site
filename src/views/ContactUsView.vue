<script setup lang="ts">
import { ref, onMounted } from 'vue'
import HeaderComponent from '../components/HeaderComponent.vue'
import OtherHeader from '@/components/OtherHeader.vue'
import MovePageComponent from '@/components/MorePageComponent.vue'
import ContactUsListItem from '@/components/ContactUsListItem.vue'
import FooterComponent from '@/components/FooterComponent.vue'

import useIsMobile from '../hooks/useIsMobile'

const showFrogoooTitle = ref(false)
const showMorePage = ref(false)
const isMobile = useIsMobile()

onMounted(() => {
  showFrogoooTitle.value = true
})

const onMoreButtonClicked = () => {
  showMorePage.value = true
}
const onCloseButtonClicked = () => {
  showMorePage.value = false
}
const viewPageClicked = () => {
  if (showMorePage.value) {
    showMorePage.value = false
  }
}
</script>

<template>
  <div class="contact-us">
    <MovePageComponent
      v-if="showMorePage"
      @close-button-clicked="onCloseButtonClicked"
      :color-flag="'black'"
    />
    <OtherHeader
      @more-button-clicked="onMoreButtonClicked"
      v-if="isMobile"
      :hasBackgroundColor="true"
    />
    <HeaderComponent currentTab="Contact" v-else />
    <div class="contact-us-wrapper">
      <div class="contact-us-container" @click="viewPageClicked">
        <ContactUsListItem />
      </div>
      <div class="footer" v-if="!isMobile">
        <FooterComponent />
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.contact-us
    background: #030014
@media (min-width: 1024px)
  .contact-us
    height: 100%
    .contact-us-wrapper
      position: relative
      display: flex
      flex-direction: column
      min-height: calc(100% - 56px)
      padding-bottom: 190px
      .footer
        background: url('../assets/icons/2.0x/contact_bg.png')
        background-size: 100% 100%
        position: absolute
        bottom: 0
        left: 0
        right: 0
</style>
