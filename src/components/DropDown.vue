<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  options: {
    type: Array<any>,
    default: () => []
  },
  id: {
    type: String,
    default: ''
  },
  defaultText: {
    type: String,
    default: ''
  }
})

const selectedItem = defineModel<any>('selectedItem')

const emit = defineEmits(['select-item-clicked'])

const isOpen = ref(false)
const selectedOption = ref(props.defaultText)

const toggleDropdown = () => {
  emit('select-item-clicked', props.id)
  isOpen.value = !isOpen.value
}

const selectOption = (option: any) => {
  selectedOption.value = option.title
  isOpen.value = false
  selectedItem.value = option
}
</script>
<template>
  <div class="dropdown">
    <div class="dropdown-header" @click="toggleDropdown">
      <span class="default-text">{{ defaultText }}</span>
      <img src="../assets/icons/arrow_down.svg" alt="" v-if="!isOpen" />
      <img src="../assets/icons/arrow_up.svg" alt="" v-if="isOpen" />
    </div>
    <ul v-if="isOpen" class="dropdown-list">
      <li
        v-for="(option, index) in options"
        :key="index"
        @click="selectOption(option)"
        :class="{ selected: option === selectedOption }"
      >
        {{ option.title }}
      </li>
    </ul>
  </div>
</template>

<style lang="stylus" scoped>
.dropdown
    width: 100%
    position: relative
    .dropdown-header
      background: #fff
      border: 1px solid rgba(10, 27, 57, 0.1)
      border-radius: 8px
      padding: 15px 16px
      cursor: pointer
      display: flex
      justify-content: space-between
      align-items: center
      .default-text
        color: #0A1B39
        font-size: 16px
        line-height: 16px
    .dropdown-header:hover
      border: 1px solid rgba(0, 229, 142, 0.5)
      background: rgba(10, 27, 57, 0.04)
    .dropdown-list
      list-style: none
      padding: 0
      margin: 0
      border: 1px solid rgba(10, 27, 57, 0.1)
      border-radius: 8px
      border-top: none
      background: #fff
      max-height: 300px
      overflow-y: auto
      position: absolute
      width: 100%
      z-index: 1000
      li
          padding: 10px
          cursor: pointer
          font-size: 16px
          line-height: 22px
          color: #0A1B39
      li:hover
          background: rgba(10, 27, 57, 0.04)
      .selected
        background: rgba(10, 27, 57, 0.1)
</style>
