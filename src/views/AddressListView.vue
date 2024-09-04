<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import OtherHeaderLight from '../components/OtherHeaderLight.vue'
import MovePageComponent from '../components/MorePageComponent.vue'
import EditAddress from '@/components/EditAddress.vue'
import HeaderComponent from '../components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import EditAddressRow from '@/components/EditAddressRow.vue'
import { useI18n } from 'vue-i18n'
import { showToast } from 'vant'
import api from '@/api/api'
import { useAddressStore } from '@/stores/address'
import useIsMobile from '../hooks/useIsMobile'

import 'vant/lib/index.css'

const router = useRouter()
const showMorePage = ref(false)
const isMobile = useIsMobile()

const { t } = useI18n()

let { selectedData } = useAddressStore()

let response: any

const addressList = ref<any[]>()
const showEditAddress = ref(false)
const showNoData = ref(false)
const isEdited = ref(false)
const sendInProgress = ref(false)
const isAddFristAddress = ref(false)

onMounted(async () => {
  document.body.classList.add('background-gray')
  try {
    response = await api.getAddressUser()
    addressList.value = response?.data
    if (addressList.value?.length) {
      showNoData.value = false
    } else {
      isAddFristAddress.value = true
      showNoData.value = true
    }
  } catch (e) {
    showToast({
      message: t('Frogooo.NetworkError'),
      position: 'bottom'
    })
    showNoData.value = true
  }
})

onUnmounted(() => {
  document.body.classList.remove('background-gray')
})

const onEditSubmitClicked = async () => {
  try {
    response = await api.getAddressUser()
    addressList.value = response?.data
    showEditAddress.value = false
    if (addressList.value?.length) {
      isAddFristAddress.value = false
      showNoData.value = false
    } else {
      isAddFristAddress.value = true
      showNoData.value = true
    }
  } catch (e) {
    showToast({
      message: t('Frogooo.NetworkError'),
      position: 'bottom'
    })
  }
}

const setDefault = async (item: any) => {
  try {
    const params = {
      country: 'ID',
      province: item.province,
      provinceCode: item.province,
      city: item.city,
      cityCode: item.city,
      county: item.county,
      countyCode: item.county,
      name: item.name,
      phone: item.phone,
      address: item.address,
      id: item.id,
      isDefault: 'Y'
    }
    if (!sendInProgress.value) {
      sendInProgress.value = true
      await api.editAddress(params)
      response = await api.getAddressUser()
      addressList.value = response?.data
      if (addressList.value?.length) {
        isAddFristAddress.value = false
        showNoData.value = false
      } else {
        isAddFristAddress.value = true
        showNoData.value = true
      }
      sendInProgress.value = false
    }
  } catch (e) {
    sendInProgress.value = false
    showToast({
      message: t('Frogooo.NetworkError'),
      position: 'bottom'
    })
  }
}

const selectAddressClicked = async (item: any) => {
  selectedData.address = item.address
  selectedData.provinceSelected = item.province
  selectedData.citySelected = item.city
  selectedData.areaSelected = item.county
  selectedData.name = item.name
  selectedData.phone = item.phone
  selectedData.id = item.id
  selectedData.isDefault = item.isDefault == 'N' ? false : true
  await setDefault(item)
  router.go(-1)
}

const edit = (item: any) => {
  isEdited.value = true
  selectedData.address = item.address
  selectedData.provinceSelected = item.province
  selectedData.provinceCode = item.provinceCode
  selectedData.citySelected = item.city
  selectedData.cityCode = item.cityCode
  selectedData.areaSelected = item.county
  selectedData.countyCode = item.countyCode
  selectedData.name = item.name
  selectedData.phone = item.phone
  selectedData.id = item.id
  selectedData.isDefault = item.isDefault == 'N' ? false : true
  showEditAddress.value = true
  if (addressList.value?.length == 1) {
    isAddFristAddress.value = true
  }
}

const add = () => {
  isEdited.value = false
  showEditAddress.value = true
}

const deleteItem = async (item: any) => {
  try {
    if (!sendInProgress.value) {
      sendInProgress.value = true
      let deleteResponse: any = await api.deleteAddress({ id: item.id })
      if (deleteResponse.status) {
        showToast({
          message: t('Frogooo.SuccessfullyDeleted'),
          position: 'top'
        })
        response = await api.getAddressUser()
        addressList.value = response?.data
        if (addressList.value?.length) {
          isAddFristAddress.value = false
          showNoData.value = false
        } else {
          isAddFristAddress.value = true
          showNoData.value = true
        }
        sendInProgress.value = false
      }
      sendInProgress.value = false
    }
  } catch (e) {
    sendInProgress.value = false
    showToast({
      message: t('Frogooo.NetworkError'),
      position: 'bottom'
    })
  }
}

const onMoreButtonClicked = () => {
  showMorePage.value = true
}
const onCloseButtonClicked = () => {
  showMorePage.value = false
}
const onEditLocationClicked = () => {
  showEditAddress.value = false
}
const viewPageClicked = () => {
  if (showMorePage.value) {
    showMorePage.value = false
  }
}
</script>

<template>
  <div class="address-list-view" v-if="!showEditAddress">
    <MovePageComponent v-if="showMorePage" @close-button-clicked="onCloseButtonClicked" />
    <OtherHeaderLight
      @more-button-clicked="onMoreButtonClicked"
      :hasBackgroundColor="true"
      v-if="isMobile"
    >
    </OtherHeaderLight>
    <HeaderComponent backgroundColor="white" :lightIcon="true" v-else />
    <div class="address-list-container" v-if="!showNoData" @click="viewPageClicked">
      <div class="address-list-wrapper">
        <section class="select-address-container">
          <p class="select-address">{{ $t('Frogooo.ExistingAddress') }}</p>
        </section>
        <div v-if="isMobile">
          <section class="item-wrapper" v-for="(item, index) in addressList" :key="index">
            <div class="item-container" @click="selectAddressClicked(item)">
              <img
                src="../assets/icons/unselected.svg"
                v-if="item.isDefault == 'N'"
                alt=""
                class="item-container-image"
              />
              <img
                src="../assets/icons/address_selected.svg"
                v-if="item.isDefault == 'Y'"
                alt=""
                class="item-container-image"
              />
              <span class="item-container-detail"
                >{{ item.name }}, {{ item.phone }}, {{ item.province }}, {{ item.city }},
                {{ item.county }}, {{ item.address }}</span
              >
            </div>
            <div class="item-button-container">
              <div class="item-default-container" @click="setDefault(item)">
                <img
                  src="../assets/icons/unselected.svg"
                  v-if="item.isDefault == 'N'"
                  alt=""
                  class="item-default-image"
                />
                <img
                  src="../assets/icons/address_selected.svg"
                  v-if="item.isDefault == 'Y'"
                  alt=""
                  class="item-default-image"
                />
                <span class="item-default-title">{{ $t('Frogooo.DefaultAddress') }}</span>
              </div>
              <div class="item-button-wrapper">
                <div class="item-button" @click="deleteItem(item)">
                  <img src="../assets/icons/delete.png" alt="" />
                </div>
                <div class="item-button" @click="edit(item)">
                  <img src="../assets/icons/edit.png" alt="" />
                </div>
              </div>
            </div>
          </section>
        </div>
        <div v-else>
          <section class="item-wrapper" v-for="(item, index) in addressList" :key="index">
            <div class="item-container" @click="selectAddressClicked(item)">
              <img
                src="../assets/icons/unselected.svg"
                v-if="item.isDefault == 'N'"
                alt=""
                class="item-container-image"
              />
              <img
                src="../assets/icons/address_selected.svg"
                v-if="item.isDefault == 'Y'"
                alt=""
                class="item-container-image"
              />
            </div>
            <div class="item-button-container">
              <span class="item-button-detail"
                >{{ item.name }}, {{ item.phone }}, {{ item.province }}, {{ item.city }},
                {{ item.county }}, {{ item.address }}</span
              >
              <div class="item-button-container-detail">
                <div class="item-default-container" @click="setDefault(item)">
                  <img
                    src="../assets/icons/unselected.svg"
                    v-if="item.isDefault == 'N'"
                    alt=""
                    class="item-default-image"
                  />
                  <img
                    src="../assets/icons/address_selected.svg"
                    v-if="item.isDefault == 'Y'"
                    alt=""
                    class="item-default-image"
                  />
                  <span class="item-default-title">{{ $t('Frogooo.DefaultAddress') }}</span>
                </div>
                <div class="item-button-wrapper">
                  <div class="item-button" @click="deleteItem(item)">
                    <img src="../assets/icons/delete.png" alt="" />
                  </div>
                  <div class="item-button" @click="edit(item)">
                    <img src="../assets/icons/edit.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <section class="add-button-container">
          <button class="add-button" @click="add()">{{ $t('Frogooo.AddNewAddress') }}</button>
        </section>
      </div>
      <div class="footer" v-if="!isMobile">
        <FooterComponent backgroundColor="white" />
      </div>
    </div>
    <div class="no-data-container" v-if="showNoData && isMobile" @click="viewPageClicked">
      <div class="no-data-wrapper">
        <p class="no-data-title">{{ $t('Frogooo.NoAddress') }}</p>
        <button class="no-data-button" @touchstart="add()">
          {{ $t('Frogooo.AddNewAddress') }}
        </button>
      </div>
      <img class="no-data-image" src="../assets/icons/empty.png" alt="" />
    </div>
    <div class="no-data-container" v-if="showNoData && !isMobile">
      <div class="no-data-top">
        <div class="no-data-wrapper">
          <p class="no-data-title">{{ $t('Frogooo.ExistingAddress') }}</p>
          <p class="no-data-subtitle">{{ $t('Frogooo.NoAddress') }}</p>
          <button class="no-data-button" @click="add()">{{ $t('Frogooo.AddNewAddress') }}</button>
        </div>
        <img class="no-data-image" src="../assets/icons/address_empty.png" alt="" />
      </div>
      <div class="footer" v-if="!isMobile">
        <FooterComponent backgroundColor="white" />
      </div>
    </div>
  </div>
  <EditAddress
    v-if="showEditAddress && isMobile"
    @edit-location-clicked="onEditLocationClicked"
    @edit-submit-clicked="onEditSubmitClicked"
    :isEdited="isEdited"
    :isAddFristAddress="isAddFristAddress"
  ></EditAddress>
  <EditAddressRow
    v-if="showEditAddress && !isMobile"
    @edit-location-clicked="onEditLocationClicked"
    @edit-submit-clicked="onEditSubmitClicked"
    :isEdited="isEdited"
    :isAddFristAddress="isAddFristAddress"
  />
</template>

<style lang="stylus" scoped>
@media (max-width: 750px)
  .address-list-view
    width: 100%
    background: #F2F4F8
    height: 100%
    overflow-y: auto
    padding-bottom: .84rem
    .address-list-container
      margin: 0 .2rem 0
      display: flex
      flex-direction: column
      color: #000
      border-radius: .24rem
      padding: .24rem .2rem
      background: #fff
      .select-address-container
        .select-address
          font-size: .2rem
          line-height: .26rem
          font-weight: 700
      .item-wrapper
          margin-top: .24rem
          display: flex
          flex-direction: column
          .item-container
            display: flex
            align-items: center
            .item-container-image
              width: .22rem
              height: .22rem
              margin-right: .2rem
            .item-container-detail
              font-size: .14rem
              line-height: .22rem
              color: #0A1B39
          .item-container:active
            background: #ccc
          .item-button-container
            display: flex
            align-items: center
            justify-content: space-between
            margin-top: .16rem
            padding-left: .42rem
            .item-default-container
              display: flex
              align-items: center
              .item-default-image
                width: .22rem
                height: .22rem
                margin-right: .1rem
              .item-default-title
                font-size: .16rem
                line-height: .19rem
                color: #0A1B39
            .item-default-container:active
              background: #ccc
            .item-button-wrapper
              display: flex
              align-items: center
              .item-button
                img
                  width: .4rem
                  height: .24rem
      .add-button-container
        margin-top: .5rem
        .add-button
          border-radius: .16rem
          padding: .12rem .24rem
          background: #05FE9F
          color: #0A1B39
          font-size: .18rem
          line-height: .24rem
          font-weight: 500
          width: 100%
        .add-button:active
          background: #e9ecef
          transform: scale(1.1)
    .no-data-container
      height: calc(100% - .7rem)
      display: flex
      flex-direction: column
      justify-content: space-between
      margin-top: .4rem
      position: relative
      .no-data-wrapper
        display: flex
        flex-direction: column
        align-items: center
        margin: 0 .4rem 0
        .no-data-title
          font-size: .18rem
          line-height: .21rem
          color: rgba(10, 27, 57, 0.35)
        .no-data-button
          margin-top: .4rem
          border-radius: .16rem
          padding: .12rem .24rem
          background: #05FE9F
          color: #0A1B39
          font-size: .18rem
          line-height: .24rem
          font-weight: 500
          width: 100%
        .no-data-button:active
          background: #e9ecef
          transform: scale(1.1)
      .no-data-image
        position: absolute
        bottom: 0
        width: 100%
@media (min-width: 1024px)
  .address-list-view
    width: 100%
    background: #F2F4F8
    height: 100%
    overflow-y: auto
    .address-list-container
      position: relative
      display: flex
      flex-direction: column
      min-height: calc(100% - 56px)
      padding-bottom: 190px
      .footer
        position: absolute
        bottom: 0
        left: 0
        right: 0
      .address-list-wrapper
        margin: 32px auto 190px
        width: 800px
        display: flex
        flex-direction: column
        color: #000
        border-radius: 24px
        padding: 32px
        background: #fff
        .select-address-container
          .select-address
            font-size: 26px
            line-height: 24px
            font-weight: 700
            color: #0A1B39
            text-align: center
        .item-wrapper
            margin-top: 30px
            display: flex
            align-items: center
            justify-content: space-between
            .item-container
              .item-container-image
                width: 22px
                height: 22px
                margin-right: 20px
            .item-button-container
              display: flex
              flex-direction: column
              border-radius: 16px
              border: 1px solid rgba(10, 27, 57, 0.1)
              padding: 18px 24px
              width: 100%
              .item-button-detail
                font-size: 14px
                line-height: 18px
                color: #0A1B39
              .item-button-container-detail
                display: flex
                align-items: center
                justify-content: space-between
                margin-top: 30px
                .item-default-container
                  display: flex
                  align-items: center
                  .item-default-image
                    width: 22px
                    height: 22px
                    margin-right: 10px
                  .item-default-title
                    font-size: 16px
                    line-height: 19px
                    color: #0A1B39
                .item-button-wrapper
                  display: flex
                  align-items: center
                  .item-button
                    img
                      width: 40px
                      height: 24px
        .add-button-container
          margin: 50px auto 0
          .add-button
            border-radius: 16px
            padding: 10px 24px
            background: #05FE9F
            color: #0A1B39
            font-size: 20px
            line-height: 28px
            font-weight: 500
            width: 400px
          .add-button:active
            background: #e9ecef
            transform: scale(1.1)
    .no-data-container
      position: relative
      display: flex
      flex-direction: column
      min-height: calc(100% - 56px)
      padding-bottom: 190px
      .footer
        position: absolute
        bottom: 0
        left: 0
        right: 0
      .no-data-top
        display: flex
        margin: 160px auto
        width: 800px
        .no-data-wrapper
          .no-data-title
            font-size: 26px
            line-height: 24px
            font-weight: 700
            color: #0A1B39
          .no-data-subtitle
            margin-top: 20px
            font-size: 16px
            line-height: 18px
            color: rgba(10, 27, 57, 0.6)
          .no-data-button
            margin-top: 40px
            border-radius: 16px
            padding: 12px 24px
            background: #05FE9F
            color: #0A1B39
            font-size: 20px
            line-height: 18px
            font-weight: 500
          .no-data-button:active
            background: #e9ecef
            transform: scale(1.1)
        .no-data-image
          width: 375px
          height: 300px
</style>
