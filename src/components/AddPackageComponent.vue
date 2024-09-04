<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAddPackageStore } from '@/stores/addPackage'
import DropDown from '@/components/DropDown.vue'

const emit = defineEmits(['add-package-submit'])

const props = defineProps({
  listItems: {
    type: Array<any>
  }
})

const router = useRouter()
const { packageDetail } = useAddPackageStore()
const selectedItem = ref<any>()
const isOpen = ref(false)

const helpClicked = () => {
  router.push({ path: '/packageHelp' })
}

watch(selectedItem, (newVal) => {
  packageDetail.goodsTypeId = newVal.typeId
  packageDetail.goodsTypeName = newVal.title
})

const selectCurrency = (item: any) => {
  isOpen.value = false
  packageDetail.currency = item
}

const submit = () => {
  emit('add-package-submit')
}
</script>
<template>
  <div class="add-package-container">
    <section class="select-address-container">
      <p class="select-address">{{ $t('Frogooo.InformUs') }}</p>
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
        <DropDown
          v-model:selectedItem="selectedItem"
          :options="listItems"
          :defaultText="
            packageDetail.goodsTypeName ? packageDetail.goodsTypeName : $t('Frogooo.ProductTypes')
          "
        />
      </section>
    </section>
    <h3 class="item-price-title">{{ $t('Frogooo.ProductPrice') }}</h3>
    <div class="item-price-container">
      <input
        type="text"
        class="item-price-text"
        placeholder="price"
        v-model="packageDetail.goodsList[0].pric"
      />
      <div class="item-price-currency">
        <span class="item-price-separator"></span>
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
    <div class="item-help-container">
      <h2 class="item-help-title">{{ $t('Frogooo.NeedHelp') }}</h2>
      <div class="item-help-detail" @click="helpClicked">
        <p class="item-help-question">{{ $t('Frogooo.FindTheTrackingNumber') }}</p>
        <img src="../assets/icons/arrow_right.svg" alt="" />
      </div>
    </div>
    <div class="item-submit-warning">
      <img src="../assets/icons/warning_light.svg" alt="" />
      <p class="item-submit-warning-text">{{ $t('Frogooo.AddPackageWarning') }}</p>
    </div>
    <section class="item-submit">
      <button class="item-submit-button" @click="submit">
        {{ $t('Frogooo.ConfirmAndSubmit') }}
      </button>
    </section>
  </div>
</template>

<style lang="stylus" scoped>
.add-package-container
        margin: 20px auto
        display: flex
        flex-direction: column
        color: #fff
        border-radius: 24px
        padding: 16px 32px
        background: #fff
        width: 800px
        .select-address-container
            display: flex
        .select-address
            font-size: 26px
            line-height: 31px
            font-weight: 700
            color: #0A1B39
            text-align: center
            width: 413px
            margin: 0 auto
        .item-list-container
            margin-top: 20px
            display: flex
            justify-content: space-between
            align-items: center
            .item-wrapper
                margin-top: 20px
                width: 356px
                .item-title
                    font-size: 16px
                    line-height: 16px
                    color: rgba(10, 27, 57, 0.5)
                    margin-bottom: 12px
                .item-wrapper-input
                  padding: 15px 16px
                  border: 1px solid rgba(10, 27, 57, 0.1)
                  border-radius: 8px
                  font-size: 16px
                  line-height: 16px
                  color: #0A1B39
                  width: 100%
          .item-price-title
            font-size: 16px
            line-height: 16px
            color: rgba(10, 27, 57, 0.5)
            margin: 12px 0
          .item-price-container
              width: 356px
              display: flex
              align-items: center
              border: 1px solid rgba(10, 27, 57, 0.1)
              border-radius: 8px
              padding: 12px 16px
              justify-content: space-between
              .item-price-text
                  font-size: 16px
                  line-height: 16px
                  color: #0A1B39
                  width: 140px
              .item-price-currency
                  display: flex
                  align-items: center
                  position: relative
                  .item-price-separator
                    height: 24px
                    border-left: 1px solid rgba(10, 27, 57, 0.04)
                    margin: 0 10px
                  .item-price-currency-detail
                      margin-right: 5px
                      font-size: 16px
                      line-height: 16px
                      color: #0A1B39
                .item-wrapper-input
                    padding: 14px 16px
                    border: 1px solid rgba(10, 27, 57, 0.1)
                    font-size: 16px
                    line-height: 16px
                    color: #0A1B39
              .item-currency
                position: absolute
                top: 100%
                right: 0
                border-radius: 8px
                border: 1px solid rgba(10, 27, 57, 0.1)
                background: #fff
                display: flex
                flex-direction: column
                width: 60px
                box-shadow: 0 2px 6px 0 rgba(10, 27, 57, 0.2)
                .currency
                  color: #0A1B39
                  font-size: 16px
                  line-height: 16px
                  padding: 10px
                .currency:hover
                  background: rgba(10, 27, 57, 0.04)
        .item-help-container
            margin-top: 12px
            border-radius: 24px
            padding: 16px 16px 16px 40px
            background: rgba(10, 27, 57, 0.04)
            .item-help-title
                font-size: 20px
                line-height: 26px
                font-weight: 700
                color: #0A1B39
            .item-help-detail
                display: flex
                justify-content: space-between
                align-items: center
                margin-top: 12px
                .item-help-question
                    font-size: 14px
                    line-height: 14px
                    color: #0A1B39
                    margin-right: 20px
          .item-submit-warning
            margin-top: 50px
            display: flex
            padding: 10px 0 5px 0
            align-items: center
            .item-submit-warning-text
              font-size: 14px
              line-height: 20px
              color: rgba(10, 27, 57, 0.6)
              margin-left: 10px
        .item-submit
            margin: 12px auto 20px
            .item-submit-button
                border-radius: 16px
                text-align: center
                background: #05FE9F
                color: #0A1B39
                font-size: 20px
                line-height: 28px
                font-weight: 500
                width: 400px
                height: 48px
            .item-submit-button:active
                background: #e9ecef
                transform: scale(1.1)
</style>
