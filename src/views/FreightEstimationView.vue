<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import HeaderComponent from '@/components/HeaderComponent.vue'
import OtherHeaderLight from '../components/OtherHeaderLight.vue'
import MovePageComponent from '@/components/MorePageComponent.vue'
import FreightEstimationComponent from '@/components/FreightEstimationComponent.vue'
import FreightEstimationComponentRow from '@/components/FreightEstimationComponentRow.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import useIsMobile from '../hooks/useIsMobile'
import ProhibitionListItems from '../components/ProhibitionListItems.vue'

const showMorePage = ref(false)
const isMobile = useIsMobile()
const showProbitionListItems = ref(false)

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
const onProbitionListItemsClicked = () => {
  showProbitionListItems.value = true
}

onMounted(() => {
  window.scrollTo({ left: 0, top: 0, behavior: 'smooth' })
  document.body.classList.add('background-gray')
})

onUnmounted(() => {
  document.body.classList.remove('background-gray')
})
</script>

<template>
  <div class="freight-estimation-view" v-if="!showProbitionListItems">
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
      currentTab="Shipping Fee Calculation"
      v-else
    />
    <FreightEstimationComponent
      v-if="isMobile"
      @click="viewPageClicked"
      @probition-list-items-clicked="onProbitionListItemsClicked"
    />
    <FreightEstimationComponentRow
      v-else
      @probition-list-items-clicked="onProbitionListItemsClicked"
    />
    <FooterComponent backgroundColor="white" v-if="!isMobile" />
  </div>
  <ProhibitionListItems
    v-if="showProbitionListItems"
    @prohibition-close-clicked="showProbitionListItems = false"
  />
</template>

<style lang="stylus" scoped>
.freight-estimation-view
    background: #F2F4F8
@media (max-width: 750px)
  .freight-estimation-view
    padding-bottom: .84rem
</style>
