import { AxiosRequestConfig, AxiosResponse } from 'axios'

import commonConfig from '../../configs/common'
import ResponseError from './ResponseError'

/**
 * 请求成功拦截
 */
export function onRequestFulfilled (config: AxiosRequestConfig) {
  if (isAuthURL(config.url!)) return config

  const token = localStorage.getItem('token')
  if (token) config.headers.common.token = token

  return config
}

/**
 * 请求失败拦截
 */
export function onRequestRejected (error: Error) {
  return Promise.reject(error)
}

enum StatusCode {
  fail = 1001,
  success = 200,
  unauthorized = 401,
  forbidden = 403,
  unknown = 500
}

/**
 * 响应成功拦截
 */
export function onResponseFulfilled (response: AxiosResponse) {
  const { headers, data } = response

  if (!headers['content-type'].includes('application/json')) {
    return response
  }

  const { code, message } = data

  switch (code) {
    case StatusCode.success:
      return data.data

    case StatusCode.fail: // 请求参数错误、服务器错误等
      return Promise.reject(new ResponseError(message, response))

    case StatusCode.unauthorized:
      localStorage.setItem('token', '')
      window.location.href = commonConfig.loginURL
      return Promise.reject(new ResponseError('请登录后操作', response))

    case StatusCode.forbidden:
      //window.location.href = location.pathname
      return Promise.reject(new ResponseError('暂无权限', response))

    case StatusCode.unknown:
     // window.location.href = location.pathname
      return Promise.reject(new ResponseError('未知错误', response))

    default:
      return Promise.reject(new ResponseError(message, response))
  }
}

/**
 * 响应失败拦截
 */
export function onResponseRejected (error: Error) {
  return Promise.reject(new ResponseError('服务器开小差了', (error as any).response))
}

function isAuthURL (url: string) {
  return url.includes('login') || url.includes('logout')
}
