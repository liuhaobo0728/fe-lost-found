import api from '../../utils/api/api'

import { encrypt } from '../../../ip'

const user = {
    state: {
        token: '',
        userid: '',
        id: '',
        nick: ''
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token
        },
        SET_USERID(state, userid) {
            state.userid = userid
        },
        SET_ID(state, id) {
            state.id = id
        },
        SET_NICK(state, nick) {
            state.nick = nick
        },
        RESER_USER(state) {
            state.token = ''
            state.id = ''
            state.nick = ''
        }
    },
    actions: {
        // 登录
        GoLogin({
            commit
        }, loginForm) {
            return new Promise((resolve, reject) => {
                const user = {
                    userEmail: loginForm.userEmail,
                    passWord: loginForm.passWord
                }
                api.goLogin(user)
                    .then(res => {
                        if (res.data.state === -307) {
                            // commit('SET_USERID', res.data.info || '')
                            resolve(res);
                            return;
                        }
                        if (res.data.state === -308) {
                            commit('SET_USERID', res.data.info || '')
                            resolve(res);
                            return;
                        }
                        const data = res.data.info
                        commit('SET_TOKEN', data.token || '')
                        commit('SET_USERID', data.userId || '')
                        commit('SET_NICK', data.userNick || '')

                        resolve(res)
                    }).catch(err => {
                        reject(err)
                    })
            })
        },
        GoOut({
            commit
        }) {
            return new Promise(resolve => {
                localStorage.removeItem('vuex')
                commit('RESER_USER')
                resolve()
            })
        },
        GoRegister({
            commit
        }, registerdata) {
            return new Promise((resolve, reject) => {
                const user = {
                    userEmail: registerdata.userEmail,
                    passWord: registerdata.passWord
                }
                api.goRegister(user)
                    .then(res => {
                        if (res) {
                            if (res.data.state === 0) {
                                commit('SET_USERID', res.data.info || '')
                            }
                            resolve(res)
                        }
                    }).catch(err => {
                        reject(err)
                    })
            })
        }
    }
}

export default user;