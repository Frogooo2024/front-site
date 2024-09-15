<script setup lang="ts">
import { useRouter } from 'vue-router'
import vIntersection from '../directives/intersectionDirective'

const router = useRouter()
const onShoppingTripClicked = () => router.push({ path: '/userCenter' })
</script>
<template>
  <div class="advantage-container">
    <section class="advantage-wrapper" v-intersection:fromName="'advantage_row'">
      <section class="advantage-title-container advantage-title-container-one">
        <h2 class="advantage-title">{{ $t('Frogooo.HighlySecure') }}</h2>
        <div class="advantage-description">
          <span>{{ $t('Frogooo.HighlySecureDescription') }}</span>
          <span class="advantage-description-important">{{
            $t('Frogooo.HighlySecureDescriptionImportant')
          }}</span>
          <span>{{ $t('Frogooo.HighlySecureDescriptionOther') }}</span>
        </div>
      </section>
      <section class="advantage-image-one bounce">
        <img src="../assets/icons/2.0x/highly_secure.png" alt="" />
      </section>
    </section>
    <section class="advantage-wrapper" v-intersection:fromName="'advantage_row'">
      <section class="advantage-image-two advantage-image-margin">
        <img src="../assets/icons/2.0x/refund_guarantee.png" alt="" />
      </section>
      <section class="advantage-title-container advantage-title-container-two">
        <h2 class="advantage-title">{{ $t('Frogooo.FullRefundGuarantee') }}</h2>
        <div class="advantage-description">
          <span>{{ $t('Frogooo.FullRefundGuaranteeDescription') }}</span>
          <span class="advantage-description-important">{{
            $t('Frogooo.FullRefundGuaranteeDescriptionImportant')
          }}</span>
          <span>{{ $t('Frogooo.FullRefundGuaranteeDescriptionOther') }}</span>
        </div>
      </section>
    </section>
    <section class="advantage-wrapper" v-intersection:fromName="'advantage_row'">
      <section class="advantage-title-container advantage-title-container-three">
        <h2 class="advantage-title">{{ $t('Frogooo.ComprehensiveService') }}</h2>
        <div class="advantage-description">
          <span>{{ $t('Frogooo.ComprehensiveServiceDescription') }}</span>
          <span class="advantage-description-important">{{
            $t('Frogooo.ComprehensiveServiceDescriptionImportant')
          }}</span>
          <span>{{ $t('Frogooo.ComprehensiveServiceDescriptionOther') }}</span>
        </div>
      </section>
      <section class="advantage-image-three">
        <img src="../assets/icons/2.0x/comprehensive_service.png" alt="" />
      </section>
    </section>
    <section class="advantage-wrapper" v-intersection:fromName="'advantage_row'">
      <section class="advantage-image-four advantage-image-margin">
        <img src="../assets/icons/2.0x/trustworthy_and_reliable.png" alt="" />
      </section>
      <section class="advantage-title-container advantage-title-container-four">
        <h2 class="advantage-title">{{ $t('Frogooo.TrustworthyAndReliable') }}</h2>
        <div class="advantage-description">
          <span>{{ $t('Frogooo.TrustworthyAndReliableDescription') }}</span>
          <span class="advantage-description-important">{{
            $t('Frogooo.TrustworthyAndReliableDescriptionImportant')
          }}</span>
          <span>{{ $t('Frogooo.TrustworthyAndReliableDescriptionOther') }}</span>
        </div>
        <!-- <div class="shopping-trip-container">
          <button class="shopping-trip-button" @click="onShoppingTripClicked">
            {{ $t('Frogooo.ShoppingTrip') }}
          </button>
        </div> -->
      </section>
    </section>
  </div>
</template>

<style lang="stylus" scoped>
.advantage-container
    display: flex
    flex-direction: column
    .advantage-wrapper
      margin-top: 80px
      display: flex
      justify-content: center
      align-items: center
      .advantage-title-container
        margin-right: 40px
        display: flex
        flex-direction: column
        justify-content: start
        .advantage-title
            font-size: 48px
            font-weight: 700
            color: #fff
            line-height: 58px
        .advantage-description
            margin-top: 20px
            font-size: 20px
            line-height: 32px
            color: rgba(255, 255, 255, 0.6)
        .advantage-description-important
          color: #fff
          font-weight: 700
          line-height: 32px
          background: linear-gradient(to right, #6E2BC1, #A636D9, #DCA3F0)
          transform-origin: bottom right
          transform: scale(0)
          opacity: 0
          transition: transform 0.6s ease-out, opacity 0.6s ease-out
        .shopping-trip-container
          margin-top: 20px
          .shopping-trip-button
              padding: 18px 28px
              background: #05FE9F
              border-radius: 16px
              font-size: 16px
              line-height: 20px
              font-weight: 500
              color: #0A1B39
              text-shadow: 0 4px 4px #00AE6C
      .advantage-title-container-one
        width: 466px
      .advantage-title-container-two
        width: 630px
      .advantage-title-container-three
        width: 466px
      .advantage-title-container-four
        width: 630px
      .advantage-image-one
        img
          width: 700px
          height: 466px
      .advantage-image-two
        img
          width: 388px
          height: 500px
      .advantage-image-three
        img
          width: 700px
          height: 466px
      .advantage-image-four
          img
            width: 500px
            height: 360px
      .advantage-image-margin
        margin-right: 40px
      .bounce
        animation: moveUpDown 1.5s 3 ease-in-out 2s
      @keyframes moveUpDown {
        0% {
          transform: translateY(0)
        }
        50% {
          transform: translateY(-40px)
        }
        100% {
          transform: translateY(0)
        }
      }
</style>
