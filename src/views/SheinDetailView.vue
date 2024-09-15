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
  streetOne: '158 Kallang Way',
  streetTwo: '#06-10A',
  postalCode: '349245',
  number: '83850022'
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
  <div class="shein-detial-view">
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
            {{ $t('Frogooo.SelectCountry', { brand: 'SHEIN', app: isMobile ? 'App' : 'website' }) }}
          </p>
        </section>
        <section class="first-use">
          <h3 class="first-use-title">{{ $t('Frogooo.FirstUse') }}</h3>
          <div class="first-use-image">
            <img src="../assets/icons/shein_detail.png" alt="" />
          </div>
          <p class="first-use-subtitle">{{ $t('Frogooo.LookAtRegionButton') }}</p>
        </section>
        <section class="first-use second-use">
          <h3 class="first-use-title">{{ $t('Frogooo.SecondUse') }}</h3>
          <div class="first-use-image">
            <img src="../assets/icons/shein_detail_two.png" alt="" />
          </div>
        </section>
      </div>
      <section class="shipping-container">
        <div class="step">{{ $t('Frogooo.Step', { number: 2 }) }}</div>
        <div class="shipping-information">
          <h1 class="shipping-title">
            {{
              $t('Frogooo.followingInformation', {
                brand: 'SHEIN',
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
          <div class="country-region">
            <div class="country-reion-detail">
              <span class="country-title">Location*</span>
              <span class="country-name">Singapore</span>
            </div>
            <img src="../assets/icons/arrow_down.svg" alt="" />
          </div>
          <div class="shipping-country-wrapper">
            <div class="shipping-country-title-box">
              <span class="shipping-country-subtitle">Full Name*</span>
              <span class="shipping-country-name country-name-red">{{ userId }}</span>
            </div>
            <button class="copy" @touchend="copyBtnClicked(userId ?? '')">Copy</button>
          </div>
          <div class="shipping-country-wrapper">
            <div class="shipping-country-title-box">
              <span class="shipping-country-subtitle">Phone Number*</span>
              <div class="shipping-country-name-wrapper">
                <span>SG +65</span>
                <span>|</span>
                <span class="shipping-country-name">{{ address.number }}</span>
              </div>
            </div>
            <button class="copy" @touchend="copyBtnClicked(address.number)">Copy</button>
          </div>
          <div class="correct-phone-number">Need Correct Phone Number for delivery.</div>
          <div class="shipping-country-wrapper">
            <div class="shipping-country-title-box">
              <span class="shipping-country-subtitle">Post/Zip Code*</span>
              <span class="shipping-country-name">{{ address.postalCode }}</span>
            </div>
            <button class="copy" @touchend="copyBtnClicked(address.postalCode)">Copy</button>
          </div>
          <div class="shipping-country-wrapper">
            <div class="shipping-country-title-box">
              <span class="shipping-country-subtitle">Address Line 1*</span>
              <span class="shipping-country-name">{{ address.streetOne }}</span>
            </div>
            <button class="copy" @touchend="copyBtnClicked(address.streetOne)">Copy</button>
          </div>
          <div class="shipping-country-wrapper">
            <div class="shipping-country-title-box">
              <span class="shipping-country-subtitle">Address Line 2*</span>
              <span class="shipping-country-name">{{ address.streetTwo }}</span>
            </div>
            <button class="copy" @touchend="copyBtnClicked(address.streetTwo)">Copy</button>
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
                $t('Frogooo.SelectCountry', { brand: 'SHEIN', app: isMobile ? 'App' : 'website' })
              }}
            </span>
            <span class="step-detail">
              {{ $t('Frogooo.UniqueIdentificationCode') }}
            </span>
          </div>
          <div class="step-right-content">
            <a
              class="step-web step-web-background"
              href="https://sg.shein.com"
              target="_blank"
              rel="noopener"
              >https://sg.shein.com</a
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
                brand: 'SHEIN',
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
          <div class="step-input">
            <div class="step-input-wrapper step-input-wrapper-black">
              <div class="step-input-container">
                <span class="step-input-container-title">Location*</span>
                <span class="step-input-wrapper-name">Singapore</span>
              </div>
              <img src="../assets/icons/arrow_down.svg" alt="" />
            </div>
            <div class="step-input-wrapper">
              <div class="step-input-container">
                <span class="step-input-container-title">Full Name*</span>
                <span class="step-input-wrapper-name step-input-wrapper-name-red">{{
                  userId
                }}</span>
              </div>
              <button class="copy" @click="copyBtnClicked(userId ?? '')">Copy</button>
            </div>
            <div class="step-input-flex-row">
              <div class="step-input-sg">SG +65</div>
              <div class="step-input-wrapper step-input-wrapper-flex">
                <div class="step-input-container">
                  <span class="step-input-container-title">Phone Number*</span>
                  <span class="step-input-wrapper-name">{{ address.number }}</span>
                </div>
                <button class="copy" @click="copyBtnClicked(address.number)">Copy</button>
              </div>
            </div>
            <div class="step-input-wrapper">
              <div class="step-input-container">
                <span class="step-input-container-title">Post/Zip Code*</span>
                <span class="step-input-wrapper-name">{{ address.postalCode }}</span>
              </div>
              <button class="copy" @click="copyBtnClicked(address.postalCode)">Copy</button>
            </div>
            <div class="step-input-wrapper">
              <div class="step-input-container">
                <span class="step-input-container-title">Address Line 1*</span>
                <span class="step-input-wrapper-name">{{ address.streetOne }}</span>
              </div>
              <button class="copy" @click="copyBtnClicked(address.streetOne)">Copy</button>
            </div>
            <div class="step-input-wrapper">
              <div class="step-input-container">
                <span class="step-input-container-title">Address Line 2</span>
                <span class="step-input-wrapper-name">{{ address.streetTwo }}</span>
              </div>
              <button class="copy" @click="copyBtnClicked(address.streetTwo)">Copy</button>
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
  .shein-detial-view
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
          .first-use-subtitle
            font-size: .12rem
            line-height: .18rem
            color: #0A1B39
            margin-top: .1rem
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
        align-items: flex-end
        padding: .08rem
        border: 1px solid #E5E5E5
        .country-reion-detail
          display: flex
          flex-direction: column
          .country-title
            font-size: .1rem
            line-height: .16rem
            font-weight: 500
            color: rgba(10, 27, 57, 0.6)
          .country-name
              font-size: .12rem
              line-height: .22rem
              font-weight: 500
              color: #0A1B39
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
          .shipping-country-wrapper
            display: flex
            align-items: flex-end
            justify-content: space-between
            padding: .08rem
            border: 1px solid #E5E5E5
            margin-top: .2rem
            background: #FFFFFF
            .shipping-country-title-box
              display: flex
              flex-direction: column
              .shipping-country-subtitle
                font-size: .1rem
                line-height: .16rem
                font-weight: 500
                color: rgba(10, 27, 57, 0.6)
              .shipping-country-name-wrapper
                display: flex
                align-items: center
                font-size: .12rem
                line-height: .22rem
                font-weight: 500
                span:nth-of-type(1)
                  color: rgba(10, 27, 57, 0.6)
                  margin-right: .05rem
                span:nth-of-type(2)
                  color: #E5E5E5
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
          .correct-phone-number
            font-size: .1rem
            line-height: .16rem
            font-weight: 500
            color: rgba(10, 27, 57, 0.6)
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
  .shein-detial-view
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
            .step-input
              display: flex
              flex-direction: column
              .step-input-flex-row
                display: flex
                align-items: center
                .step-input-sg
                  padding: 0 16px
                  font-size: 12px
                  line-height: 54px
                  font-weight: 500
                  color: rgba(10, 27, 57, 0.5)
                  border: 1px solid #E5E5E5
                  margin: 16px 0 0 8px
                  height: 54px
              .step-input-wrapper
                display: flex
                justify-content: space-between
                align-items: end
                border: 1px solid #E5E5E5
                padding: 7px 8px 9px 16px
                margin: 16px 8px 0
                .step-input-container
                  display: flex
                  flex-direction: column
                  .step-input-container-title
                    font-size: 10px
                    line-height: 16px
                    font-weight: 500
                    color: rgba(10, 27, 57, 0.5)
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
                  line-height: 20px
                  color: #0A1B39
                .step-input-wrapper-name-red
                  color: #C2121F
              .step-input-wrapper-flex
                flex: 1
                margin-left: 0
                border-left: none
              .step-input-wrapper-black
                border: 0.5px solid #000
              .step-input-wrapper:nth-of-type(1)
                margin-top: 0
</style>
