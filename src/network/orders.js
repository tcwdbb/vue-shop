import { request } from './request'

export function getOrderData(queryInfo) {
  return request({
    url: 'orders',
    params: queryInfo
  })
}

//获取物流数据
export function getLogisticsInfo(odd) {
  return  request({
    url: `/kuaidi/${odd}`
  })
}