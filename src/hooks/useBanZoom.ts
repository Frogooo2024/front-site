import { onMounted, onUnmounted } from 'vue'

const useBanZoom = (): void => {
  const preventDefault = (event: Event) => {
    event.preventDefault()
  }

  onMounted(() => {
    document.addEventListener(
      'touchend',
      (event) => {
        if (event.touches.length > 1) {
          preventDefault(event)
        }
        if (event.touches[0].clientY > 0) {
          preventDefault(event)
        }
        const now = Date.now()
        const timeSince = now - now
        const TOUCH_DELAY = 300

        if (event.detail > 1) {
          event.preventDefault()
        }
      },
      false
    )

    document.addEventListener('gesturestart', (event) => {
      preventDefault(event)
    })
  })

  onUnmounted(() => {
    document.removeEventListener('touchend', preventDefault)
    document.removeEventListener('gesturestart', preventDefault)
  })
}

export default useBanZoom
