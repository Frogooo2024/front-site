<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useUserIdStore } from '../stores/userId'
import api from '../api/api'
import { showToast } from 'vant'

import 'vant/lib/index.css'

const emit = defineEmits(['order-list-item-clicked'])

const router = useRouter()
const { t } = useI18n()
const { userId } = useUserIdStore()
const packageList = ref<any>()
const packageOneList = ref<any>()
const orderHistoryList = ref<any>()
const orderInTransitList = ref<any>()
const showMorePackages = ref(false)
const showOrderInTransitList = ref(false)
const showOrderHistoryList = ref(false)
const arrowImageUrl = ref(new URL('../assets/icons/arrow_down.svg', import.meta.url).href)

onMounted(async () => {
  try {
    Promise.all([
      api.getPackageList({ packageStatus: 1 }),
      api.getOrderList({ orderStatus: 0 }),
      api.getOrderList({ orderStatus: 200 })
    ]).then(
      (res: any) => {
        if (res[0].status && res[1].status && res[2].status) {
          packageList.value = res[0]
          if (packageList.value.rows?.length) {
            packageOneList.value = [packageList.value.rows[0]]
          }
          orderInTransitList.value = res[1].data
          orderHistoryList.value = res[2].data
        }
      },
      (e: any) => {
        showToast({
          message: t('Frogooo.NetworkError'),
          position: 'bottom'
        })
      }
    )
  } catch (e) {
    showToast({
      message: t('Frogooo.NetworkError'),
      position: 'bottom'
    })
  }
})

const deletePackgeClicked = async (item: any) => {
  try {
    let response: any = await api.deletePackge({ transportNumber: item.transportNumber })
    if (response.status) {
      packageList.value = await api.getPackageList({ packageStatus: 1 })
      if (packageList.value.rows?.length) {
        packageOneList.value = [packageList.value.rows[0]]
      }
    }
  } catch (e) {
    showToast({
      message: t('Frogooo.NetworkError'),
      position: 'bottom'
    })
  }
}

const inWarehouseClicked = () => {
  router.push({ path: '/packagesInWarehouse' })
}

const inTransitClicked = () => {
  if (!orderInTransitList.value.length) {
    showToast({
      message: t('Frogooo.NoOrderYet'),
      position: 'bottom'
    })
  } else {
    showOrderInTransitList.value = !showOrderInTransitList.value
  }
}

const orderListItemClicked = (item: any) => {
  emit('order-list-item-clicked', item)
}

const historyListClicked = () => {
  if (!orderHistoryList.value.length) {
    showToast({
      message: t('Frogooo.NoOrderYet'),
      position: 'bottom'
    })
  } else {
    showOrderHistoryList.value = !showOrderHistoryList.value
  }
}

const singaporeConsigneeClicked = () => {
  router.push({ path: '/singaporeAddress' })
}

const receivingAddressClicked = () => {
  router.push({ path: '/addressList' })
}

const showMorePackagesArrowClicked = () => {
  showMorePackages.value = !showMorePackages.value
  arrowImageUrl.value = showMorePackages.value
    ? new URL('../assets/icons/arrow_up.svg', import.meta.url).href
    : new URL('../assets/icons/arrow_down.svg', import.meta.url).href
}

const showDeleteClicked = (item: any) => {
  item.showDelete = true
}

const addPackageClicked = () => {
  router.push({ path: '/addPackage' })
}
</script>
<template>
  <div class="user-center-container">
    <section class="user-id-container">
      <div class="id-wrapper">
        <h3 class="id-title">{{ $t('Frogooo.YourId') }}{{ userId }}</h3>
        <div class="id-tips">
          <img class="tips-image" src="../assets/icons/tips.svg" alt="" />
          <p class="tips-detail">{{ $t('Frogooo.UniqueIdentificationCode') }}</p>
        </div>
      </div>
    </section>
    <section class="button-wrapper">
      <div class="button" @click="singaporeConsigneeClicked">
        {{ $t('Frogooo.SingaporeConsignee') }}
      </div>
      <div class="button" @click="receivingAddressClicked">
        {{ $t('Frogooo.ReceivingAddress') }}
      </div>
    </section>
    <section class="receiving-packages-title">
      <h1 class="title">{{ $t('Frogooo.ReceivingPackages') }}</h1>
    </section>
    <section class="receiving-packages-wrapper">
      <section class="list-item-container" @click="addPackageClicked">
        <div class="list-item">{{ $t('Frogooo.TrackingNumber') }}</div>
        <img class="arrow-right" src="../assets/icons/arrow_right.svg" alt="" />
      </section>
      <section class="packages-list-container" v-if="packageList?.rows?.length">
        <div
          class="packages-list-item"
          v-for="(item, index) in showMorePackages ? packageList.rows : packageOneList"
          :key="index"
        >
          <span class="list-item-date">{{ item.createTime }}</span>
          <div class="list-item-wrapper">
            <div class="list-item" @click="showDeleteClicked(item)">
              <img src="../assets/icons/package.svg" alt="" class="list-item-image" />
              <div class="list-item-details">
                <span class="list-item-title">{{ item.transportNumber }}</span>
                <span class="list-item-subtitle">{{ item.goodsTypeName }}</span>
              </div>
            </div>
            <div class="list-item-delete" v-if="item.showDelete" @click="deletePackgeClicked(item)">
              {{ $t('Frogooo.Delete') }}
            </div>
          </div>
        </div>
        <div class="list-item-arrow" @click="showMorePackagesArrowClicked">
          <img :src="arrowImageUrl" alt="" />
        </div>
      </section>
      <section class="list-item-container" @click="inWarehouseClicked">
        <div class="list-item">{{ $t('Frogooo.ArrivedAt') }}</div>
        <img class="arrow-right" src="../assets/icons/arrow_right.svg" alt="" />
      </section>
      <section class="list-item-container" @click="inTransitClicked">
        <div class="list-item">{{ $t('Frogooo.InTransit') }}</div>
        <img class="arrow-right" src="../assets/icons/arrow_right.svg" alt="" />
      </section>
      <section
        class="packages-list-container"
        v-if="orderInTransitList?.length && showOrderInTransitList"
      >
        <div class="packages-list-item" v-for="(item, index) in orderInTransitList" :key="index">
          <span class="list-item-date">{{ item.createTime }}</span>
          <div class="list-item-wrapper" @click="orderListItemClicked(item)">
            <div class="list-item">
              <img src="../assets/icons/package.svg" alt="" class="list-item-image" />
              <div class="list-item-details">
                <span class="list-item-title">{{ item.orderNumber }}</span>
              </div>
            </div>
            <img src="../assets/icons/arrow_right.svg" alt="" />
          </div>
        </div>
      </section>
      <section class="list-item-container" @click="historyListClicked">
        <div class="list-item">{{ $t('Frogooo.YourPackageHistory') }}</div>
        <img class="arrow-right" src="../assets/icons/arrow_right.svg" alt="" />
      </section>
      <section
        class="packages-list-container"
        v-if="orderHistoryList?.length && showOrderHistoryList"
      >
        <div class="packages-list-item" v-for="(item, index) in orderHistoryList" :key="index">
          <span class="list-item-date">{{ item.createTime }}</span>
          <div class="list-item-wrapper" @click="orderListItemClicked(item)">
            <div class="list-item">
              <img src="../assets/icons/package.svg" alt="" class="list-item-image" />
              <div class="list-item-details">
                <span class="list-item-title">{{ item.orderNumber }}</span>
              </div>
            </div>
            <img src="../assets/icons/arrow_right.svg" alt="" />
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<style lang="stylus" scoped>
.user-center-container
  height: auto
  width: 800px
  margin: 50px auto
  padding: 32px
  background: #fff
  overflow-x: auto
  display: flex
  flex-direction: column
  border-radius: 24px
  .user-id-container
    display: flex
    flex-direction: column
    .id-wrapper
      display: flex
      flex-direction: column
      .id-title
        font-size: 32px
        font-weight: 700
        line-height: 42px
        color: #0A1B39
        text-align: center
      .id-tips
        display: flex
        justify-content: start
        align-items: center
        margin: 0 auto
        .tips-image
          width: 16px
          height: 16px
        .tips-detail
          font-size: 14px
          line-height: 20px
          color: rgba(10, 27, 57, 0.6)
  .button-wrapper
    display: flex
    justify-content: space-between
    margin: 30px auto 0
    .button
      padding: 10px 24px
      border-radius: 16px
      font-size: 18px
      line-height: 28px
      font-weight: 500
      color: #fff
      background: #0A1B39
      width: fit-content
    .button:nth-of-type(1)
      margin-right: 50px
  .receiving-packages-title
    margin-top: 30px
    .title
      font-size: 24px
      line-height: 31px
      font-weight: 700
      color: #0A1B39
  .receiving-packages-wrapper
    display: flex
    flex-direction: column
    margin-top: 10px
    .list-item-container
      margin-top: 30px
      display: flex
      justify-content: space-between
      align-items: center
      .list-item
        font-size: 18px
        line-height: 23px
        color: #0A1B39
    .packages-list-container
      position: relative
      margin-top: 20px
      padding: 0 24px 16px
      border-radius: 16px
      background: rgba(10, 27, 57, 0.04)
      .packages-list-item
        display: flex
        flex-direction: column
        margin-top: 20px
        .list-item-date
          font-size: 14px
          line-height: 18px
          color: rgba(10, 27, 57, 0.6)
        .list-item-wrapper
          display: flex
          align-items: center
          justify-content: space-between
          .list-item
            display: flex
            align-items: start
            justify-content: start
            margin-top: 5px
            .list-item-image
              margin-right: 10px
            .list-item-details
              display: flex
              .list-item-title, .list-item-subtitle
                font-size: 16px
                line-height: 18px
                color: #0A1B39
              .list-item-title
                margin-right: 10px
          .list-item-delete
            border-radius: 4px
            border: 1px solid rgba(10, 27, 57, 0.2)
            padding: 2px 4px
            font-size: 14px
            line-height: 18px
            color: #0A1B39
            background: #fff
      .list-item-arrow
        position: absolute
        top: 20px
        right: 24px
        img
          width: 18px
          height: 18px
</style>
