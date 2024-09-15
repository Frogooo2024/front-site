<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import DropDown from '@/components/DropDown.vue'
import api from '@/api/api'
import { showToast } from 'vant'
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

const { t } = useI18n()

const pickerItems = ref<any[]>([])
const selectedItem = ref<any>()
const provinceData = ref<any[]>([])
const cityData = ref<any[]>([])
const areaData = ref<any[]>([])
const showResult = ref(false)
const cityPickerItems = ref<any[]>([])
const areaPickerItems = ref<any[]>([])
const sendInProgress = ref(false)

let { selectedData, resetSelectedData } = useAddressStore()

onMounted(async () => {
  try {
    if (selectedData.cityCode.length) {
      Promise.all([
        api.getCity({ code: 'ID' }),
        api.getCity({ code: selectedData.provinceCode, key: 'code' }),
        api.getCity({ code: selectedData.cityCode, key: 'code' })
      ]).then(
        (res: any) => {
          if (res[0].status && res[1].status && res[2].status) {
            provinceData.value = res[0].data
            cityData.value = res[1].data
            areaData.value = res[2].data
            pickerItems.value = provinceData.value.map((item: any) => {
              return { title: item.name, id: 'province', code: item.code }
            })
            cityPickerItems.value = cityData.value.map((item: any) => {
              return { title: item.name, id: 'city', code: item.code }
            })
            areaPickerItems.value = areaData.value.map((item: any) => {
              return { title: item.name, id: 'area', cost: item.countryPric, code: item.code }
            })
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
      pickerItems.value = provinceData.value.map((item: any) => {
        return { title: item.name, id: 'province', code: item.code }
      })
    }
  } catch (e) {
    showToast({
      message: t('Frogooo.NetworkError'),
      position: 'bottom'
    })
  }
})

let response: any

if (selectedData.phone.startsWith('62')) {
  selectedData.phone = selectedData.phone.slice(2)
}

watch(selectedItem, async (newVal) => {
  if (newVal.id == 'province') {
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
      cityPickerItems.value = cityData.value.map((item: any) => {
        return { title: item.name, id: 'city', code: item.code }
      })
    }
  } else if (newVal.id == 'city') {
    if (selectedData.citySelected != newVal.title) {
      showResult.value = false
      selectedData.areaSelected = ''
      areaData.value = []
      areaPickerItems.value = []
      selectedData.citySelected = newVal.title
      selectedData.cityCode = newVal.code
      response = await api.getCity({ code: newVal.code, key: 'code' })
      areaData.value = response?.data
      areaPickerItems.value = areaData.value.map((item: any) => {
        return { title: item.name, id: 'area', cost: item.countryPric, code: item.code }
      })
    }
  } else if (newVal.id == 'area') {
    selectedData.areaSelected = newVal.title
    selectedData.countyCode = newVal.code
    showResult.value = false
  }
})

const closeClicked = () => {
  emit('edit-location-clicked')
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
</script>
<template>
  <div class="edit-address-wrapper">
    <div class="edit-address-container">
      <h2 class="edit-address-title">
        {{ isEdited ? $t('Frogooo.EditAddress') : $t('Frogooo.AddNewAddress') }}
      </h2>
      <div class="location" @click="closeClicked">
        <img src="../assets/icons/close.png" alt="" />
      </div>
      <section class="item-row-wrapper">
        <section class="item-row-container item-row-margin">
          <h3 class="item-row-title">{{ $t('Frogooo.CountryOnly') }}</h3>
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
            v-model:selectedItem="selectedItem"
            id="area"
          />
        </section>
      </section>
      <section class="item-row-wrapper">
        <section class="item-row-container">
          <h3 class="item-row-title">{{ $t('Frogooo.DetailsAddress') }}</h3>
          <input type="text" class="item-weight" v-model="selectedData.address" />
        </section>
      </section>
      <section class="item-row-wrapper">
        <section class="item-row-container item-row-margin">
          <h3 class="item-row-title">{{ $t('Frogooo.ConsigneeName') }}</h3>
          <input type="text" class="item-weight" v-model="selectedData.name" />
        </section>
        <section class="item-row-container">
          <h3 class="item-row-title">{{ $t('Frogooo.PhoneNumber') }}</h3>
          <div class="item-row-phone-wrapper">
            <span class="item-row-phone-code">62</span>
            <input type="text" class="item-row-phone" v-model="selectedData.phone" />
          </div>
        </section>
      </section>
      <section class="item-default-wrapper" @click="setDefault">
        <img :src="defaultImageUrl" alt="" class="item-default-image" />
        <span class="item-default-address">{{ $t('Frogooo.DefaultAddress') }}</span>
      </section>
      <button class="save-btn" @click="save">
        {{ $t('Frogooo.Save') }}
      </button>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.edit-address-wrapper
  background: #F2F4F8
  height: 100%
  overflow-y: auto
  width: 100%
  .edit-address-container
      position: relative
      display: flex
      flex-direction: column
      margin: 50px auto 0
      padding: 16px 32px
      border-radius: 24px
      background: #fff
      width: 800px
      .edit-address-title
          font-size: 26px
          line-height: 24px
          font-weight: 700
          color: #0A1B39
          text-align: center
          margin: 16px 0
      .location
        display: flex
        position: absolute
        top: 28px
        right: 32px
      .item-row-wrapper
        display: flex
        justify-content: space-between
        margin-top: 16px
        .item-row-container
          display: flex
          flex-direction: column
          flex: 1
          .item-row-phone-wrapper
            display: flex
            align-items: center
            justify-content: space-between
            border: 1px solid rgba(10, 27, 57, 0.1)
            border-radius: 8px
            padding: 14px 16px
            color: #0a1b39
            .item-row-phone-code
              flex: 1
              font-size: 16px
            .item-row-phone
              flex: 9
              font-size: 16px
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
            padding: 14px 16px
            width: 100%
            color: #0a1b39
            font-size: 16px
        .item-row-margin
          margin-right: 32px
      .item-wrapper
          margin-top: 16px
          .item-title
              font-size: 16px
              line-height: 16px
              color: rgba(10, 27, 57, 0.5)
              margin-bottom: 10px
        .item-default-wrapper
          margin-top: 20px
          display: flex
          align-items: center
          .item-default-image
              width: 22px
              height: 22px
              margin-right: 10px
          .item-default-address
              font-size: 16px
              line-height: 19px
              color: #0A1B39
        .save-btn
          margin: 40px auto 20px
          height: 48px
          width: 400px
          border-radius: 16px
          font-size: 20px
          line-height: 28px
          font-weight: 500
          color: #fff
          background: #05FE9F
          text-align: center
          color: #0A1B39
        .save-btn:active
          background: #e9ecef
          transform: scale(1.1)
</style>
