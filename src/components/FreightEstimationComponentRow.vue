<script setup lang="ts">
import { ref, watch, watchEffect, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useFreightEstimationStore } from '@/stores/freightEstimation'
import DropDown from '@/components/DropDown.vue'
import api from '@/api/api'
import vCurrencyFormat from '../directives/currencyFormat'
import { showToast } from 'vant'

import 'vant/lib/index.css'

const emit = defineEmits(['probition-list-items-clicked'])
const { t } = useI18n()
const router = useRouter()

const countryOptions = ref<any[]>([{ title: t('Frogooo.Singapore'), id: 'warehouse' }])
const pickerItems = ref<any[]>([])
const selectedItem = ref<any>()
const provinceData = ref<any[]>([])
const cityData = ref<any[]>([])
const areaData = ref<any[]>([])
const showResult = ref(false)
const cityPickerItems = ref<any[]>([])
const areaPickerItems = ref<any[]>([])

let response: any

let { selectedData, unitData, resetSelectedData } = useFreightEstimationStore()

onMounted(async () => {
  try {
    if (selectedData.cityCode.length) {
      Promise.all([
        //api.getCity({ code: 'ID' }),
        //api.getCity({ code: selectedData.provinceCode, key: 'code' }),
        //api.getCity({ code: selectedData.cityCode, key: 'code' })
        api.getCity(), // Get all provinces
        api.getCity({ provinceId: selectedData.provinceCode }), // Get cities by province ID
        api.getCity({ provinceId: selectedData.provinceCode, cityId: selectedData.cityCode })
      ]).then(
        (res: any) => {
          if (res[0].status && res[1].status && res[2].status) {
            provinceData.value = res[0].data
            cityData.value = res[1].data
            areaData.value = res[2].data
          }
        },
        (e: any) => {
          showToast({
            message: t('Frogooo.NetworkError'),
            position: 'bottom'
          })
        }
      )
    } else {
      response = await api.getCity({ code: 'ID' })
      provinceData.value = response?.data
    }
  } catch (e) {
    showToast({
      message: t('Frogooo.NetworkError'),
      position: 'bottom'
    })
  }
})

const onSelectItemClicked = (event: any) => {
  if (event == 'province' && provinceData.value.length) {
    pickerItems.value = provinceData.value.map((item: any) => {
      return { title: item.name, id: 'province', code: item.code }
    })
  }

  if (event == 'city' && cityData.value.length) {
    cityPickerItems.value = cityData.value.map((item: any) => {
      return { title: item.name, id: 'city', code: item.code }
    })
  } else if (event == 'city' && !cityData.value.length) {
    cityPickerItems.value = []
  }

  if (event == 'area' && areaData.value.length) {
    areaPickerItems.value = areaData.value.map((item: any) => {
      return {
        title: item.name,
        id: 'area',
        cost: item.countryPric,
        code: item.code,
        crossPric: item.crossPric
      }
    })
  } else if (event == 'area' && !areaData.value.length) {
    areaPickerItems.value = []
  }
}

const weight = ref(0)
const totalCost = ref(0)
const currentWeight = ref(0)

watchEffect(() => {
  weight.value = Math.ceil((unitData.length * unitData.width * unitData.height) / 6000 - 0.3)
  currentWeight.value = unitData.inputWeight > weight.value ? unitData.inputWeight : weight.value
  if (currentWeight.value <= 9.5) {
    totalCost.value = selectedData.cost * Math.ceil(currentWeight.value - 0.3)
  } else {
    totalCost.value = 0
  }
})

watch(selectedItem, async (newVal) => {
  if (newVal.id == 'warehouse') {
    selectedData.warehouseSelected = newVal.title
  } else if (newVal.id == 'province') {
    if (selectedData.provinceSelected != newVal.title) {
      resetSelectedData()
      cityPickerItems.value = []
      areaPickerItems.value = []
      cityData.value = []
      areaData.value = []
      showResult.value = false
      selectedData.provinceSelected = newVal.title
      selectedData.provinceCode = newVal.code
      response = await api.getCity({ code: newVal.code, key: 'code' })
      cityData.value = response?.data
    }
  } else if (newVal.id == 'city') {
    if (selectedData.citySelected != newVal.title) {
      showResult.value = false
      selectedData.areaSelected = ''
      selectedData.cost = 0
      areaData.value = []
      areaPickerItems.value = []
      selectedData.citySelected = newVal.title
      selectedData.cityCode = newVal.code
      response = await api.getCity({ code: newVal.code, key: 'code' })
      areaData.value = response?.data
    }
  } else if (newVal.id == 'area') {
    selectedData.areaSelected = newVal.title
    selectedData.countyCode = newVal.code
    selectedData.cost = newVal.cost + newVal.crossPric
    showResult.value = false
  }
})

const sendClicked = () => {
  if (totalCost.value > 0) {
    showResult.value = true
  }
}

const weightOfTheProductClicked = () => {
  router.push({ path: '/productWeight' })
}

const probitionListItemsClicked = () => {
  emit('probition-list-items-clicked')
}
</script>
<template>
  <div>
    <div class="weight-container" @click="weightOfTheProductClicked">
      <span class="weight-container-title">{{ $t('Frogooo.WeightOfTheProduct') }}</span>
      <div class="weight-container-button">
        {{ $t('Frogooo.ViewMore') }}
      </div>
    </div>
    <div class="freight-estimation-container">
      <h2 class="freight-estimation-title">{{ $t('Frogooo.ShippingFeeCalculation') }}</h2>
      <section class="item-wrapper">
        <h3 class="item-title">{{ $t('Frogooo.CountryOnly') }}</h3>
        <DropDown :options="countryOptions" :defaultText="t('Frogooo.Singapore')" />
      </section>
      <section class="item-row-wrapper">
        <section class="item-row-container item-row-margin">
          <h3 class="item-row-title">{{ $t('Frogooo.Country') }}</h3>
          <div class="item-row-subtitle">
            {{ $t('Frogooo.Indonesia') }}
          </div>
        </section>
        <section class="item-row-container">
          <h3 class="item-row-title">{{ $t('Frogooo.Province') }}</h3>
          <DropDown
            :options="pickerItems"
            :defaultText="
              selectedData.provinceSelected ? selectedData.provinceSelected : $t('Frogooo.Province')
            "
            @select-item-clicked="onSelectItemClicked"
            v-model:selectedItem="selectedItem"
            id="province"
          />
        </section>
      </section>
      <section class="item-row-wrapper">
        <section class="item-row-container item-row-margin">
          <h3 class="item-row-title">{{ $t('Frogooo.City') }}</h3>
          <DropDown
            :options="cityPickerItems"
            :defaultText="
              selectedData.citySelected ? selectedData.citySelected : $t('Frogooo.City')
            "
            @select-item-clicked="onSelectItemClicked"
            v-model:selectedItem="selectedItem"
            id="city"
          />
        </section>
        <section class="item-row-container">
          <h3 class="item-row-title">{{ $t('Frogooo.Area') }}</h3>
          <DropDown
            :options="areaPickerItems"
            :defaultText="
              selectedData.areaSelected ? selectedData.areaSelected : $t('Frogooo.Area')
            "
            @select-item-clicked="onSelectItemClicked"
            v-model:selectedItem="selectedItem"
            id="area"
          />
        </section>
      </section>
      <section class="item-row-wrapper">
        <section class="item-row-container item-row-margin">
          <h3 class="item-row-title">{{ $t('Frogooo.Heavy') }}</h3>
          <input type="number" class="item-weight" v-model="unitData.inputWeight" />
          <p class="input-warn-detail" v-if="unitData.inputWeight > 9.5">
            {{ $t('Frogooo.CustomerService') }}
          </p>
        </section>
        <section class="item-row-container">
          <h3 class="item-row-title">{{ $t('Frogooo.WesternNumber') }}</h3>
          <div class="item-weight">1</div>
        </section>
      </section>
      <section class="item-wrapper">
        <h3 class="item-title">{{ $t('Frogooo.Volume') }}</h3>
        <div class="item-unit-container">
          <input type="number" class="item-unit" v-model="unitData.length" />
          <span>*</span>
          <input type="number" class="item-unit" v-model="unitData.width" />
          <span>*</span>
          <input type="number" class="item-unit" v-model="unitData.height" />
        </div>
        <p class="input-warn-detail" v-if="weight > 9.5">{{ $t('Frogooo.CustomerService') }}</p>
      </section>
      <section class="list-itmes" @click="probitionListItemsClicked">
        <span>{{ $t('Frogooo.DANGEROUSGOODS') }}</span>
        <img src="../assets/icons/arrow_right.svg" class="item-arrow" alt="" />
      </section>
      <button
        :class="{ 'estimate-btn': totalCost > 0, 'estimate-disable-btn': totalCost <= 0 }"
        @click="sendClicked"
      >
        {{ $t('Frogooo.Send') }}
      </button>
    </div>
    <div class="freght-result" v-if="showResult">
      <h2 class="freght-result-title">{{ $t('Frogooo.FeeResults') }}</h2>
      <div class="freght-result-wrapper">
        <div class="freght-result-container">
          <h3 class="freght-result-container-title">{{ $t('Frogooo.TotalBiaya') }}</h3>
          <div class="freght-result-container-value">
            <span class="value" v-currency-format="totalCost"></span>
          </div>
        </div>
        <div class="freght-result-container freght-result-container-margin">
          <h3 class="freght-result-container-title">{{ $t('Frogooo.TheCostHeavy') }}</h3>
          <div class="freght-result-container-value">
            <span class="value">{{ currentWeight }}</span>
          </div>
        </div>
      </div>
      <div class="freght-result-warning">
        <img src="../assets/icons/warning_light.svg" alt="" />
        <p class="freght-result-warning-text">
          {{ $t('Frogooo.Conditions') }} {{ $t('Frogooo.CustomerService') }}
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.weight-container
  padding: 16px
  display: flex
  justify-content: space-between
  align-items: center
  background-image: url('../assets/icons/2.0x/weight_entry.png')
  background-size: cover
  width: 800px
  margin: 30px auto 0
  .weight-container-title
    font-size: 14px
    line-height: 22px
  .weight-container-button
    background: #05FE9F
    font-size: 14px
    line-height: 17px
    font-weight: 500
    color: #0A1B39
    padding: 8px 12px
    border-radius: 8px
.freight-estimation-container
    display: flex
    flex-direction: column
    margin: 10px auto 0
    padding: 16px 32px
    border-radius: 24px
    background: #fff
    width: 800px
    .freight-estimation-title
        font-size: 26px
        line-height: 24px
        font-weight: 700
        color: #0A1B39
        text-align: center
        margin-top: 16px
    .item-row-wrapper
      display: flex
      justify-content: space-between
      margin-top: 16px
      .item-row-container
        display: flex
        flex-direction: column
        flex: 1
        .item-row-title
          font-size: 16px
          line-height: 16px
          color: rgba(10, 27, 57, 0.5)
          margin-bottom: 10px
        .item-row-subtitle
          border-radius: 8px
          border: 1px solid rgba(10, 27, 57, 0.1)
          padding: 15px 16px
          color: #0A1B39
          font-size: 16px
          line-height: 16px
        .item-weight
          border: 1px solid rgba(10, 27, 57, 0.1)
          border-radius: 8px
          padding: 15px 16px
          width: 100%
          color: #0a1b39
          font-size: 16px
          line-height: 16px
          height: 46px
        .input-warn-detail
          color: red
          margin-top: 5px
          font-size: 12px
      .item-row-margin
        margin-right: 32px
    .item-wrapper
        margin-top: 16px
        .item-title
            font-size: 16px
            line-height: 16px
            color: rgba(10, 27, 57, 0.5)
            margin-bottom: 10px
        .item-unit-container
          margin-top: 10px
          display: flex
          align-items: center
          justify-content: space-around
          color: #0A1B39
          span
            margin: 0 5px
            width: 6px
            height: 16px
            font-size: 16px
          .item-unit
            flex: 1
            padding: 15px 16px
            border-radius: 8px
            outline: none
            font-size: 16px
            line-height: 16px
            color: #0A1B39
            border: 1px solid rgba(10, 27, 57, 0.1)
            height: 46px
        .input-warn-detail
          color: red
          margin-top: 5px
          font-size: 12px
      .list-itmes
        margin: 40px 0 20px
        display: flex
        align-items: center
        span
          font-size: 16px
          font-weight: 500
          line-height: 20px
          color: #0A1B39
          margin-right: 20px
      .estimate-btn
        margin: 40px auto 20px
        height: 48px
        width: 400px
        border-radius: 16px
        font-size: 20px
        line-height: 28px
        font-weight: 500
        color: #0A1B39
        background: #05FE9F
        text-align: center
        color: #0A1B39
      .estimate-btn:active
        background: #e9ecef
        transform: scale(1.1)
      .estimate-disable-btn
        margin: 40px auto 20px
        height: 48px
        width: 400px
        border-radius: 16px
        font-size: 20px
        line-height: 28px
        font-weight: 500
        color: rgba(10, 27, 57, 0.45)
        background: rgba(5, 254, 159, 0.6)
        text-align: center
      .estimate-disable-btn:active
        background: #e9ecef
        transform: scale(1.1)
  .freght-result
    display: flex
    flex-direction: column
    margin: 16px auto 50px
    padding: 24px 32px
    border-radius: 24px
    background: #fff
    width: 800px
    .freght-result-title
      font-size: 24px
      line-height: 26px
      font-weight: 500
      color: #0A1B39
    .freght-result-wrapper
      display: flex
      align-items: center
      .freght-result-container
        display: flex
        flex-direction: column
        margin-top: 16px
      .freght-result-container-margin
        margin-left: 70px
      .freght-result-container-title
        font-size: 16px
        line-height: 24px
        color: rgba(10, 27, 57, 0.5)
      .freght-result-container-value
        margin-top: 16px
        display: flex
        align-items: center
        .unit
          font-size: 16px
          line-height: 24px
          color: #0A1B39
          margin-right: 10px
        .value
          font-size: 24px
          line-height: 24px
          font-weight: 500
          color: #000
    .freght-result-warning
      margin-top: 16px
      display: flex
      align-items: start
      img
        margin-right: 5px
      .freght-result-warning-text
        font-size: 14px
        line-height: 18px
        color: rgba(10, 27, 57, 0.5)
</style>
