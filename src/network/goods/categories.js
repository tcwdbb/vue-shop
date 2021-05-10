import { request } from 'network/request.js'

export function getGoodsCategoryList(querInfo) {
  return request({
    url: 'categories',
    params: querInfo
  })
}

//添加分类
export function addCategory(info) {
  return request({
    url: 'categories',
    method: 'post',
    data: info
  })
}

//根据id查询分类
export function selectCateById(id) {
  return request({
    url: `categories/${id}`,

  })
}

//编辑提交分类信息
export function editCategory({cat_id, cat_name}) {
  return request({
    url: `categories/${cat_id}`,
    method: 'put',
    data: {
      cat_name
    }
  })
}

//根据id删除分类
export function removeCateById(id) {
  return request({
    url: `categories/${id}`,
    method: 'delete'
  })
}