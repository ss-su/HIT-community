import { AxiosResponse } from 'axios'

export default class ResponseError extends Error {
  public readonly response!: AxiosResponse
  public readonly message!: string

  public constructor (message: string, response: AxiosResponse) {
    super(message)

    this.response = response
    this.message = message
  }
}
