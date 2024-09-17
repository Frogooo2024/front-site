<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api/api'
import { useUserIdStore } from '../stores/userId'
import { showToast } from 'vant'

import 'vant/lib/index.css'

const emit = defineEmits(['login-clicked'])

const router = useRouter()

const eyeIcon = ref(new URL('../assets/icons/eye_close.png', import.meta.url).href)
const inputType = ref('password')

const inputForm = reactive({
  email: '',
  password: null || undefined,
  validatePasswordPass: true,
  validateEmailPass: true
})

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(inputForm.email)) {
    inputForm.validateEmailPass = false
  } else {
    inputForm.validateEmailPass = true
  }
}

const onSignUp = () => {
  router.push({ path: '/signUp' })
}

const onForgetPassword = () => {
  router.push({
    name: 'forgetPassword',
    params: {
      email: inputForm.email.length && inputForm.validateEmailPass ? inputForm.email : null
    }
  })
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

const loginClicked = async () => {
  if (
    !inputForm.validateEmailPass ||
    !inputForm.validatePasswordPass ||
    !inputForm.email.length ||
    !inputForm.password
  ) {
    return
  }
  try {
    let loginData: any = await api.logIn({
      username: inputForm.email,
      password: inputForm.password,
      type: '用户',
      logintype: '4'
    })
    if (loginData.status) {
      const { setUserId } = useUserIdStore()
      localStorage.setItem('frogoooUserId', loginData.data?.username?.lastname)
      setUserId(loginData.data?.username?.lastname)
      localStorage.setItem('frogoooIsLogin', 'true')
      localStorage.setItem('frogoooToken', loginData.data?.token)
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

const googleLoginClickedold = () => {
  // window.location.href =
  //   'https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=441778662728-adegcjs560s4l8ag1tljk399h472hp6b.apps.googleusercontent.com&redirect_uri=https://api.frogooo.cangkugou.cn/oauth/callback/google&access_type=offline&scope=email%20profile%20openid&prompt=select_account'
  window.location.href =
    'https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=441778662728-adegcjs560s4l8ag1tljk399h472hp6b.apps.googleusercontent.com&redirect_uri=https://api.frogooo.cangkugou.cn/loginByGoogleCallback&access_type=offline&scope=email%20profile%20openid&prompt=select_account'
}

// Create a function to initiate the Google OAuth login
const googleLoginClicked = async () => {
  try {
    // Redirect to Google's OAuth endpoint
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const redirectUri = `${window.location.origin}/oauth/callback`; // Define your callback URL
    const authEndpoint = `https://accounts.google.com/o/oauth2/v2/auth`;
    
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: 'openid email profile',
    });

    // Redirect the user to Google's OAuth consent page
    window.location.href = `${authEndpoint}?${params.toString()}`;
  } catch (error) {
    console.error('Error during Google OAuth login:', error);
  }
};

// After redirecting back from Google with the auth code, handle the callback
const handleOAuthCallback = async () => {
  const queryParams = new URLSearchParams(window.location.search);
  const authCode = queryParams.get('code');

  if (authCode) {
    try {
      // Call the backend OAuth callback to exchange code for access token
      const response = await api.googleOAuthCallback(authCode);
      
      if (response.success) {
        // Successfully logged in, now redirect to the dashboard or another protected route
        router.push('/dashboard');
      } else {
        console.error('Login failed:', response.message);
      }
    } catch (error) {
      console.error('Error handling OAuth callback:', error);
    }
  }
};

// Call the handleOAuthCallback function if we are on the callback route
if (window.location.pathname === '/oauth/callback') {
  handleOAuthCallback();
}
</script>

<template>
  <div class="login-container">
    <h2 class="login-title">{{ $t('Frogooo.SignInToYourAccount') }}</h2>
    <p class="login-description">{{ $t('Frogooo.EnterEmailAndPassword') }}</p>
    <section class="input-container">
      <span class="input-title">{{ $t('Frogooo.Email') }}</span>
      <input
        class="input-text"
        type="email"
        :placeholder="$t('Frogooo.Email')"
        v-model="inputForm.email"
        @blur="validateEmail"
      />
      <p v-if="!inputForm.validateEmailPass" class="input-warning">
        {{ $t('Frogooo.EnterTheCorrectEmail') }}
      </p>
    </section>
    <section class="input-container">
      <span class="input-title">{{ $t('Frogooo.Password') }}</span>
      <div class="input-password-wrapper">
        <input
          class="input-text input-password"
          :type="inputType"
          :placeholder="$t('Frogooo.Password')"
          v-model="inputForm.password"
        />
        <div class="eye-icon-container" @click="eyeIconClicked">
          <img :src="eyeIcon" alt="" class="eye-icon" />
        </div>
      </div>
      <p v-if="!inputForm.validatePasswordPass" class="input-warning">
        {{ $t('Frogooo.EnterTheCorrectPassword') }}
      </p>
    </section>
    <section class="forgot-password">
      <span class="forgot-password-text" @click="onForgetPassword">{{
        $t('Frogooo.ForgotPassword')
      }}</span>
    </section>
    <section class="login">
      <button
        @click="loginClicked"
        class="login-button"
        :class="{
          'login-button-disable':
            !inputForm.validateEmailPass ||
            !inputForm.validatePasswordPass ||
            !inputForm.email.length ||
            !inputForm.password
        }"
      >
        {{ $t('Frogooo.LogIn') }}
      </button>
    </section>
    <section class="sign-up-container">
      <span class="sign-up-description">{{ $t('Frogooo.DonNotHaveAnAccount') }}</span>
      <span class="sign-up" @click="onSignUp">{{ $t('Frogooo.SignUp') }}</span>
    </section>
    
    <!-- Google OAuth Login -->
    <section class="or-other-container">
      <span class="other-line"></span>
      <span class="other-text">{{ $t('Frogooo.OrLoginWith') }}</span>
      <span class="other-line"></span>
    </section>
    <div class="continue-with-google" @click="googleLoginClicked">
      <img src="../assets/icons/google.png" alt="" />
      <span class="continue-text">{{ $t('Frogooo.ContinueWithGoogle') }}</span>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.login-container
    display: flex
    flex-direction: column
    border-radius: 24px
    padding: 48px 72px
    background: rgba(19, 19, 22, 0.8)
    box-shadow: 20px 40px 60px 0 rgba(0, 0, 0, 0.5)
    width: 540px
    margin: 80px auto
    .login-title
        font-size: 32px
        font-weight: 700
        line-height: 42px
        color: #fff
    .login-description
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
            border: 1px solid rgba(255, 255, 255, 0.2)
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
    .input-container:nth-of-type(2)
        margin-top: 16px
    .forgot-password
        display: flex
        justify-content: end
        margin-top: 16px
        .forgot-password-text
            font-size: 14px
            line-height: 20ox
            color: #05FE9F
    .login
        margin-top: 16px
        .login-button
            width: 100%
            border-radius: 10px
            background: #fff
            font-size: 18px
            font-weight: 700
            line-height: 25px
            padding: 10px 24px
            color: #0A1019
        .login-button-disable
            width: 100%
            border-radius: 10px
            background: rgba(255, 255, 255, 0.6)
            font-size: 18px
            font-weight: 700
            line-height: 25px
            padding: 10px 24px
            color: #0A1019
        .login-button:active, .login-button-disable:active
          background: #e9ecef
          transform: scale(1.1)
    .sign-up-container
        margin-top: 16px
        display: flex
        justify-content: center
        .sign-up-description
            font-size: 14px
            line-height: 20px
            margin-right: 5px
        .sign-up
            font-size: 14px
            line-height: 20px
            color: #05FE9F
    .or-other-container
        margin-top: 32px
        display: flex
        justify-content: center
        align-items: center
        .other-line
            flex: 1
            border-bottom: 1px solid rgba(237, 241, 243, 0.6)
        .other-text
            font-size: 12px
            line-height: 18px
            color: rgba(255, 255, 255, 0.6)
            margin: 0 10px
    .continue-with-google
        padding: 10px 24px
        border-radius: 10px
        display: flex
        justify-content: center
        align-items: center
        margin-top: 16px
        background: #26272B
        img
           height: 18px
           margin-right: 10px
        .continue-text
            font-size: 18px
            line-height: 25px
            color: #fff
</style>
