import { request } from './request'

export function addUser(userInfo) {
  return request({
    url: 'users',
    method: 'post',
    data: userInfo
  })
}
//通过id查询用户信息
export function getUserById(id) {
  return request({
    url: 'users/' + id,
  })
}
//更新用户信息
export function updateUserInfo(userInfo) {
  return request({
    url: `users/${userInfo.id}`,
    method: 'put',
    data: {
      email: userInfo.email,
      mobile: userInfo.mobile
    }
  })
}
//根据id删除用户
export function removeUserById(id) {
  return request({
    url: 'users/' + id,
    method: 'delete'
  })
}