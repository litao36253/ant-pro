import axios from 'axios'
import { message } from 'ant-design-vue'
import config from '@/config'
import store from '@/store/index'

const baseUrl = config[process.env.NODE_ENV].cloudUrl

const instance = axios.create({
  baseUrl,
  timeout: 60000 // 设置超时时间为1分钟
})

instance.interceptors.request.use(config => {
  config.url = config.baseUrl + config.url
  console.log(config)
  config.mask && store.commit('changeGlobalLoading', true)
  return config
}, error => {
  config.mask && store.commit('changeGlobalLoading', false)
  return Promise.reject(error)
})

instance.interceptors.response.use(response => {
  if (response.status === 200 && response.data) {
    if (response.data.code === 0) {
      return response.data.data
    } else {
      message.error(response.data.message)
      return Promise.reject(response.data)
    }
  } else {
    message.error('请求发生未知错误')
    return Promise.reject(new Error('请求发生未知错误'))
  }
}, error => {
  message.error('请求发生未知错误')
  return Promise.reject(error)
})

const request = (url, data, config) => {
  return instance.post(url, data, config).finally(() => {
    config.mask && store.commit('changeGlobalLoading', false)
  })
}

export default request
