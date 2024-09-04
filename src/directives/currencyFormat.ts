export default {
  mounted(el: any, binding: any) {
    el.textContent = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(binding.value)
  },
  updated(el: any, binding: any) {
    el.textContent = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(binding.value)
  }
}
