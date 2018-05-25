

import axios from 'axios'

const base_url = 'http://192.168.10.140:8888'

// 登录接口
export const userLogin = data => {
  return axios.post(base_url + '/tg/web/user/login', data)
}
// 展示所有订单
export const showAllOrder = data => {
  return axios.post(base_url + '/tg/web/order/list', data)
}
