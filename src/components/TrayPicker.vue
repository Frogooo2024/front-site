<script setup lang="ts">
import { ref, watch } from 'vue'
interface Props {
  visible: boolean
  items: any[]
  title: string
  flag: string
}

const props = defineProps<Props>()

const emit = defineEmits(['close'])

const selectedIndex = ref(-1)
const selectedCityIndex = ref(-1)
const selectedAreaIndex = ref(-1)
const selectedProvinceIndex = ref(-1)

if (props.flag == 'language') {
  const storageLanguage = window.localStorage.getItem('frgoooLanguage')
  if (storageLanguage) {
    storageLanguage.includes('id-ID') ? (selectedIndex.value = 1) : (selectedIndex.value = 0)
  } else {
    navigator.language.includes('id-ID') ? (selectedIndex.value = 1) : (selectedIndex.value = 0)
  }
}

const selectedItem = defineModel<any>('selectedItem')
const selectItem = (item: any, index: any) => {
  setTimeout(() => {
    if (item.id == 'province') {
      selectedProvinceIndex.value = index
    } else if (item.id == 'city') {
      selectedCityIndex.value = index
    } else if (item.id == 'area') {
      selectedAreaIndex.value = index
    } else {
      selectedIndex.value = index
    }
    selectedItem.value = item
    emit('close')
  }, 60);
}

const close = () => {
  emit('close')
}

watch(
  () => props.items,
  (val: any) => {
    if (val[0].id == 'province') {
      selectedIndex.value = selectedProvinceIndex.value
    } else if (val[0].id == 'city') {
      selectedIndex.value = selectedCityIndex.value
    } else if (val[0].id == 'area') {
      selectedIndex.value = selectedAreaIndex.value
    }
  }
)
watch(
  () => props.visible,
  (val: any) => {
    if (val) {
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
    }
  }
)
</script>

<template>
  <teleport to="body">
    <transition name="slide-up">
      <div v-if="visible" class="tray-overlay" @click.self="close">
        <div class="tray-container">
          <div class="tray-header">
            {{ title }}
          </div>
          <div class="tray-content">
            <ul>
              <li
                v-for="(item, index) in items"
                :key="index"
                @click="selectItem(item, index)"
                :class="{ 'slected-item': index == selectedIndex }"
              >
                <div class="select-item-wrapper">
                  <img
                    src="../assets/icons/english.png"
                    alt=""
                    class="language-image"
                    v-if="index == 0 && flag == 'language'"
                  />
                  <img
                    src="../assets/icons/indonesia.png"
                    alt=""
                    class="language-image"
                    v-if="index == 1 && flag == 'language'"
                  />
                  <span class="select-item">{{ item.title ?? item }}</span>
                </div>
                <img
                  src="../assets/icons/right.png"
                  class="slected"
                  alt=""
                  v-if="index == selectedIndex"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style lang="stylus" scoped>
.tray-overlay
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  background: rgba(0, 0, 0, 0.5)
  display: flex
  justify-content: center
  align-items: flex-end
  z-index: 1000
  .tray-container
      width: 100%
      background: white
      border-top-left-radius: .24rem
      border-top-right-radius: .24rem
      overflow: auto
      height: 5rem
  .tray-header
      padding: .2rem
      font-size: .2rem
      line-height: .26rem
      font-weight: 500
      color: #0A1B39
      text-align: center
  .tray-content
      overflow-y: auto
      padding-bottom: .12rem
  .tray-content 
    li
      display: flex
      padding: .12rem .2rem
      text-align: start
      cursor: pointer
      justify-content: space-between
      align-items: center
      .select-item-wrapper
        display: flex
        .language-image
          width: .24rem
          height: .24rem
          margin-right: .1rem
        .select-item
          font-size: .16rem
          line-height: .22rem
          color: rgba(10, 27, 57, 0.8)
      .slected
        width: .24rem
        height: .24rem
        text-align: right
    li:active
      background: rgba(10, 27, 57, 0.04)
  .slected-item
    background: rgba(10, 27, 57, 0.04)
</style>
