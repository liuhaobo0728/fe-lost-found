import base from './base'
import axios from '../http'
import qs from 'qs'

const port = {

    // 激活
    getcheckEmail(params) {
        return axios.get(`/user/checkEmail?userId=${params}`)
    },
    // 注册
    goRegister(params) {
        return axios.post(`/user/regis`, qs.stringify(params))
    },
    // 发布物品
    createItem(params) {
        return axios.post(`/findcore/createItem`, params)
    },
    // 上传物品图片
    createItemImg(params, itemId) {
        return axios.post(`/findcore/uplodeItemImg?itemId=${itemId}`, params)
    },
    // 找回密码
    resetPassWord(params) {
        return axios.post(`/user/resetPassWord`, qs.stringify(params))
    },
    // 根据id查询信息
    getItemInfo(params) {
        return axios.get(`/findcore/getItemInfo?itemId=${params.itemId}`)
    },
    // 用户信息填写
    goUserInfo(params) {
        return axios.post(`/user/setUserInfo`, params)
    },
    // 删除物品
    getdel(params) {
        return axios.delete(`/findcore/delItem`, { params: params })
    },
    // 上传头像
    uplodeItemImg(params) {
        return axios.post(`/user/uplodeIcon`, params)
    },
    // 登录
    goLogin(params) {
        return axios.post(`/user/login`, qs.stringify(params))
    },
    getlocaltion(params) {
        return axios.post(`/findcore/createQRCode`, qs.stringify(params))
    },
    // 获取物品信息
    getfindcore(params) {
        return axios.get(`/findcore/getActivityByLocation?longitude=${params.longitude}&latitude=${params.latitude}&nowPage=${params.nowPage}&pageSize=${params.pageSize}`)
    },

}

export default port;


