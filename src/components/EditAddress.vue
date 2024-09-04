<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

import TrayPicker from '../components/TrayPicker.vue'
import { useI18n } from 'vue-i18n'
import { showToast } from 'vant'
import api from '../api/api'
import { useAddressStore } from '../stores/address'

import 'vant/lib/index.css'

const props = defineProps({
  isEdited: {
    type: Boolean,
    default: false
  },
  isAddFristAddress: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['edit-location-clicked', 'edit-submit-clicked'])

const showTray = ref(false)
const pickerItems = ref<any[]>([])
const selectedItem = ref<any>()
const sendInProgress = ref(false)

const { t } = useI18n()
const provinceData = ref<any>()
const cityData = ref<any>()
const areaData = ref<any>()
const title = t('Frogooo.Select')

let { selectedData, resetSelectedData } = useAddressStore()

let response: any

if (selectedData.phone.startsWith('62')) {
  selectedData.phone = selectedData.phone.slice(2)
}

onMounted(async () => {
  window.scrollTo({ left: 0, top: 0, behavior: 'smooth' })
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

const selectProvinceClicked = () => {
  if (provinceData.value?.length) {
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
      return { title: item.name, id: 'area', code: item.code }
    })
  }
}

const defaultImageUrl = props.isAddFristAddress
  ? ref(new URL('../assets/icons/address_selected.svg', import.meta.url).href)
  : ref(new URL('../assets/icons/unselected.svg', import.meta.url).href)

const setDefault = () => {
  selectedData.isDefault = !selectedData.isDefault
  if (selectedData.isDefault) {
    defaultImageUrl.value = new URL('../assets/icons/address_selected.svg', import.meta.url).href
  } else {
    defaultImageUrl.value = new URL('../assets/icons/unselected.svg', import.meta.url).href
  }
}

const save = async () => {
  if (selectedData.phone.startsWith('0')) {
    showToast({
      message: t('Frogooo.PhoneNumberWarning'),
      position: 'bottom'
    })
    return
  }
  if (
    !selectedData.provinceSelected.length ||
    !selectedData.citySelected.length ||
    !selectedData.areaSelected.length ||
    !selectedData.name.length ||
    !selectedData.address.length ||
    !selectedData.phone.length
  ) {
    showToast({
      message: t('Frogooo.PleaseCompleteTheInformation'),
      position: 'bottom'
    })
    return
  }
  try {
    const params = {
      country: 'ID',
      province: selectedData.provinceSelected,
      provinceCode: selectedData.provinceCode,
      city: selectedData.citySelected,
      cityCode: selectedData.cityCode,
      county: selectedData.areaSelected,
      countyCode: selectedData.countyCode,
      name: selectedData.name,
      phone: `62${selectedData.phone}`,
      address: selectedData.address,
      id: selectedData.id,
      isDefault: selectedData.isDefault || props.isAddFristAddress ? 'Y' : 'N'
    }
    if (!sendInProgress.value) {
      sendInProgress.value = true
      if (props.isEdited) {
        await api.editAddress(params)
      } else {
        await api.addAddress(params)
      }
    }
    sendInProgress.value = false
    emit('edit-submit-clicked')
  } catch (e) {
    sendInProgress.value = false
    showToast({
      message: t('Frogooo.NetworkError'),
      position: 'bottom'
    })
  }
}

const locationClicked = () => {
  emit('edit-location-clicked')
}

watch(selectedItem, async (newVal) => {
  if (newVal.id == 'province') {
    if (selectedData.provinceSelected != newVal.title) {
      resetSelectedData()
      cityData.value = []
      selectedData.provinceSelected = newVal.title
      selectedData.provinceCode = newVal.code
      response = await api.getCity({ code: newVal.title, key: newVal.title })
      cityData.value = response?.data
    }
  } else if (newVal.id == 'city') {
    if (selectedData.citySelected != newVal.title) {
      selectedData.areaSelected = ''
      areaData.value = []
      selectedData.citySelected = newVal.title
      selectedData.cityCode = newVal.code
      response = await api.getCity({ code: newVal.title, key: newVal.title })
      areaData.value = response?.data
    }
  } else if (newVal.id == 'area') {
    selectedData.areaSelected = newVal.title
    selectedData.countyCode = newVal.code
  }
})
</script>

<template>
  <div class="receiving-address-view">
    <div class="receiving-address-container">
      <section class="select-address-container">
        <p class="select-address">
          {{ isEdited ? $t('Frogooo.EditAddress') : $t('Frogooo.AddNewAddress') }}
        </p>
        <div class="location" @click="locationClicked">
          <img src="../assets/icons/close.png" alt="" />
        </div>
      </section>
      <section class="item-wrapper">
        <h3 class="item-title">{{ $t('Frogooo.CountryOnly') }}</h3>
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
          <img src="../assets/icons/arrow.png" class="item-arrow" alt="" />
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
          <img src="../assets/icons/arrow.png" class="item-arrow" alt="" />
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
          <img src="../assets/icons/arrow.png" class="item-arrow" alt="" />
        </div>
      </section>
      <section class="item-wrapper">
        <h3 class="item-title">{{ $t('Frogooo.DetailsAddress') }}</h3>
        <input
          type="text"
          class="item-wrapper-input"
          :placeholder="$t('Frogooo.DetailsAddress')"
          v-model="selectedData.address"
        />
      </section>
      <section class="item-wrapper">
        <h3 class="item-title">{{ $t('Frogooo.ConsigneeName') }}</h3>
        <input
          type="text"
          class="item-wrapper-input"
          :placeholder="$t('Frogooo.ConsigneeName')"
          v-model="selectedData.name"
        />
      </section>
      <section class="item-wrapper">
        <h3 class="item-title">{{ $t('Frogooo.PhoneNumber') }}</h3>
        <div class="item-phone-wrapper">
          <span class="item-phone-code">62</span>
          <input type="text" class="item-wrapper-number" v-model="selectedData.phone" />
        </div>
      </section>
      <section class="item-default-wrapper" @click="setDefault">
        <img :src="defaultImageUrl" alt="" class="item-default-image" />
        <span class="item-default-address">{{ $t('Frogooo.DefaultAddress') }}</span>
      </section>
      <section class="item-submit">
        <button class="item-submit-button" @touchstart="save">{{ $t('Frogooo.Save') }}</button>
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
.receiving-address-view
  width: 100%
  background: #F2F4F8
  overflow-y: auto
  padding-bottom: .84rem
  .title
    font-size: .18rem
    font-weight: 500
    color: #0A1B39
  .receiving-address-container
    margin: .1rem .2rem 0
    display: flex
    flex-direction: column
    color: #0A1B39
    border-radius: .24rem
    padding: .24rem .2rem
    background: #fff
    .select-address-container
      display: flex
      justify-content: space-between
      .select-address
        font-size: .2rem
        line-height: .26rem
        font-weight: 700
      .location
        margin-top: .04rem
    .item-wrapper
        margin-top: .16rem
        .item-title
            font-size: .14rem
            line-height: .22rem
            color: rgba(10, 27, 57, 0.6)
        .item-container
            display: flex
            justify-content: space-between
            padding: .16rem
            border-bottom: 1px solid rgba(10, 27, 57, 0.04)
            .select-item
              font-size: .18rem
              line-height: .22rem
            .not-be-selected
              color: rgba(10, 27, 57, 0.6)
            .be-selected
              color: #0A1B39
            .item-arrow
              width: .16rem
              height: .16rem
        .item-wrapper-input
            margin-top: 0.12rem
            padding: 0.16rem
            border-bottom: 1px solid rgba(10, 27, 57, 0.04)
            width: 100%
            font-size: .18rem
        .item-phone-wrapper
          display: flex
          align-items: center
          justify-content: space-between
          border-bottom: 1px solid rgba(10, 27, 57, 0.04)
          .item-phone-code
            flex: 1
            padding-left: 0.16rem
            margin-top: 0.12rem
            font-size: .18rem
          .item-wrapper-number
            margin-top: 0.12rem
            padding: 0.16rem 0.16rem 0.16rem 0
            flex: 4
            font-size: .18rem
        .item-container:active
          background: #ccc
    .item-default-wrapper
        margin-top: .2rem
        display: flex
        align-items: center
        .item-default-image
            width: .22rem
            height: .22rem
            margin-right: .05rem
        .item-default-address
            font-size: .16rem
            line-height: .19rem
            color: #0A1B39
    .item-submit
        margin-top: .5rem
        .item-submit-button
            border-radius: .16rem
            padding: .12rem .24rem
            text-align: center
            background: #05FE9F
            color: #0A1B39
            font-size: .18rem
            line-height: .24rem
            font-weight: 500
            width: 100%
        .item-submit-button:active
            background: #e9ecef
            transform: scale(1.1)
</style>
