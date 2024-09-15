<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import TrayPicker from './TrayPicker.vue'
import { watchEffect } from 'vue'

defineProps({
  colorFlag: {
    type: String,
    default: 'white'
  }
})

const router = useRouter()
const route = useRoute()

const isLogin = ref(localStorage.getItem('frogoooIsLogin'))

const emit = defineEmits(['close-button-clicked'])

const closeButtonClicked = () => emit('close-button-clicked')

let pickerItems: Array<any> = []

const listItems = ref([
  {
    title: 'Frogooo.Home',
    flag: 'home'
  },
  // {
  //   title: 'Frogooo.ShippingFeeCalculation',
  //   flag: 'shippingFeeCalculation'
  // },
  {
    title: 'Frogooo.ContactUs',
    flag: 'contactUs'
  },
  {
    title: 'Frogooo.Language',
    flag: 'language'
  },
  {
    title: 'Frogooo.Converter',
    flag: 'converter'
  }
])

const { locale, t } = useI18n()

const title = t('Frogooo.Language')

const currentLanguageIcon = ref(new URL(`../assets/icons/english.png`, import.meta.url).href)

const storageLanguage = window.localStorage.getItem('frgoooLanguage')
if (storageLanguage && storageLanguage.includes('id-ID')) {
  currentLanguageIcon.value = new URL(`../assets/icons/indonesia.png`, import.meta.url).href
} else if (storageLanguage && !storageLanguage.includes('id-ID')) {
  currentLanguageIcon.value = new URL(`../assets/icons/english.png`, import.meta.url).href
} else if (navigator.language.includes('id-ID')) {
  currentLanguageIcon.value = new URL(`../assets/icons/indonesia.png`, import.meta.url).href
} else {
  currentLanguageIcon.value = new URL(`../assets/icons/english.png`, import.meta.url).href
}

watchEffect(() => {
  listItems.value = !(isLogin.value == 'true')
    ? listItems.value
    : listItems.value.concat([
        {
          title: 'Frogooo.LogOut',
          flag: 'LogOut'
        }
      ])
})

const showTray = ref(false)
const languageArr = [
  { title: 'English', id: 'en-US', flag: 'language' },
  { title: 'Bahasa indonesia', id: 'id-ID', flag: 'language' }
]

const selectedItem = ref<any>()

watch(selectedItem, (newVal) => {
  if (newVal?.flag == 'language') {
    locale.value = newVal.id
    if (newVal.title == 'English') {
      currentLanguageIcon.value = new URL(`../assets/icons/english.png`, import.meta.url).href
    } else {
      currentLanguageIcon.value = new URL(`../assets/icons/indonesia.png`, import.meta.url).href
    }
    window.localStorage.setItem('frgoooLanguage', newVal.id)
  }
})

const onListItemClicked = (item: any) => {
  if (item.flag == 'home') {
    closeButtonClicked()
    router.push({ path: '/' })
  } else if (item.flag == 'contactUs') {
    closeButtonClicked()
    router.push({ path: '/contact' })
  } else if (item.flag == 'language') {
    pickerItems = languageArr
    showTray.value = true
  } else if (item.flag == 'shippingFeeCalculation') {
    closeButtonClicked()
    router.push({ path: '/freight' })
  } else if (item.flag == 'LogOut') {
    localStorage.removeItem('frogoooToken')
    window.localStorage.setItem('frogoooIsLogin', 'false')
    closeButtonClicked()
    if (route.path == '/') {
      window.location.reload()
    } else {
      router.push({ path: '/' })
    }
  } else if (item.flag == 'converter') {
    closeButtonClicked()
    router.push({ path: '/converter' })
  }
}
</script>
<template>
  <div class="more-page-container">
    <section class="more-header" @click="closeButtonClicked">
      <img
        src="../assets/icons/arrow_right.svg"
        alt=""
        class="more-header-black-arrow"
        v-if="colorFlag == 'white'"
      />
      <img src="../assets/icons/arrow_left.svg" alt="" v-else />
      <span
        class="more-header-back"
        :class="{ 'more-header-back-white-color': colorFlag == 'black' }"
        >{{ $t('Frogooo.Back') }}</span
      >
    </section>
    <section class="more-content">
      <a
        class="content-list-item"
        v-for="(item, index) in listItems"
        :key="item.title"
        @click="onListItemClicked(item)"
      >
        <span class="list-item" :class="{ 'list-item-white-color': colorFlag == 'black' }">{{
          $t(item.title)
        }}</span>
        <div v-if="index != 2">
          <img src="../assets/icons/arrow_right.svg" v-if="colorFlag == 'white'" alt="" />
          <img src="../assets/icons/arrow_white.png" v-else alt="" />
        </div>
        <div v-else>
          <img :src="currentLanguageIcon" alt="" />
        </div>
      </a>
    </section>
    <TrayPicker
      v-model:selectedItem="selectedItem"
      :visible="showTray"
      :items="pickerItems"
      @close="showTray = false"
      :title="title"
      flag="language"
    />
  </div>
</template>

<style lang="stylus" scoped>
.more-page-container
    position: fixed
    top: 0
    right: 0
    height: 100%
    background-color: rgba(255, 255, 255, 0.1)
    backdrop-filter: blur(15px)
    -webkit-backdrop-filter: blur(15px)
    z-index: 100
    display: flex
    flex-direction: column
    border-left: .01rem solid rgba(255, 255, 255, 0.2)
    border-top-left-radius: .24rem
    border-bottom-left-radius: .24rem
    width: 60%
    .more-header
        display: flex
        padding: .2rem
        border-bottom: .005rem solid rgba(10, 27, 57, 0.08)
        align-items: center
        .more-header-black-arrow
          transform: rotate(180deg)
        .more-header-back
          font-size: .16rem
          line-height: .22rem
          color: #0a1b39
          margin-left: .05rem
        .more-header-back-white-color
          color: #fff
    .more-content
        display: flex
        flex-direction: column
        margin: .1rem 0 0
        .content-list-item
            display: flex
            justify-content: space-between
            padding: .14rem .2rem
            align-items: center
            -webkit-tap-highlight-color: #ccc
            touch-action: manipulation
            .list-item
                font-size: .16rem
                line-height: .24rem
                font-weight: 400
                color: #0A1B39
                margin-right: .1rem
            .list-item-white-color
              color: #fff
            img
              width: .16rem
              height: .16rem
</style>
