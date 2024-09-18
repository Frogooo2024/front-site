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

  // Handle the Google OAuth callback and access token exchange
  async googleOAuthCallback<T>(authCode: string): Promise<IResponseData<T>> {
    try {
      const response = await this.service.post<IResponseData<{ accessToken: string }>>(
        'api/googleOAuthCallback', // Ensure this matches your backend route
        { code: authCode }
      );
  
      // Check if response status is 200 and handle token
      if (response?.status === 200) {
        const accessToken = response.data?.data.accessToken;
        if (accessToken) {
          // Fetch user info using the access token
          const userInfo = await this.getGoogleUserInfo(accessToken);
          return { success: true, data: userInfo };
        }
      } else if (response?.status === 401) {
        // Handle unauthorized response
        window.localStorage.setItem('frogoooToken', '');
        window.localStorage.setItem('frogoooIsLogin', 'false');
        router.replace({ path: '/login' });
      }
  
      // Return error if unsuccessful
      return Promise.reject(response.data);
    } catch (error) {
      console.error('Error during Google OAuth callback:', error);
      return Promise.reject(error);
    }
  }
  
  // Use access token to get the google account info
  private async getGoogleUserInfo(accessToken: string): Promise<any> {
    try {
      const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
  
      // Check if response status is 200
      if (response?.status === 200) {
        return response.data;
      } else {
        return Promise.reject('Failed to fetch Google user info');
      }
    } catch (error) {
      console.error('Error fetching Google user info:', error);
      return Promise.reject(error);
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

  getCityOld<T>(params?: Record<string, unknown>): Promise<IResponseData<T>> {
    if (params?.key) {
      return this.service.get(
        `cangkugou/country/getParentCodeToChild?code=${params?.code}&key=${params?.key}`
      )
    } else {
      return this.service.get(`cangkugou/country/getParentCodeToChild?code=${params?.code}`)
    }
  }

  getCity<T>(params?: Record<string, unknown>): Promise<IResponseData<T>> {
    const baseURL = params?.customBaseURL || 'https://frogooo.com/'; // Use default or custom base URL
  
    // Create a new Axios instance with the custom base URL
    const customAxiosInstance = axios.create({
      baseURL: baseURL, // Custom base URL
    });
  
    // Use the customAxiosInstance to make the GET request
    if (params?.key) {
      return customAxiosInstance.get(
        `api/Province/${params?.code}/City/${params?.key}`
      );
    } else {
      return customAxiosInstance.get(`api/Province/${params?.code}`);
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
