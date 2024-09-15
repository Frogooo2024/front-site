<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import OtherHeaderLight from '../components/OtherHeaderLight.vue'
import HeaderComponent from '../components/HeaderComponent.vue'
import MovePageComponent from '../components/MorePageComponent.vue'
import { useAddressStore } from '@/stores/address'
import api from '../api/api'
import vCurrencyFormat from '../directives/currencyFormat'
import useIsMobile from '../hooks/useIsMobile'
import FooterComponent from '@/components/FooterComponent.vue'

const route = useRoute()
const router = useRouter()
const showMorePage = ref(false)
const isMobile = useIsMobile()

const orderDetail = ref<any>()

const addressDetail = ref<any>()

const showNoData = ref(false)

const { orderNumber } = route.params

const interval = ref<null | number>()

const qrCodeUrl = ref('')

const orderNo = ref('')

let { selectedData } = useAddressStore()

const eventName = isMobile ? ref('touchend') : ref('click')

const paymentMethods = ref<any[]>([
  {
    imgUrl: new URL('../assets/icons/qris.png', import.meta.url).href,
    name: 'QRIS',
    title: 'QRIS',
    selected: true,
    code: 1032
  },
  {
    imgUrl: new URL('../assets/icons/xendit.png', import.meta.url).href,
    name: 'Xendit',
    title: 'Xendit',
    selected: false,
    code: 1033
  },
  {
    imgUrl: new URL('../assets/icons/gopay.png', import.meta.url).href,
    name: 'GoPay',
    title: 'Midtrans',
    selected: false,
    code: 1036
  }
])

const paymentMethodItem = ref<any>(paymentMethods.value[0])

const paymentMethodsData = ref<any>()

onMounted(async () => {
  document.body.classList.add('background-gray')
  try {
    Promise.all([api.orderDetail({ orderNumber: orderNumber }), api.getAddressUser()]).then(
      (response: any) => {
        if (response[0].status && response[1].status) {
          orderDetail.value = response[0].data
          addressDetail.value = response[1].data.find((item: any) => {
            return item.isDefault == 'Y'
          })
          if (!addressDetail.value) {
            addressDetail.value = response[1].data[response[1].data.length - 1]
          }
          if (selectedData.id && selectedData.id != addressDetail.value.id) {
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

    let res: any = await api.payment({ outOrderNo: orderNumber })
    paymentMethodsData.value = res
    orderNo.value = res.Xendit?.orderNo
  } catch (e) {
    showNoData.value = true
  }

  if (sessionStorage.getItem('paymentOrderNo')) {
    orderNo.value = sessionStorage.getItem('paymentOrderNo') ?? ''
    interval.value = setInterval(getPaymentStatus, 5000)
  }
})

onUnmounted(() => {
  document.body.classList.remove('background-gray')
  if (interval.value) {
    clearInterval(interval.value)
    sessionStorage.removeItem('paymentOrderNo')
  }
})

const onMoreButtonClicked = () => {
  showMorePage.value = true
}
const onCloseButtonClicked = () => {
  showMorePage.value = false
}

const paymentMethodsClicked = (item: any) => {
  paymentMethods.value.map((val: any) => {
    val.selected = false
  })
  item.selected = true
  paymentMethodItem.value = item
}
const getPaymentStatus = async () => {
  let response: any = await api.getPaymentStatus({ orderNumber: orderNo.value })
  if (response?.status == 2) {
    sessionStorage.removeItem('paymentOrderNo')
    router.push({ path: '/paymentStatus' })
  }
}

const payment = async () => {
  let url
  for (let [k, v] of Object.entries(paymentMethodsData.value)) {
    if (k == paymentMethodItem.value.title) {
      url = (v as any).redirectUrl
    }
  }
  if (paymentMethodItem.value.code == 1032) {
    qrCodeUrl.value = `data:image/png;base64,${url}`
  } else {
    qrCodeUrl.value = ''
    window.open(url, '_blank')
  }
  sessionStorage.setItem('paymentOrderNo', orderNo.value)
  interval.value = setInterval(getPaymentStatus, 5000)
}
</script>

<template>
  <div class="payment-view">
    <MovePageComponent v-if="showMorePage" @close-button-clicked="onCloseButtonClicked" />
    <OtherHeaderLight
      @more-button-clicked="onMoreButtonClicked"
      :has-background-color="true"
      v-if="isMobile"
    ></OtherHeaderLight>
    <HeaderComponent backgroundColor="white" :lightIcon="true" v-else />
    <div class="payment-container">
      <section class="payment-title-container">
        <h2 class="payment-title">{{ $t('Frogooo.ConfirmAndPay') }}</h2>
        <span class="payment-subtitle"
          >{{ $t('Frogooo.PaymentOrderNumber') }}
          {{ !isMobile ? orderDetail?.orderNumber : '' }}</span
        >
        <span class="payment-subtitle" v-if="isMobile">{{ orderDetail?.orderNumber }}</span>
      </section>
      <section class="payment-methods-container">
        <h3 class="payment-methods-title">{{ $t('Frogooo.ChoosePaymentMethods') }}</h3>
        <div
          class="payment-methods-wrapper"
          v-for="(item, index) in paymentMethods"
          :key="index"
          @click="paymentMethodsClicked(item)"
        >
          <div class="payment-methods-name-wrapper">
            <img class="payment-methods-icon" :src="item.imgUrl" alt="" />
            <span class="payment-methods-name">{{ item.name }}</span>
          </div>
          <img
            src="../assets/icons/unselect.svg"
            alt=""
            class="select-image"
            v-if="!item.selected"
          />
          <img
            src="../assets/icons/address_selected.svg"
            alt=""
            class="select-image"
            v-if="item.selected"
          />
        </div>
      </section>
      <div v-if="qrCodeUrl" class="qrcode">
        <img :src="qrCodeUrl" alt="" class="qrcodeimage" />
      </div>
      <div class="payment-detail-wrapper">
        <section class="order-detail-container">
          <h3 class="order-detail-title">{{ $t('Frogooo.PriceBreakdown') }}</h3>
          <div class="order-detail-wrapper" v-if="orderDetail?.pric">
            <span class="order-detail-subtitle">{{ $t('Frogooo.Total') }}:</span>
            <span class="order-detail-value" v-currency-format="orderDetail?.pric"></span>
          </div>
          <div class="order-detail-wrapper">
            <span class="order-detail-subtitle">{{ $t('Frogooo.TotalWeight') }}</span>
            <span class="order-detail-subtitle-value">{{ orderDetail?.weight }}</span>
          </div>
        </section>
        <section class="package-list-item-container" v-if="orderDetail?.packageList.length">
          <div class="package-list-item">
            <div class="list-item" v-for="(item, index) in orderDetail.packageList" :key="index">
              <img src="../assets/icons/package.svg" alt="" class="list-item-image" />
              <div class="list-item-wrapper">
                <span class="list-item-detail">{{ item.transportNumber }}</span>
                <span class="list-item-detail">{{ item.goodsTypeName }}</span>
              </div>
            </div>
          </div>
        </section>
      </div>
      <section class="address-container" v-if="addressDetail?.name.length">
        <h3 class="address-title">{{ $t('Frogooo.ConfirmReceivingAddress') }}</h3>
        <p class="address-detail">
          {{ addressDetail.name }}, {{ addressDetail.phone }}, {{ addressDetail.province }},
          {{ addressDetail.city }},{{ addressDetail.county }}, {{ addressDetail.address }}
        </p>
      </section>
      <section class="button-container">
        <button class="button" v-on:[eventName]="payment" v-if="isMobile">
          {{ $t('Frogooo.Payment') }}
        </button>
      </section>
    </div>
    <FooterComponent backgroundColor="white" v-if="!isMobile" />
  </div>
</template>

<style lang="stylus" scoped>
@media (max-width: 750px)
  .payment-view
    width: 100%
    overflow-y: scroll
    background: #F2F4F8
    padding-bottom: .84rem
    .payment-container
      margin: .1rem .2rem .2rem
      display: flex
      flex-direction: column
      color: #000
      border-radius: .24rem
      padding: .2rem .16rem
      background: #fff
      .payment-title-container
          display: flex
          flex-direction: column
          .payment-title
              font-size: .2rem
              line-height: .26rem
              font-weight: 700
              color: #0A1B39
          .payment-subtitle
              font-size: .14rem
              line-height: .16rem
              color: rgba(10, 27, 57, 0.6)
          .payment-subtitle:nth-of-type(1)
              margin-top: .1rem
      .payment-methods-container
          margin-top: .24rem
          .payment-methods-title
              font-size: .18rem
              line-height: .23rem
              font-weight: 500
              color: #0A1B39
          .payment-methods-wrapper
              margin-top: .14rem
              display: flex
              justify-content: space-between
              align-items: center
              padding: .08rem
              border: 1px solid rgba(10, 27, 57, 0.04)
              border-radius: .16rem
              .payment-methods-name-wrapper
                  display: flex
                  align-items: center
                  .payment-methods-icon
                      width: .48rem
                      height: .48rem
                      margin-right: .16rem
                  .payment-methods-name
                      font-size: .18rem
                      line-height: .23rem
                      font-weight: 500
      .qrcode
        margin: .16rem .16rem .1rem
        .qrcodeimage
          width: 100%
          height: 100%
      .order-detail-container
          display: flex
          flex-direction: column
          margin-top: .2rem
          border-bottom: 1px solid rgba(10, 27, 57, 0.04)
          padding-bottom: .16rem
          .order-detail-title
              font-size: .18rem
              line-height: .23rem
              font-weight: 500
              color: #0A1B39
          .order-detail-wrapper
              display: flex
              justify-content: space-between
              align-items: center
              margin-top: .16rem
              .order-detail-subtitle
                  font-size: .14rem
                  line-height: .22rem
                  color: #0A1B39
              .order-detail-value
                  font-size: .18rem
                  line-height: .18rem
                  font-weight: 700
                  color: #D2202F
              .order-detail-subtitle-value
                  font-size: .14rem
                  line-height: .18rem
                  color: #0A1B39
      .package-list-item-container
          margin-top: .16rem
          padding: 0 .2rem
          .list-item
              display: flex
              justify-content: start
              margin-top: .16rem
              .list-item-image
                  margin-right: .2rem
                  width: .2rem
                  height: .2rem
          .list-item-wrapper
              display: flex
              flex-direction: column
              .list-item-detail
                  font-size: .14rem
                  line-height: .18rem
                  color: rgba(10, 27, 57, 0.6)
      .address-container
          margin-top: .3rem
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
      .button-container
          margin-top: .6rem
          .button
              border-radius: .16rem
              padding: .12rem .24rem
              color: #0A1B39
              text-align: center
              font-size: .18rem
              line-height: .24rem
              width: 100%
              background: #05FE9F
          .button:active
              background: #e9ecef
              transform: scale(1.1)
@media (min-width: 1024px)
  .payment-view
    height: 100%
    width: 100%
    overflow-y: scroll
    background: #F2F4F8
    .payment-container
      margin: 42px auto
      width: 800px
      display: flex
      flex-direction: column
      border-radius: 24px
      padding: 32px
      background: #fff
      .payment-title-container
          display: flex
          flex-direction: column
          .payment-title
              font-size: 26px
              line-height: 31px
              font-weight: 700
              color: #0A1B39
              margin: 0 auto
          .payment-subtitle
              font-size: 14px
              line-height: 20px
              color: rgba(10, 27, 57, 0.6)
              margin: 0 auto
              margin-top: 5px
      .payment-methods-container
          margin-top: 24px
          .payment-methods-title
              font-size: 18px
              line-height: 23px
              font-weight: 700
              color: #0A1B39
          .payment-methods-wrapper
              margin-top: 14px
              display: flex
              justify-content: space-between
              align-items: center
              padding: 8px
              border: 1px solid rgba(10, 27, 57, 0.1)
              border-radius: 16px
              .payment-methods-name-wrapper
                  display: flex
                  align-items: center
                  .payment-methods-icon
                      width: 48px
                      height: 48px
                      margin-right: 16px
                  .payment-methods-name
                      font-size: 18px
                      line-height: 23px
                      font-weight: 500
                      color: #0A1B39
      .qrcode
        margin: 16px auto 10px
        .qrcodeimage
          width: 350px
          height: 350px
      .payment-detail-wrapper
        display: flex
        .order-detail-container
            flex: 1
            display: flex
            flex-direction: column
            margin-top: 20px
            margin-right: 60px
            border-bottom: 1px solid rgba(10, 27, 57, 0.04)
            padding-bottom: 16px
            .order-detail-title
                font-size: 18px
                line-height: 23px
                font-weight: 700
                color: #0A1B39
            .order-detail-wrapper
                display: flex
                justify-content: space-between
                align-items: center
                margin-top: 16px
                .order-detail-subtitle
                    font-size: 14px
                    line-height: 22px
                    color: #0A1B39
                .order-detail-value
                    font-size: 18px
                    line-height: 18px
                    font-weight: 700
                    color: #D2202F
                .order-detail-subtitle-value
                    font-size: 14px
                    line-height: 18px
                    color: #0A1B39
        .package-list-item-container
            flex: 1
            margin-top: 45px
            padding: 0 20px
            .list-item
                display: flex
                justify-content: start
                margin-top: 16px
                .list-item-image
                    margin-right: 20px
                    width: 20px
                    height: 20px
            .list-item-wrapper
                display: flex
                flex-direction: column
                .list-item-detail
                    font-size: 14px
                    line-height: 18px
                    color: rgba(10, 27, 57, 0.6)
      .address-container
          margin-top: 30px
          display: flex
          flex-direction: column
          border-radius: 24px
          border: 1px solid rgba(10, 27, 57, 0.1)
          padding: 20px 24px
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
      .button-container
          margin: 30px auto 0
          .button
              border-radius: 16px
              padding: 12px 24px
              color: #0A1B39
              text-align: center
              font-size: 20px
              line-height: 28px
              font-weight: 500
              background: #05FE9F
              width: 400px
          .button:active
              background: #e9ecef
              transform: scale(1.1)
</style>
