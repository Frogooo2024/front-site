<script setup lang="ts">
import { ref, watch, watchEffect, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useFreightEstimationStore } from '@/stores/freightEstimation'
import TrayPicker from '@/components/TrayPicker.vue'
import api from '@/api/api'
import { showToast } from 'vant'

import 'vant/lib/index.css'

const emit = defineEmits(['probition-list-items-clicked'])
const router = useRouter()
const { t } = useI18n()

const showTray = ref(false)
const pickerItems = ref<any[]>([])
const selectedItem = ref<any>()
const provinceData = ref<any>()
const cityData = ref<any>()
const areaData = ref<any>()
const title = t('Frogooo.Select')

let response: any

let { selectedData, unitData, resetSelectedData } = useFreightEstimationStore()

onMounted(async () => {
  try {
    if (selectedData.cityCode.length) {
      Promise.all([
        api.getCity({ code: 'ID' }),
        api.getCity({ code: selectedData.provinceSelected, key: selectedData.provinceSelected }),
        api.getCity({ code: selectedData.citySelected, key: selectedData.citySelected })
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

const warehouse = 'Frogooo.Singapore'
const selectWarehouseClicked = () => {
  showTray.value = true
  pickerItems.value = [{ title: t(warehouse), id: 'warehouse' }]
}

const selectProvinceClicked = () => {
  if (provinceData.value.length) {
    showTray.value = true
    pickerItems.value = provinceData.value.map((item: any) => {
      return { title: item.name, id: 'province', code: item.code }
    })
  }
}

const selectCityClicked = () => {
  if (cityData.value.length) {
    showTray.value = true
    pickerItems.value = cityData.value.map((item: any) => {
      return { title: item.name, id: 'city', code: item.code }
    })
  }
}

const selectAreaClicked = () => {
  if (areaData.value.length) {
    showTray.value = true
    pickerItems.value = areaData.value.map((item: any) => {
      return {
        title: item.name,
        id: 'area',
        cost: item.countryPric,
        code: item.code,
        crossPric: item.crossPric
      }
    })
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
      cityData.value = []
      areaData.value = []
      selectedData.provinceSelected = newVal.title
      selectedData.provinceCode = newVal.code
      response = await api.getCity({ code: newVal.title, key: newVal.title })
      cityData.value = response?.data
    }
  } else if (newVal.id == 'city') {
    if (selectedData.citySelected != newVal.title) {
      selectedData.areaSelected = ''
      selectedData.cost = 0
      areaData.value = []
      selectedData.citySelected = newVal.title
      selectedData.cityCode = newVal.code
      response = await api.getCity({ code: newVal.title, key: newVal.title })
      areaData.value = response?.data
    }
  } else if (newVal.id == 'area') {
    selectedData.areaSelected = newVal.title
    selectedData.countyCode = newVal.code
    selectedData.cost = newVal.cost + newVal.crossPric
  }
})

const sendClicked = () => {
  if (totalCost.value > 0) {
    router.push({
      name: 'feeResult',
      params: { cost: totalCost.value, weight: currentWeight.value }
    })
  }
}

const weightOfTheProductClicked = () => {
  router.push({ path: '/productWeight' })
}

const probitionListItemsClicked = () => {
  setTimeout(() => {
    emit('probition-list-items-clicked')
  }, 80)
}
</script>
<template>
  <div class="freight-estimation-wrapper">
    <div class="weight-container" @click="weightOfTheProductClicked">
      <span class="weight-container-title">{{ $t('Frogooo.WeightOfTheProduct') }}</span>
      <img src="../assets/icons/arrow_white.png" alt="" />
    </div>
    <div class="freight-estimation-container">
      <h2 class="freight-estimation-title">{{ $t('Frogooo.ShippingFeeCalculation') }}</h2>
      <section class="item-wrapper">
        <h3 class="item-title">{{ $t('Frogooo.Storehouse') }}</h3>
        <div class="item-container" @click="selectWarehouseClicked">
          <span
            class="select-item"
            :class="{
              'not-be-selected': !selectedData.warehouseSelected,
              'be-selected': selectedData.warehouseSelected
            }"
            >{{ selectedData.warehouseSelected ? $t(warehouse) : $t('Frogooo.Select') }}</span
          >
          <img src="../assets/icons/arrow_right.svg" class="item-arrow" alt="" />
        </div>
      </section>
      <section class="item-wrapper">
        <h3 class="item-title">{{ $t('Frogooo.Country') }}</h3>
        <div class="item-container">
          <span class="select-item not-be-selected">{{ $t('Frogooo.Indonesia') }}</span>
        </div>
      </section>
      <section class="item-wrapper">
        <h3 class="item-title">{{ $t('Frogooo.Province') }}</h3>
        <div class="item-container" @click="selectProvinceClicked">
          <span
            class="select-item"
            :class="{
              'not-be-selected': !selectedData.provinceSelected,
              'be-selected': selectedData.provinceSelected
            }"
            >{{
              selectedData.provinceSelected ? selectedData.provinceSelected : $t('Frogooo.Province')
            }}</span
          >
          <img src="../assets/icons/arrow_right.svg" class="item-arrow" alt="" />
        </div>
      </section>
      <section class="item-wrapper">
        <h3 class="item-title">{{ $t('Frogooo.City') }}</h3>
        <div class="item-container" @click="selectCityClicked">
          <span
            class="select-item"
            :class="{
              'not-be-selected': !selectedData.citySelected,
              'be-selected': selectedData.citySelected
            }"
            >{{ selectedData.citySelected ? selectedData.citySelected : $t('Frogooo.City') }}</span
          >
          <img src="../assets/icons/arrow_right.svg" class="item-arrow" alt="" />
        </div>
      </section>
      <section class="item-wrapper">
        <h3 class="item-title">{{ $t('Frogooo.Area') }}</h3>
        <div class="item-container" @click="selectAreaClicked">
          <span
            class="select-item"
            :class="{
              'not-be-selected': !selectedData.areaSelected,
              'be-selected': selectedData.areaSelected
            }"
            >{{ selectedData.areaSelected ? selectedData.areaSelected : $t('Frogooo.Area') }}</span
          >
          <img src="../assets/icons/arrow_right.svg" class="item-arrow" alt="" />
        </div>
      </section>
      <section class="item-wrapper">
        <h3 class="item-title">{{ $t('Frogooo.Heavy') }}</h3>
        <input type="number" class="item-weight" v-model="unitData.inputWeight" />
        <p class="input-warn-detail" v-if="unitData.inputWeight > 9.5">
          {{ $t('Frogooo.CustomerService') }}
        </p>
      </section>
      <section class="item-wrapper">
        <h3 class="item-title">{{ $t('Frogooo.WesternNumber') }}</h3>
        <div class="item-container">
          <span class="select-item">1</span>
        </div>
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
      <section class="item-wrapper">
        <button
          :class="{ 'estimate-btn': totalCost > 0, 'estimate-disable-btn': totalCost <= 0 }"
          @touchstart="sendClicked"
        >
          {{ $t('Frogooo.Send') }}
        </button>
      </section>
    </div>
    <TrayPicker
      v-model:selectedItem="selectedItem"
      :visible="showTray"
      :items="pickerItems"
      @close="showTray = false"
      :title="title"
      flag="address"
    />
  </div>
</template>

<style lang="stylus" scoped>
.weight-container
  padding: .16rem .08rem .16rem .16rem
  display: flex
  justify-content: space-between
  align-items: center
  background-image: url('../assets/icons/weight_entry.png')
  background-size: cover
  margin: 0 .2rem 0
  border-radius: .16rem
  .weight-container-title
    font-size: .14rem
    line-height: .22rem
    margin-right: .3rem
  img
    width: .16rem
    height: .16rem
.freight-estimation-container
    display: flex
    flex-direction: column
    margin: .2rem
    padding: .16rem .2rem
    border-radius: .24rem
    background: #fff
    height: 100%
    .freight-estimation-title
        font-size: .18rem
        line-height: .26rem
        font-weight: 500
        color: #0A1B39
    .list-itmes
      margin: .4rem 0 .2rem
      display: flex
      justify-content: space-between
      align-items: center
      span
        font-size: .16rem
        font-weight: 500
        line-height: .2rem
        color: #0A1B39
    .list-itmes:active
      background: #ccc
    .item-wrapper
        margin-top: .2rem
        .item-title
            font-size: .14rem
            line-height: .14rem
            color: rgba(10, 27, 57, 0.6)
        .item-weight
          margin-top: .12rem
          padding: .16rem
          outline: none
          width: 100%
          color: #0a1b39
          border-bottom: 1px solid rgba(10, 27, 57, 0.04)
          font-size: .18rem
        .item-container
          display: flex
          justify-content: space-between
          padding: .16rem
          border-bottom: 1px solid rgba(10, 27, 57, 0.04)
          .select-item
            font-size: .18rem
            line-height: .22rem
            color: #0a1b39
          .not-be-selected
            color: rgba(10, 27, 57, 0.35)
          .be-selected
            color: #0A1B39
          .item-arrow
            width: .16rem
            height: .16rem
        .item-unit-container
          margin-top: .12rem
          display: flex
          align-items: center
          justify-content: space-around
          color: #0A1B39
          .item-unit
            width: 33%
            padding: 0.16rem
            outline: none
            font-size: .18rem
            line-height: .22rem
            color: #0A1B39
            text-align: center
            border-bottom: 1px solid rgba(10, 27, 57, 0.04)
        .input-warn-detail
          color: red
          margin-top: .05rem
          font-size: .12rem
      .estimate-btn
        height: .48rem
        border-radius: .16rem
        font-size: .16rem
        line-height: .24rem
        font-weight: 500
        color: #0A1B39
        background: #05FE9F
        text-align: center
        width: 100%
      .estimate-btn:active
        background: #e9ecef
        transform: scale(1.1)
      .estimate-disable-btn
        height: .48rem
        border-radius: .16rem
        font-size: .16rem
        line-height: .24rem
        font-weight: 500
        color: rgba(10, 27, 57, 0.45)
        background: rgba(5, 254, 159, 0.6)
        text-align: center
        width: 100%
      .estimate-disable-btn:active
        background: #e9ecef
        transform: scale(1.1)
</style>
