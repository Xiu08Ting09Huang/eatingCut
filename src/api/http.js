import axios from 'axios'
const base_url = 'https://tango.heeyhome.com'
// const base_url = 'http://47.97.122.243:8887'
// const base_url = 'http://192.168.10.143:8887'
//登录接口
export const userLogin = data => {
    return axios.post(base_url + '/cx/web/user/login',data, {headers : { 'Authorization': sessionStorage.getItem('authorization')}})
}
//登出接口
export const logOut = data => {
    return axios.post(base_url + '/cx/web/user/loginOut',data,{ headers : { 'Authorization': sessionStorage.getItem('authorization')}})
}
//展示所有商品
export const goodsList = data => {
    return axios.post(base_url + '/cx/web/shop/listGoods',data, {headers : { 'Authorization': sessionStorage.getItem('authorization')}})
}
//添加商品
export const addGoods = data => {
    return axios.post(base_url + '/cx/web/shop/addGoods',data,{ headers : { 'Authorization': sessionStorage.getItem('authorization')}})
}
//删除商品
export const deleteGoods = data => {
    return axios.post(base_url + '/cx/web/shop/deleteGoods',data,{ headers : { 'Authorization': sessionStorage.getItem('authorization')}})
}
//更新商品
export const updateGoods = data => {
    return axios.post(base_url + '/cx/web/shop/updateGoods',data,{ headers : { 'Authorization': sessionStorage.getItem('authorization')}})
}
//展示所有订单
export const orderList = data => {
    return axios.post(base_url + '/cx/web/order/list',data,{ headers : { 'Authorization': sessionStorage.getItem('authorization')}})
}
//修改订单状态
export const orderStatus = data => {
     return axios.post(base_url + '/cx/web/order/status',data,{ headers : { 'Authorization': sessionStorage.getItem('authorization')}})
}
//展示所有商户
export const shopList = data => {
    return axios.post(base_url + '/cx/web/shop/listShop',data, {headers : { 'Authorization': sessionStorage.getItem('authorization')}})
}
//添加商户
export const addShop = data => {
    return axios.post(base_url + '/cx/web/shop/addShop',data,{ headers : { 'Authorization': sessionStorage.getItem('authorization')}})
}
//删除商户（禁用）
export const deleteShop = data => {
    return axios.post(base_url + '/cx/web/shop/deleteShop',data,{ headers : { 'Authorization': sessionStorage.getItem('authorization')}})
}
//更新商户
export const updateShop = data => {
    return axios.post(base_url + '/cx/web/shop/updateShop',data,{ headers : { 'Authorization': sessionStorage.getItem('authorization')}})
}
//展示所有用户
export const userList = data => {
    return axios.post(base_url + '/cx/web/user/listUser',data,{ headers : { 'Authorization': sessionStorage.getItem('authorization')}})
}
//添加用户商铺
export const addUserShop = data => {
    return axios.post(base_url + '/cx/web/user/addUserShop',data,{ headers : { 'Authorization': sessionStorage.getItem('authorization')}})
}
//获取商城轮播图列表
export const bannerList = data => {
    return axios.post(base_url + '/cx/web/shop/listPicture',data,{ headers : { 'Authorization': sessionStorage.getItem('authorization')}})
}
//更新商城轮播图
export const updateBanner = data => {
    return axios.post(base_url + '/cx/web/shop/updatePicture',data,{ headers : { 'Authorization': sessionStorage.getItem('authorization')}})
}