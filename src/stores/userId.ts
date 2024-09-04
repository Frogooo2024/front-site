import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserIdStore = defineStore('userId', () => {
  const userId = ref(localStorage.getItem('frogoooUserId'))

  function setUserId(id: string) {
    userId.value = id
  }

  return { userId, setUserId }
})
