<script setup lang="ts">
import useIsMobile from '../hooks/useIsMobile'

const isMobile = useIsMobile()
</script>
<template>
  <div class="contact-us-list-item">
    <h2 class="our-address-title" v-if="!isMobile">{{ $t('Frogooo.ContactUs') }}</h2>
    <div v-else class="our-logo">
      <img src="/f.png" alt="" />
    </div>
    <section class="contact-us-list-item-container">
      <section class="item-container">
        <h2 class="our-address">{{ $t('Frogooo.OurAddress') }}</h2>
        <section class="item-wrapper">
          <h3 class="item-title">{{ $t('Frogooo.Singapore') }}</h3>
          <p class="item-description">{{ $t('Frogooo.OfficeAddress') }}</p>
        </section>
        <section class="item-wrapper">
          <h3 class="item-title">{{ $t('Frogooo.Warehouse') }}</h3>
          <p class="item-description">{{ $t('Frogooo.WarehouseDetail') }}</p>
        </section>
        <section class="item-wrapper">
          <h3 class="item-title">{{ $t('Frogooo.OfficeJakarta') }}</h3>
          <p class="item-description">{{ $t('Frogooo.OfficeJakartaDetail') }}</p>
        </section>
      </section>
      <section class="contact-us">
        <h2 class="contact-us-title">{{ $t('Frogooo.ContactUs') }}</h2>
        <div class="contact-us-container">
          <section class="contact-us-wrapper">
            <h3 class="contact-us-location">{{ $t('Frogooo.Singapore') }}</h3>
            <div class="contact-container">
              <img class="item-image" src="../assets/icons/whats.png" alt="" />
              <a
                class="item-a"
                href="https://wa.me/message/UGN2RVXLNV4LH1"
                target="_blank"
                rel="noopener"
                >+65 8385 0022</a
              >
            </div>
            <div class="contact-container">
              <img class="item-image" src="../assets/icons/phone.png" alt="" />
              <a class="item-a" href="tel:+65 6977 7928">+65 6977 7928</a>
            </div>
            <div class="contact-container">
              <img class="item-image" src="../assets/icons/email.png" alt="" />
              <a class="item-a" href="mailto:F@frogooo.com">F@frogooo.com</a>
            </div>
          </section>
          <section class="contact-us-wrapper">
            <h3 class="contact-us-location">{{ $t('Frogooo.OfficeJakarta') }}</h3>
            <div class="contact-container">
              <img class="item-image" src="../assets/icons/whats.png" alt="" />
              <a
                class="item-a"
                href="https://wa.me/message/UGN2RVXLNV4LH1"
                target="_blank"
                rel="noopener"
                >+62 8953 2752 4802</a
              >
            </div>
            <div class="contact-container">
              <img class="item-image" src="../assets/icons/phone.png" alt="" />
              <a class="item-a" href="tel:021-22364788">021-22364788</a>
            </div>
            <div class="contact-container">
              <img class="item-image" src="../assets/icons/email.png" alt="" />
              <a class="item-a" href="mailto:F@frogooo.com">F@frogooo.com</a>
            </div>
          </section>
        </div>
      </section>
      <section class="item-container item-container-margin">
        <h2 class="our-address">{{ $t('Frogooo.WorkingHours') }}</h2>
        <section class="item-wrapper">
          <p class="item-description">{{ $t('Frogooo.MondayToFriday') }}</p>
        </section>
      </section>
    </section>
    <section class="our-address-bottom" v-if="isMobile">
      <img src="../assets/icons/contact_bg.png" alt="" />
      <p>Copyright © 2024 All Rights Reserved. SINGAPORE FROGOOO TECH PTE. LTD.</p>
    </section>
  </div>
</template>

<style lang="stylus" scoped>
@media (max-width: 750px)
  .contact-us-list-item
      display: flex
      flex-direction: column
      height: 100%
      .our-logo
        margin-left: .1rem
        img
          width: .48rem
          height: .48rem
      .contact-us-list-item-container
        margin: 0 .2rem .2rem
        .item-container
          margin-top: .1rem
          .our-address
            font-size: .24rem
            line-height: .29rem
            font-weight: 700
            color: #fff
            position: relative
            width: fit-content
            padding-bottom: .2rem
          .our-address::after
            content: ""
            position: absolute
            left: 0
            bottom: 0
            width: 100%
            height: .02rem
            border-top-left-radius: .1rem
            border-bottom-left-radius: .1rem
            background: linear-gradient(to right, rgba(5, 254, 159, 1), rgba(5, 254, 159, 0))
          .item-wrapper
              margin-top: .2rem
              .item-title
                  font-size: .16rem
                  line-height: .22rem
                  color: #00F99A
              .item-description
                  font-size: .14rem
                  line-height: .20rem
                  color: #fff
        .item-container-margin
          margin-top: .25rem
        .contact-us
            display: flex
            flex-direction: column
            margin-top: .25rem
            .contact-us-title
                font-size: .24rem
                line-height: .29rem
                font-weight: 700
                color: #fff
                position: relative
                width: fit-content
                padding-bottom: .2rem
            .contact-us-title::after
                content: ""
                position: absolute
                left: 0
                bottom: 0
                width: 100%
                height: .02rem
                border-top-left-radius: .1rem
                border-bottom-left-radius: .1rem
                background: linear-gradient(to right, rgba(5, 254, 159, 1), rgba(5, 254, 159, 0))
            .contact-us-wrapper
                display: flex
                flex-direction: column
                margin-top: .2rem
                .contact-us-location
                  font-size: .16rem
                  line-height: .22rem
                  color: #00F99A
                .contact-container
                    display: flex
                    justify-content: start
                    align-items: center
                    margin-top: .08rem
                    .item-image
                        margin-right: .08rem
                        width: .2rem
                        height: .2rem
                    .item-a
                      font-size: .14rem
                      line-height: .20rem
                      color: #fff
                      -webkit-tap-highlight-color: #05fe9f
                      touch-action: manipulation
                    .item-a:active
                        color: #05fe9f
      .our-address-bottom
        position: relative
        img
          width: 100%
          height: 2rem
        p
          position:absolute
          left: 0
          top: 70%
          font-size: .12rem
          line-height: .14rem
          padding: 0 .2rem
@media (min-width: 1024px)
  .contact-us-list-item
    width: 1100px
    padding: 32px 32px 10px
    margin: 50px auto
    .our-address-title
      font-size: 64px
      line-height: 83px
      text-align: center
      font-weight: 700
    .contact-us-list-item-container
      margin: 40px 20px 20px
      display: flex
      justify-content: space-around
      .item-container
        margin-top: 60px
        max-width: 505px
        .our-address
          font-size: 24px
          line-height: 29px
          font-weight: 700
          color: #fff
          position: relative
          width: fit-content
          padding-bottom: 20px
        .our-address::after
          content: ""
          position: absolute
          left: 0
          bottom: 0
          width: 100%
          height: 2px
          border-top-left-radius: 10px
          border-bottom-left-radius: 10px
          background: linear-gradient(to right, rgba(5, 254, 159, 1), rgba(5, 254, 159, 0))
        .item-wrapper
            margin-top: 20px
            .item-title
                font-size: 16px
                line-height: 22px
                color: #00F99A
            .item-description
                font-size: 14px
                line-height: 20px
                color: #fff
      .contact-us
          margin-top: 60px
          display: flex
          flex-direction: column
          .contact-us-title
              font-size: 24px
              line-height: 29px
              font-weight: 700
              color: #fff
              position: relative
              width: fit-content
              padding-bottom: 20px
          .contact-us-title::after
              content: ""
              position: absolute
              left: 0
              bottom: 0
              width: 100%
              height: 2px
              border-top-left-radius: 10px
              border-bottom-left-radius: 10px
              background: linear-gradient(to right, rgba(5, 254, 159, 1), rgba(5, 254, 159, 0))
          .contact-us-wrapper
              margin-top: 20px
              display: flex
              flex-direction: column
              margin-top: 20px
              .contact-us-location
                font-size: 16px
                line-height: 22px
                color: #00F99A
              .contact-container
                  display: flex
                  justify-content: start
                  align-items: center
                  margin-top: 8px
                  .item-image
                      margin-right: 8px
                      width: 20px
                      height: 20px
                  .item-a
                    font-size: 14px
                    line-height: 20px
                    color: #fff
                  .item-a:active
                      color: #05fe9f
</style>
