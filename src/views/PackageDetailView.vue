<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

import OtherHeaderLight from '../components/OtherHeaderLight.vue'
import MovePageComponent from '../components/MorePageComponent.vue'
import { showImagePreview } from 'vant'
import api from '../api/api'

import 'vant/lib/index.css'

const route = useRoute()
const showMorePage = ref(false)

const packageDetail = ref<any>()

const showNoData = ref(false)

const imgSrc = route.params.img as string

onMounted(async () => {
  document.body.classList.add('background-gray')
  try {
    let response: any = await api.getPackageDetail({
      transportNumber: route.params.transportNumber
    })
    if (response?.status) {
      packageDetail.value = response.data.packagesinfo
    } else {
      showNoData.value = true
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
const imageClicked = () => {
  showImagePreview({
    images: [imgSrc],
    showIndex: false
  })
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
      v-if="packageDetail?.transportNumber?.length"
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
        <span class="package-item-title">{{ $t('Frogooo.Weight') }}</span>
        <span class="package-item-subtitle">{{ packageDetail.weight }}</span>
      </section>
      <section class="package-item-image-wrapper" v-if="imgSrc.length > 0">
        <img :src="imgSrc" alt="" @click="imageClicked" />
      </section>
    </div>
    <section class="no-packages" v-if="showNoData">
      <span class="no-packages-detail">{{ $t('Frogooo.ContentEmpty') }}</span>
      <img src="../assets/icons/empty.png" alt="" />
    </section>
  </div>
</template>

<style lang="stylus" scoped>
.package-detail-view
  height: 100%
  width: 100%
  overflow-y: auto
  background: #F2F4F8
  .package-detail-container
    margin: 0 .2rem 0
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
    .package-item-image-wrapper
      margin-top: .2rem
      img
        width: .56rem
        height: .56rem
        border-radius: .08rem
    .package-list-item-container
      margin-top: .3rem
      padding-bottom: .8rem
      .selected-container
        display: flex
        justify-content: start
        align-items: center
        .selected
          margin-right: .03rem
        .selected, .selected-amount
          font-size: .14rem
          line-height: .18rem
          font-weight: 500
      .package-list-item
        display: flex
        justify-content: space-between
        margin-top: .2rem
        align-items: center
        .list-item
          display: flex
          align-items: center
          justify-content: start
          .list-item-image
            margin-right: .1rem
          .list-item-wrapper
            display: flex
            flex-direction: column
            align-items: start
            .list-item-detail
              font-size: .14rem
              line-height: .18rem
              font-weight: 500
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
