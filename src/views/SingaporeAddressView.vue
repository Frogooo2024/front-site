<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

import OtherHeaderLight from '../components/OtherHeaderLight.vue'
import MovePageComponent from '../components/MorePageComponent.vue'
import useIsMobile from '../hooks/useIsMobile'
import HeaderComponent from '../components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import { useUserIdStore } from '@/stores/userId'
import { useI18n } from 'vue-i18n'
import { showToast } from 'vant'

import 'vant/lib/index.css'

const router = useRouter()
const showMorePage = ref(false)
const isMobile: boolean = useIsMobile()
const { userId } = useUserIdStore()

const { t } = useI18n()

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
const whatsAppClicked = () => {
  window.open('https://wa.me/message/UGN2RVXLNV4LH1', '_blank')
}
const itemClicked = (item: any) => {
  if (item.itemName == 'AliExpress') {
    router.push({ path: '/aliExpressDetail' })
  } else if (item.itemName == 'SHEIN') {
    router.push({ path: '/sheinDetail' })
  } else if (item.itemName == 'Taobao') {
    router.push({ path: '/taobaoDetail' })
  } else if (item.itemName == 'Qoo10') {
    router.push({ path: '/qoo10Detail' })
  } else if (item.itemName == 'Ebay') {
    router.push({ path: '/ebayDetail' })
  } else if (item.itemName == 'lululemon') {
    router.push({ path: '/luLuLemonDetail' })
  } else if (item.itemName == 'Vipshop') {
    router.push({ path: '/vipshopDetail' })
  } else if (item.itemName == 'Amazon') {
    router.push({ path: '/amazonDetail' })
  }
}
const itemList = ref([
  {
    imageUrl: new URL(`../assets/icons/aliexpress_address.png`, import.meta.url).href,
    itemName: 'AliExpress',
    selected: false
  },
  {
    imageUrl: new URL(`../assets/icons/shein_address.png`, import.meta.url).href,
    itemName: 'SHEIN',
    selected: false
  },
  {
    imageUrl: new URL(`../assets/icons/taobao_address.png`, import.meta.url).href,
    itemName: 'Taobao',
    selected: false
  },
  {
    imageUrl: new URL(`../assets/icons/qoo10_address.png`, import.meta.url).href,
    itemName: 'Qoo10',
    selected: false
  },
  {
    imageUrl: new URL(`../assets/icons/ebay_address.png`, import.meta.url).href,
    itemName: 'Ebay',
    selected: false
  },
  {
    imageUrl: new URL(`../assets/icons/lululemon_address.png`, import.meta.url).href,
    itemName: 'lululemon',
    selected: false
  },
  {
    imageUrl: new URL(`../assets/icons/vipshop_address.png`, import.meta.url).href,
    itemName: 'Vipshop',
    selected: false
  },
  {
    imageUrl: new URL(`../assets/icons/amazon_address.png`, import.meta.url).href,
    itemName: 'Amazon',
    selected: false
  }
])

const address = reactive({
  singaporeConsignee: userId,
  SingaporeAddress: '#06-10A of 158 Kallang Way Singapore 349245'
})

const copyBtnClicked = async () => {
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(
        `${address.singaporeConsignee} +65 8385 0022    ${address.SingaporeAddress}`
      )
      showToast({
        message: t('Frogooo.SuccessfulCopy'),
        position: 'bottom'
      })
    } catch (err) {
      showToast({
        message: t('Frogooo.CopyFailure'),
        position: 'bottom'
      })
    }
  } else {
    const textArea = document.createElement('textarea')
    textArea.value = `${address.singaporeConsignee} +65 8385 0022    ${address.SingaporeAddress}`
    textArea.style.position = 'fixed'
    textArea.style.opacity = '0'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    try {
      document.execCommand('copy')
      showToast({
        message: t('Frogooo.SuccessfulCopy'),
        position: 'bottom'
      })
    } catch (err) {
      showToast({
        message: t('Frogooo.CopyFailure'),
        position: 'bottom'
      })
    }

    document.body.removeChild(textArea)
  }
}
const viewPageClicked = () => {
  if (showMorePage.value) {
    showMorePage.value = false
  }
}
</script>

<template>
  <div class="singapore-address-view">
    <MovePageComponent v-if="showMorePage" @close-button-clicked="onCloseButtonClicked" />
    <OtherHeaderLight
      @more-button-clicked="onMoreButtonClicked"
      :hasBackgroundColor="true"
      v-if="isMobile"
    >
    </OtherHeaderLight>
    <HeaderComponent backgroundColor="white" :lightIcon="true" v-else />
    <div class="singapore-address-container" @click="viewPageClicked">
      <section class="select-address-container">
        <p class="select-address">{{ $t('Frogooo.SingaporeAddress') }}</p>
        <div class="whats-app" @click="whatsAppClicked" v-if="isMobile">
          <img src="../assets/icons/whats_app.svg" alt="" />
        </div>
      </section>
      <section class="address-list-item-container">
        <a
          class="list-item-wrapper"
          v-for="(item, index) in itemList"
          :key="index"
          @click="itemClicked(item)"
        >
          <div class="list-item-brand">
            <img :src="item.imageUrl" alt="" class="list-item-image" />
          </div>
          <div class="list-item-detail">
            <span class="item-detail">{{ item.itemName }}</span>
            <img src="../assets/icons/arrow_right.svg" alt="" />
          </div>
        </a>
      </section>
      <section class="shipping-container" v-if="!isMobile">
        <div class="shipping-wrapper">
          <p class="shipping-info">{{ $t('Frogooo.SingaporeShippingInformation') }}</p>
          <button class="copy" @click="copyBtnClicked">{{ $t('Frogooo.Copy') }}</button>
        </div>
        <div class="item-wrapper">
          <span class="item-title">{{ $t('Frogooo.SingaporeConsignee') }}:</span>
          <span class="item-detail">{{ address.singaporeConsignee }}</span>
        </div>
        <div class="item-wrapper">
          <span class="item-title">{{ $t('Frogooo.PhoneNumber') }}:</span>
          <span class="item-detail">+65 8385 0022</span>
        </div>
        <div class="item-wrapper">
          <span class="item-title">{{ $t('Frogooo.SingaporeAddressTitle') }}</span>
          <span class="item-detail">{{ address.SingaporeAddress }}</span>
        </div>
      </section>
    </div>
    <section class="shipping-container" v-if="isMobile" @click="viewPageClicked">
      <div class="shipping-wrapper">
        <p class="shipping-info">{{ $t('Frogooo.SingaporeShippingInformation') }}</p>
        <button class="copy" @touchend="copyBtnClicked">{{ $t('Frogooo.Copy') }}</button>
      </div>
      <div class="item-wrapper">
        <span class="item-title">{{ $t('Frogooo.SingaporeConsignee') }}:</span>
        <span class="item-detail">{{ address.singaporeConsignee }}</span>
      </div>
      <div class="item-wrapper">
        <span class="item-title">{{ $t('Frogooo.PhoneNumber') }}:</span>
        <span class="item-detail">+65 8385 0022</span>
      </div>
      <div class="item-wrapper">
        <span class="item-title">{{ $t('Frogooo.SingaporeAddressTitle') }}</span>
        <span class="item-detail">{{ address.SingaporeAddress }}</span>
      </div>
    </section>
    <FooterComponent backgroundColor="white" v-if="!isMobile" />
  </div>
</template>

<style lang="stylus" scoped>
@media (max-width: 750px)
  .singapore-address-view
    width: 100%
    background: #F2F4F8
    padding-bottom: .84rem
    .singapore-address-container
      margin: 0 .2rem 0
      display: flex
      flex-direction: column
      color: #000
      border-radius: .24rem
      padding: .24rem .2rem
      background: #fff
      .select-address-container
        display: flex
        justify-content: space-between
        .select-address
          font-size: .2rem
          line-height: .26rem
          font-weight: 600
          width: 2rem
        .whats-app
          margin-top: .04rem
      .address-list-item-container
        margin-top: .2rem
        .list-item-wrapper
          display: flex
          justify-content: space-between
          align-items: center
          -webkit-tap-highlight-color: #ccc
          touch-action: manipulation
          .list-item-brand
            height: .68rem
            .list-item-image
              height: 100%
          .list-item-detail
            display:flex
            align-items: center
            justify-content: space-between
            .item-detail
              font-size: .14rem
              line-height: .17rem
              margin-right: .15rem
    .shipping-container
      margin: .1rem .2rem 0
      display: flex
      flex-direction: column
      color: #000
      border-radius: .24rem
      padding: .24rem .2rem
      background: #fff
      .shipping-wrapper
        display: flex
        align-items: center
        justify-content: space-between
        .shipping-info
          font-size: .2rem
          line-height: .22rem
          font-weight: 700
          color: #0A1B39
        .copy
          border-radius: .23rem
          background: #05FE9F
          padding: 0 .12rem
          font-size: .14rem
          line-height: .24rem
          font-weight: bold
          color: #0A1B39
          text-decoration: underline
        .copy:active
          background: #e9ecef
      .item-wrapper
        display: flex
        flex-direction: column
        margin-top: .08rem
        .item-title
          font-size: .14rem
          line-height: .18rem
          color: rgba(10, 27, 57, 0.6)
        .item-detail
          font-size: .16rem
          line-height: .22rem
          font-weight: bold
          color: #0A1B39
          margin-top: .04rem
@media (min-width: 1024px)
  .singapore-address-view
    width: 100%
    background: #F2F4F8
    height: 100%
    overflow-y: auto
    .singapore-address-container
      margin: 35px auto 0
      width: 800px
      display: flex
      flex-direction: column
      border-radius: 24px
      padding: 24px 0
      background: #fff
      .select-address-container
        margin: 0 auto
        .select-address
          font-size: 26px
          line-height: 31px
          font-weight: 700
          color: #0A1B39
          width: 550px
          text-align: center
      .address-list-item-container
        margin-top: 20px
        .list-item-wrapper
          display: flex
          justify-content: space-between
          align-items: center
          padding: 0 120px
          height: 48px
          .list-item-brand
            height: 100%
            display: flex
            align-items: center
            .list-item-image
              height: 100%
          .list-item-detail
            display:flex
            align-items: center
            justify-content: space-between
            .item-detail
              font-size: 16px
              line-height: 20px
              font-weight: 500
              margin-right: 20px
              color: #000
        .list-item-wrapper:hover
          cursor: pointer
          background: #E5E9F3
      .shipping-container
        margin: 20px 40px 0
        display: flex
        flex-direction: column
        color: #000
        border-radius: 24px
        padding: 20px 24px
        background: #fff
        border: 1px solid rgba(10, 27, 57, 0.1)
        .shipping-wrapper
          display: flex
          align-items: center
          justify-content: space-between
          .shipping-info
            font-size: 18px
            line-height: 20px
            font-weight: 700
            color: #0A1B39
          .copy
            border-radius: 16px
            background: #0A1B39
            padding: 0 24px
            font-size: 18px
            line-height: 28px
            font-weight: 500
            color: #fff
            height: 40px
        .item-wrapper
          display: flex
          flex-direction: column
          margin-top: 20px
          .item-title
            font-size: 14px
            line-height: 18px
            color: rgba(10, 27, 57, 0.6)
          .item-detail
            font-size: 16px
            line-height: 22px
            font-weight: 500
            color: #0A1B39
            margin-top: 4px
</style>
