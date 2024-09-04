<script setup lang="ts">
import { getIconImageUrl, getWhatsAppImageUrl } from '../hooks/useGetImageUrl'

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
  <div class="contact-us-container">
    <section class="contact-us-top">
      <section class="contact-us">
        <span>{{ $t('Frogooo.ContactUs') }}</span>
      </section>
      <div class="whats-app-image">
        <a href="https://wa.me/message/UGN2RVXLNV4LH1" target="_blank" rel="noopener">
          <img :src="getWhatsAppImageUrl()" alt="" />
        </a>
      </div>
    </section>
    <div class="contact-us-bottom-wrapper">
      <span class="media">{{ $t('Frogooo.Media') }}</span>
      <div class="contact-us-image">
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
.contact-us-container
    display: flex
    flex-direction: column
    margin: .2rem .2rem 0
    padding-bottom: .1rem
    .contact-us-top
        display: flex
        justify-content: space-between
        border-bottom: 1px solid rgba(255, 255, 255, 0.08)
        padding-bottom: .15rem
        .contact-us
            span
                font-size: .12rem
                line-height: .14rem
                color: rgba(255, 255, 255, 0.6)
        .whats-app-image
          img
            width: .2rem
            height: .2rem
    .contact-us-bottom-wrapper
      display: flex
      justify-content: space-between
      align-items: center
      .media
        font-size: .12rem
        line-height: .14rem
        color: rgba(255, 255, 255, 0.6)
      .contact-us-image
          display: flex
          justify-content: end
          align-items: center
          margin-top: .2rem
          padding-bottom: .15rem
          border-bottom: 1px solid rgba(255, 255, 255, 0.08)
          img
              margin-left: .2rem
              width: .2rem
              height: .2rem
</style>
