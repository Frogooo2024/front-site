export default {
  mounted: (el: any, binding: any) => {
    const observer0 = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (binding.value == 'shipping-fee') {
              el.style.transform = 'scale(1) translate(0, 0)'
              el.style.opacity = 1
            }
            observer0.unobserve(el)
          }
        })
      },
      { rootMargin: '100px' }
    )
    observer0.observe(el)
  }
}
