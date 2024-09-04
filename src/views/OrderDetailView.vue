<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

import OtherHeaderLight from '../components/OtherHeaderLight.vue'
import MovePageComponent from '../components/MorePageComponent.vue'
import { Step, Steps } from 'vant'
import api from '../api/api'
import vCurrencyFormat from '../directives/currencyFormat'

import 'vant/lib/index.css'

const route = useRoute()
const showMorePage = ref(false)

const orderDetail = ref<any>()

const showNoData = ref(false)

const { orderNumber, transportNumber } = route.params

const packageDetail = ref<any>()
const orderLogs = ref<any>()

onMounted(async () => {
  document.body.classList.add('background-gray')
  try {
    Promise.all([
      api.orderDetail({ orderNumber: orderNumber }),
      api.getOrderLogs({ orderNumber: orderNumber })
    ]).then(
      (response: any) => {
        if (response[0].status && response[1].status) {
          orderDetail.value = response[0].data
          packageDetail.value = orderDetail.value.packageList.find((item: any) => {
            return item.transportNumber == transportNumber
          })
          orderLogs.value = response[1].data
        } else {
          showNoData.value = true
        }
      },
      (e: any) => {
        showNoData.value = true
      }
    )
  } catch (e) {
    showNoData.value = true
  }
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
const whatsAppClicked = () => {
  window.open('https://wa.me/message/UGN2RVXLNV4LH1', '_blank')
}
const viewPageClicked = () => {
  if (showMorePage.value) {
    showMorePage.value = false
  }
}
</script>

<template>
  <div class="package-detail-view">
    <MovePageComponent v-if="showMorePage" @close-button-clicked="onCloseButtonClicked" />
    <OtherHeaderLight @more-button-clicked="onMoreButtonClicked" :has-background-color="true">
    </OtherHeaderLight>
    <div
      class="package-detail-container"
      v-if="orderDetail?.orderNumber?.length"
      @click="viewPageClicked"
    >
      <section class="package-detail-wrapper">
        <p class="package-detail-title">{{ $t('Frogooo.PackageDetails') }}</p>
        <div class="whats-app" @click="whatsAppClicked">
          <img src="../assets/icons/whats_app.svg" alt="" />
        </div>
      </section>
      <section class="package-item-wrapper">
        <span class="package-item-detail">{{ packageDetail.transportNumber }}</span>
        <span class="package-item-detail">{{ packageDetail.goodsTypeName }}</span>
        <span class="order-item-title">{{ $t('Frogooo.PaymentOrderNumber') }}</span>
        <span class="order-item-subtitle">{{ orderDetail.orderNumber }}</span>
        <span class="order-price-title">{{ $t('Frogooo.Price') }}</span>
        <span class="order-price-subtitle" v-currency-format="orderDetail.pric"></span>
      </section>
      <section class="package-status-wrapper">
        <h2 class="package-status-title">{{ $t('Frogooo.PackageStatus') }}</h2>
        <Steps direction="vertical" :active="0" v-if="orderLogs?.length">
          <Step v-for="(logItem, index) in orderLogs" :key="index">
            <h3>{{ logItem.title }}</h3>
            <p>{{ logItem.updateTime }}</p>
          </Step>
          <Step>
            <h3>{{ $t('Frogooo.CustomsCleared') }}</h3>
          </Step>
          <Step>
            <h3>{{ $t('Frogooo.DeliveryInProgress') }}</h3>
          </Step>
        </Steps>
      </section>
    </div>
    <section class="no-packages" v-if="showNoData" @click="viewPageClicked">
      <span class="no-packages-detail">{{ $t('Frogooo.ContentEmpty') }}</span>
      <img src="../assets//icons/empty.png" alt="" />
    </section>
  </div>
</template>

<style lang="stylus" scoped>
.package-detail-view
  height: 100%
  width: 100%
  overflow-y: auto
  background: #F2F4F8
  padding-bottom: .84rem
  .package-detail-container
    margin: .1rem .2rem 0
    display: flex
    flex-direction: column
    color: #000
    border-radius: .24rem
    padding: .24rem .2rem
    background: #fff
    .package-detail-wrapper
      display: flex
      justify-content: space-between
      .package-detail-title
        width: 2.5rem
        font-size: .24rem
        line-height: .31rem
        font-weight: 500
      .whats-app
        margin-top: .04rem
    .package-item-wrapper
      display: flex
      flex-direction: column
      margin-top: .3rem
      .package-item-detail
        font-size: .18rem
        line-height: .23rem
        font-weight: 500
        color: #0A1B39
      .package-item-title
        margin-top: .2rem
        font-size: .14rem
        line-height: .26rem
        color: rgba(10, 27, 57, 0.6)
      .package-item-subtitle
        font-size: .2rem
        line-height: .28rem
        font-weight: 500
        color: #0A1B39
      .order-item-title
        margin-top: .2rem
        font-size: .14rem
        line-height: .16rem
        color: rgba(10, 27, 57, 0.6)
      .order-item-subtitle
        font-size: .14rem
        line-height: .16rem
        color: rgba(10, 27, 57, 0.6)
      .order-price-title
        margin-top: .14rem
        font-size: .14rem
        line-height: .26rem
        color: rgba(10, 27, 57, 0.6)
      .order-price-subtitle
        font-size: .2rem
        line-height: .28rem
        font-weight: 500
        color: 0A1B39
    .package-status-wrapper
        margin-top: .3rem
        .package-status-title
            font-size: .18rem
            line-height: .23
            font-weight: 500
            color: #0A1B39
            margin-bottom: .3rem
  .no-packages
    display: flex
    flex-direction: column
    justify-content: space-between
    align-items: center
    height: 90%
    .no-packages-detail
      font-size: .24rem
      line-height: .3rem
      color: rgba(10, 27, 57, 0.35)
      margin-top: 1rem
    img
      width: 100%
</style>
