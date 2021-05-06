import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    baseURL: 'https://www.liulongbin.top:8888/api/private/v1/',
    timeout: 5000
  })
  //响应拦截
  instance.interceptors.response.use(res => {

    return res.data
  })
  return instance(config)
}