import { request } from 'network/request.js'

//获取分类参数列表
export function getParamsList(id,sel) {
  return request({
    url: `categories/${id}/attributes`,
    params: {
      sel
    }
  })
}

//添加动态参数
export function addParams(id, paramsInfo) {
  return request({
    url: `categories/${id}/attributes`,
    method: 'post',
    data: paramsInfo
  })
}

//根据id查询参数信息
export function selectParams(id, attrId, attr_sel) {
  return request({
    url: `categories/${id}/attributes/${attrId}`,
    params: {
      attr_sel
    }
  })
}

//提交修改后的参数
export function editParams({cat_id, attr_id, attr_name, attr_sel}) {
  return request({
    url: `categories/${cat_id}/attributes/${attr_id}`,
    method: 'put',
    data: {
      attr_name,
      attr_sel
    }
  })
}

//提交修改后的参数项
export function editParamsItem({cat_id, attr_id, attr_name, attr_sel}, attr_vals) {
  return request({
    url: `categories/${cat_id}/attributes/${attr_id}`,
    method: 'put',
    data: {
      attr_name,
      attr_sel,
      attr_vals
    }
  })
}

//根据id删除参数
export function removeParams({cat_id, attr_id}) {
  return request({
    url: `categories/${cat_id}/attributes/${attr_id}`,
    method: 'delete'
  })
}