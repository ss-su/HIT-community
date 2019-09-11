import * as qs from 'qs'
import { AxiosRequestConfig } from 'axios'

import http from '@/libs/http'

export default abstract class BaseApiService {
  protected request<T = any> (config: AxiosRequestConfig) {
    return (http.request(config) as any) as Promise<T>
  }

  protected get<T = any> (url: string, config?: AxiosRequestConfig) {
    return (http.get(url, config) as any) as Promise<T>
  }

  protected head<T = any> (url: string, config?: AxiosRequestConfig) {
    return (http.head(url, config) as any) as Promise<T>
  }

  protected post<T = any> (
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) {
    return (http.post(url, data, config) as any) as Promise<T>
  }

  protected put<T = any> (url: string, data?: any, config?: AxiosRequestConfig) {
    return (http.put(url, data, config) as any) as Promise<T>
  }

  protected patch<T = any> (
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) {
    return (http.patch(url, data, config) as any) as Promise<T>
  }

  protected delete<T = any> (url: string, config?: AxiosRequestConfig) {
    return (http.delete(url, config) as any) as Promise<T>
  }

  protected stringify (obj: any, option?: qs.IStringifyOptions) {
    return qs.stringify(obj, option)
  }
}
