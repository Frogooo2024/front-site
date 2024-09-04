<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import OtherHeaderLight from '../components/OtherHeaderLight.vue'
import MovePageComponent from '../components/MorePageComponent.vue'
import HeaderComponent from '../components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import { useUserIdStore } from '../stores/userId'
import { useI18n } from 'vue-i18n'
import { showToast } from 'vant'
import useIsMobile from '../hooks/useIsMobile'

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
  <div class="taobao-detial-view">
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
              $t('Frogooo.SelectCountry', { brand: 'Taobao', app: isMobile ? 'App' : 'website' })
            }}
          </p>
        </section>
        <section class="first-use">
          <div class="first-use-image">
            <img src="../assets/icons/taobao_detail.png" alt="" />
          </div>
        </section>
      </div>
      <section class="shipping-container">
        <div class="step">{{ $t('Frogooo.Step', { number: 2 }) }}</div>
        <div class="shipping-information">
          <h1 class="shipping-title">
            {{
              $t('Frogooo.followingInformation', {
                brand: 'Taobao',
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
          <section class="item-title-wrapper">
            <span class="item-title">地址信息</span>
            <div class="item-subtitle-wrapper">
              <img src="../assets/icons/unselect.svg" alt="" />
              <span class="item-subtitle">默认收货地址</span>
            </div>
          </section>
          <div class="item-input-container">
            <h4 class="item-input-container-title">
              <span>收件人</span>
              <span class="item-input-container-symbol">*</span>
            </h4>
            <div class="item-input-text-wrapper">
              <span class="item-input-text item-input-red-text">{{ userId }}</span>
              <button class="copy" @touchstart="copyBtnClicked(userId ?? '')">Copy</button>
            </div>
          </div>
          <div class="item-input-container">
            <h4 class="item-input-container-title">
              <span>手机号</span>
              <span class="item-input-container-symbol">*</span>
            </h4>
            <div class="item-input-text-wrapper">
              <div class="item-input-text-container">
                <span class="item-input-code">+65</span>
                <img src="../assets/icons/arrow_down.svg" alt="" />
                <span class="item-input-text">83850022</span>
              </div>
              <button class="copy" @touchstart="copyBtnClicked('88257050')">Copy</button>
            </div>
          </div>
          <div class="item-input-container">
            <h4 class="item-input-container-title">
              <span>所在地区</span>
              <span class="item-input-container-symbol">*</span>
            </h4>
            <div class="item-input-text-wrapper">
              <span class="item-input-text">新加坡</span>
              <img src="../assets/icons/arrow_right.svg" alt="" />
            </div>
          </div>
          <div class="item-input-container">
            <h4 class="item-input-container-title">
              <span>邮政编码</span>
              <span class="item-input-container-symbol">*</span>
            </h4>
            <div class="item-input-text-wrapper">
              <span class="item-input-text">348741</span>
              <button class="copy" @touchstart="copyBtnClicked('348741')">Copy</button>
            </div>
          </div>
          <div class="item-input-container">
            <h4 class="item-input-container-title">
              <span>详细地址</span>
              <span class="item-input-container-symbol">*</span>
            </h4>
            <div class="item-input-text-wrapper">
              <span class="item-input-text"
                >3 Lorong Bakar Batu - Union Industrial Center, Brightway building #02-04B</span
              >
              <button
                class="copy"
                @touchstart="
                  copyBtnClicked(
                    '3 Lorong Bakar Batu - Union Industrial Center, Brightway building #02-04B'
                  )
                "
              >
                Copy
              </button>
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
              {{
                $t('Frogooo.SelectCountry', { brand: 'Taobao', app: isMobile ? 'App' : 'website' })
              }}
            </span>
            <span class="step-detail">
              {{ $t('Frogooo.UniqueIdentificationCode') }}
            </span>
          </div>
          <div class="step-right-content">
            <a
              class="step-web step-web-background"
              href="https://sg.world.taobao.com"
              target="_blank"
              rel="noopener"
              >https://sg.world.taobao.com</a
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
                brand: 'Taobao',
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
            <img
              class="step-input-image"
              src="../assets/icons/tao_1.png"
              alt=""
              @click="copyBtnClicked('83850022')"
            />
            <img
              class="step-input-image"
              src="../assets/icons/tao_3.png"
              alt=""
              @click="copyBtnClicked('348741')"
            />
            <img
              class="step-input-image"
              src="../assets/icons/tao_4.png"
              alt=""
              @click="
                copyBtnClicked(
                  '3 Lorong Bakar Batu - Union Industrial Center, Brightway building #02-04B'
                )
              "
            />
            <div class="step-input step-input-margin">
              <div class="step-input-flex-row">
                <h3 class="step-input-title">*收件人姓名(Usemame):</h3>
                <div class="step-input-wrapper">
                  <span class="step-input-wrapper-name">{{ userId }}</span>
                  <button class="copy" @click="copyBtnClicked(userId ?? '')">Copy</button>
                </div>
              </div>
            </div>
            <img
              class="step-input-image"
              src="../assets/icons/tao_2.png"
              alt=""
              @click="copyBtnClicked('83850022')"
            />
          </div>
        </div>
      </section>
    </div>
    <FooterComponent backgroundColor="white" v-if="!isMobile" />
  </div>
</template>

<style lang="stylus" scoped>
@media (max-width: 750px)
  .taobao-detial-view
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
          .item-title-wrapper
              display: flex
              justify-content: space-between
              align-items: center
              margin-top: .1rem
              .item-title
                  font-size: .16rem
                  line-height: .22rem
                  font-weight: 600
                  color: #0A1B39
              .item-subtitle-wrapper
                  display: flex
                  align-items: center
                  justify-content: space-between
                  img
                      width: .14rem
                      height: .14rem
                      margin-right: .05rem
                  .item-subtitle
                      font-size: .13rem
                      line-height: .22rem
                      font-weight: 500
          .item-input-container
              display: flex
              margin-top: .16rem
              align-items: center
              justify-content: space-between
              .item-input-container-title
                  flex: 0.3
                  font-size: .13rem
                  line-height: .22rem
                  color: #0A1B39
                  display: flex
                  align-items: center
                  .item-input-container-symbol
                    color: #D2202F
              .item-input-text-wrapper
                  flex: 0.8
                  display: flex
                  justify-content: space-between
                  align-items: center
                  border-radius: .08rem
                  padding: .1rem .08rem
                  background: #F9F9F9
                  .item-input-text-container
                    display: flex
                    align-items: center
                    img
                      margin-right: .08rem
                  .item-input-text
                      font-size: .13rem
                      line-height: .22rem
                      color: #000
                  .item-input-red-text
                      color: #D2202F
                      font-size: .13rem
                      font-weight: 600
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
  .taobao-detial-view
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
          padding: 16px 16px 26px
          margin-top: 16px
          .step-input
            display: flex
            flex-direction: column
            .step-input-image
              margin-top: 10px
            .step-input-flex-row
              display: flex
              align-items: center
              .step-input-title
                font-size: 13px
                line-height: 22px
                color: rgba(10, 27, 57, 0.6)
                width: 72px
                margin-right: 15px
            .step-input-wrapper
              display: flex
              justify-content: space-between
              align-items: center
              border-radius: 8px
              border: 1px solid #CCCCCC
              padding: 10px 8px
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
                font-size: 14px
                line-height: 22px
                font-weight: 600
                color: #D2202F
          .step-input-margin
            margin: 10px 10px 0
</style>
