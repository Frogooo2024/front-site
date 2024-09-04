<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const language = window.localStorage.getItem('frgoooLanguage')
if (language) {
  locale.value = language
}
</script>

<template>
  <RouterView />
</template>

<style lang="stylus">
#app
  height: 100vh
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  @media (min-width: 1024px)
    overflow-x: hidden
</style>
