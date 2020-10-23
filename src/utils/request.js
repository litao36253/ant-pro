import axios from 'axios'
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
  config.mask && store.commit('changeGloableLoading', true)
  return config
}, error => {
  config.mask && store.commit('changeGloableLoading', false)
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  // 对响应数据做点什么
  return response
}, error => {
  // 对响应错误做点什么
  return Promise.reject(error)
})

const request = (url, data, config) => {
  return instance.post(url, data, config).finally(() => {
    config.mask && store.commit('changeGloableLoading', false)
  })
}

export default request
