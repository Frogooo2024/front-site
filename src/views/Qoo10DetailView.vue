<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import OtherHeaderLight from '../components/OtherHeaderLight.vue'
import MovePageComponent from '../components/MorePageComponent.vue'
import HeaderComponent from '../components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import useIsMobile from '../hooks/useIsMobile'
import { useUserIdStore } from '@/stores/userId'
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

const address = reactive({
  userId: userId,
  streetOne: 'PERFORMANCE BUILDING, 158 KALLANG WAY',
  streetTwo: '#06-10A',
  postalCode: '349245',
  numberCode: '8385',
  number: '0022'
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
  <div class="qoo10-detial-view">
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
            {{ $t('Frogooo.SelectCountry', { brand: 'Qoo10', app: isMobile ? 'App' : 'website' }) }}
          </p>
        </section>
        <section class="first-use">
          <h3 class="first-use-title">{{ $t('Frogooo.FirstUse') }}</h3>
          <div class="first-use-image">
            <img src="../assets/icons/qoo10_detail.png" alt="" />
          </div>
        </section>
        <section class="first-use second-use">
          <h3 class="first-use-title">{{ $t('Frogooo.SecondUse') }}</h3>
          <div class="first-use-image">
            <img src="../assets/icons/qoo10_detail_two.png" alt="" />
          </div>
        </section>
      </div>
      <section class="shipping-container">
        <div class="step">{{ $t('Frogooo.Step', { number: 2 }) }}</div>
        <div class="shipping-information">
          <h1 class="shipping-title">
            {{
              $t('Frogooo.followingInformation', {
                brand: 'Qoo10',
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
        <div class="shipping-information-wrapper">
          <h3 class="shipping-information-title">Shipping Information</h3>
          <button class="shipping-information-new">New</button>
        </div>
        <div class="shipping-country">
          <div class="country-region">
            <span class="ountry-title">Country/region</span>
            <div class="country-reion-detail">
              <img class="country-region-warning-image" src="../assets/icons/warning.svg" alt="" />
              <span class="country-region-warning">Delivery Notice</span>
            </div>
          </div>
          <div class="shipping-country-wrapper">
            <span class="shipping-country-name">Singapore</span>
            <img src="../assets/icons/arrow_up_down.svg" alt="" />
          </div>
          <h3 class="shipping-country-title">Address</h3>
          <div class="shipping-country-wrapper">
            <div class="shipping-country-title-box">
              <img src="../assets/icons/search.svg" alt="" />
              <span class="shipping-country-subtitle">{{ address.postalCode }}</span>
            </div>
            <img class="shipping-country-subtitle-image" src="../assets/icons/close.svg" alt="" />
          </div>
          <div class="shipping-country-wrapper shipping-country-wrapper-text">
            {{ address.streetOne }}
          </div>
          <div class="shipping-country-wrapper">
            <span class="shipping-country-name">{{ address.streetTwo }}</span>
            <button class="copy" @touchend="copyBtnClicked(address.streetTwo)">Copy</button>
          </div>
          <div class="shipping-country-wrapper-tips">
            <img src="../assets/icons/right.svg" alt="" />
            <span>[Please enter the address in local language or English.]</span>
          </div>
          <h3 class="shipping-country-title">Name of Recipient</h3>
          <div class="shipping-country-wrapper">
            <span class="shipping-country-name country-name-red">{{ userId }}</span>
            <button class="copy" @touchend="copyBtnClicked(userId ?? '')">Copy</button>
          </div>
          <div class="shipping-country-wrapper-tips">
            <img src="../assets/icons/right.svg" alt="" />
            <span>[Please enter the address in local language or English.]</span>
          </div>
          <h3 class="shipping-country-title">Mobile Phone No.</h3>
          <div class="shipping-country-wrapper">
            <span class="shipping-country-name">Singapore (+65)</span>
            <img src="../assets/icons/arrow_up_down.svg" alt="" />
          </div>
          <div class="shipping-country-number-container">
            <div class="shipping-country-number-wrapper">
              <span class="shipping-country-number-code">{{ address.numberCode }}</span>
              <button class="copy" @touchend="copyBtnClicked(address.numberCode)">Copy</button>
            </div>
            <span class="link">-</span>
            <div class="shipping-country-number-wrapper">
              <span class="shipping-country-number-code">{{ address.number }}</span>
              <button class="copy" @touchend="copyBtnClicked(address.number)">Copy</button>
            </div>
          </div>
          <h3 class="shipping-country-title">Email( For Order / Shipping Info. )</h3>
          <div class="shipping-country-wrapper shipping-country-wrapper-text">Your email</div>
          <div class="shipping-country-wrapper-tips">
            <span class="shipping-country-wrapper-tips-subtitle">
              Email must be in a valid format.
            </span>
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
                $t('Frogooo.SelectCountry', { brand: 'Qoo10', app: isMobile ? 'App' : 'website' })
              }}
            </span>
            <span class="step-detail">
              {{ $t('Frogooo.UniqueIdentificationCode') }}
            </span>
          </div>
          <div class="step-right-content">
            <a
              class="step-web step-web-background"
              href="https://www.qoo10.sg"
              target="_blank"
              rel="noopener"
              >https://www.qoo10.sg</a
            >
          </div>
        </section>
        <section class="detail-content-step-two">
          <div class="step-button">
            {{ $t('Frogooo.Step', { number: 2 }) }}
          </div>
          <h2 class="step-title">
            {{
              $t('Frogooo.followingInformation', {
                brand: 'Qoo10',
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
        <div class="step-input-shadow">
          <div class="step-input step-input-margin-left">
            <h3 class="step-input-title">Name of Recipient</h3>
            <div class="step-input-wrapper">
              <span class="step-input-wrapper-name step-input-wrapper-name-red">{{ userId }}</span>
              <button class="copy" @click="copyBtnClicked(userId ?? '')">Copy</button>
            </div>
            <p class="step-input-warning">Please insert the name of recipient in local language.</p>
            <div class="step-input-flex-row">
              <img class="qoo10-image" src="../assets/icons/qoo10_phone.svg" alt="" />
              <div class="step-input-wrapper step-input-wrapper-margin-right">
                <span class="step-input-wrapper-name">Singapore (+65)</span>
                <img src="../assets/icons/arrow_down.svg" alt="" />
              </div>
              <div class="step-input-wrapper">
                <span class="step-input-wrapper-name">{{ address.numberCode }}</span>
                <button class="copy" @click="copyBtnClicked(address.numberCode)">Copy</button>
              </div>
              <div class="link-character"></div>
              <div class="step-input-wrapper">
                <span class="step-input-wrapper-name">{{ address.number }}</span>
                <button class="copy" @click="copyBtnClicked(address.number)">Copy</button>
              </div>
            </div>
            <div class="step-input-flex-row">
              <img class="qoo10-image" src="../assets/icons/qoo10_email.svg" alt="" />
              <div class="step-input-wrapper">
                <span class="step-input-wrapper-name">Your email</span>
              </div>
            </div>
            <p class="step-input-warning step-input-warning-red">
              Email must be in a valid format.
            </p>
            <p class="step-input-warning">
              You will receive order and shipping information via this email.
            </p>
            <div class="step-input-flex-row">
              <div class="step-input-wrapper step-input-wrapper-width">
                <div class="step-input-wrapper-left">
                  <img
                    class="step-input-wrapper-image"
                    src="../assets/icons/singapore.png"
                    alt=""
                  />
                  <span class="step-input-wrapper-name">Singapore</span>
                </div>
                <img src="../assets/icons/arrow_right.svg" alt="" />
              </div>
              <div class="delivery-notice-container">
                <img src="../assets/icons/warning.svg" alt="" />
                <span class="delivery-notice">Delivery Notice</span>
              </div>
            </div>
            <div class="search-container">
              <div class="search-postal-code">{{ address.postalCode }}</div>
              <div class="search">Search</div>
              <p class="search-text">(*)For address line 1,please use [search] button.</p>
            </div>
            <div class="step-input-wrapper step-input-wrapper-background">
              <span class="step-input-wrapper-name">{{ address.streetOne }}</span>
            </div>
            <div class="step-input-wrapper step-input-wrapper-border">
              <span class="step-input-wrapper-name">{{ address.streetTwo }}</span>
              <button class="copy" @click="copyBtnClicked(address.streetTwo)">Copy</button>
            </div>
            <p class="step-input-warning step-input-warning-margin">
              Letters and numbers only; no symbols except / @ # -,.()
            </p>
            <p class="step-input-warning">
              Please enter your address in your local language to prevent delivery delays.
            </p>
          </div>
        </div>
      </section>
    </div>
    <FooterComponent backgroundColor="white" v-if="!isMobile" />
  </div>
</template>

<style lang="stylus" scoped>
@media (max-width: 750px)
  .qoo10-detial-view
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
          .first-use-title
              font-size: .14rem
              line-height: .22rem
              color: rgba(10, 27, 57, 0.6)
          .first-use-image
              margin-top: .1rem
              img
                  width: 100%
                  height: 100%
      .second-use
        margin-top: .2rem
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
      .country-region
        display: flex
        justify-content: space-between
        align-items: center
        padding: .08rem
        .country-title
          font-size: .12rem
          line-height: .22rem
          color: #0A1B39
        .country-reion-detail
          display: flex
          align-items: center
          .country-region-warning-image
              width: .12rem
              height: .12rem
              margin-right: .05rem
          .country-region-warning
            font-size: .12rem
            line-height: .22rem
            color: rgba(10, 27, 57, 0.55)
            text-decoration: underline
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
      .shipping-information-wrapper
          display: flex
          justify-content: space-between
          align-items: center
          background: #F2F2F2
          padding: .1rem .08rem
          margin-top: .3rem
          .shipping-information-title
            font-size: .14rem
            line-height: .22rem
            font-weight: 500
            color: #0A1B39
          .shipping-information-new
            border: 0.5px solid #999
            background: #fff
            color: #FD525A
            font-size: .12rem
            line-height: .22rem
            font-weight: .500
            border-radius: 2px
            padding: 0 .1rem
      .shipping-country-title-box
        display: flex
        align-items: center
        img
          width: .16rem
          height: .16rem
          margin-right: .05rem
        .shipping-country-subtitle
          font-size: .13rem
          line-height: .22rem
          color: rgba(10, 27, 57, 0.3)
      .shipping-country
          padding: .08rem
          box-shadow: 0 .02rem .2rem 0 #eee
          .shipping-country-title
            font-size: .12rem
            line-height: .22rem
            color: #0A1B39
            margin-top: .2rem
          .shipping-country-wrapper
            display: flex
            align-items: center
            justify-content: space-between
            padding: .04rem .08rem
            border: 0.5px solid #CCCCCC
            margin-top: .1rem
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
          .shipping-country-number-container
            display: flex
            align-items: center
            margin-top: .1rem
            .link
              margin: 0 .05rem
            .shipping-country-number-wrapper
              display: flex
              justify-content: space-between
              padding: .04rem .08rem
              width: 1.32rem
              border: 0.5px solid #CCCCCC
              align-items: center
              .shipping-country-number-code
                margin-right: .2rem
                font-size: .13rem
                line-height: .22rem
                color: #0A1B39
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
          .shipping-country-wrapper-text
            font-size: .12rem
            line-height: .22rem
            color: rgba(10, 27, 57, 0.3)
          .shipping-country-wrapper-tips
            font-size: .1rem
            line-height: .22rem
            color: #999
            display: flex
            align-items: center
            img
              width: .12rem
              height: .12rem
              margin-right: .05rem
            .shipping-country-wrapper-tips-subtitle
              color: #FD525A
          .shipping-country-tips
            display: flex
            flex-direction: column
            .tips
              font-size: .1rem
              line-height: .22rem
              color: #0A1B39
              margin: .1rem 0
            .button
              border: 1px solid #D5D7D6
              box-shadow: 0 2px 6px 0 rgba(10, 27, 57, 0.2)
              width: 100%
              padding: .08rem
              border-radius: .08rem
              text-align: center
              font-size: .13rem
              line-height: .22rem
              font-weight: 500
@media (min-width: 1024px)
  .qoo10-detial-view
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
            .step-web
              margin-top: 10px
              font-size: 12px
              line-height: 18px
              color: #0A1B39
            .step-web-background
              padding: 12px 0
              background: #0A1B39
              border-radius: 8px
              font-size: 16px
              line-height: 18px
              color: #FFFFFF
              text-align: center
              width: 300px
              text-decoration: underline
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
          padding: 16px
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
            .step-input-warning
              font-size: 10px
              line-height: 22px
              color: #999
            .step-input-warning-red
              color: #EA002A
              margin-left: 42px
            .step-input-warning-margin
              margin-top: 5px
            .step-input-flex-row
              display: flex
              align-items: center
              justify-content: start
              margin-top: 16px
            .search-container
              display: flex
              align-items: center
              margin-top: 16px
              .search-postal-code
                height: 30px
                width: 79px
                text-align: center
                font-size: 13px
                line-height: 30px
                border: 0.5px solid #CCCCCC
                background: #FCFCFC
                color: #0A1B39
                border-radius: 4px
                margin-right: 10px
              .search
                height: 30px
                width: 79px
                text-align: center
                font-size: 13px
                line-height: 30px
                border: 0.5px solid #CCCCCC
                background: #2073E5
                color: #fff
                border-radius: 4px
                margin-right: 10px
              .search-text
                font-size: 10px
                line-height: 22px
                color: #0A1B39
            .step-input-wrapper
              display: flex
              justify-content: space-between
              border: 0.5px solid #ccc
              padding: 4px 8px
              width: 610px
              border-radius: 8px
              .step-input-wrapper-left
                display: flex
                align-items: center
                .step-input-wrapper-image
                  width: 24px
                  height: 16px
                  margin-right: 8px
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
                font-size: 13px
                line-height: 22px
                font-weight: 500
                color: #0A1B39
              .step-input-wrapper-name-red
                color: #D2202F
            .step-input-wrapper-background
              background: #FCFCFC
              margin-top: 10px
              .step-input-wrapper-name
                color: rgba(10, 27, 57, 0.3)
            .step-input-wrapper-border
              border: 1px solid #000
              margin-top: 10px
            .delivery-notice-container
              display: flex
              align-items: center
              margin-left: 10px
              .delivery-notice
                font-size: 12px
                line-height: 22px
                color: rgba(10, 27, 57, 0.55)
                margin-left: 5px
                text-decoration: underline
            .step-input-wrapper-width
              width: 275px
            .step-input-wrapper-margin-right
              margin-right: 10px
            .qoo10-image
              margin-right: 10px
            .link-character
              border-top: 1px solid #ccc
              width: 28px
              margin: 0 16px
</style>
