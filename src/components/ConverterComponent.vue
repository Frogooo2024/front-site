<script setup lang="ts">
import { ref, watchEffect, computed } from 'vue'

interface CurrencyOption {
  code: string
  name: string
  imgUrl: string
}

const currencyOptions: CurrencyOption[] = [
  {
    code: 'SGD',
    name: 'Singapore Dollar',
    imgUrl: new URL('../assets/icons/singapore_flag.png', import.meta.url).href
  },
  {
    code: 'USD',
    name: 'US Dollar',
    imgUrl: new URL('../assets/icons/united_states.png', import.meta.url).href
  }
]

const amount = ref<number>(1)

const selectedOption = ref(currencyOptions[0])
const isOpen = ref(false)
const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}
const selectOption = (option: CurrencyOption) => {
  selectedOption.value = option
  isOpen.value = false
}
const rate = ref<number>(0)
const rateText = ref<string>('')
watchEffect(() => {
  amount.value = 1
  if (selectedOption.value.code == 'SGD') {
    rate.value = 12059.45
    rateText.value = `1 SGD=${rate.value},IDR`
  } else {
    rate.value = 16270
    rateText.value = `1 USD=${rate.value},IDR`
  }
})

const convertedAmount = computed(() => {
  return (amount.value * rate.value).toFixed(2)
})
</script>
<template>
  <div>
    <div class="converter-container">
      <h1 class="converter-title">{{ $t('Frogooo.Converter') }}</h1>
      <div class="currency-select">
        <div class="selected">
          <section @click="toggleDropdown" class="selected-section">
            <div
              class="country-image"
              :class="{
                'sgd-image': selectedOption.code == 'SGD',
                'usd-image': selectedOption.code == 'USD'
              }"
            ></div>
            <span class="country-code">{{ selectedOption.code }}</span>
            <img class="select-arrow" src="../assets/icons/down-arrow.png" alt="" />
            <span class="decollator">|</span>
          </section>
          <input type="number" class="currency-input" v-model="amount" />
        </div>
        <div v-if="isOpen" class="dropdown">
          <div
            v-for="option in currencyOptions"
            :key="option.code"
            class="option"
            @click="selectOption(option)"
          >
            <div
              :class="{
                'option-sgd-image': option.code == 'SGD',
                'option-usd-image': option.code == 'USD'
              }"
            ></div>
            <span>{{ option.code }}</span>
          </div>
        </div>
      </div>
      <div class="currency-display">
        <section class="currency-wrapper">
          <div class="country-image"></div>
          <span class="country-code">IDR</span>
          <span class="decollator">|</span>
        </section>
        <div class="result">{{ convertedAmount }}</div>
      </div>
      <div class="rate-container">
        <span class="rate-text">{{ rateText }}</span>
        <span class="rate-description">{{ $t('Frogooo.AtRate') }}</span>
      </div>
    </div>
    <div class="converter-conditions-wrapper">
      <img src="../assets/icons/warning_light.svg" alt="" />
      <p class="converter-conditions">{{ $t('Frogooo.ConverterConditions') }}</p>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.converter-container
    background: #fff
    margin: 0 .2rem .2rem
    padding: .24rem .2rem
    border-radius: .24rem
    .converter-title
        font-size: .2rem
        line-height: .22rem
        font-weight: 500
        color: #0A1B39
    .currency-select
        position: relative
        padding: .1rem
        margin-top: .24rem
        border-bottom: 1px solid rgba(10, 27, 57, 0.08)
        .selected
            display: flex
            align-items: center
            cursor: pointer
            justify-content: space-between
            .selected-section
                display: flex
                align-items: center
                .country-image
                    width: .24rem
                    height: .24rem
                    margin-right: .1rem
                    border-radius: 50%
                    background-size: cover
                .sgd-image
                  background-image: url('../assets/icons/singapore_flag.png')
                .usd-image
                  background-image: url('../assets/icons/united_states.png')
                .country-code
                    font-size: .14rem
                    line-height: .22rem
                    font-weight: 500
                    color: #0A1B39
                    margin-right: .1rem
                .select-arrow
                    margin-right: .1rem
                    width: .12rem
                    height: .12rem
                .decollator
                    color: rgba(10, 27, 57, 0.08)
                    margin-right: .1rem
            .currency-input
                background: transparent
                outline: none
                text-align: end
                width: 100%
                color: #0A1B39
                font-size: .24rem
        .dropdown
            position: absolute
            top: 90%
            left: .44rem
            background-color: #fff
            box-shadow: 0 2px 6px 0 rgba(10, 27, 57, 0.2)
            z-index: 10
            border-radius: .1rem
            .option
                display: flex
                align-items: center
                padding: .1rem .16rem
                cursor: pointer
                .option-sgd-image,.option-usd-image
                  width: .18rem
                  height: .18rem
                  margin-right: .05rem
                  border-radius: 50%
                  background-size: cover
                .option-sgd-image
                  background-image: url('../assets/icons/singapore_flag.png')
                .option-usd-image
                  background-image: url('../assets/icons/united_states.png')
                span
                    font-size: .16rem
                    line-height: .22rem
                    color: #0A1B39
    .currency-display
        padding: .1rem
        margin-top: .1rem
        display: flex
        justify-content: space-between
        align-items:center
        border-bottom: 1px solid rgba(10, 27, 57, 0.08)
        .currency-wrapper
            display: flex
            .country-image
                width: .24rem
                height: .24rem
                margin-right: .1rem
                background-image: url('../assets/icons/indonesia.png')
                border-radius: 50%
                background-size: cover
            .country-code
                font-size: .14rem
                line-height: .22rem
                font-weight: 500
                color: #0A1B39
                margin-right: .38rem
            .decollator
                color: rgba(10, 27, 57, 0.08)
                margin-right: .1rem
        .result
            font-size: .24rem
            line-height: .24rem
            font-weight: 500
            color: #0A1B39
    .rate-container
        padding: .15rem
        margin-top: .2rem
        display: flex
        flex-direction: column
        .rate-text
            font-size: .14rem
            font-weight: 500
            color: #0A1B39
        .rate-description
            font-size: .12rem
            color: rgba(10, 27, 57, 0.6)
.converter-conditions-wrapper
  display: flex
  padding: 0 .4rem
  align-items: start
  .converter-conditions
      font-size: .14rem
      line-height: .18rem
      color: rgba(10, 27, 57, 0.6)
      margin-left: .05rem
</style>
