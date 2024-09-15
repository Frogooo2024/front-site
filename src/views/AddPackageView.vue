<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import OtherHeaderLight from '../components/OtherHeaderLight.vue'
import MovePageComponent from '../components/MorePageComponent.vue'
import TrayPicker from '@/components/TrayPicker.vue'
import { useI18n } from 'vue-i18n'
import { useAddPackageStore } from '@/stores/addPackage'
import useIsMobile from '../hooks/useIsMobile'
import HeaderComponent from '../components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import AddPackageComponent from '@/components/AddPackageComponent.vue'
import { showToast, showConfirmDialog } from 'vant'

import api from '@/api/api'

import 'vant/lib/index.css'

const router = useRouter()
const showMorePage = ref(false)
const showTray = ref(false)
const sendInProgress = ref(false)
const isMobile = useIsMobile()

const { t } = useI18n()
const title = t('Frogooo.ProductTypes')
const isOpen = ref(false)

const goodsTypeIdList = [
  { title: t('Frogooo.Electronics'), id: 'goodsType', typeId: '127' },
  { title: t('Frogooo.Food'), id: 'goodsType', typeId: '126' },
  { title: t('Frogooo.Toys'), id: 'goodsType', typeId: '128' },
  { title: t('Frogooo.Others'), id: 'goodsType', typeId: '129' },
  { title: t('Frogooo.Clothes'), id: 'goodsType', typeId: '130' },
  { title: t('Frogooo.Shoes'), id: 'goodsType', typeId: '131' },
  { title: t('Frogooo.Cosmetics'), id: 'goodsType', typeId: '132' }
]
const goodsCurrencyList = [
  { title: 'SGD', id: 'currency' },
  { title: 'USD', id: 'currency' }
]
const selectedItem = ref<any>()
const pickerItems = ref<any[]>([])

const { packageDetail } = useAddPackageStore()

const selectGoodType = () => {
  showTray.value = true
  pickerItems.value = goodsTypeIdList
}
const selectCurrency = (item: any) => {
  isOpen.value = false
  pickerItems.value = goodsCurrencyList
  packageDetail.currency = item
}

watch(selectedItem, (newVal) => {
  if (newVal.id == 'goodsType') {
    packageDetail.goodsTypeId = newVal.typeId
    packageDetail.goodsTypeName = newVal.title
  }
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

const helpClicked = () => {
  router.push({ path: '/packageHelp' })
}

const onAddPackageSubmit = () => {
  submit()
}

const submit = async () => {
  if (!packageDetail.transportNumber.length) {
    showToast({
      message: t('Frogooo.FillInTheTrackingNumber'),
      position: 'bottom'
    })
    return
  } else if (!packageDetail.goodsTypeId.length) {
    showToast({
      message: t('Frogooo.FillInTheProductType'),
      position: 'bottom'
    })
    return
  } else if (!packageDetail.goodsList[0].pric.length) {
    showToast({
      message: t('Frogooo.FillInThePrice'),
      position: 'bottom'
    })
    return
  }
  try {
    let params = {
      transportNumber: packageDetail.transportNumber,
      goodsTypeId: packageDetail.goodsTypeId,
      goodsTypeName: packageDetail.goodsTypeName,
      goodsList: [{ pric: packageDetail.goodsList[0].pric }]
    }
    if (!sendInProgress.value) {
      sendInProgress.value = true
      const response: any = await api.addPackage(params)
      sendInProgress.value = false
      if (response?.status == true) {
        showConfirmDialog({
          message: t('Frogooo.AddPackageSuccessfully'),
          confirmButtonText: t('Frogooo.NoThanks'),
          cancelButtonText: t('Frogooo.Continue'),
          confirmButtonColor: '#0A1B39',
          className: 'frogooo-dialog'
        })
          .then(() => {
            router.push({ path: '/userCenter' })
          })
          .catch(() => {
            Object.assign(packageDetail, {
              transportNumber: '',
              goodsTypeId: '',
              goodsTypeName: '',
              currency: 'SGD',
              goodsList: [
                {
                  pric: ''
                }
              ]
            })
          })
      }
    }
  } catch (e) {
    sendInProgress.value = false
    showToast({
      message: t('Frogooo.NetworkError'),
      position: 'bottom'
    })
  }
}

onMounted(() => {
  document.body.classList.add('background-gray')
})

onUnmounted(() => {
  document.body.classList.remove('background-gray')
})

const viewPageClicked = () => {
  if (showMorePage.value) {
    showMorePage.value = false
  }
}
</script>

<template>
  <div class="add-package-view">
    <MovePageComponent v-if="showMorePage" @close-button-clicked="onCloseButtonClicked" />
    <OtherHeaderLight
      @more-button-clicked="onMoreButtonClicked"
      :hasBackgroundColor="true"
      v-if="isMobile"
    >
    </OtherHeaderLight>
    <HeaderComponent backgroundColor="white" :lightIcon="true" v-else />
    <div class="add-package-container" v-if="isMobile" @click="viewPageClicked">
      <section class="select-address-container">
        <p class="select-address">{{ $t('Frogooo.InformUs') }}</p>
        <div class="whats-app" @click="whatsAppClicked">
          <img src="../assets/icons/whats_app.svg" alt="" />
        </div>
      </section>
      <section class="item-list-container">
        <section class="item-wrapper">
          <h3 class="item-title">{{ $t('Frogooo.PackageTrackingNumber') }}</h3>
          <input
            type="text"
            class="item-wrapper-input"
            :placeholder="$t('Frogooo.PackageTrackingNumber')"
            v-model="packageDetail.transportNumber"
          />
        </section>
        <section class="item-wrapper">
          <h3 class="item-title">{{ $t('Frogooo.ProductTypes') }}</h3>
          <div class="item-container" @click="selectGoodType()">
            <span
              class="select-item"
              :class="{
                'not-be-selected': !packageDetail.goodsTypeId,
                'be-selected': packageDetail.goodsTypeId
              }"
              >{{
                packageDetail.goodsTypeName
                  ? packageDetail.goodsTypeName
                  : $t('Frogooo.ProductTypes')
              }}</span
            >
            <img src="../assets/icons/arrow.png" class="item-arrow" alt="" />
          </div>
        </section>
        <section class="item-wrapper">
          <h3 class="item-title">{{ $t('Frogooo.ProductPrice') }}</h3>
          <div class="item-wraning-container">
            <img src="../assets/icons/warning_light.svg" alt="" class="item-wraning-image" />
            <p class="item-wraning-detail">{{ $t('Frogooo.RealAmount') }}</p>
          </div>
          <div class="item-price-container">
            <input
              type="text"
              class="item-price-text"
              placeholder="price"
              v-model="packageDetail.goodsList[0].pric"
            />
            <span class="item-price-separator"></span>
            <div class="item-price-currency">
              <span class="item-price-currency-detail">{{ packageDetail.currency }}</span>
              <img
                src="../assets/icons/arrow_down.svg"
                alt=""
                class="item-price-currency-image"
                @click="isOpen = !isOpen"
              />
              <div v-if="isOpen" class="item-currency">
                <span class="currency" @click="selectCurrency('SGD')">SGD</span>
                <span class="currency" @click="selectCurrency('USD')">USD</span>
              </div>
            </div>
          </div>
        </section>
      </section>
      <div class="item-help-container">
        <h2 class="item-help-title">{{ $t('Frogooo.NeedHelp') }}</h2>
        <a class="item-help-detail" @click="helpClicked">
          <p class="item-help-question">{{ $t('Frogooo.FindTheTrackingNumber') }}</p>
          <img src="../assets/icons/arrow_right.svg" alt="" />
        </a>
      </div>
      <section class="item-submit">
        <div class="item-submit-warning">
          <img src="../assets/icons/warning_light.svg" alt="" />
          <p class="item-submit-warning-text">{{ $t('Frogooo.AddPackageWarning') }}</p>
        </div>
        <button class="item-submit-button" @touchend="submit">
          {{ $t('Frogooo.ConfirmAndSubmit') }}
        </button>
      </section>
    </div>
    <div v-else class="add-package-component-container">
      <AddPackageComponent :listItems="goodsTypeIdList" @add-package-submit="onAddPackageSubmit" />
      <div class="footer">
        <FooterComponent backgroundColor="white" v-if="!isMobile" />
      </div>
    </div>
    <TrayPicker
      v-model:selectedItem="selectedItem"
      :visible="showTray"
      :items="pickerItems"
      @close="showTray = false"
      :title="title"
      flag="product"
    />
  </div>
</template>

<style lang="stylus" scoped>
@media (max-width: 750px)
  .add-package-view
    width: 100%
    background: #F2F4F8
    height: 100%
    overflow-y: auto
    padding-bottom: .84rem
    .add-package-container
        margin: .1rem .2rem 0
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
            font-weight: 500
        .whats-app
            margin-top: .04rem
        .item-list-container
            margin-top: .2rem
            .item-wrapper
                margin-top: .2rem
                .item-title
                    font-size: .14rem
                    line-height: .22rem
                    color: rgba(10, 27, 57, 0.6)
                .item-container
                    margin-top: .12rem
                    display: flex
                    justify-content: space-between
                    padding: .16rem
                    border-bottom: 1px solid rgba(10, 27, 57, 0.04)
                    .select-item
                        font-size: .18rem
                        line-height: .22rem
                    .not-be-selected
                        color: rgba(10, 27, 57, 0.6)
                    .be-selected
                        color: #0A1B39
                    .item-arrow
                        width: .16rem
                        height: .16rem
                .item-wraning-container
                    display: flex
                    justify-content: start
                    align-items: center
                    .item-wraning-image
                        width: .16rem
                        height: .16rem
                    .item-wraning-detail
                        font-size: .11rem
                        line-height: .11rem
                        color: rgba(10, 27, 57, 0.6)
                .item-price-container
                    display: flex
                    justify-content: center
                    align-items: center
                    .item-price-text
                        border-bottom: 1px solid rgba(10, 27, 57, 0.04)
                        font-size: .18rem
                        line-height: .22rem
                        color: #0A1B39
                        width: 1.4rem
                        padding: 0.16rem
                    .item-price-separator
                        height: .24rem
                        border-left: 1px solid rgba(10, 27, 57, 0.04)
                        margin: 0 .05rem
                    .item-price-currency
                        display: flex
                        align-items: center
                        position: relative
                        .item-price-currency-detail
                            margin-right: .05rem
                            font-size: .18rem
                            line-height: .22rem
                            color: #0A1B39
                        .item-currency
                            position: absolute
                            top: 100%
                            right: 0
                            border-radius: .08rem
                            border: 1px solid rgba(10, 27, 57, 0.1)
                            background: #fff
                            display: flex
                            flex-direction: column
                            width: .6rem
                            box-shadow: 0 2px 6px 0 rgba(10, 27, 57, 0.2)
                          .currency
                              color: #0A1B39
                              font-size: .16rem
                              line-height: .16rem
                              padding: .1rem
                .item-wrapper-input
                    margin-top: 0.12rem
                    padding: 0.16rem
                    border-bottom: 1px solid rgba(10, 27, 57, 0.04)
                    width: 100%
        .item-help-container
            margin-top: .5rem
            border: 1px solid rgba(10, 27, 57, 0.35)
            border-radius: .24rem
            padding: .24rem .16rem
            .item-help-title
                font-size: .2rem
                line-height: .26rem
                font-weight: 500
            .item-help-detail
                display: flex
                justify-content: space-between
                align-items: center
                margin-top: .24rem
                -webkit-tap-highlight-color: #ccc
                touch-action: manipulation
                .item-help-question
                    font-size: .14rem
                    line-height: .14rem
                    color: #0A1B39
                    margin-right: .2rem
        .item-submit
            margin-top: .5rem
            .item-submit-warning
              display: flex
              padding: 10px 0 .05rem .2rem
              align-items: center
              .item-submit-warning-text
                font-size: .11rem
                line-height: .11rem
                color: rgba(10, 27, 57, 0.6)
                margin-left: .05rem
            .item-submit-button
                border-radius: .16rem
                padding: .12rem .24rem
                text-align: center
                background: #05FE9F
                color: #0A1B39
                font-size: .18rem
                line-height: .24rem
                font-weight: 500
                width: 100%
            .item-submit-button:active
                background: #e9ecef
                transform: scale(1.1)
@media (min-width: 1024px)
  .add-package-view
    width: 100%
    background: #F2F4F8
    height: 100%
    overflow-y: auto
    .add-package-component-container
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
</style>
