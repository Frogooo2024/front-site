<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import api from '../api/api'
import { useUserIdStore } from '@/stores/userId'
import { showToast } from 'vant'

import 'vant/lib/index.css'

const { t } = useI18n()
const router = useRouter()

const agree = ref(true)
const eyeIcon = ref(new URL('../assets/icons/eye_close.png', import.meta.url).href)
const inputType = ref('password')

const signUpStrDetail = reactive({
  title: t('Frogooo.SignUp'),
  description: t('Frogooo.CreateAnAccount'),
  email: '',
  password: '',
  verificationCode: [],
  validatePasswordPass: true,
  validateEmailPass: true
})

const shouldShowWhichLabel = reactive({
  showInputText: true,
  showPassWord: false,
  showCode: false
})

const verificationCodeInputs = ref<HTMLInputElement[]>([])

const verificationCodeInput = (index: any) => {
  if (index < 5) {
    if (signUpStrDetail.verificationCode[index] || signUpStrDetail.verificationCode[index] == 0) {
      verificationCodeInputs.value[index + 1]?.focus()
    }
  }
}

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(signUpStrDetail.email)) {
    signUpStrDetail.validateEmailPass = false
  } else {
    signUpStrDetail.validateEmailPass = true
  }
}

const continueClicked = async () => {
  if (!agree.value) {
    showToast({
      message: t('Frogooo.Read'),
      position: 'bottom'
    })
    return
  }
  if (
    signUpStrDetail.email.length &&
    signUpStrDetail.validateEmailPass &&
    shouldShowWhichLabel.showInputText
  ) {
    shouldShowWhichLabel.showCode = true
    shouldShowWhichLabel.showInputText = false
    shouldShowWhichLabel.showPassWord = false
    try {
      await api.sendEmail({ email: signUpStrDetail.email })
    } catch (e) {
      showToast({
        message: t('Frogooo.NetworkError'),
        position: 'bottom'
      })
    }
  } else if (signUpStrDetail.verificationCode.length == 6 && shouldShowWhichLabel.showCode) {
    shouldShowWhichLabel.showCode = false
    shouldShowWhichLabel.showInputText = false
    shouldShowWhichLabel.showPassWord = true
  } else if (
    signUpStrDetail.email.length &&
    signUpStrDetail.validateEmailPass &&
    signUpStrDetail.password.length &&
    signUpStrDetail.validatePasswordPass
  ) {
    try {
      const register: any = await api.signUp({
        userName: signUpStrDetail.email,
        password: signUpStrDetail.password,
        email: signUpStrDetail.email,
        validCode: signUpStrDetail.verificationCode.join('')
      })
      if (register.code == 200) {
        const loginData: any = await api.logIn({
          username: signUpStrDetail.email,
          password: signUpStrDetail.password,
          type: '用户',
          logintype: 4
        })
        const { setUserId } = useUserIdStore()
        localStorage.setItem('frogoooUserId', loginData.data.username.lastname)
        setUserId(loginData.data.username.lastname)
        localStorage.setItem('frogoooIsLogin', 'true')
        localStorage.setItem('frogoooToken', loginData.data.token)
        router.push({ path: '/signUpExplanationFirst' })
      } else {
        showToast({
          message: register?.msg,
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
  await api.sendEmail({ email: signUpStrDetail.email })
}

const onLogin = () => {
  router.go(-1)
}

const agreeClicked = () => {
  agree.value = !agree.value
}

const agreementClicked = () => {
  router.push({ path: '/privacy' })
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

const scrollFn = () => {
  window.scrollTo({ left: 0, top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('focusout', scrollFn)
})

onUnmounted(() => {
  window.removeEventListener('focusout', scrollFn)
})
</script>

<template>
  <div class="sign-up-container">
    <h2 class="sign-up-title">{{ signUpStrDetail.title }}</h2>
    <p class="sign-up-description">{{ signUpStrDetail.description }}</p>
    <section class="input-container" v-if="shouldShowWhichLabel.showInputText">
      <span class="input-title">{{ $t('Frogooo.Email') }}</span>
      <input
        class="input-text"
        :class="{ 'input-text-warning': !signUpStrDetail.validateEmailPass }"
        type="email"
        :placeholder="$t('Frogooo.Email')"
        v-model="signUpStrDetail.email"
        @blur="validateEmail"
      />
      <p v-if="!signUpStrDetail.validateEmailPass" class="input-warning">
        {{ $t('Frogooo.EnterTheCorrectEmail') }}
      </p>
    </section>
    <section class="input-container" v-if="shouldShowWhichLabel.showPassWord">
      <span class="input-title">{{ $t('Frogooo.Password') }}</span>
      <div class="input-password-wrapper">
        <input
          class="input-text input-password"
          :class="{ 'input-text-warning': !signUpStrDetail.validatePasswordPass }"
          :type="inputType"
          :placeholder="$t('Frogooo.Password')"
          v-model="signUpStrDetail.password"
        />
        <div class="eye-icon-container" @click="eyeIconClicked">
          <img :src="eyeIcon" alt="" class="eye-icon" />
        </div>
      </div>
      <p class="input-warning" v-if="!signUpStrDetail.validatePasswordPass">
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
          type="number"
          v-model="signUpStrDetail.verificationCode[index]"
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
    <section class="sign-up">
      <button class="sign-up-button" @touchstart="continueClicked">
        {{ $t('Frogooo.Continue') }}
      </button>
    </section>
    <section class="agree-container">
      <img src="../assets/icons/gouxuan.svg" alt="" v-if="agree" @click="agreeClicked" />
      <div class="unselected" @click="agreeClicked" v-else></div>
      <div class="agree-wrapper">
        <span class="agree-text">{{ $t('Frogooo.AgreeText') }}</span>
        <span class="user-agreement" @click="agreementClicked">{{
          $t('Frogooo.UserAgreement')
        }}</span>
        <span class="agree-text">{{ $t('Frogooo.AgreeTextTwo') }}</span>
      </div>
    </section>
    <section class="login-container" v-if="shouldShowWhichLabel.showInputText">
      <span class="login-description">{{ $t('Frogooo.AlreadyHaveAnAccount') }}</span>
      <span class="login" @click="onLogin">{{ $t('Frogooo.LogIn') }}</span>
    </section>
  </div>
</template>

<style lang="stylus" scoped>
.sign-up-container
    display: flex
    flex-direction: column
    .sign-up-title
        font-size: .32rem
        font-weight: 700
        line-height: .42rem
        margin-top: .32rem
    .sign-up-description
        font-size: .12rem
        line-height: .17rem
        margin-top: .12rem
    .input-container
        display: flex
        flex-direction: column
        margin-top: .32rem
        .input-title
            font-size: .12rem
            line-height: .2rem
        .input-text
            padding: .1rem
            border: 1px solid rgba(255, 255, 255, 0.6)
            border-radius: .1rem
            background: transparent
            color: #fff
            outline: none
        .input-password-wrapper
          position: relative
          .input-password
            width: 100%
          .eye-icon-container
            position: absolute
            right: 0
            top: 0
            width: .5rem
            height: 100%
            display: flex
            justify-content: center
            align-items: center
            .eye-icon
              width: .16rem
              height: .16rem
        .input-text-warning
          border: 1px solid #FF5C5C
        .input-warning
            font-size: .12rem
            line-height: .17rem
            color: #FF5C5C
        .input-verification-code-warning
            font-size: .12rem
            line-height: .19rem
            color: #fff
        .input-code-wrapper
            display: flex
            .input-code-text
                border: 1px solid #fff
                border-radius: .08rem
                width: .46rem
                height: .46rem
                color: #fff
                font-size: .18rem
                line-height: .22rem
                outline: none
                margin-right: .02rem
                background: transparent
                text-align: center
    .input-container:nth-of-type(2)
        margin-top: .16rem
    .resend-container
        margin-top: .32rem
        display: flex
        justify-content: start
        .resend-description
            font-size: .12rem
            line-height: .17rem
            font-weight: 400
            margin-right: .05rem
        .resend
            font-size: .12rem
            line-height: .17rem
            color: #05FE9F
    .forgot-password
        display: flex
        justify-content: end
        margin-top: .16rem
        .forgot-password-text
            font-size: .12rem
            line-height: .17rem
            color: #05FE9F
    .sign-up
        margin-top: .16rem
        .sign-up-button
            width: 100%
            border-radius: .1rem
            background: #fff
            font-size: .18rem
            font-weight: 500
            line-height: .25rem
            padding: .1rem
            color: #0A1019
        .sign-up-button:active
            background: #e9ecef
            transform: scale(1.1)
    .agree-container
      display: flex
      align-items: center
      margin: .16rem 0 .7rem
      img
        width: .22rem
        height: .22rem
        margin-right: .05rem
      .unselected
        width: .22rem
        height: .22rem
        border: 1px solid rgba(255, 255, 255, 0.6)
        border-radius: 50%
        flex-shrink: 0
        margin-right: .05rem
      .agree-wrapper
        .agree-text
          font-size: .12rem
          line-height: .14rem
          color: #fff
        .user-agreement
          font-size: .12rem
          line-height: .14rem
          color: #05FE9F
    .login-container
        display: flex
        justify-content: center
        margin-top: .16rem
        .login-description
            font-size: .12rem
            line-height: .17rem
            margin-right: .05rem
        .login
            font-size: .12rem
            line-height: .17rem
            color: #05FE9F
    .continue-with-google
        padding: .1rem
        border-radius: .1rem
        border: 1px solid rgba(255, 255, 255, 0.6)
        display: flex
        justify-content: center
        align-items: center
        margin-top: .16rem
        img
           height: .18rem
           margin-right: .1rem
        .continue-text
            font-size: .14rem
            line-height: .2rem
</style>
