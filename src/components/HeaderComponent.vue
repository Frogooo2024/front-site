<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import useIsMobile from '../hooks/useIsMobile'
import { getLogoImageUrl } from '../hooks/useGetImageUrl'

const props = defineProps({
  backgroundColor: {
    type: String
  },
  lightIcon: {
    type: Boolean,
    default: false
  },
  currentTab: {
    type: String,
    default: 'Home'
  }
})
const { locale } = useI18n()

const router = useRouter()
const route = useRoute()

const isLogin = ref(localStorage.getItem('frogoooIsLogin'))

const getMoreIcon = () => {
  if (props.lightIcon) {
    return new URL(`../assets/icons/more.svg`, import.meta.url).href
  }
  return new URL(`../assets/icons/more_white.svg`, import.meta.url).href
}

const getArrowIcon = () => {
  if (props.lightIcon) {
    return new URL(`../assets/icons/arrow_down.svg`, import.meta.url).href
  }
  return new URL(`../assets/icons/2.0x/arrow.png`, import.meta.url).href
}

const languageArr = [
  { title: 'English', id: 'en-US', flag: 'language' },
  { title: 'Bahasa indonesia', id: 'id-ID', flag: 'language' }
]

const tabClicked = (item: any) => {
  if (item == 'Home') {
    onLogoClicked()
  } else if (item == 'Contact') {
    router.push({ path: '/contact' })
  } else if (item == 'Shipping Fee Calculation') {
    router.push({ path: '/freight' })
  } else if (item == 'Converter') {
    router.push({ path: '/converter' })
  }
}

const currentLanguageIcon = ref(new URL(`../assets/icons/english.png`, import.meta.url).href)

const currentLanguage = ref('')
const storageLanguage = window.localStorage.getItem('frgoooLanguage')
if (storageLanguage) {
  currentLanguage.value = storageLanguage.includes('id-ID') ? 'Bahasa indonesia' : 'English'
} else {
  currentLanguage.value = navigator.language.includes('id-ID') ? 'Bahasa indonesia' : 'English'
}

if (currentLanguage.value == 'English') {
  currentLanguageIcon.value = new URL(`../assets/icons/english.png`, import.meta.url).href
} else {
  currentLanguageIcon.value = new URL(`../assets/icons/indonesia.png`, import.meta.url).href
}

const isOpenLanguageSelectView = ref(false)

const languageSelected = (item: any) => {
  locale.value = item.id
  window.localStorage.setItem('frgoooLanguage', item.id)
  currentLanguage.value = item.title
  isOpenLanguageSelectView.value = false
  if (currentLanguage.value == 'English') {
    currentLanguageIcon.value = new URL(`../assets/icons/english.png`, import.meta.url).href
  } else {
    currentLanguageIcon.value = new URL(`../assets/icons/indonesia.png`, import.meta.url).href
  }
}

const emit = defineEmits(['more-button-clicked'])

const moreButtonClicked = () => emit('more-button-clicked')

const isMobile = useIsMobile()

const onLogoClicked = () => router.push({ path: '/' })

const onJoinNow = () => {
  router.push({ path: '/login' })
}

const onProfile = () => {
  router.push({ path: '/userCenter' })
}

const logOutClicked = () => {
  localStorage.removeItem('frogoooToken')
  window.localStorage.setItem('frogoooIsLogin', 'false')
  if (route.path == '/') {
    window.location.reload()
  } else {
    router.push({ path: '/' })
  }
}
</script>
<template>
  <div
    class="frogooo-header"
    :class="{
      'frogooo-heade-white-background': backgroundColor == 'white',
      'frogooo-heade-transparent-background': backgroundColor == 'transparent'
    }"
  >
    <section class="header-left">
      <img :src="getLogoImageUrl()" alt="" class="header-logo" @click="onLogoClicked" />
      <!-- <span
        v-if="!isMobile"
        @click="tabClicked('Home')"
        class="header-item"
        :class="{
          'header-item-black': backgroundColor == 'white',
          'current-header-item': props.currentTab == 'Home',
          'current-header-item-black': backgroundColor == 'white' && props.currentTab == 'Home'
        }"
        >{{ $t('Frogooo.Home') }}</span
      > -->
      <span
        v-if="!isMobile"
        @click="tabClicked('Shipping Fee Calculation')"
        class="header-item"
        :class="{
          'header-item-black': backgroundColor == 'white',
          'current-header-item': props.currentTab == 'Shipping Fee Calculation',
          'current-header-item-black':
            backgroundColor == 'white' && props.currentTab == 'Shipping Fee Calculation'
        }"
        >{{ $t('Frogooo.PerhitunganBiayaPengiriman') }}</span
      >
      <span
        v-if="!isMobile"
        @click="tabClicked('Converter')"
        class="header-item"
        :class="{
          'header-item-black': backgroundColor == 'white',
          'current-header-item': props.currentTab == 'Converter',
          'current-header-item-black': backgroundColor == 'white' && props.currentTab == 'Converter'
        }"
        >{{ $t('Frogooo.Converter') }}</span
      >
      <span
        v-if="!isMobile"
        @click="tabClicked('Contact')"
        class="header-item"
        :class="{
          'header-item-black': backgroundColor == 'white',
          'current-header-item': props.currentTab == 'Contact',
          'current-header-item-black': backgroundColor == 'white' && props.currentTab == 'Contact'
        }"
        >{{ $t('Frogooo.Contact') }}</span
      >
    </section>
    <section class="header-right">
      <div v-if="!isMobile" class="header-language">
        <section
          class="language-wrapper"
          @click="isOpenLanguageSelectView = !isOpenLanguageSelectView"
        >
          <img class="language-image" :src="currentLanguageIcon" alt="" />
          <span
            class="current-language"
            :class="{ 'current-language-black': backgroundColor == 'white' }"
            >{{ currentLanguage }}</span
          >
          <img class="language-arrow" :src="getArrowIcon()" alt="" />
        </section>
        <div
          class="select-language"
          :class="{ 'select-language-white': backgroundColor == 'white' }"
          v-if="isOpenLanguageSelectView"
        >
          <div
            v-for="(item, index) in languageArr"
            class="language-container"
            @click="languageSelected(item)"
          >
            <img src="../assets/icons/english.png" alt="" v-if="!index" />
            <img src="../assets/icons/indonesia.png" alt="" v-else />
            <span class="language" :class="{ 'language-black': backgroundColor == 'white' }">{{
              item.title
            }}</span>
          </div>
        </div>
      </div>
      <button
        class="header-join"
        :class="{ 'header-join-white': backgroundColor == 'white' }"
        @click="onJoinNow"
        v-if="!isLogin || isLogin == 'false'"
      >
        {{ $t('Frogooo.JoinNow') }}
      </button>
      <div @click="onProfile" v-else class="personal-wrapper">
        <img src="../assets/icons/personal.svg" alt="" v-if="backgroundColor == 'white'" />
        <img src="../assets/icons/personal_green.png" alt="" v-else />
      </div>
      <div
        class="log-out"
        :class="{ 'log-out-white': backgroundColor == 'white' }"
        @click="logOutClicked"
        v-if="!isMobile && isLogin == 'true'"
      >
        {{ $t('Frogooo.LogOut') }}
      </div>
      <img v-if="isMobile" :src="getMoreIcon()" alt="" @click="moreButtonClicked" />
    </section>
  </div>
</template>

<style lang="stylus" scoped>
.frogooo-header
    position: sticky
    top: 0
    display: flex
    justify-content: space-between
    padding: .14rem .2rem
    background: #030014
    z-index: 99
    .header-left
        display: flex
        justify-content: flex-start
        align-items: center
        .header-logo
          margin-right: .4rem
          height: .28rem
        .header-item
          font-size: .16rem
          line-height: .22rem
          color: rgba(255, 255, 255, 0.6)
          margin-right: .4rem
        .current-header-item
          color: #fff
          font-weight: 500
        .header-item:active
          color: #fff
        .header-item-black
          color: rgba(10, 27, 57, 0.6)
        .header-item-black:active
          color: #000
        .current-header-item-black
          color: #000
          font-weight: 500
    .header-right
        display: flex
        justify-content: end
        align-items: center
        .header-join
            height: .32rem
            font-size: .12rem
            font-weight: 500
            padding: .08rem .12rem
            color: #05FE9F
            background-color: rgba(255, 255, 255, 0.08)
            border-radius: .21rem
            border: 0.01rem solid #000
            margin-right: .12rem
        .header-join-white
          color: #fff
        .personal-wrapper
          margin-right: .12rem
          padding: 0 .16rem 0 .1rem
          img
            width: .24rem
            height: .24rem
        img
            width: .32rem
            height: .28rem
.frogooo-heade-white-background
    background: #fff
@media (min-width: 1024px)
  .frogooo-header
    padding: 18px 40px
    .header-left
        display: flex
        justify-content: flex-start
        align-items: center
        .header-logo
          margin-right: 40px
          height: 28px
        .header-item
          font-size: 16px
          line-height: 22px
          font-weight: 400
          color: rgba(255, 255, 255, 0.6)
          margin-right: 40px
        .current-header-item
          color: #fff
          font-weight: 500
        .header-item:active
          color: #fff
        .header-item-black
          color: rgba(10, 27, 57, 0.6)
        .header-item-black:active
          color: #000
        .current-header-item-black
          color: #000
          font-weight: 500
    .header-right
        display: flex
        justify-content: end
        align-items: center
        .header-language
          position: relative
          .language-wrapper
            display: flex
            justify-content: start
            align-items: center
            .language-image,.current-language
              margin-right: 12px
            .current-language
              font-size: 16px
              font-weight: 400
              line-height: 19px
              color: rgba(255, 255, 255, 0.8)
            .current-language-black
              color: rgba(10, 27, 57, 0.6)
            .language-arrow
              margin-right: 40px
          .select-language
            position:absolute
            top: 150%
            left: -32px
            border-radius: 8px
            background-color: #1e1f22
            display: flex
            flex-direction: column
            .language-container
              padding: 8px 12px
              display: flex
              align-items: center
              justify-content: start
              width: 190px
              img
                width: 24px
                height: 24px
                margin-right: 5px
              .language
                cursor: pointer
                text-align: center
                font-size: 14px
                color: #fff
              .language-black
                color: rgba(10, 27, 57, 0.6)
            .language-container:hover
              background: #05FE9F
              color: #0A1B39
          .select-language-white
            background: #fff
        .header-join
            height: 32px
            font-size: 12px
            font-weight: 500
            padding: 8px 12px
            color: #05FE9F
            background-color: rgba(255, 255, 255, 0.08)
            border-radius: 21px
            border: 1px solid #000
            margin-right: 12px
        .header-join-white
          color: #0A1B39
          border: 1px solid rgba(10, 27, 57, 0.1)
        .personal-wrapper
          display: flex
          align-items: center
          margin-right: 12px
          padding: 0 16px 0 10px
          img
            width: 24px
            height: 24px
        .log-out
          color: #fff
          font-weight: 500
          font-size: 16px
        .log-out-white
          color: #000
          font-size: 16px
        img
            width: 20px
            height: 20px
.frogooo-heade-white-background
  background: #fff
.frogooo-heade-transparent-background
  background: transparent
</style>
