<script setup lang="ts">
import vIntersection from '../directives/intersectionDirective'
</script>

<template>
  <div class="most-advance-container">
    <section class="most-advance-image">
      <section class="most-advance-wrapper" v-intersection:fromName="'advanceIntersection'">
        <section>
          <span class="most-advance-description">{{ $t('Frogooo.MostAdvanced') }}</span>
        </section>
        <div class="most-advance-border"></div>
        <section class="most-advance-title">
          <span>{{ $t('Frogooo.Faster') }}</span>
          <span>{{ $t('Frogooo.Simpler') }}</span>
          <span>{{ $t('Frogooo.Freer') }}</span>
        </section>
      </section>
    </section>
  </div>
</template>

<style lang="stylus" scoped>
@media (max-width: 750px)
  .most-advance-container
      margin-top: .4rem
      width: 100%
      display: flex
      flex-direction: column
      background: url('../assets/icons/advance.png') no-repeat
      background-size: 100% 100%
      background-position: bottom
      .most-advance-image
          .most-advance-wrapper
              padding-left: .2rem
              .most-advance-title
                  display: flex
                  flex-direction: column
                  padding-bottom: .6rem
                  span
                      font-weight: 700
                      font-size: .24rem
                      line-height: .26rem
              .most-advance-border
                  margin: .2rem 0
                  height: .02rem
                  width: 1.48rem
                  background: linear-gradient(to right, rgba(5, 254, 159, 0.6), rgba(5, 254, 159, 0))
              .most-advance-description
                  display: block
                  margin-top: .2rem
                  font-size: .14rem
                  line-height: .2rem
                  color: #00F99A
@media (min-width: 1024px)
  .most-advance-container
    margin-top: 60px
    width: 100%
    display: flex
    flex-direction: column
    background: url('../assets/icons/2.0x/advance.png') no-repeat
    background-size: 100% 100%
    background-position: bottom
    .most-advance-image
      .most-advance-wrapper
        width: 1200px
        margin: 0 auto
        .most-advance-title
            padding-bottom: 100px
            span
                font-weight: 700
                font-size: 50px
        .most-advance-border
            margin: 40px 0 40px
            height: 4px
            width: 453px
            background: linear-gradient(to right, rgba(5, 254, 159, 0.6), rgba(5, 254, 159, 0))
        .most-advance-description
            display: block
            margin-top: 20px
            font-size: 24px
            line-height: 33px
            color: #05FE9F
</style>
