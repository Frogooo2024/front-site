import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'frogooo',
      component: () => import('../views/FrogoooView.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactUsView.vue')
    },
    {
      path: '/converter',
      name: 'converter',
      component: () => import('../views/ConverterView.vue')
    },
    {
      path: '/freight',
      name: 'freight',
      component: () => import('../views/FreightEstimationView.vue')
    },
    {
      path: '/feeResult/:cost/:weight',
      name: 'feeResult',
      component: () => import('../views/FeeCalculatingResultsView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/signUp',
      name: 'signUp',
      component: () => import('../views/SignUpView.vue')
    },
    {
      path: '/forgetPassword/:email?',
      name: 'forgetPassword',
      component: () => import('../views/ForgetPasswordView.vue')
    },
    {
      path: '/signUpExplanationFirst',
      name: 'SignUpExplanationFirst',
      component: () => import('../views/SignUpExplanationFirstView.vue')
    },
    {
      path: '/signUpExplanationSecond',
      name: 'SignUpExplanationSecond',
      component: () => import('../views/SignUpExplanationSecondView.vue')
    },
    {
      path: '/signUpExplanationThird',
      name: 'SignUpExplanationThird',
      component: () => import('../views/SignUpExplanationThirdView.vue')
    },
    {
      path: '/userCenter/:token?/:userId?',
      name: 'userCenter',
      component: () => import('../views/UserCenterView.vue')
    },
    {
      path: '/packageHistory',
      name: 'packageHistory',
      component: () => import('../views/PackagesHistoryView.vue')
    },
    {
      path: '/packagesInTransit',
      name: 'packagesInTransit',
      component: () => import('../views/PackagesInTransitView.vue')
    },
    {
      path: '/packagesInWarehouse',
      name: 'packagesInWarehouse',
      component: () => import('../views/PackagesInWarehouseView.vue')
    },
    {
      path: '/singaporeAddress',
      name: 'singaporeAddress',
      component: () => import('../views/SingaporeAddressView.vue')
    },
    {
      path: '/aliExpressDetail',
      name: 'aliExpressDetail',
      component: () => import('../views/AliExpressDetailView.vue')
    },
    {
      path: '/amazonDetail',
      name: 'amazonDetail',
      component: () => import('../views/AmazonDetailView.vue')
    },
    {
      path: '/ebayDetail',
      name: 'ebayDetail',
      component: () => import('../views/EbayDetailView.vue')
    },
    {
      path: '/sheinDetail',
      name: 'sheinDetail',
      component: () => import('../views/SheinDetailView.vue')
    },
    {
      path: '/qoo10Detail',
      name: 'qoo10Detail',
      component: () => import('../views/Qoo10DetailView.vue')
    },
    {
      path: '/addressList',
      name: 'addressList',
      component: () => import('../views/AddressListView.vue')
    },
    {
      path: '/addPackage',
      name: 'addPackage',
      component: () => import('../views/AddPackageView.vue')
    },
    {
      path: '/packageHelp',
      name: 'packageHelp',
      component: () => import('../views/PackageHelpView.vue')
    },
    {
      path: '/luLuLemonDetail',
      name: 'luLuLemonDetail',
      component: () => import('../views/LuLuLemonDetailView.vue')
    },
    {
      path: '/vipshopDetail',
      name: 'vipshopDetail',
      component: () => import('../views/VipshopDetailView.vue')
    },
    {
      path: '/taobaoDetail',
      name: 'taobaoDetail',
      component: () => import('../views/TaobaoDetailView.vue')
    },
    {
      path: '/packageDetail/:transportNumber/:img?',
      name: 'packageDetail',
      component: () => import('../views/PackageDetailView.vue')
    },
    {
      path: '/orderDetail/:orderNumber/:transportNumber',
      name: 'orderDetail',
      component: () => import('../views/OrderDetailView.vue')
    },
    {
      path: '/payment/:orderNumber',
      name: 'payment',
      component: () => import('../views/PaymentView.vue')
    },
    {
      path: '/paymentStatus',
      name: 'paymentStatus',
      component: () => import('../views/PaymentStatusView.vue')
    },
    {
      path: '/productWeight',
      name: 'productWeight',
      component: () => import('../views/ProductWeightView.vue')
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: () => import('../views/PrivacyView.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})

router.onError((error: any, to: any) => {
  if (error.message.includes('Failed to fetch dynamically imported module')) {
    window.location = to.fullPath
  }
})

export default router
