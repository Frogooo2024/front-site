import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import router from '../router'

const config = {
  timeout: 120000,
  baseURL: import.meta.env.VITE_APP_BASE_URL
}

const paymentConfig = {
  timeout: 120000,
  baseURL: 'https://frogooo.com/api/Pay/'
}

interface IResponseData<T> {
  success?: boolean
  code: number
  message?: string
  data: T
}

class HttpClient {
  service
  paymentService
  constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config)
    this.paymentService = axios.create(paymentConfig)

    this.service.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${window.localStorage.getItem('frogoooToken')}`
      return config
    })

    this.paymentService.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${window.localStorage.getItem('frogoooToken')}`
      return config
    })

    this.service.interceptors.response.use(
      (response: AxiosResponse<any>) => {
        if (response?.data?.code === 401) {
          window.localStorage.setItem('frogoooToken', '')
          window.localStorage.setItem('frogoooIsLogin', 'false')
          router.replace({ path: '/login' })
        }
        if (response.status === 200) {
          return response.data
        }
        return Promise.reject(response.data)
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    this.paymentService.interceptors.response.use(
      (response: AxiosResponse<any>) => {
        if (response?.data?.code === 401) {
          window.localStorage.setItem('frogoooToken', '')
          window.localStorage.setItem('frogoooIsLogin', 'false')
          router.replace({ path: '/login' })
        }
        if (response.status === 200) {
          return response.data
        }
        return Promise.reject(response.data)
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }

   // Method for handling Google OAuth callback
  async googleOAuthCallback<T>(authCode: string): Promise<IResponseData<T>> {
    try {
      // Exchange authorization code for access token
      const tokenResponse = await this.service.post<IResponseData<{ accessToken: string }>>(
        'oauth/callback/google',
        { code: authCode }
      );

      if (tokenResponse.data.success) {
        // Fetch user info using the access token
        const userInfo = await this.getGoogleUserInfo(tokenResponse.data.data.accessToken);
        return { ...tokenResponse.data, data: userInfo };
      } else {
        throw new Error(tokenResponse.data.message || 'Error during OAuth callback');
      }
    } catch (error) {
      console.error('Error during Google OAuth callback:', error);
      throw error;
    }
  }

  // Method to fetch google account info from Google
  private async getGoogleUserInfo(accessToken: string): Promise<any> {
    try {
      const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching Google user info:', error);
      throw error;
    }
  }

  get<T>(url: string, params?: Record<string, unknown>): Promise<IResponseData<T>> {
    return this.service.get(url, params)
  }

  post<T>(url: string, params?: Record<string, unknown>, config = {}): Promise<IResponseData<T>> {
    return this.service.post(url, params, config)
  }

  logIn<T>(params?: Record<string, unknown>): Promise<IResponseData<T>> {
    return this.service.get(
      `codeToUser?username=${params?.username}&password=${params?.password}&type=${params?.type}&logintype=${params?.logintype}`
    )
  }

  sendEmail<T>(params?: Record<string, unknown>): Promise<IResponseData<T>> {
    return this.service.post('cangkugou/sendEmail', params)
  }

  signUp<T>(params?: Record<string, unknown>): Promise<IResponseData<T>> {
    return this.service.post('register', params)
  }

  getPackageList<T>(params?: Record<string, unknown>): Promise<IResponseData<T>> {
    return this.service.get(
      `cangkugou/packages/getPackageList?tabtype=-8&packageStatus=${params?.packageStatus}&goodsTypeId=0&pageNum=1&pageSize=10000000`
    )
  }

  getCity<T>(params?: Record<string, unknown>): Promise<IResponseData<T>> {
    if (params?.key) {
      return this.service.get(
        `cangkugou/country/getParentCodeToChild?code=${params?.code}&key=${params?.key}`
      )
    } else {
      return this.service.get(`cangkugou/country/getParentCodeToChild?code=${params?.code}`)
    }
  }

  addAddress<T>(params?: Record<string, unknown>): Promise<IResponseData<T>> {
    return this.service.post('cangkugou/address/addAddressByUser', params)
  }

  getAddressUser<T>(params?: Record<string, unknown>): Promise<IResponseData<T>> {
    return this.service.get(`cangkugou/address/getAddressUser`)
  }

  addPackage<T>(params?: Record<string, unknown>): Promise<IResponseData<T>> {
    return this.service.post('cangkugou/packages/convenientPackage', params)
  }

  deletePackge<T>(params?: Record<string, unknown>): Promise<IResponseData<T>> {
    return this.service.get(
      `cangkugou/packages/delPackageUser?transportNumber=${params?.transportNumber}`
    )
  }

  getPackageDetail<T>(params?: Record<string, unknown>): Promise<IResponseData<T>> {
    return this.service.get(
      `cangkugou/packages/TransportToPackageShowNew/${params?.transportNumber}`
    )
  }

  order<T>(params?: Record<string, unknown>): Promise<IResponseData<T>> {
    return this.service.post('cangkugou/order/orderInputByFrogooo', params)
  }

  getOrderList<T>(params?: Record<string, unknown>): Promise<IResponseData<T>> {
    return this.service.get(
      `cangkugou/order/selectOrderListByFrogooo?orderStatus=${params?.orderStatus}&orderByColumn=id&isAsc=desc&pageNum=1&pageSize=10000000`
    )
  }

  editAddress<T>(params?: Record<string, unknown>): Promise<IResponseData<T>> {
    return this.service.post('cangkugou/address/editAddressByUser', params)
  }

  deleteAddress<T>(params?: Record<string, unknown>): Promise<IResponseData<T>> {
    return this.service.get(`cangkugou/address/delAddressByUser?id=${params?.id}`)
  }

  orderDetail<T>(params?: Record<string, unknown>): Promise<IResponseData<T>> {
    return this.service.get(
      `cangkugou/order/selectOrderByFrogooo?orderNumber=${params?.orderNumber}`
    )
  }

  getOrderLogs<T>(params?: Record<string, unknown>): Promise<IResponseData<T>> {
    return this.service.get(
      `cangkugou/orderLogs/orderLogsByOrderNumber?orderNumber=${params?.orderNumber}&typehid=ordernumber`
    )
  }

  payment<T>(params?: Record<string, unknown>): Promise<IResponseData<T>> {
    return this.paymentService.post('topaybatch', params)
  }

  getPaymentStatus<T>(params?: Record<string, unknown>): Promise<IResponseData<T>> {
    return this.paymentService.get(`status?orderNo=${params?.orderNumber}`)
  }
}
export default new HttpClient(config)
