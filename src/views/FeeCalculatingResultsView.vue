<script setup lang="ts">
import { ref, onUnmounted, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import OtherHeaderLight from '../components/OtherHeaderLight.vue'
import MovePageComponent from '@/components/MorePageComponent.vue'
import vCurrencyFormat from '../directives/currencyFormat'

const route = useRoute()
const cost = route.params.cost
const weight = route.params.weight

const showMorePage = ref(false)

onMounted(() => {
  document.body.classList.add('background-gray')
})

onUnmounted(() => {
  document.body.classList.remove('background-gray')
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
  <div class="fee-result-view">
    <MovePageComponent v-if="showMorePage" @close-button-clicked="onCloseButtonClicked" />
    <OtherHeaderLight @more-button-clicked="onMoreButtonClicked" :hasBackgroundColor="true" />
    <section class="result" @click="viewPageClicked">
      <h1 class="result-title">{{ $t('Frogooo.FeeResults') }}</h1>
      <div class="result-container">
        <h3 class="result-container-title">{{ $t('Frogooo.FeeResults') }}</h3>
        <span class="result-container-detail" v-currency-format="cost"></span>
      </div>
      <div class="result-container">
        <h3 class="result-container-title">{{ $t('Frogooo.ChargedWeight') }}</h3>
        <span class="result-container-detail">{{ weight }}</span>
      </div>
    </section>
    <section class="result-warn" @click="viewPageClicked">
      <img src="../assets/icons/warning_light.svg" alt="" />
      <div class="result-warn-container">
        <p class="result-warn-detail">{{ $t('Frogooo.Conditions') }}</p>
        <p class="result-warn-detail">{{ $t('Frogooo.CustomerService') }}</p>
      </div>
    </section>
  </div>
</template>

<style lang="stylus" scoped>
.fee-result-view
  background: #F2F4F8
  height: 100%
  .result
    display: flex
    flex-direction: column
    margin: 0 .2rem
    padding: .24rem .2rem
    border-radius: .24rem
    background: #fff
    .result-title
      font-size: .2rem
      line-height: .22rem
      font-weight: 500
      color: #0A1B39
    .result-container
      display: flex
      flex-direction: column
      margin-top: .2rem
      .result-container-title
        font-size: .14rem
        line-height: .26rem
        color: rgba(10, 27, 57, 0.6)
      .result-container-detail
        font-size: .24rem
        line-height: .28rem
        font-weight: 500
        color: #0A1B39
  .result-warn
    display: flex
    margin: .2rem
    padding: 0 .2rem .2rem
    align-items: start
    .result-warn-container
      margin-left: .05rem
      .result-warn-detail
        font-size: .14rem
        line-height: .18rem
        color: rgba(10, 27, 57, 0.6)
      .result-warn-detail:nth-of-type(2)
        margin-top: .2rem
</style>
