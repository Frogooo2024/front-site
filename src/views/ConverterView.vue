<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import OtherHeaderLight from '../components/OtherHeaderLight.vue'
import HeaderComponent from '@/components/HeaderComponent.vue'
import MovePageComponent from '@/components/MorePageComponent.vue'
import ConverterComponent from '@/components/ConverterComponent.vue'
import ConverterRowComponent from '@/components/ConverterRowComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import useIsMobile from '../hooks/useIsMobile'

const showMorePage = ref(false)
const isMobile = useIsMobile()

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

onMounted(() => {
  document.body.classList.add('background-gray')
})

onUnmounted(() => {
  document.body.classList.remove('background-gray')
})
</script>

<template>
  <div class="converter-view">
    <MovePageComponent v-if="showMorePage" @close-button-clicked="onCloseButtonClicked" />
    <OtherHeaderLight
      @more-button-clicked="onMoreButtonClicked"
      :has-background-color="true"
      v-if="isMobile"
    >
    </OtherHeaderLight>
    <HeaderComponent
      @more-button-clicked="onMoreButtonClicked"
      backgroundColor="white"
      :lightIcon="true"
      currentTab="Converter"
      v-else
    />
    <ConverterComponent v-if="isMobile" @click="viewPageClicked" />
    <ConverterRowComponent v-else />
    <div v-if="!isMobile" class="footer">
      <FooterComponent backgroundColor="white" />
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.converter-view
  background: #F2F4F8
  height: 100%
  overflow-y: auto
  .footer
    position: absolute
    bottom: 0
    left: 0
    right: 0
</style>
