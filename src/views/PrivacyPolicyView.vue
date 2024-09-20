<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import OtherHeaderLight from '../components/OtherHeaderLight.vue'
import HeaderComponent from '@/components/HeaderComponent.vue'
import MovePageComponent from '@/components/MorePageComponent.vue'
import PrivacyPolicyComponent from '@/components/PrivacyPolicyComponent.vue'
import PrivacyPolicyRowComponent from '@/components/PrivacyPolicyRowComponent.vue'
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
      v-else
    />

    <!-- Privacy Policy Section -->
    <PrivacyPolicyComponent v-if="isMobile" @click="viewPageClicked" />
    <PrivacyPolicyRowComponent v-else />

    <div v-if="!isMobile" class="footer">
      <FooterComponent backgroundColor="white" />
    </div>
  </div>
</template>

<style lang="stylus" scoped>

.footer
  position: absolute
  bottom: 0
  left: 0
  right: 0

a {
  color: #333;
  text-decoration: underline;
  cursor: pointer;
  margin-top: 20px;
  margin-bottom: 50px;
  display: inline-block;
}
</style>
