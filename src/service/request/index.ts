import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { HMRequestInterceptors, HMRequestConfig } from './type'
import { ElLoading } from 'element-plus'
import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'

class HMRequest {
  instance: AxiosInstance
  interceptors?: HMRequestInterceptors
  loading?: LoadingInstance
  showLoading: boolean

  constructor(config: HMRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? false

    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    //所有实例都有的拦截器
    this.instance.interceptors.request.use(
      (res) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据中...',
            background: 'rgba(0,0,0,0.2)'
          })
        }
        return res
      },
      (err) => {
        console.log('所有实例都有的拦截器：请求失败')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        this.loading?.close()

        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('请求失败～，错误信息')
        } else {
          return data
        }
      },
      (err) => {
        if (err.reponse.status === 404) {
          console.log('404的错误～')
        }
        return err
      }
    )
  }
  request<T>(config: HMRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      if (config.showLoading) {
        this.showLoading = config.showLoading
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          this.showLoading = false

          resolve(res)
        })
        .catch((err) => {
          reject(err)
          this.showLoading = false
          return err
        })
    })
  }

  get<T>(config: HMRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: HMRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T>(config: HMRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T>(config: HMRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default HMRequest
