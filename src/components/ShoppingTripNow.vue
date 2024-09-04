<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const onShoppingTripClicked = () => {
  setTimeout(() => {
    router.push({ path: '/userCenter' })
  }, 60);
}
</script>
<template>
  <div class="shopping-trip-container">
    <button class="shopping-trip-button" @click="onShoppingTripClicked">
      {{ $t('Frogooo.ShoppingTrip') }}
    </button>
  </div>
</template>

<style lang="stylus" scoped>
.shopping-trip-container
    display: flex
    flex-direction: column
    .shopping-trip-button
        margin: 0 .2rem 0
        padding: .12rem .1rem
        background: #05FE9F
        border-radius: .24rem
        font-size: .16rem
        line-height: .2rem
        font-weight: 500
        color: #0A1B39
        text-shadow: 0 4px 4px #00AE6C
    .shopping-trip-button:active
      background: #e9ecef
</style>
