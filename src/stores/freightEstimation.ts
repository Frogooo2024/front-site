import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useFreightEstimationStore = defineStore('freightEstimation', () => {
  const initSelectedData = {
    provinceSelected: '',
    provinceCode: '',
    citySelected: '',
    cityCode: '',
    areaSelected: '',
    countyCode: '',
    cost: 0,
    warehouseSelected: ''
  }
  const selectedData = reactive({ ...initSelectedData })
  const resetSelectedData = () => Object.assign(selectedData, initSelectedData)

  const unitData = reactive({
    length: 0,
    width: 0,
    height: 0,
    inputWeight: 0
  })

  return { selectedData, resetSelectedData, unitData }
})
