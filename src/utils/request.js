import axios from 'axios'

const CLOUD_URL = process.env.CLOUD_URL
console.log('CLOUD_URL', process.env)

const instance = axios.create({
  baseUrl: CLOUD_URL,
  timeout: 60000 // 设置超时时间为1分钟
})

instance.interceptors.request.use(config => {
  console.log(config)
  return config
}, error => {
  console.log(error)
  return Promise.reject(error)
})

const request = (url, data, config) => {
  return instance.post(url, data)
}

export default request
