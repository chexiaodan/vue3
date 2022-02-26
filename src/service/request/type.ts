import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface HMRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (err: any) => any
}

export interface HMRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: HMRequestInterceptors<T>
  showLoading?: boolean
}
