<script setup lang="ts">
import { getIconImageUrl, getWhatsAppImageUrl } from '../hooks/useGetImageUrl'

defineProps({
  backgroundColor: {
    type: String
  },
  lightIcon: {
    type: Boolean,
    default: false
  }
})

const getData = () => {
  let data = []
  const imageUrlArr = getIconImageUrl()
  const hrefArr = [
    'https://www.instagram.com/frogooo.express?igsh=Z2Rvbzk5cmx0N3Uw&utm_source=qr',
    'https://www.tiktok.com/@frogooo.express',
    'https://www.facebook.com/profile.php?id=61564205999856&mibextid=LQQJ4d'
  ]
  for (let i = 0; i < imageUrlArr.length; i++) {
    data.push({
      imageUrl: imageUrlArr[i],
      href: hrefArr[i]
    })
  }
  return data
}
</script>
<template>
  <div
    class="frogooo-footer"
    :class="{ 'frogooo-heade-white-background': backgroundColor == 'white' }"
  >
    <section class="footer-top">
      <img src="../assets/icons/2.0x/logo.png" alt="" class="footer-logo" />
      <a href="https://wa.me/message/UGN2RVXLNV4LH1">
        <img :src="getWhatsAppImageUrl()" alt="" />
      </a>
    </section>
    <div class="footer-bottom">
      <p class="footer-bottom-text">
        Copyright © 2024 All Rights Reserved. SINGAPORE FROGOOO TECH PTE. LTD.
      </p>
      <div class="footer-bottom-image">
        <a
          :href="item.href"
          v-for="(item, index) in getData()"
          :key="index"
          target="_blank"
          rel="noopener"
        >
          <img :src="item.imageUrl" alt="" />
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.frogooo-footer
  display: flex
  flex-direction: column
  width: 100%
  margin: 120px auto 0
  padding: 40px 170px
  .footer-top
    display: flex
    justify-content: space-between
    align-items: center
    padding-bottom: 15px
    border-bottom: 1px solid rgba(255, 255, 255, 0.15)
  .footer-bottom
    margin-top: 20px
    display: flex
    justify-content: space-between
    align-items: center
    .footer-bottom-text
      font-size: 14px
      line-height: 16px
      color: rgba(255, 255, 255, 0.6)
    .footer-bottom-image
      display: flex
      justify-content: end
      align-items: center
      img
          margin-left: 20px
.frogooo-heade-white-background
  background: #030014
</style>
