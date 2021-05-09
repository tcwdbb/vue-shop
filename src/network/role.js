import { request } from 'network/request.js'

export function getRoleList() {
  return request({
    url: 'roles'
  })
}

export function getRoleInfoById(id) {
  return request({
    url: 'roles/' + id
  })
}

//根据id修改角色信息
export function editRoleInfo({roleId, roleName, roleDesc}) {
  console.log(roleName);
  return request({
    url: 'roles/' + roleId,
    method: 'put',
    data: {
      roleName,
      roleDesc
    }
  })
}
//添加角色
export function addRole({roleName, roleDesc}) {
  console.log(roleName, roleDesc);
  return request({
    url: 'roles',
    method: 'post',
    data: {
      roleName,
      roleDesc
    }
  })
}

//删除角色
export function removeRole(id) {
  return request({
    url: 'roles/' + id,
    method: 'delete'
  })
}

//删除角色对应权限
export function removeRightById(roleId, rightId) {
  return request({
    url: `roles/${roleId}/rights/${rightId}`,
    method: 'delete'
  })
}
//分配角色权限
export function setRoleRights(roleId, rids) {
  return request({
    url: `roles/${roleId}/rights`,
    method: 'post',
    data: {
      rids
    }
  })
}