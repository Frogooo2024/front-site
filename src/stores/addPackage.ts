import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useAddPackageStore = defineStore('addPackage', () => {
  const packageDetail = reactive({
    transportNumber: '',
    goodsTypeId: '',
    goodsTypeName: '',
    currency: 'SGD',
    goodsList: [
      {
        pric: ''
      }
    ]
  })

  return { packageDetail }
})
