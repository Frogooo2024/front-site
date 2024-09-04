import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useAddressStore = defineStore('address', () => {
  const initSelectedData = {
    provinceSelected: '',
    provinceCode: '',
    citySelected: '',
    cityCode: '',
    areaSelected: '',
    countyCode: '',
    name: '',
    phone: '',
    address: '',
    isDefault: false,
    id: ''
  }
  const selectedData = reactive({ ...initSelectedData })
  const resetSelectedData = () => Object.assign(selectedData, initSelectedData)

  return { selectedData, resetSelectedData }
})
