import { request } from './request'

export function login({username, password}) {
  return request({
    url: '/login',
    params: {
      username,
      password
    }
  })
}