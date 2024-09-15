<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import OtherHeaderLight from '../components/OtherHeaderLight.vue'
import MovePageComponent from '../components/MorePageComponent.vue'
import HeaderComponent from '../components/HeaderComponent.vue'
import { useUserIdStore } from '@/stores/userId'
import { showToast, Step, Steps } from 'vant'
import { useI18n } from 'vue-i18n'
import useIsMobile from '../hooks/useIsMobile'
import FooterComponent from '@/components/FooterComponent.vue'
import UserCenterComponent from '@/components/UserCenterComponent.vue'
import vCurrencyFormat from '../directives/currencyFormat'
import api from '../api/api'
import 'vant/lib/index.css'

const router = useRouter()
const { t } = useI18n()
const showMorePage = ref(false)
const { userId } = useUserIdStore()
const packageList = ref<any>()
const packageOneList = ref<any>()
const showMorePackages = ref(false)
const arrowImageUrl = ref(new URL('../assets/icons/arrow_down.svg', import.meta.url).href)
const isMobile = useIsMobile()
const showDetailDialog = ref(false)
const detailDialogItem = ref<any>()
const stepsDetial = ref<any>()
const eventName = isMobile ? ref('touchend') : ref('click')

onMounted(async () => {
  window.scrollTo({ left: 0, top: 0, behavior: 'smooth' })
  try {
    if (isMobile) {
      packageList.value = await api.getPackageList({ packageStatus: 1 })
      if (packageList.value.rows?.length) {
        packageOneList.value = [packageList.value.rows[0]]
      }
      document.body.classList.add('background-white')
    }
  } catch (e) {
    showToast({
      message: t('Frogooo.NetworkError'),
      position: 'bottom'
    })
  }
})

onUnmounted(() => {
  document.body.classList.remove('background-white')
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

const inWarehouseClicked = () => {
  router.push({ path: '/packagesInWarehouse' })
}

const inTransitClicked = () => {
  router.push({ path: '/packagesInTransit' })
}

const historyListClicked = () => {
  router.push({ path: '/packageHistory' })
}

const singaporeConsigneeClicked = () => {
  router.push({ path: '/singaporeAddress' })
}

const receivingAddressClicked = () => {
  router.push({ path: '/addressList' })
}

const showMorePackagesArrowClicked = () => {
  showMorePackages.value = !showMorePackages.value
  arrowImageUrl.value = showMorePackages.value
    ? new URL('../assets/icons/arrow_up.svg', import.meta.url).href
    : new URL('../assets/icons/arrow_down.svg', import.meta.url).href
}

const showDeleteClicked = (item: any) => {
  item.showDelete = true
}

const addPackageClicked = () => {
  router.push({ path: '/addPackage' })
}

const deletePackgeClicked = async (item: any) => {
  try {
    let response: any = await api.deletePackge({ transportNumber: item.transportNumber })
    if (response.status) {
      packageList.value = await api.getPackageList({ packageStatus: 1 })
      if (packageList.value.rows?.length) {
        packageOneList.value = [packageList.value.rows[0]]
      }
    }
  } catch (e) {
    showToast({
      message: t('Frogooo.NetworkError'),
      position: 'bottom'
    })
  }
}

const onOrderListItemClicked = async (item: any) => {
  stepsDetial.value = []
  showDetailDialog.value = true
  detailDialogItem.value = item
  let res: any = await api.getOrderLogs({ orderNumber: item.orderNumber })
  if (res.status) {
    stepsDetial.value = res.data
  }
}

const closeDetailDialog = () => {
  showDetailDialog.value = false
}
</script>

<template>
  <div class="user-center-view">
    <MovePageComponent @close-button-clicked="onCloseButtonClicked" v-if="showMorePage" />
    <OtherHeaderLight
      @more-button-clicked="onMoreButtonClicked"
      :showArrowLeft="false"
      :showLogo="true"
      v-if="isMobile"
    >
    </OtherHeaderLight>
    <HeaderComponent backgroundColor="white" :lightIcon="true" v-else />
    <div class="user-center-container" v-if="isMobile">
      <section class="user-id-container">
        <div class="id-wrapper">
          <h3 class="id-title">{{ $t('Frogooo.YourId') }}{{ userId }}</h3>
          <div class="id-tips">
            <img class="tips-image" src="../assets/icons/tips.svg" alt="" />
            <p class="tips-detail">{{ $t('Frogooo.UniqueIdentificationCode') }}</p>
          </div>
        </div>
        <div class="whats-app" @click="whatsAppClicked">
          <img src="../assets/icons/whats_app.svg" alt="" />
        </div>
      </section>
      <section class="button-wrapper">
        <div class="button" v-on:[eventName]="singaporeConsigneeClicked">
          {{ $t('Frogooo.SingaporeConsignee') }}
        </div>
        <div class="button" v-on:[eventName]="receivingAddressClicked">
          {{ $t('Frogooo.ReceivingAddress') }}
        </div>
      </section>
      <section class="receiving-packages-title">
        <h1 class="title">{{ $t('Frogooo.ReceivingPackages') }}</h1>
      </section>
      <section class="receiving-packages-wrapper">
        <a class="list-item-container" @click="addPackageClicked">
          <div class="list-item">{{ $t('Frogooo.TrackingNumber') }}</div>
          <img class="arrow-right" src="../assets/icons/arrow_right.svg" alt="" />
        </a>
        <section class="packages-list-container" v-if="packageList?.rows?.length">
          <div
            class="packages-list-item"
            v-for="(item, index) in showMorePackages ? packageList.rows : packageOneList"
            :key="index"
          >
            <span class="list-item-date">{{ item.createTime }}</span>
            <div class="list-item-wrapper">
              <div class="list-item" @click="showDeleteClicked(item)">
                <img src="../assets/icons/package.svg" alt="" class="list-item-image" />
                <div class="list-item-details">
                  <span class="list-item-title">{{ item.transportNumber }}</span>
                  <span class="list-item-subtitle">{{ item.goodsTypeName }}</span>
                </div>
              </div>
              <div
                class="list-item-delete"
                v-if="item.showDelete"
                @click="deletePackgeClicked(item)"
              >
                {{ $t('Frogooo.Delete') }}
              </div>
            </div>
          </div>
          <div class="list-item-arrow" @click="showMorePackagesArrowClicked">
            <img :src="arrowImageUrl" alt="" />
          </div>
        </section>
        <a class="list-item-container" @click="inWarehouseClicked">
          <div class="list-item">{{ $t('Frogooo.ArrivedAt') }}</div>
          <img class="arrow-right" src="../assets/icons/arrow_right.svg" alt="" />
        </a>
        <a class="list-item-container" @click="inTransitClicked">
          <div class="list-item">{{ $t('Frogooo.InTransit') }}</div>
          <img class="arrow-right" src="../assets/icons/arrow_right.svg" alt="" />
        </a>
        <a class="list-item-container" @click="historyListClicked">
          <div class="list-item">{{ $t('Frogooo.YourPackageHistory') }}</div>
          <img class="arrow-right" src="../assets/icons/arrow_right.svg" alt="" />
        </a>
      </section>
    </div>
    <UserCenterComponent v-else @order-list-item-clicked="onOrderListItemClicked" />
    <div v-if="showDetailDialog" class="detail-overlay" @click="closeDetailDialog"></div>
    <div class="detail-wrapper" v-if="showDetailDialog">
      <h2 class="detail-wrapper-title">{{ $t('Frogooo.PackageDetails') }}</h2>
      <div class="detail-container">
        <div class="detail-left-container">
          <h3 class="detail-order-number">{{ detailDialogItem.orderNumber }}</h3>
          <div class="detail-payment-number">
            {{ $t('Frogooo.PaymentOrderNumber') }} {{ detailDialogItem.orderNumber }}
          </div>
          <div class="package-detail-container">
            <div
              class="package-detail-item"
              v-for="(dialogItem, index) in detailDialogItem.packageList"
              :key="index"
            >
              <img src="../assets/icons/package.svg" alt="" class="package-detail-item-image" />
              <div class="package-detail-item-title-container">
                <span class="package-detail-item-title">{{ dialogItem.transportNumber }}</span>
                <span class="package-detail-item-title">{{ dialogItem.goodsTypeName }}</span>
              </div>
            </div>
          </div>
          <div class="cost-container">
            <span class="cost-container-title">{{ $t('Frogooo.Price') }}</span>
            <span class="cost-container-value" v-currency-format="detailDialogItem?.pric"></span>
          </div>
        </div>
        <div class="detail-right-container" v-if="stepsDetial?.length">
          <h3 class="detail-right-container-title">{{ $t('Frogooo.PackageStatus') }}</h3>
          <div class="detail-right-wrapper">
            <Steps direction="vertical" :active="0">
              <Step v-for="(stepItem, index) in stepsDetial" :key="index">
                <h3>{{ stepItem.title }}</h3>
                <p>{{ stepItem.updateTime }}</p>
              </Step>
              <Step>
                <h3>{{ $t('Frogooo.CustomsCleared') }}</h3>
              </Step>
              <Step>
                <h3>{{ $t('Frogooo.DeliveryInProgress') }}</h3>
              </Step>
            </Steps>
          </div>
        </div>
      </div>
      <img
        src="../assets/icons/close.png"
        alt=""
        class="detail-dialog-close"
        @click="closeDetailDialog"
      />
    </div>
    <FooterComponent backgroundColor="white" v-if="!isMobile" />
  </div>
</template>

<style lang="stylus" scoped>
@media (max-width: 750px)
  .user-center-view
    height: 100%
    width: 100%
    background: #fff
    overflow-x: auto
    padding-bottom: .84rem
    .user-center-container
      display: flex
      flex-direction: column
      margin: .2rem
      .user-id-container
        display: flex
        justify-content: space-between
        .id-wrapper
          display: flex
          flex-direction: column
          .id-title
            font-size: .18rem
            font-weight: 700
            line-height: .23rem
            color: #0A1B39
          .id-tips
            display: flex
            justify-content: start
            .tips-image
              width: .1rem
              height: .1rem
              margin: .03rem .03rem 0 0
            .tips-detail
              font-size: .1rem
              line-height: .14rem
              color: rgba(10, 27, 57, 0.35)
              width: 2rem
      .button-wrapper
        display: flex
        justify-content: center
        margin-top: .3rem
        .button
          padding: .1rem
          border-radius: .08rem
          font-size: .14rem
          line-height: .18rem
          font-weight: 500
          color: #fff
          background: #000
          width: fit-content
        .button:active
          background: rgba(0, 0, 0, 0.3)
        .button:nth-of-type(1)
          margin-right: .2rem
      .receiving-packages-title
        margin-top: .3rem
        .title
          font-size: .24rem
          line-height: .31rem
          font-weight: 700
          color: #0A1B39
      .receiving-packages-wrapper
        display: flex
        flex-direction: column
        margin-top: .1rem
        .list-item-container
          margin-top: .2rem
          display: flex
          justify-content: space-between
          align-items: center
          -webkit-tap-highlight-color: #ccc
          touch-action: manipulation
          .list-item
            font-size: .18rem
            line-height: .23rem
            color: #0A1B39
        .packages-list-container
          position: relative
          margin-top: .2rem
          padding: 0 .16rem .16rem
          border-radius: .16rem
          background: rgba(10, 27, 57, 0.04)
          .packages-list-item
            display: flex
            flex-direction: column
            margin-top: .2rem
            .list-item-date
              font-size: .12rem
              line-height: .18rem
              color: rgba(10, 27, 57, 0.6)
            .list-item-wrapper
              display: flex
              align-items: center
              justify-content: space-between
              .list-item
                display: flex
                align-items: start
                justify-content: start
                margin-top: .05rem
                .list-item-image
                  margin-right: .1rem
                .list-item-details
                  display: flex
                  flex-direction: column
                  .list-item-title, .list-item-subtitle
                    font-size: .14rem
                    line-height: .18rem
                    color: #0A1B39
              .list-item-delete
                border-radius: .04rem
                border: 1px solid rgba(10, 27, 57, 0.2)
                padding: .02rem .04rem
                font-size: .14rem
                line-height: .18rem
                color: #0A1B39
                background: #fff
          .list-item-arrow
            position: absolute
            top: .16rem
            right: .16rem
@media (min-width: 1024px)
  .user-center-view
    height: 100%
    width: 100%
    background: #F2F4F8
    overflow-x: auto
    .detail-overlay
      position: fixed
      top: 0
      left: 0
      width: 100%
      height: 100%
      background: rgba(10, 27, 57, 0.6)
      z-index: 1000
      cursor: pointer
    .detail-wrapper
      width: 800px
      margin: 100px auto
      border-radius: 24px
      background: #fff
      padding: 24px 24px 24px 40px
      position: absolute
      top: 23%
      left: 0
      right: 0
      z-index: 1001
      .detail-dialog-close
        position: absolute
        right: 24px
        top: 24px
      .detail-wrapper-title
        font-size: 26px
        line-height: 31px
        color: #0A1B39
        text-align: center
        font-weight: 700
      .detail-container
        display: flex
        justify-content: space-between
        .detail-left-container
          display: flex
          flex-direction: column
          .detail-order-number
            margin-top: 30px
            font-size: 18px
            line-height: 23px
            font-weight: 500
            color: #0A1B39
          .detail-payment-number
            margin-top: 15px
            font-size: 12px
            line-height: 14px
            color: rgba(10, 27, 57, 0.6)
            padding-bottom: 15px
            width: 360px
            border-bottom: 1px solid #E7E8EB
          .package-detail-container
            padding-left: 10px
            max-height: 116px
            overflow-y: auto
            .package-detail-item
              display: flex
              align-items: start
              margin-top: 10px
              .package-detail-item-image
                margin-right: 10px
              .package-detail-item-title-container
                display: flex
                flex-direction: column
              .package-detail-item-title
                font-size: 14px
                line-height: 18px
                color: rgba(10, 27, 57, 0.6)
                margin-right: 10px
          .cost-container
            display: flex
            flex-direction: column
            margin-top: 20px
            .cost-container-title
              font-size: 14px
              line-height: 14px
              color: rgba(10, 27, 57, 0.6)
            .cost-container-value
              font-size: 20px
              line-height: 28px
              font-weight: 500
              color: #0A1B39
        .detail-right-container
          display: flex
          flex-direction: column
          margin-top: 30px
          .detail-right-container-title
            font-size: 18px
            line-height: 23px
            font-weight: 500
            color: #0A1B39
          .detail-right-wrapper
            width: 360px
            border-radius: 16px
            background: rgba(10, 27, 57, 0.04)
            padding: 24px
            max-height: 220px
            overflow-y: auto
            margin-top: 10px
            .van-steps
              background: transparent
</style>
