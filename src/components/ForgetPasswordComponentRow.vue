<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

import api from '../api/api'
import { useUserIdStore } from '../stores/userId'
import { showToast } from 'vant'

import 'vant/lib/index.css'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const eyeIcon = ref(new URL('../assets/icons/eye_close.png', import.meta.url).href)
const inputType = ref('password')

onMounted(async () => {
  if (email) {
    try {
      await api.sendEmail({ email: email })
    } catch (e: any) {
      showToast({
        message: t('Frogooo.NetworkError'),
        position: 'bottom'
      })
    }
  }
})

const email = route.params.email

const forgetPasswordDetail = reactive({
  title: email ? t('Frogooo.VerifyYourEmail') : t('Frogooo.ForgetPassword'),
  description: email ? `${t('Frogooo.VerificationCode')} ${email}` : t('Frogooo.EnterEmail'),
  email: email ? (email as string) : '',
  password: '',
  verificationCode: [],
  validatePasswordPass: true,
  validateEmailPass: true
})

const shouldShowWhichLabel = reactive({
  showInputText: email ? false : true,
  showPassWord: false,
  showCode: email ? true : false
})

const verificationCodeInputs = ref<HTMLInputElement[]>([])

const verificationCodeInput = (index: any) => {
  if (index < 5) {
    if (
      forgetPasswordDetail.verificationCode[index] ||
      forgetPasswordDetail.verificationCode[index] == 0
    ) {
      verificationCodeInputs.value[index + 1]?.focus()
    }
  }
}

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(forgetPasswordDetail.email)) {
    forgetPasswordDetail.validateEmailPass = false
  } else {
    forgetPasswordDetail.validateEmailPass = true
  }
}

const continueClicked = async () => {
  if (
    !email &&
    forgetPasswordDetail.email.length &&
    forgetPasswordDetail.validateEmailPass &&
    shouldShowWhichLabel.showInputText
  ) {
    try {
      await api.sendEmail({ email: forgetPasswordDetail.email })
      shouldShowWhichLabel.showCode = true
      shouldShowWhichLabel.showInputText = false
    } catch (e) {
      showToast({
        message: t('Frogooo.NetworkError'),
        position: 'bottom'
      })
    }
  } else if (forgetPasswordDetail.verificationCode.length == 6 && shouldShowWhichLabel.showCode) {
    shouldShowWhichLabel.showCode = false
    shouldShowWhichLabel.showInputText = false
    shouldShowWhichLabel.showPassWord = true
  } else if (
    forgetPasswordDetail.email.length &&
    forgetPasswordDetail.validateEmailPass &&
    forgetPasswordDetail.password.length &&
    forgetPasswordDetail.validatePasswordPass
  ) {
    try {
      const loginData: any = await api.logIn({
        username: forgetPasswordDetail.email,
        password: forgetPasswordDetail.password,
        type: '用户',
        logintype: 4
      })
      if (loginData.status) {
        const { setUserId } = useUserIdStore()
        localStorage.setItem('frogoooUserId', loginData.data.username.lastname)
        setUserId(loginData.data.username.lastname)
        localStorage.setItem('frogoooIsLogin', 'true')
        localStorage.setItem('frogoooToken', loginData.data.token)
        router.replace({ path: '/userCenter' })
      } else {
        showToast({
          message: loginData.msg,
          position: 'bottom'
        })
      }
    } catch (e: any) {
      showToast({
        message: e.msg,
        position: 'bottom'
      })
    }
  }
}

const resendClicked = async () => {
  try {
    await api.sendEmail({ email: forgetPasswordDetail.email })
  } catch (e) {}
}

const onLogin = () => {
  router.go(-1)
}

const eyeIconClicked = () => {
  if (inputType.value === 'password') {
    inputType.value = 'text'
    eyeIcon.value = new URL('../assets/icons/eye_open.png', import.meta.url).href
  } else {
    inputType.value = 'password'
    eyeIcon.value = new URL('../assets/icons/eye_close.png', import.meta.url).href
  }
}
</script>

<template>
  <div class="forget-password-container">
    <h2 class="forget-password-title">{{ forgetPasswordDetail.title }}</h2>
    <p class="forget-password-description">{{ forgetPasswordDetail.description }}</p>
    <section class="input-container" v-if="shouldShowWhichLabel.showInputText">
      <span class="input-title">{{ $t('Frogooo.Email') }}</span>
      <input
        class="input-text"
        type="email"
        :placeholder="$t('Frogooo.Email')"
        v-model="forgetPasswordDetail.email"
        @blur="validateEmail"
      />
      <p v-if="!forgetPasswordDetail.validateEmailPass" class="input-warning">
        {{ $t('Frogooo.EnterTheCorrectEmail') }}
      </p>
    </section>
    <section class="input-container" v-if="shouldShowWhichLabel.showPassWord">
      <span class="input-title">{{ $t('Frogooo.Password') }}</span>
      <div class="input-password-wrapper">
        <input
          class="input-text input-password"
          :type="inputType"
          :placeholder="$t('Frogooo.Password')"
          v-model="forgetPasswordDetail.password"
        />
        <div class="eye-icon-container" @click="eyeIconClicked">
          <img :src="eyeIcon" alt="" class="eye-icon" />
        </div>
      </div>
      <p v-if="!forgetPasswordDetail.validatePasswordPass" class="input-warning">
        {{ $t('Frogooo.EnterTheCorrectPassword') }}
      </p>
    </section>
    <section class="input-container" v-if="shouldShowWhichLabel.showCode">
      <span class="input-title">{{ $t('Frogooo.EnterCode') }}</span>
      <div class="input-code-wrapper">
        <input
          v-for="(item, index) of 6"
          :key="index"
          class="input-code-text"
          type="text"
          v-model="forgetPasswordDetail.verificationCode[index]"
          ref="verificationCodeInputs"
          @input="verificationCodeInput(index)"
        />
      </div>
      <p class="input-verification-code-warning">{{ $t('Frogooo.VerificationCodeIsValid') }}</p>
    </section>
    <section class="resend-container" v-if="shouldShowWhichLabel.showCode">
      <span class="resend-description">{{ $t('Frogooo.NotReceived') }}</span>
      <span class="resend" @click="resendClicked">{{ $t('Frogooo.Resend') }}</span>
    </section>
    <section class="forget-password" @click="continueClicked">
      <button class="forget-password-button">{{ $t('Frogooo.Continue') }}</button>
    </section>
    <section class="login-container">
      <span class="login-description">{{ $t('Frogooo.AlreadyHaveAnAccount') }}</span>
      <span class="login" @click="onLogin">{{ $t('Frogooo.LogIn') }}</span>
    </section>
  </div>
</template>

<style lang="stylus" scoped>
.forget-password-container
    display: flex
    flex-direction: column
    border-radius: 24px
    padding: 48px 72px
    background: rgba(19, 19, 22, 0.8)
    box-shadow: 20px 40px 60px 0 rgba(0, 0, 0, 0.5)
    width: 540px
    margin: 80px auto
    .forget-password-title
        font-size: 32px
        font-weight: 700
        line-height: 42px
        color: #fff
        text-align: center
    .forget-password-description
        font-size: 14px
        line-height: 20px
        margin-top: 12px
        text-align: center
    .input-container
        display: flex
        flex-direction: column
        margin-top: 32px
        .input-title
            font-size: 16px
            line-height: 26px
        .input-text
            padding: 14px 27px
            border: 1px solid rgba(255, 255, 255, 0.6)
            border-radius: 10px
            background: transparent
            color: #fff
            font-size: 16px
            line-height: 22px
            outline: none
        .input-password-wrapper
            position: relative
            .input-password
              width: 100%
            .eye-icon-container
              position: absolute
              right: 0
              top: 0
              width: 50px
              height: 100%
              display: flex
              justify-content: center
              align-items: center
            .eye-icon
              width: 16px
              height: 16px
        .input-warning
            font-size: 14px
            line-height: 20px
            color: #FF5C5C
        .input-verification-code-warning
            font-size: 14px
            line-height: 22px
            color: #fff
        .input-code-wrapper
            display: flex
            .input-code-text
                border: 1px solid rgba(255, 255, 255, 0.2)
                border-radius: 8px
                width: 46px
                height: 46px
                color: #fff
                font-size: 18px
                line-height: 22px
                outline: none
                margin-right: 5px
                background: transparent
                text-align: center
    .input-container:nth-of-type(2)
        margin-top: 16px
    .resend-container
        margin-top: 32px
        display: flex
        justify-content: start
        .resend-description
            font-size: 14px
            line-height: 20px
            margin-right: 5px
        .resend
            font-size: 14px
            line-height: 20px
            color: #05FE9F
    .forget-password
        margin-top: 16px
        .forget-password-button
            width: 100%
            border-radius: 10px
            background: #fff
            font-size: 18px
            font-weight: 500
            line-height: 25px
            padding: 10px
            color: #0A1019
        .forget-password-button:active
          background: #e9ecef
          transform: scale(0.99)
    .login-container
        margin-top: 16px
        display: flex
        justify-content: center
        .login-description
            font-size: 14px
            line-height: 20px
            margin-right: 5px
        .login
            font-size: 14px
            line-height: 20px
            color: #05FE9F
</style>
