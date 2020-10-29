import axios from 'axios'
import { message } from 'ant-design-vue'
import config from '@/config'
import store from '@/store/index'

const baseUrl = config[process.env.NODE_ENV].cloudUrl

const instance = axios.create({
  baseUrl,
  mask: false, // 请求时是否添加全局loading
  errorTips: true, // 请求出错时是否在页面上报错
  timeout: 60000 // 设置超时时间为1分钟
})

instance.interceptors.request.use(config => {
  config.url = config.baseUrl + config.url
  config.headers.common.Token = localStorage.getItem('token')
  config.mask && store.commit('changeGlobalLoading', true)
  return config
}, error => {
  config.mask && store.commit('changeGlobalLoading', false)
  return Promise.reject(error)
})

instance.interceptors.response.use(({ data, status, config }) => {
  if (status === 200 && data) {
    if (data.code === 0) {
      return data.body
    } else {
      config.errorTips && message.error(data.message)
      return Promise.reject(data)
    }
  } else {
    config.errorTips && message.error('请求发生未知错误')
    return Promise.reject(new Error('请求发生未知错误'))
  }
}, error => {
  message.error('请求发生未知错误')
  return Promise.reject(error)
})

const request = (url, data, config = {}) => {
  return instance.post(url, data, config).finally(() => {
    config.mask && store.commit('changeGlobalLoading', false)
  })
}

export default request
