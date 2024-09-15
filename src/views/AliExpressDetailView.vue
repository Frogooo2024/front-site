<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import OtherHeaderLight from '../components/OtherHeaderLight.vue'
import MovePageComponent from '../components/MorePageComponent.vue'
import HeaderComponent from '../components/HeaderComponent.vue'
import { useUserIdStore } from '@/stores/userId'
import { useI18n } from 'vue-i18n'
import { showToast } from 'vant'
import useIsMobile from '../hooks/useIsMobile'
import FooterComponent from '@/components/FooterComponent.vue'

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

const address = reactive({
  userId: userId,
  contactCode: '+65',
  contactNumber: '83850022',
  country: 'Singapore',
  detail: 'PERFORMANCE BUILDING, 158 KALLANG WAY',
  number: '#06-10A'
})

const copyBtnClicked = async (text: string) => {
  if (navigator.clipboard) {
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
  } else {
    const textArea = document.createElement('textarea')
    textArea.value = text
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
  <div class="aliexpress-detial-view">
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
          <p class="select-address">
            {{
              $t('Frogooo.SelectCountry', {
                brand: 'AliExpress',
                app: isMobile ? 'App' : 'website'
              })
            }}
          </p>
        </section>
        <section class="first-use">
          <h3 class="first-use-title">{{ $t('Frogooo.FirstUse') }}</h3>
          <div class="first-use-image">
            <img src="../assets/icons/aliexpress_detail.png" alt="" />
          </div>
        </section>
        <section class="first-use second-use">
          <h3 class="first-use-title">{{ $t('Frogooo.SecondUse') }}</h3>
          <div class="first-use-image">
            <img src="../assets/icons/aliexpress_detail_two.png" alt="" />
          </div>
        </section>
      </div>
      <section class="shipping-container">
        <div class="step">{{ $t('Frogooo.Step', { number: 2 }) }}</div>
        <div class="shipping-information">
          <h1 class="shipping-title">
            {{
              $t('Frogooo.followingInformation', {
                brand: 'Aliexpress',
                app: isMobile ? 'App' : 'website'
              })
            }}
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
        <div class="shipping-country">
          <h3 class="shipping-country-title">Country/region</h3>
          <div class="shipping-country-wrapper">
            <div class="shipping-country-detail">
              <img class="shipping-country-image" src="../assets/icons/singapore.png" alt="" />
              <span class="shipping-country-name">Singapore</span>
            </div>
            <img src="../assets/icons/arrow_right.svg" alt="" />
          </div>
          <p class="shipping-country-select">Please select your country</p>
        </div>
        <div class="shipping-country">
          <h3 class="shipping-country-title">Contact information</h3>
          <div class="shipping-country-wrapper">
            <span class="shipping-country-name country-name-red">{{ userId }}</span>
            <button class="copy" @touchend="copyBtnClicked(userId ?? '')">Copy</button>
          </div>
          <div class="contact-container">
            <h3 class="contact-container-title">Please enter a contact name.</h3>
            <div class="contact-detail">
              <div class="contact-country">{{ address.contactCode }}</div>
              <div class="contact-number">
                <span class="number">{{ address.contactNumber }}</span>
                <button class="copy" @touchend="copyBtnClicked(`${address.contactNumber}`)">
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="shipping-country">
          <h3 class="shipping-country-title">Address</h3>
          <div class="shipping-country-wrapper">
            <span class="shipping-country-name">349245</span>
            <img src="../assets/icons/arrow_right.svg" alt="" />
          </div>
          <div class="shipping-country-wrapper">
            <span class="shipping-country-name">34 Macpherson Braddell</span>
            <img src="../assets/icons/arrow_right.svg" alt="" />
          </div>
          <div class="shipping-country-wrapper">
            <span class="shipping-country-name">{{ address.country }}</span>
            <button class="copy" @touchend="copyBtnClicked(address.country)">Copy</button>
          </div>
          <div class="shipping-country-wrapper">
            <span class="shipping-country-name">{{ address.detail }}</span>
            <button class="copy" @touchend="copyBtnClicked(address.detail)">Copy</button>
          </div>
          <div class="shipping-country-wrapper">
            <span class="shipping-country-name">{{ address.number }}</span>
            <button class="copy" @touchend="copyBtnClicked(address.number)">Copy</button>
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
              {{
                $t('Frogooo.SelectCountry', {
                  brand: 'AliExpress',
                  app: isMobile ? 'App' : 'website'
                })
              }}
            </span>
            <span class="step-detail">
              {{ $t('Frogooo.UniqueIdentificationCode') }}
            </span>
          </div>
          <div class="step-right-content">
            <a class="step-web" href="https://www.aliexpress.com" target="_blank" rel="noopener"
              >https://www.aliexpress.com</a
            >
            <img class="brand-image" src="../assets/icons/ali.png" alt="" />
          </div>
        </section>
        <section class="detail-content-step-two">
          <div class="step-button">
            {{ $t('Frogooo.Step', { number: 2 }) }}
          </div>
          <h2 class="step-title">
            {{
              $t('Frogooo.followingInformation', {
                brand: 'Aliexpress',
                app: isMobile ? 'App' : 'website'
              })
            }}
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
        <div class="step-input">
          <h3 class="step-input-title">Country/region</h3>
          <div class="step-input-wrapper">
            <div class="step-input-wrapper-left">
              <img class="step-input-wrapper-image" src="../assets/icons/singapore.png" alt="" />
              <span class="step-input-wrapper-name">Singapore</span>
            </div>
            <img src="../assets/icons/arrow_right.svg" alt="" />
          </div>
        </div>
        <div class="step-input">
          <h3 class="step-input-title">Contact information</h3>
          <div class="step-input-flex-row">
            <div class="step-input-wrapper">
              <span class="step-input-wrapper-name step-input-wrapper-name-red">{{ userId }}</span>
              <button class="copy" @click="copyBtnClicked(userId ?? '')">Copy</button>
            </div>
            <div class="step-input-wrapper">
              <span class="step-input-wrapper-name"
                >{{ address.contactCode }} {{ address.contactNumber }}</span
              >
              <button class="copy" @click="copyBtnClicked(address.contactNumber)">Copy</button>
            </div>
          </div>
          <p class="step-input-warning">Please enter a contact name.</p>
        </div>
        <div class="step-input">
          <h3 class="step-input-title">Address</h3>
          <div class="step-input-flex-row step-input-flex-end">
            <div class="step-input-image-container">
              <div class="step-input-wrapper">
                <span class="step-input-wrapper-name">349245</span>
                <img src="../assets/icons/arrow_right.svg" alt="" />
              </div>
              <div class="step-input-wrapper">
                <span class="step-input-wrapper-name">{{ address.detail }}</span>
                <button class="copy" @click="copyBtnClicked(address.detail)">Copy</button>
              </div>
              <div class="step-input-wrapper">
                <span class="step-input-wrapper-name">34 Macpherson Braddell</span>
                <img src="../assets/icons/arrow_right.svg" alt="" />
              </div>
            </div>
            <div class="step-input-image-container">
              <div class="step-input-wrapper">
                <span class="step-input-wrapper-name">{{ address.number }}</span>
                <button class="copy" @click="copyBtnClicked(address.number)">Copy</button>
              </div>
              <div class="step-input-wrapper">
                <span class="step-input-wrapper-name">Singapore</span>
                <button class="copy" @click="copyBtnClicked('Singapore')">Copy</button>
              </div>
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
  .aliexpress-detial-view
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
      .shipping-country
          padding: .08rem
          margin-top: .3rem
          box-shadow: 0 .02rem .2rem 0 #eee
          .shipping-country-title
            font-size: .12rem
            line-height: .22rem
            font-weight: 700
            color: #000
          .shipping-country-wrapper
            display: flex
            align-items: center
            justify-content: space-between
            padding: .08rem
            border: 0.5px solid #CCCCCC
            border-radius: .04rem
            margin-top: .1rem
            .shipping-country-detail
              display: flex
              align-items: center
              .shipping-country-image
                width: .24rem
                height: .16rem
                margin-right: .05rem
            .shipping-country-name
              font-size: .12rem
              line-height: .22rem
              font-weight: 500
            .country-name-red
              color: #D2202F
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
          .contact-container
            display: flex
            flex-direction: column
            .contact-container-title
              font-size: .1rem
              line-height: .22rem
              color: #999
              margin-top: .1rem
            .contact-detail
              display: flex
              justify-content: space-between
              align-items: center
              font-size: .12rem
              line-height: .22rem
              font-weight: 500
              .contact-country
                padding: .08rem
                border: 0.5px solid #CCCCCC
                border-radius: .04rem
                width: 1rem
              .contact-number
                padding: .08rem
                border: 0.5px solid #CCCCCC
                border-radius: .04rem
                display: flex
                justify-content: space-between
                align-items: center
                .number
                  margin-right: .4rem
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
        .shipping-country-select
          font-size: .1rem
          line-height: .22rem
          color: #999
          margin-top: .1rem
@media (min-width: 1024px)
  .aliexpress-detial-view
    width: 100%
    background: #F2F4F8
    height: 100%
    overflow-y: auto
  .web-detial-wrapper
    width: 800px
    margin: 10px auto 120px
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
          .step-web
            margin-top: 10px
            font-size: 12px
            line-height: 18px
            color: #0A1B39
          .brand-image
            margin-top: 10px
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
      .step-input
        display: flex
        flex-direction: column
        margin: 24px
        .step-input-title
          font-size: 12px
          line-height: 22px
          font-weight: 700
          color: #000
        .step-input-flex-row
          display: flex
          align-items: center
          justify-content: space-between
          .step-input-wrapper-image
            width: 344px
            height: 38px
          .step-input-image-container
            display: flex
            flex-direction: column
            align-items: end
            .step-input-wrapper-image-margin
              margin-top: 8px
          .step-input-widget-image
            width: 344px
            height: 182px
        .step-input-flex-end
          align-items: end
        .step-input-warning
          font-size: 10px
          line-height: 22px
          color: #999
        .step-input-wrapper
          display: flex
          justify-content: space-between
          align-items: center
          border-radius: 4px
          border: 0.5px solid #CCCCCC
          padding: 8px
          width: 344px
          margin-top: 10px
          .copy
            border-radius: 23px
            background: #05FE9F
            padding: 0 10px
            font-size: 12px
            line-height: 22px
            font-weight: 500
            color: #0A1B39
            text-decoration: underline
          .step-input-wrapper-left
            display: flex
            align-items: center
            .step-input-wrapper-image
              width: 24px
              height: 16px
              margin-right: 8px
          .step-input-wrapper-name
            font-size: 14px
            line-height: 22px
            font-weight: 500
            color: #0A1B39
          .step-input-wrapper-name-red
            color: #D2202F
            font-weight: 700
</style>
