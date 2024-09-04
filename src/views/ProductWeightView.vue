<script setup lang="ts">
import { ref } from 'vue'
import OtherHeaderLight from '../components/OtherHeaderLight.vue'
import MovePageComponent from '../components/MorePageComponent.vue'
import HeaderComponent from '../components/HeaderComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
import useIsMobile from '../hooks/useIsMobile'

const showMorePage = ref(false)
const isMobile = useIsMobile()

const onMoreButtonClicked = () => {
  showMorePage.value = true
}
const onCloseButtonClicked = () => {
  showMorePage.value = false
}
</script>

<template>
  <div class="product-weight-view">
    <MovePageComponent v-if="showMorePage" @close-button-clicked="onCloseButtonClicked" />
    <OtherHeaderLight
      @more-button-clicked="onMoreButtonClicked"
      :hasBackgroundColor="true"
      v-if="isMobile"
    >
    </OtherHeaderLight>
    <HeaderComponent
      backgroundColor="white"
      :lightIcon="true"
      currentTab="Shipping Fee Calculation"
      v-else
    />
    <div class="product-weight-container">
      <p class="product-weight-description">{{ $t('Frogooo.ProductWeightNote') }}</p>
      <div class="product-weight-wrapper" v-if="isMobile">
        <img src="../assets/icons/weight_1.png" alt="" />
        <img src="../assets/icons/weight_21.png" alt="" />
        <img src="../assets/icons/weight_2.png" alt="" />
        <img src="../assets/icons/weight_3.png" alt="" />
        <img src="../assets/icons/weight_4.png" alt="" />
        <img src="../assets/icons/weight_5.png" alt="" />
        <img src="../assets/icons/weight_6.png" alt="" />
        <img src="../assets/icons/weight_7.png" alt="" />
        <img src="../assets/icons/weight_8.png" alt="" />
        <img src="../assets/icons/weight_9.png" alt="" />
        <img src="../assets/icons/weight_10.png" alt="" />
        <img src="../assets/icons/weight_11.png" alt="" />
        <img src="../assets/icons/weight_12.png" alt="" />
        <img src="../assets/icons/weight_13.png" alt="" />
        <img src="../assets/icons/weight_14.png" alt="" />
        <img src="../assets/icons/weight_15.png" alt="" />
        <img src="../assets/icons/weight_16.png" alt="" />
        <img src="../assets/icons/weight_17.png" alt="" />
        <img src="../assets/icons/weight_18.png" alt="" />
        <img src="../assets/icons/weight_19.png" alt="" />
        <img src="../assets/icons/weight_20.png" alt="" />
      </div>
      <div class="product-weight-wrapper" v-else>
        <div class="product-weight-left">
          <img src="../assets/icons/2.0x/weight_1.png" alt="" />
          <img src="../assets/icons/2.0x/weight_3.png" alt="" />
          <img src="../assets/icons/2.0x/weight_4.png" alt="" />
          <img src="../assets/icons/2.0x/weight_5.png" alt="" />
          <img src="../assets/icons/2.0x/weight_6.png" alt="" />
          <img src="../assets/icons/2.0x/weight_7.png" alt="" />
          <img src="../assets/icons/2.0x/weight_8.png" alt="" />
          <img src="../assets/icons/2.0x/weight_9.png" alt="" />
        </div>
        <div class="product-weight-right">
          <img src="../assets/icons/2.0x/weight_2.png" alt="" />
          <img src="../assets/icons/2.0x/weight_10.png" alt="" />
          <img src="../assets/icons/2.0x/weight_11.png" alt="" />
          <img src="../assets/icons/2.0x/weight_12.png" alt="" />
          <img src="../assets/icons/2.0x/weight_13.png" alt="" />
          <img src="../assets/icons/2.0x/weight_14.png" alt="" />
          <img src="../assets/icons/2.0x/weight_15.png" alt="" />
          <img src="../assets/icons/2.0x/weight_16.png" alt="" />
        </div>
      </div>
      <div v-if="!isMobile" class="product-weight-bottom">
        <img src="../assets/icons/2.0x/weight_17.png" alt="" />
      </div>
    </div>
    <FooterComponent backgroundColor="white" v-if="!isMobile" />
  </div>
</template>

<style lang="stylus" scoped>
@media (max-width: 750px)
  .product-weight-view
    width: 100%
    background: #F2F4F8
    padding-bottom: .84rem
    .product-weight-container
        padding: 0 .2rem .2rem
        .product-weight-description
            font-size: .16rem
            line-height: .2rem
            color: #0A1B39
        .product-weight-wrapper
            border-radius: .24rem
            background: #fff
            padding: .08rem
            margin-top: .1rem
            img
                width: 100%
@media (min-width: 1024px)
    .product-weight-view
        width: 100%
        background: #F2F4F8
        .product-weight-container
            padding: 0 20px
            width: 800px
            margin: 0 auto
            .product-weight-description
                font-size: 16px
                line-height: 20px
                color: #0A1B39
                margin: 10px 0 0 20px
            .product-weight-wrapper
                border-radius: 24px
                background: #fff
                padding: 8px
                margin-top: 10px
                display: flex
                .product-weight-left
                    flex: 1
                    img
                        width: 100%
                .product-weight-right
                    flex: 1
                    img
                        width: 100%
            .product-weight-bottom
                img
                    width: 100%
</style>
