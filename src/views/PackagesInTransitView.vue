<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

import OtherHeaderLight from '../components/OtherHeaderLight.vue'
import MovePageComponent from '../components/MorePageComponent.vue'
import api from '../api/api'

const router = useRouter()
const showMorePage = ref(false)
const orderList = ref<any>()
const showNoData = ref(false)

onMounted(async () => {
  window.scrollTo({ left: 0, top: 0, behavior: 'smooth' })
  document.body.classList.add('background-gray')
  try {
    let response: any = await api.getOrderList({ orderStatus: 0 })
    if (!response?.data?.length) {
      showNoData.value = true
    } else {
      orderList.value = response?.data
    }
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
const packageListItemClicked = (order: any, item: any) => {
  setTimeout(() => {
    router.push({
      name: 'orderDetail',
      params: { orderNumber: order.orderNumber, transportNumber: item.transportNumber }
    })
  }, 80)
}
const viewPageClicked = () => {
  if (showMorePage.value) {
    showMorePage.value = false
  }
}
</script>

<template>
  <div class="order-detail-view">
    <MovePageComponent v-if="showMorePage" @close-button-clicked="onCloseButtonClicked" />
    <OtherHeaderLight @more-button-clicked="onMoreButtonClicked" :has-background-color="true">
    </OtherHeaderLight>
    <div class="order-detail-container" v-if="orderList?.length" @click="viewPageClicked">
      <section class="order-detail-wrapper">
        <p class="order-detail">{{ $t('Frogooo.InTransit') }}</p>
        <div class="whats-app" @click="whatsAppClicked">
          <img src="../assets/icons/whats_app.svg" alt="" />
        </div>
      </section>
      <section class="package-list-item-container" v-for="(order, index) in orderList" :key="index">
        <div
          class="package-list-item"
          v-for="(item, index) in order.packageList"
          :key="index"
          @click="packageListItemClicked(order, item)"
        >
          <div class="list-item">
            <img src="../assets/icons/package.svg" alt="" class="list-item-image" />
            <div class="list-item-wrapper">
              <span class="list-item-detail">{{ item.transportNumber }}</span>
              <span class="list-item-detail">{{ item.goodsTypeName }}</span>
            </div>
          </div>
          <div class="list-item-arrow">
            <img src="../assets/icons/arrow_right.svg" alt="" />
          </div>
        </div>
      </section>
    </div>
    <section class="no-packages" v-if="showNoData" @click="viewPageClicked">
      <span class="no-packages-detail">{{ $t('Frogooo.ContentEmpty') }}</span>
      <img src="../assets//icons/empty.png" alt="" />
    </section>
  </div>
</template>

<style lang="stylus" scoped>
.order-detail-view
  height: 100%
  width: 100%
  overflow-y: auto
  background: #F2F4F8
  .order-detail-container
    margin: .1rem .2rem 0
    display: flex
    flex-direction: column
    color: #0A0A0A
    border-radius: .24rem
    padding: .2rem .2rem .48rem
    background: #fff
    .order-detail-wrapper
      display: flex
      justify-content: space-between
      .order-detail
        width: 2.5rem
        font-size: .24rem
        line-height: .31rem
        font-weight: 500
      .whats-app
        margin-top: .04rem
    .package-list-item-container:nth-of-type(2)
      margin-top: .16rem
    .package-list-item-container
      .package-list-item
        display: flex
        justify-content: space-between
        margin-top: .14rem
        align-items: center
        .list-item
          display: flex
          align-items: center
          justify-content: start
          .list-item-wrapper
            display: flex
            flex-direction: column
            .list-item-detail
              font-size: .14rem
              line-height: .18rem
              font-weight: 500
          .list-item-image
            margin-right: .1rem
    .package-list-item:active
      background: #ccc
  .no-packages
    display: flex
    flex-direction: column
    justify-content: space-between
    align-items: center
    height: calc(100% - .7rem)
    position: relative
    .no-packages-detail
      font-size: .24rem
      line-height: .3rem
      color: rgba(10, 27, 57, 0.35)
      margin-top: 1rem
    img
      position: absolute
      bottom: 0
      left: 0
      right: 0
      width: 100%
</style>
