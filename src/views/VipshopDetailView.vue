<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import OtherHeaderLight from '../components/OtherHeaderLight.vue'
import MovePageComponent from '../components/MorePageComponent.vue'
import { useUserIdStore } from '../stores/userId'
import useIsMobile from '../hooks/useIsMobile'
import HeaderComponent from '../components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
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
  <div class="vipshop-detial-view">
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
              $t('Frogooo.SelectCountry', { brand: 'VipShop', app: isMobile ? 'App' : 'website' })
            }}
          </p>
        </section>
        <section class="first-use">
          <div class="first-use-image">
            <img src="../assets/icons/vipshop_detail.png" alt="" />
          </div>
        </section>
      </div>
      <section class="shipping-container">
        <div class="step">{{ $t('Frogooo.Step', { number: 2 }) }}</div>
        <div class="shipping-information">
          <h1 class="shipping-title">
            {{
              $t('Frogooo.followingInformation', {
                brand: 'VipShop',
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
        <div class="item-container">
          <div class="item-input-container">
            <h4 class="item-input-container-title">Full Name *</h4>
            <div class="item-input-text-wrapper">
              <span class="item-input-text item-input-red-text">{{ userId }}</span>
              <button class="copy" @touchend="copyBtnClicked(userId ?? '')">Copy</button>
            </div>
          </div>
          <div class="item-input-container">
            <h4 class="item-input-container-title">Phone *</h4>
            <div class="item-input-text-wrapper">
              <span class="item-input-text">+65 83850022</span>
              <button class="copy" @touchend="copyBtnClicked('83850022')">Copy</button>
            </div>
          </div>
          <div class="item-input-container">
            <h4 class="item-input-container-title">Postal Code *</h4>
            <div class="item-input-text-wrapper">
              <span class="item-input-text">349245</span>
              <button class="copy" @touchend="copyBtnClicked('349245')">Copy</button>
            </div>
          </div>
          <div class="item-input-container">
            <h4 class="item-input-container-title">Street</h4>
            <div class="item-input-text-wrapper item-input-text-wrapper-background">
              <span class="item-input-text">158 Kallang Way</span>
              <button class="copy" @touchend="copyBtnClicked('158 Kallang Way')">Copy</button>
            </div>
          </div>
          <div class="item-input-container">
            <h4 class="item-input-container-title">Address *</h4>
            <div class="item-input-text-wrapper">
              <span class="item-input-text">#06-10A</span>
              <button class="copy" @touchend="copyBtnClicked('#06-10A')">Copy</button>
            </div>
          </div>
          <section class="tag-container">
            <h3 class="tag-title">Tag as</h3>
            <div class="tag-wrapper">
              <span class="tag-item">Home</span>
              <span class="tag-item">Company</span>
              <span class="tag-item">School</span>
              <span class="tag-item tag-item-selected">Other</span>
            </div>
          </section>
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
                $t('Frogooo.SelectCountry', { brand: 'Vipshop', app: isMobile ? 'App' : 'website' })
              }}
            </span>
            <span class="step-detail">
              {{ $t('Frogooo.UniqueIdentificationCode') }}
            </span>
          </div>
          <div class="step-right-content">
            <a
              class="step-web step-web-background"
              href="https://www.vipshop.sg"
              target="_blank"
              rel="noopener"
              >https://www.vipshop.sg</a
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
                brand: 'Vipshop',
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
          <h1 class="step-input-shadow-title">My Address</h1>
          <div class="step-input">
            <div class="step-input-flex-row">
              <div class="step-input-flex-row-margin-left">
                <h3 class="step-input-title">Full Name *</h3>
                <div class="step-input-wrapper">
                  <span class="step-input-wrapper-name step-input-wrapper-name-red">{{
                    userId
                  }}</span>
                  <button class="copy" @click="copyBtnClicked(userId ?? '')">Copy</button>
                </div>
              </div>
              <div class="step-input-flex-row-margin-left">
                <h3 class="step-input-title">Postal Code *</h3>
                <div class="step-input-wrapper">
                  <span class="step-input-wrapper-name">349245</span>
                  <button class="copy" @click="copyBtnClicked('349245')">Copy</button>
                </div>
              </div>
              <div class="step-input-flex-row-margin-left">
                <h3 class="step-input-title">Address *</h3>
                <div class="step-input-wrapper">
                  <span class="step-input-wrapper-name">158 Kallang Way</span>
                  <button class="copy" @click="copyBtnClicked('158 Kallang Way')">Copy</button>
                </div>
              </div>
            </div>
            <div class="step-input-flex-row">
              <div class="step-input-flex-row-margin-left">
                <h3 class="step-input-title">Phone *</h3>
                <div class="step-input-wrapper">
                  <span class="step-input-wrapper-name">SG +65 83850022</span>
                  <button class="copy" @click="copyBtnClicked('83850022')">Copy</button>
                </div>
              </div>
              <div class="step-input-flex-row-margin-left">
                <h3 class="step-input-title">Address *</h3>
                <div class="step-input-wrapper">
                  <span class="step-input-wrapper-name">#06-10A</span>
                  <button class="copy" @click="copyBtnClicked('#06-10A')">Copy</button>
                </div>
              </div>
            </div>
          </div>
          <div class="tag-wrapper">
            <span class="tag-item">Home</span>
            <span class="tag-item">Company</span>
            <span class="tag-item tag-item-selected">School</span>
            <span class="tag-item">Other</span>
          </div>
          <div class="vipshop-image-save">
            <img src="../assets/icons/vipshop_5.png" alt="" />
          </div>
        </div>
      </section>
    </div>
    <FooterComponent backgroundColor="white" v-if="!isMobile" />
  </div>
</template>

<style lang="stylus" scoped>
@media (max-width: 750px)
  .vipshop-detial-view
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
          .item-input-container
              display: flex
              flex-direction: column
              margin-top: .24rem
              .item-input-container-title
                  font-size: .11rem
                  line-height: .22rem
                  color: #222222
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
                      font-weight: 700
                      color: #000
                  .item-input-red-text
                      color: #D2202F
                      font-size: .13rem
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
              .item-input-text-wrapper-background
                  background: #F3F3F3
                  .item-input-text
                      font-weight: 400
              .item-input-container-subtitle
                  font-size: .12rem
                  line-height: .22rem
                  font-weight: 500
                  color: rgba(0, 0, 0, 0.8)
          .tag-container
              display: flex
              flex-direction: column
              margin-top: .24rem
              .tag-title
                  font-size: .11rem
                  line-height: .22rem
                  color: #222
              .tag-wrapper
                  display: flex
                  justify-content: start
                  align-items: center
                  .tag-item
                      border-radius: .02rem
                      border: 0.5px solid rgba(10, 27, 57, 0.8)
                      padding: 0 .1rem
                      font-size: .09rem
                      line-height: .22rem
                      color: #000
                      margin-right: .08rem
                  .tag-item-selected
                      color: #fff
                      background: #18C1BC
                      border: none
@media (min-width: 1024px)
  .vipshop-detial-view
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
          padding: 8px 14px 8px 4px
          margin-top: 16px
          .step-input-shadow-title
            font-size: 14px
            line-height: 14px
            font-weight: 700
            color: #222
            text-align: center
          .step-input
            display: flex
            flex-direction: column
            .step-input-title
              font-size: 11px
              line-height: 22px
              color: #222
            .step-input-flex-row
              display: flex
              align-items: center
              justify-content: space-between
              margin-top: 15px
              .step-input-flex-row-margin-left
                margin-left: 10px
                flex: 1
            .step-input-wrapper-image
              height: 78px
            .step-input-wrapper-high-image
              height: 144px
            .step-input-wrapper-image-margin
              margin-top: 16px
            .step-input-wrapper
              display: flex
              justify-content: space-between
              border: 0.5px solid rgba(10, 27, 57, 0.6)
              padding: 7px 8px
              width: 165px
              border-radius: 2px
              margin-top: 5px
              width: 100%
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
                font-weight: 700
                color: #000
              .step-input-wrapper-name-red
                color: #D2202F
          .tag-wrapper
            display: flex
            justify-content: start
            align-items: center
            margin: 20px 0 0 10px
            .tag-item
                border-radius: 2px
                border: 0.5px solid rgba(10, 27, 57, 0.8)
                padding: 0 10px
                font-size: 9px
                line-height: 22px
                color: #000
                margin-right: 8px
            .tag-item-selected
                color: #fff
                background: #18C1BC
                border: none
          .vipshop-image-save
            margin-top: 10px
            display: flex
            justify-content: end
            img
              height: 32px
</style>
