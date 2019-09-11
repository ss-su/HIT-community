import { Fallible } from './types'

/**
 * 简化Promise返回值
 *
 * 用类似callback参数的形式，代替try-catch来捕获异常
 * https://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/
 *
 * 使用方法：
 * const [error, user] = await to(getUser('test'))
 * if (error) alert(error.message)
 */
export function to<T = any> (promise: Promise<T>): Promise<Fallible<T>> {
  return promise
    .then((data: T) => [null, data] as any)
    .catch((error: Error) => [error, {}])
}

/**
 * 空函数
 */
export function noop (...args: any[]) {
  /* */
}
