<script setup lang="ts">
import {
  getHighlySecureImageUrl,
  getFullRefundGuaranteeImageUrl,
  getComprehensiveServiceImageUrl,
  getTrustworthyAndReliableImageUrl
} from '../hooks/useGetImageUrl'
import vIntersection from '../directives/intersectionDirective'

const data = [
  {
    imageUrl: getHighlySecureImageUrl(),
    title: 'Frogooo.HighlySecure',
    description: 'Frogooo.HighlySecureDescription',
    descriptionImportant: 'Frogooo.HighlySecureDescriptionImportant',
    descriptionOther: 'Frogooo.HighlySecureDescriptionOther'
  },
  {
    imageUrl: getFullRefundGuaranteeImageUrl(),
    title: 'Frogooo.FullRefundGuarantee',
    description: 'Frogooo.FullRefundGuaranteeDescription',
    descriptionImportant: 'Frogooo.FullRefundGuaranteeDescriptionImportant',
    descriptionOther: 'Frogooo.FullRefundGuaranteeDescriptionOther'
  },
  {
    imageUrl: getComprehensiveServiceImageUrl(),
    title: 'Frogooo.ComprehensiveService',
    description: 'Frogooo.ComprehensiveServiceDescription',
    descriptionImportant: 'Frogooo.ComprehensiveServiceDescriptionImportant',
    descriptionOther: 'Frogooo.ComprehensiveServiceDescriptionOther'
  },
  {
    imageUrl: getTrustworthyAndReliableImageUrl(),
    title: 'Frogooo.TrustworthyAndReliable',
    description: 'Frogooo.TrustworthyAndReliableDescription',
    descriptionImportant: 'Frogooo.TrustworthyAndReliableDescriptionImportant',
    descriptionOther: 'Frogooo.TrustworthyAndReliableDescriptionOther'
  }
]
</script>
<template>
  <div
    class="advantage-container"
    v-for="(item, index) in data"
    :key="index"
    :class="{ 'advantage-container-position': index == 1 }"
  >
    <section class="advantage-title-container" v-intersection:fromName="`advantage_title_${index}`">
      <h2 class="advantage-title">{{ $t(item.title) }}</h2>
      <div class="advantage-description">
        <span>{{ $t(item.description) }}</span>
        <span class="advantage-description-important">{{ $t(item.descriptionImportant) }}</span>
        <span>{{ $t(item.descriptionOther) }}</span>
      </div>
    </section>
    <section
      class="advantage-image"
      :class="{ 'advantage-image-position': index == 1 }"
      v-intersection:fromName="`advantage_image_${index}`"
    >
      <img :src="item.imageUrl" alt="" :class="{ bounce: index == 0 }" />
    </section>
  </div>
</template>

<style lang="stylus" scoped>
.advantage-container
    margin: .4rem 0
    .advantage-title-container
      padding: 0 .4rem
      .advantage-title
          font-size: .24rem
          font-weight: 700
          color: #fff
          line-height: .3rem
      .advantage-description
          margin-top: .2rem
          span
            font-size: .14rem
            line-height: .22rem
            color: rgba(255, 255, 255, 0.8)
          .advantage-description-important
            color: #fff
            font-weight: 700
            height: .22rem
            background: linear-gradient(to right, #6E2BC1, #A636D9, #DCA3F0)
            transform-origin: bottom right
            transform: scale(0)
            opacity: 0
            transition: transform 0.6s ease-out, opacity 0.6s ease-out
    .advantage-image
        margin: .2rem .2rem 0
        img
            width: 100%
        .bounce
          animation: moveUpDown 1.5s 3 ease-in-out 5s
        @keyframes moveUpDown {
          0% {
            transform: translateY(0)
          }
          50% {
            transform: translateY(-30px)
          }
          100% {
            transform: translateY(0)
          }
        }
    .advantage-image-position
        position: absolute
        right: .2rem
        top: 30%
        img
          width: 1.4rem
          height: 1.8rem
.advantage-container-position
  position: relative
  margin-bottom: .9rem
</style>
