import { request } from './request'

export function getMenus() {
  return request({
    url: 'menus'
  })
}

export function getUserList({query, pagenum, pagesize}) {
  return request({
    url: 'users',
    params: {
      query,
      pagenum,
      pagesize
    }
  })
}

export function setUserState({id, mg_state}) {
  return request({
    url: `users/${id}/state/${mg_state}`,
    method: 'put'
  })
}