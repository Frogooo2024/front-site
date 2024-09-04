<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

import OtherHeaderLight from '../components/OtherHeaderLight.vue'
import MovePageComponent from '../components/MorePageComponent.vue'
import HeaderComponent from '../components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import useIsMobile from '../hooks/useIsMobile'
import { useUserIdStore } from '../stores/userId'
import { useI18n } from 'vue-i18n'
import { showToast } from 'vant'

import 'vant/lib/index.css'

const showMorePage = ref(false)
const { userId } = useUserIdStore()
const isMobile = useIsMobile()

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

const copyBtnClicked = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
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
}
const viewPageClicked = () => {
  if (showMorePage.value) {
    showMorePage.value = false
  }
}
</script>

<template>
  <div class="lululemon-detial-view">
    <MovePageComponent v-if="showMorePage" @close-button-clicked="onCloseButtonClicked" />
    <OtherHeaderLight
      @more-button-clicked="onMoreButtonClicked"
      :hasBackgroundColor="true"
      v-if="isMobile"
    >
    </OtherHeaderLight>
    <HeaderComponent backgroundColor="white" :lightIcon="true" v-else />
    <div v-if="isMobile" @click="viewPageClicked">
      <section class="select-country">
        <h3>{{ $t('Frogooo.StartOverseasShopping') }}</h3>
        <img src="../assets/icons/whats_app.svg" alt="" @click="whatsAppClicked" />
      </section>
      <div class="step-container">
        <div class="step">{{ $t('Frogooo.Step', { number: 1 }) }}</div>
        <section class="select-address-container">
          <p class="select-address">{{ $t('Frogooo.SelectWebsite') }}</p>
        </section>
        <section class="first-use">
          <h3 class="first-use-title">
            {{ $t('Frogooo.FirstUse')
            }}<a href="https://www.lululemon.com.hk/en-sg/home" target="_blank" rel="noopener"
              >https://www.lululemon.com.hk/en-sg/home</a
            >
          </h3>
          <div class="first-use-image">
            <img src="../assets/icons/lululemon_detail.png" alt="" />
          </div>
        </section>
        <section class="first-use second-use">
          <h3 class="first-use-title">
            {{ $t('Frogooo.SecondUse')
            }}<a href="https://www.lululemon.com.hk/en-sg/home" target="_blank" rel="noopener"
              >https://www.lululemon.com.hk/en-sg/home</a
            >
          </h3>
          <div class="first-use-image">
            <img src="../assets/icons/lululemon_detail_two.png" alt="" />
          </div>
        </section>
      </div>
      <section class="shipping-container">
        <div class="step">{{ $t('Frogooo.Step', { number: 2 }) }}</div>
        <div class="shipping-information">
          <h1 class="shipping-title">
            {{ $t('Frogooo.followingWebsiteInformation') }}
          </h1>
          <div class="shipping-detail">
            <img class="tips" src="../assets/icons/tips.svg" alt="" />
            <p class="shipping-description">{{ $t('Frogooo.Recipient', { id: userId }) }}</p>
          </div>
          <div class="shipping-detail">
            <img class="tips" src="../assets/icons/tips.svg" alt="" />
            <p class="shipping-description">{{ $t('Frogooo.ShippingAddress') }}</p>
          </div>
        </div>
        <div class="item-container">
          <h3 class="item-container-title">Edit your Saved Address</h3>
          <h4 class="item-container-subtitle">* indicates the field is required</h4>
          <div class="item-input-container">
            <h4 class="item-input-container-title">Address Title *</h4>
            <div class="item-input-text-wrapper">
              <span class="item-input-text">Warehouse</span>
              <button class="copy" @touchstart="copyBtnClicked('Warehouse')">Copy</button>
            </div>
          </div>
          <div class="item-input-container">
            <h4 class="item-input-container-title">Location / Region *</h4>
            <div class="item-input-text-wrapper">
              <span class="item-input-text">Singapore</span>
              <img src="../assets/icons/arrow_down.svg" alt="" />
            </div>
          </div>
          <div class="item-input-container">
            <h4 class="item-input-container-title">First name *</h4>
            <div class="item-input-text-wrapper">
              <span class="item-input-text">FG</span>
              <button class="copy" @touchstart="copyBtnClicked('FG')">Copy</button>
            </div>
          </div>
          <div class="item-input-container">
            <h4 class="item-input-container-title">Last name *</h4>
            <div class="item-input-text-wrapper">
              <span class="item-input-text item-input-red-text">{{ userId?.slice(2) }}</span>
              <button class="copy" @touchstart="copyBtnClicked(userId?.slice(2) ?? '')">Copy</button>
            </div>
          </div>
          <div class="item-input-box">
            <div class="item-input-container">
              <h4 class="item-input-container-title">Country code *</h4>
              <div class="item-input-text-wrapper">
                <span class="item-input-text item-input-text-margin">65</span>
                <button class="copy" @touchstart="copyBtnClicked('65')">Copy</button>
              </div>
              <p class="item-input-container-subtitle">65</p>
            </div>
            <div class="item-input-container">
              <h4 class="item-input-container-title">Phone *</h4>
              <div class="item-input-text-wrapper">
                <span class="item-input-text item-input-text-margin">83850022</span>
                <button class="copy" @touchstart="copyBtnClicked('83850022')">Copy</button>
              </div>
              <p class="item-input-container-subtitle">62218130</p>
            </div>
          </div>
          <div class="item-input-container">
            <h4 class="item-input-container-title">Address line 1 *</h4>
            <div class="item-input-text-wrapper">
              <span class="item-input-text">3 Lorong Bakar Batu</span>
              <button class="copy" @touchstart="copyBtnClicked('3 Lorong Bakar Batu')">Copy</button>
            </div>
            <p class="item-input-container-subtitle">Building number / Street name / Unit number</p>
          </div>
          <div class="item-input-container">
            <h4 class="item-input-container-title">Address line 2 (Optional)</h4>
            <div class="item-input-text-wrapper">
              <span class="item-input-text">Brightway building #02-04B</span>
              <button class="copy" @touchstart="copyBtnClicked('Brightway building #02-04B')">
                Copy
              </button>
            </div>
            <p class="item-input-container-subtitle">Building name</p>
          </div>
          <div class="item-input-container">
            <h4 class="item-input-container-title">City *</h4>
            <div class="item-input-text-wrapper">
              <span class="item-input-text">Singapore</span>
              <button class="copy" @touchstart="copyBtnClicked('Singapore')">Copy</button>
            </div>
          </div>
          <div class="item-input-container">
            <h4 class="item-input-container-title">Postal Code *</h4>
            <div class="item-input-text-wrapper">
              <span class="item-input-text">348741</span>
              <button class="copy" @touchstart="copyBtnClicked('348741')">Copy</button>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div v-else class="web-detial-wrapper">
      <h3 class="web-detial-step">{{ $t('Frogooo.StartOverseasShopping') }}</h3>
      <section class="detail-content">
        <section class="detail-content-step">
          <div class="step-left-content">
            <div class="step-button">
              {{ $t('Frogooo.Step', { number: 1 }) }}
            </div>
            <span class="step-content">
              {{ $t('Frogooo.SelectWebsite') }}
            </span>
            <span class="step-detail">
              {{ $t('Frogooo.UniqueIdentificationCode') }}
            </span>
          </div>
          <div class="step-right-content">
            <span class="use">{{ $t('Frogooo.FirstUse') }}</span>
            <a
              class="step-web"
              href="https://www.lululemon.com.hk/en-sg/home"
              target="_blank"
              rel="noopener"
              >https://www.lululemon.com.hk/en-sg/home</a
            >
            <img class="brand-image" src="../assets/icons/lulu.png" alt="" />
            <span class="use">{{ $t('Frogooo.SecondUse') }}</span>
            <img class="second-brand-image" src="../assets/icons/lulu_location.png" alt="" />
          </div>
        </section>
        <section class="detail-content-step-two">
          <div class="step-button">
            {{ $t('Frogooo.Step', { number: 2 }) }}
          </div>
          <h2 class="step-title">
            {{ $t('Frogooo.followingWebsiteInformation') }}
          </h2>
          <div class="step-warning-wrapper">
            <img
              src="../assets/icons/warning_light.svg"
              alt=""
              class="step-warning-wrapper-image"
            />
            <p class="step-warning-wrapper-detail">{{ $t('Frogooo.Recipient', { id: userId }) }}</p>
          </div>
          <div class="step-warning-wrapper">
            <img
              src="../assets/icons/warning_light.svg"
              alt=""
              class="step-warning-wrapper-image"
            />
            <p class="step-warning-wrapper-detail">{{ $t('Frogooo.ShippingAddress') }}</p>
          </div>
        </section>
        <div class="step-input-shadow">
          <div class="step-input">
            <img
              class="step-input-wrapper-image"
              src="../assets/icons/lululemon_1.png"
              alt=""
              @click="copyBtnClicked('Warehouse')"
            />
            <img class="step-input-wrapper-image" src="../assets/icons/lululemon_2.png" alt="" />
          </div>
          <div class="step-input">
            <div class="step-input-flex-row">
              <div class="step-input-margin-left step-input-flex-row-flex">
                <h3 class="step-input-title">First name *</h3>
                <div class="step-input-wrapper">
                  <span class="step-input-wrapper-name">FG</span>
                  <button class="copy" @click="copyBtnClicked('FG')">Copy</button>
                </div>
              </div>
              <div class="step-input-margin-left step-input-flex-row-flex">
                <h3 class="step-input-title">Last name *</h3>
                <div class="step-input-wrapper">
                  <span class="step-input-wrapper-name">{{ userId?.slice(2) }}</span>
                  <button class="copy" @click="copyBtnClicked(userId?.slice(2) ?? '')">Copy</button>
                </div>
              </div>
            </div>
          </div>
          <div class="step-input">
            <img
              class="step-input-wrapper-high-image"
              src="../assets/icons/lululemon_7.png"
              alt=""
              @click="copyBtnClicked('83850022')"
            />
            <img
              class="step-input-wrapper-high-image"
              src="../assets/icons/lululemon_4.png"
              alt=""
              @click="copyBtnClicked('3 Lorong Bakar Batu')"
            />
            <img
              class="step-input-wrapper-high-image"
              src="../assets/icons/lululemon_5.png"
              alt=""
              @click="copyBtnClicked('Brightway building #02-04B')"
            />
          </div>
          <div class="step-input">
            <div class="step-input-flex-row">
              <img
                class="step-input-wrapper-image"
                src="../assets/icons/lululemon_3.png"
                alt=""
                @click="copyBtnClicked('Singapore')"
              />
              <img
                class="step-input-wrapper-image"
                src="../assets/icons/lululemon_6.png"
                alt=""
                @click="copyBtnClicked('348741')"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
    <FooterComponent backgroundColor="white" v-if="!isMobile" />
  </div>
</template>

<style lang="stylus" scoped>
@media (max-width: 750px)
  .lululemon-detial-view
    width: 100%
    background: #F2F4F8
    padding-bottom: .84rem
    .select-country
      font-size: .16rem
      line-height: .2rem
      color: #0A1B39
      margin: 0 .2rem 0
      display: flex
      justify-content: space-between
      align-items: center
    .step-container
      position: relative
      margin: .2rem .2rem 0
      display: flex
      flex-direction: column
      color: #000
      border-radius: .24rem
      padding: .24rem .2rem
      background: #fff
      .step
          position: absolute
          top: 2px
          left: 2px
          background-color: #E6E9F1
          padding: .04rem .24rem
          font-weight: 500
          font-size: .14rem
          line-height: .2rem
          color: rgba(10, 27, 57, 0.6)
          border-bottom-right-radius: .24rem
          border-top-left-radius: .24rem
      .select-address-container
        margin-top: .25rem
        .select-address
          font-size: .2rem
          line-height: .26rem
          font-weight: 700
      .first-use
          margin-top: .3rem
          a
              color: #0F67FE
              font-size: .1rem
              line-height: .22rem
              margin-left: .05rem
          .first-use-image
              margin-top: .1rem
              img
                  width: 100%
                  height: 100%
    .shipping-container
      position: relative
      margin: .2rem .2rem 0
      display: flex
      flex-direction: column
      color: #000
      border-radius: .24rem
      padding: .24rem .2rem
      background: #fff
      .step
          position: absolute
          top: 2px
          left: 2px
          background-color: #E6E9F1
          padding: .04rem .24rem
          font-weight: 500
          font-size: .14rem
          line-height: .2rem
          color: rgba(10, 27, 57, 0.6)
          border-bottom-right-radius: .24rem
          border-top-left-radius: .24rem
      .shipping-information
          display: flex
          flex-direction: column
          margin-top: .2rem
          .shipping-title
              font-size: .2rem
              line-height: .26rem
              font-weight: 600
              color: #0A1B39
          .shipping-detail
              display: flex
              align-items: start
              margin-top: .2rem
              .tips
                  width: .16rem
                  height: .16rem
                  margin-right: .05rem
              .shipping-description
                  font-size: .14rem
                  line-height: .18rem
                  color: rgba(10, 27, 57, 0.6)
      .item-container
          padding: .08rem
          margin-top: .3rem
          box-shadow: 0 .02rem .2rem 0 #eee
          .item-container-title
              font-size: .18rem
              line-height: .22rem
              font-weight: 700
              margin-top: .12rem
              color: #000
          .item-container-subtitle
              font-size: .13rem
              line-height: .22rem
              font-weight: 500
              color: #000
              margin-top: .1rem
          .item-input-box
              display: flex
              align-items: center
              justify-content: space-between
              .item-input-text-margin
                  margin-right: .16rem
          .item-input-container
              display: flex
              flex-direction: column
              margin-top: .24rem
              .item-input-container-title
                  font-size: .12rem
                  line-height: .22rem
                  font-weight: 500
                  color: #000
              .item-input-text-wrapper
                  display: flex
                  justify-content: space-between
                  align-items: center
                  border-radius: .04rem
                  border: 1px solid #0A1B39
                  padding: .1rem .08rem
                  .item-input-text
                      font-size: .13rem
                      line-height: .22rem
                      font-weight: 500
                      color: #000
                  .item-input-red-text
                      color: #D2202F
                      font-size: .14rem
                      font-weight: 700
                  .copy
                      border-radius: .23rem
                      background: #05FE9F
                      padding: 0 .1rem
                      font-size: .12rem
                      line-height: .22rem
                      font-weight: 500
                      color: #0A1B39
                      text-decoration: underline
                  .copy:active
                      background: #e9ecef
              .item-input-container-subtitle
                  font-size: .12rem
                  line-height: .22rem
                  font-weight: 500
                  color: rgba(0, 0, 0, 0.8)
@media (min-width: 1024px)
  .lululemon-detial-view
      width: 100%
      background: #F2F4F8
      height: 100%
      overflow-y: auto
    .web-detial-wrapper
      width: 800px
      margin: 10px auto
      .web-detial-step
        font-size: 16px
        line-height: 20px
        color: #0A1B39
        margin-left: 24px
      .detail-content
        border-radius: 24px
        padding: 24px
        background: #fff
        margin-top: 10px
        .detail-content-step
          display: flex
          align-items: center
          .step-button
            border-radius: 22px
            padding: 2px 15px
            font-size: 12px
            line-height: 20px
            font-weight: 500
            color: rgba(10, 27, 57, 0.6)
            background: #E6E9F1
            width: fit-content
          .step-left-content
            display: flex
            flex-direction: column
            width: 377px
            margin-right: 48px
            .step-content
              font-size: 20px
              line-height: 22px
              color: #0A1B39
              font-weight: 500
              margin-top: 12px
            .step-detail
              margin-top: 12px
              font-size: 14px
              line-height: 20px
              color: rgba(10, 27, 57, 0.6)
          .step-right-content
            display: flex
            flex-direction: column
            .use
              font-size: 14px
              line-height: 22px
              color: rgba(10, 27, 57, 0.6)
            .brand-image
              width: 279px
              height: 140px
              margin-top: 10px
            .second-brand-image
              width: 184px
              margin-top: 10px
            .step-web
              margin-top: 10px
              font-size: 12px
              line-height: 18px
              color: #0A1B39
        .detail-content-step-two
          display: flex
          flex-direction: column
          margin-top: 18px
          .step-button
            border-radius: 22px
            padding: 2px 15px
            font-size: 12px
            line-height: 20px
            font-weight: 500
            color: rgba(10, 27, 57, 0.6)
            background: #E6E9F1
            width: fit-content
          .step-title
            font-size: 20px
            line-height: 22px
            font-weight: 500
            color: #0A1B39
            margin: 16px 0
          .step-warning-wrapper
            display: flex
            align-items: start
            .step-warning-wrapper-image
              margin-right: 2px
            .step-warning-wrapper-detail
              font-size: 14px
              line-height: 18px
              color: rgba(10, 27, 57, 0.6)
        .step-input-shadow
          box-shadow: 0 2px 20px 0 #eee
          border-radius: 16px
          padding: 16px 8px
          margin-top: 16px
          .step-input-margin
            margin-top: 16px
          .step-input-margin-left
            margin-left: 10px
            margin-right: 10px
          .step-input
            display: flex
            flex-direction: column
            .step-input-title
              font-size: 12px
              line-height: 22px
              color: #0A1B39
              font-weight: 700
              margin-bottom: 4px
            .step-input-warning
              font-size: 10px
              line-height: 22px
              color: #999
            .step-input-flex-row
              display: flex
              align-items: center
              justify-content: space-between
              .step-input-flex-row-flex
                flex: 1
            .step-input-wrapper-image
              height: 76px
            .step-input-wrapper-high-image
              height: 94px
            .step-input-wrapper-image-margin
              margin-top: 16px
            .step-input-wrapper
              display: flex
              justify-content: space-between
              border: 1px solid #000
              padding: 10px 8px 10px 12px
              border-radius: 4px
              .copy
                border-radius: 23px
                background: #05FE9F
                padding: 0 10px
                font-size: 12px
                line-height: 22px
                font-weight: 500
                color: #0A1B39
                text-decoration: underline
              .step-input-wrapper-name
                font-size: 14px
                line-height: 22px
                font-weight: 700
                color: #D2202F
</style>
