<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import OtherHeaderLight from '../components/OtherHeaderLight.vue'
import MovePageComponent from '../components/MorePageComponent.vue'
import HeaderComponent from '../components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import { useAddressStore } from '@/stores/address'
import { showDialog } from 'vant'
import { useI18n } from 'vue-i18n'
import api from '../api/api'
import useIsMobile from '../hooks/useIsMobile'

import 'vant/lib/index.css'

const router = useRouter()
const showMorePage = ref(false)
const isMobile = useIsMobile()

const packageList = ref<any>()
const addressDetail = ref<any>()

const showNoData = ref(false)
const sendInProgress = ref(false)
const showPreview = ref(false)
let { selectedData } = useAddressStore()

const { t } = useI18n()

onMounted(async () => {
  document.body.classList.add('background-gray')
  try {
    Promise.all([api.getPackageList({ packageStatus: 2 }), api.getAddressUser()]).then(
      (response: any) => {
        if (response[0].status && response[1].status) {
          packageList.value = response[0]
          if (!packageList.value?.rows?.length) {
            showNoData.value = true
          }
          addressDetail.value = response[1].data?.find((item: any) => {
            return item.isDefault == 'Y'
          })
          if (!addressDetail.value) {
            addressDetail.value = response[1].data[response[1].data.length - 1]
          }
          if (selectedData.id && selectedData.id != addressDetail.value?.id) {
            addressDetail.value = response[1].data.find((item: any) => {
              return item.id == selectedData.id
            })
          }
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

const showMorePackagesArrowClicked = (item: any) => {
  item.showMore = !item.showMore
}

const transportNumberArr = computed(() => {
  return packageList.value?.rows?.filter((item: any) => {
    return item.selected == true
  })
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

const itemSelectClicked = (item: any) => {
  setTimeout(() => {
    item.selected = !item.selected
  }, 50);
}

const packageListItemClicked = (item: any) => {
  if (!isMobile) {
    return
  }
  let img: string = ''
  if (item.photoList != null) {
    img = item.photoList[0].img
  }
  router.push({
    name: 'packageDetail',
    params: { transportNumber: item.transportNumber, img: img }
  })
}

const currentImage = ref('')

const closePreview = () => {
  showPreview.value = false
}

const imageClicked = (img: any) => {
  currentImage.value = img
  showPreview.value = true
}

const editAddressClicked = () => {
  router.push({ path: '/addressList' })
}

const confirmAndPayClicked = async () => {
  if (transportNumberArr.value && transportNumberArr.value.length) {
    let transportNumberList = transportNumberArr.value.map((item: any) => {
      return item.transportNumber
    })
    if (!sendInProgress.value) {
      sendInProgress.value = true
      let response: any = await api.order({
        transportList: transportNumberList,
        line: { id: 1 },
        address: { id: addressDetail.value?.id }
      })
      if (response.status) {
        router.push({ name: 'payment', params: { orderNumber: response.msg } })
      } else {
        showDialog({ message: response.msg, confirmButtonText: t('Frogooo.OK') })
      }
      sendInProgress.value = false
    }
  }
}

const viewPageClicked = () => {
  if (showMorePage.value) {
    showMorePage.value = false
  }
}
</script>

<template>
  <div class="package-in-warehouse-view">
    <MovePageComponent v-if="showMorePage" @close-button-clicked="onCloseButtonClicked" />
    <OtherHeaderLight
      @more-button-clicked="onMoreButtonClicked"
      :has-background-color="true"
      v-if="isMobile"
    >
    </OtherHeaderLight>
    <HeaderComponent backgroundColor="white" :lightIcon="true" v-else />
    <div class="package-list-wrapper">
      <div
        class="package-in-warehouse-container"
        v-if="packageList?.rows?.length"
        @click="viewPageClicked"
      >
        <section class="package-in-warehouse-wrapper">
          <p class="package-in-warehouse">{{ $t('Frogooo.ArrivedAt') }}</p>
          <div class="whats-app" @click="whatsAppClicked" v-if="isMobile">
            <img src="../assets/icons/whats_app.svg" alt="" />
          </div>
        </section>
        <section class="package-list-item-container">
          <div class="selected-container">
            <span class="selected">{{ $t('Frogooo.Selected') }}</span>
            <span class="selected-amount"
              >({{ transportNumberArr?.length }}/{{ packageList.rows.length }})</span
            >
          </div>
          <div
            v-for="(item, index) in packageList.rows"
            :key="index"
            class="package-list-item-wrapper"
          >
            <div class="package-list-item">
              <div class="list-item" @click="itemSelectClicked(item)">
                <img
                  src="../assets/icons/unselected.svg"
                  alt=""
                  class="list-item-image"
                  v-if="!item.selected"
                />
                <img
                  src="../assets/icons/selected.svg"
                  alt=""
                  class="list-item-image"
                  v-if="item.selected"
                />
                <div class="list-item-wrapper">
                  <span class="list-item-detail">{{ item.transportNumber }}</span>
                  <span class="list-item-detail">{{ item.goodsTypeName }}</span>
                </div>
              </div>
              <div class="list-item-arrow">
                <img
                  src="../assets/icons/arrow_right.svg"
                  alt=""
                  v-if="isMobile"
                  @click="packageListItemClicked(item)"
                />
                <img
                  src="../assets/icons/arrow_down.svg"
                  alt=""
                  v-if="!isMobile && !item.showMore"
                  @click="showMorePackagesArrowClicked(item)"
                />
                <img
                  src="../assets/icons/arrow_up.svg"
                  alt=""
                  v-if="!isMobile && item.showMore"
                  @click="showMorePackagesArrowClicked(item)"
                />
              </div>
            </div>
            <div class="package-list-item-detail" v-if="item.showMore && !isMobile">
              <img
                :src="item.photoList[0].img"
                alt=""
                class="package-image"
                v-if="item.photoList != null && item.photoList.length && item.photoList[0].img"
                @click="imageClicked(item.photoList[0].img)"
              />
              <div class="package-number-wrapper">
                <h3 class="package-number">{{ item.transportNumber }}</h3>
                <h3 class="package-type">{{ item.goodsTypeName }}</h3>
              </div>
              <div class="package-weight-wrapper">
                <h3 class="package-weight-title">{{ $t('Frogooo.Weight') }}</h3>
                <span class="package-weight">{{ item.weight }}</span>
              </div>
            </div>
          </div>
        </section>
        <section class="address-container" v-if="addressDetail?.name.length">
          <h3 class="address-title">{{ $t('Frogooo.ConfirmReceivingAddress') }}</h3>
          <p class="address-detail">
            {{ addressDetail.name }}, {{ addressDetail.phone }}, {{ addressDetail.province }},
            {{ addressDetail.city }},{{ addressDetail.county }}, {{ addressDetail.address }}
          </p>
          <span class="address-edit" @click="editAddressClicked">{{ $t('Frogooo.Edit') }}</span>
        </section>
        <section v-if="packageList?.rows?.length" class="confirm-and-pay-wrapper">
          <button
            @touchstart="confirmAndPayClicked"
            class="confirm-and-pay"
            :class="{
              'confirm-and-pay-disable': !transportNumberArr || !transportNumberArr?.length
            }"
            v-if="isMobile"
          >
            {{ $t('Frogooo.ConfirmAndPay') }}
          </button>
          <button
            @click="confirmAndPayClicked"
            class="confirm-and-pay"
            :class="{
              'confirm-and-pay-disable': !transportNumberArr || !transportNumberArr?.length
            }"
            v-else
          >
            {{ $t('Frogooo.ConfirmAndPay') }}
          </button>
        </section>
      </div>
      <section class="no-packages" v-if="showNoData && isMobile">
        <span class="no-packages-detail">{{ $t('Frogooo.ContentEmpty') }}</span>
        <img src="../assets//icons/empty.png" alt="" />
      </section>
      <section class="no-packages" v-if="showNoData && !isMobile">
        <span class="no-packages-detail">{{ $t('Frogooo.ContentEmpty') }}</span>
        <img src="../assets/icons/address_empty.png" alt="" />
      </section>
      <div v-if="showPreview" class="preview-overlay" @click="closePreview">
        <div class="preview-img-wrapper">
          <img :src="currentImage" alt="Preview" class="preview-img" />
        </div>
      </div>
      <div v-if="!isMobile" class="footer">
        <FooterComponent backgroundColor="white" />
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
@media (max-width: 750px)
  .package-in-warehouse-view
    height: 100%
    width: 100%
    overflow-y: auto
    background: #F2F4F8
    padding-bottom: .84rem
    .package-in-warehouse-container
      margin: 0 .2rem 0
      display: flex
      flex-direction: column
      color: #0A0A0A
      border-radius: .24rem
      padding: .24rem .2rem
      background: #fff
      .package-in-warehouse-wrapper
        display: flex
        justify-content: space-between
        .package-in-warehouse
          width: 2.5rem
          font-size: .24rem
          line-height: .31rem
          font-weight: 500
        .whats-app
          margin-top: .04rem
      .package-list-item-container
        margin-top: .3rem
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
          .list-item:active
            background: #ccc
      .address-container
        margin-top: .5rem
        display: flex
        flex-direction: column
        .address-title
            font-size: .18rem
            line-height: .2rem
            font-weight: 500
            color: #0A1B39
        .address-detail
            margin-top: .16rem
            font-size: .14rem
            line-height: .18rem
            color: rgba(10, 27, 57, 0.6)
        .address-edit
            font-size: .16rem
            line-height: .2rem
            color: rgba(10, 27, 57, 0.6)
            text-decoration: underline
            margin-top: .1rem
            text-align: right
      .confirm-and-pay
        margin-top: .5rem
        border-radius: .16rem
        background: #05FE9F
        padding: .12rem .24rem
        font-size: .18rem
        line-height: .24rem
        color: #0A1B39
        width: 100%
        font-weight: 500
      .confirm-and-pay:active
        background: #e9ecef
        transform: scale(1.1)
      .confirm-and-pay-disable
        color: rgba(10, 27, 57, 0.45)
        background: rgba(5, 254, 159, 0.6)
    .package-list-wrapper
      height: calc(100% - .56rem)
      overflow-y: auto
      .no-packages
        display: flex
        flex-direction: column
        justify-content: space-between
        align-items: center
        height: 100%
        .no-packages-detail
          font-size: .24rem
          line-height: .3rem
          color: rgba(10, 27, 57, 0.35)
          margin-top: 1rem
        img
          width: 100%
@media (min-width: 1024px)
  .package-in-warehouse-view
      height: 100%
      width: 100%
      overflow-y: auto
      background: #F2F4F8
      .package-list-wrapper
        position: relative
        display: flex
        flex-direction: column
        min-height: calc(100% - 56px)
        padding-bottom: 190px
        .footer
          position: absolute
          bottom: 0
          left: 0
          right: 0
      .package-in-warehouse-container
        margin: 32px auto
        width: 800px
        display: flex
        flex-direction: column
        color: #0A0A0A
        border-radius: 24px
        padding: 32px
        background: #fff
        .package-in-warehouse-wrapper
          display: flex
          justify-content: space-between
          .package-in-warehouse
            width: 393px
            font-size: 26px
            line-height: 31px
            font-weight: 700
            margin: 0 auto
            text-align: center
        .package-list-item-container
          margin-top: 30px
          .selected-container
            display: flex
            justify-content: start
            align-items: center
            .selected
              margin-right: 5px
            .selected, .selected-amount
              font-size: 16px
              line-height: 20px
              color: #0A1B39
          .package-list-item
            display: flex
            justify-content: space-between
            margin: 32px 0 0 20px
            align-items: center
            .list-item
              display: flex
              align-items: center
              justify-content: start
              .list-item-image
                margin-right: 10px
              .list-item-wrapper
                display: flex
                align-items: start
                .list-item-detail
                  font-size: 14px
                  line-height: 18px
                  font-weight: 500
                  color: #0A0A0A
                .list-item-detail:nth-of-type(1)
                  margin-right: 5px
          .package-list-item-detail
            border-radius: 16px
            background: rgba(10, 27, 57, 0.04)
            padding: 16px 24px
            display: flex
            align-items: center
            margin: 15px 0 0 20px
            .package-image
              width: 56px
              height: 56px
              margin-right: 24px
              border-radius: 8px
            .package-number-wrapper
              display: flex
              flex-direction: column
              align-items: start
              .package-number, .package-type
                font-size: 18px
                line-height: 23px
                font-weight: 500
                color: #0A1B39
                margin-right: 24px
            .package-weight-wrapper
              display: flex
              flex-direction: column
              align-items: start
              .package-weight-title
                font-size: 14px
                line-height: 26px
                color: rgba(10, 27, 57, 0.6)
              .package-weight
                font-size: 18px
                line-height: 23px
                font-weight: 500
                color: #0A1B39
        .address-container
          margin-top: 50px
          display: flex
          flex-direction: column
          border-radius: 24px
          border: 1px solid rgba(10, 27, 57, 0.1)
          padding: 24px 24px 14px
          .address-title
              font-size: 18px
              line-height: 20px
              font-weight: 700
              color: #0A1B39
          .address-detail
              margin-top: 16px
              font-size: 14px
              line-height: 22px
              color: #0A1B39
          .address-edit
              font-size: 16px
              line-height: 28px
              font-weight: 700
              color: #0A1B39
              text-decoration: underline
              margin-top: 10px
              margin-right: 24px
              text-align: right
        .confirm-and-pay-wrapper
          margin: 50px auto 0
          .confirm-and-pay
            border-radius: 16px
            background: #05FE9F
            padding: 12px 24px
            font-size: 20px
            line-height: 28px
            font-weight: 500
            color: #0A1B39
            width: 400px
          .confirm-and-pay:active
            background: #e9ecef
            transform: scale(1.1)
          .confirm-and-pay-disable
            color: rgba(10, 27, 57, 0.45)
            background: rgba(5, 254, 159, 0.6)
      .no-packages
        display: flex
        margin: 160px auto
        width: 800px
        align-items: center
        justify-content: space-between
        .no-packages-detail
          font-size: 24px
          line-height: 30px
          color: rgba(10, 27, 57, 0.35)
          margin-top: 10px
        img
          width: 375px
          height: 300px
    .preview-overlay
      position: fixed
      top: 0
      left: 0
      width: 100%
      height: 100%
      background: rgba(10, 27, 57, 0.6)
      display: flex
      justify-content: center
      align-items: center
      z-index: 1000
      cursor: pointer
      .preview-img-wrapper
        width: 800px
        height: 800px
        border-radius: 24px
        background: #fff
        text-align: center
      .preview-img
        width: 568px
        height: 800px
</style>
