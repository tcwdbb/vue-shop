import { request } from '../request'

export function getGoodsList(queryInfo) {
  return request({
    url: 'goods',
    params: queryInfo
  })
}

//根据id删除对应商品
export function deleteGoods(id) {
  return request({
    url: `goods/${id}`,
    method: 'delete'
  })
}

//添加商品
export function addGoodsInfo(goods) {
  return request({
    url: 'goods',
    method: 'post',
    data: goods
  })
}

//修改商品
export function editGoodsInfo(goodsInfo) {
  return request({
    url: `goods/${goodsInfo.goods_id}`,
    method: 'put',
    data: {
      goods_name: goodsInfo.goods_name,
      goods_price: goodsInfo.goods_price,
      goods_weight: goodsInfo.goods_weight,
      goods_number: goodsInfo.goods_number
    }
  })
}
