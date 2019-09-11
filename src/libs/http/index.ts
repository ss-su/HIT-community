import axios from 'axios'

import axiosConfig from './config'
import {
  onRequestFulfilled,
  onRequestRejected,
  onResponseFulfilled,
  onResponseRejected
} from './interceptors'

const http = axios.create(axiosConfig)

http.interceptors.request.use(onRequestFulfilled, onRequestRejected)
http.interceptors.response.use(onResponseFulfilled, onResponseRejected)

export default http
