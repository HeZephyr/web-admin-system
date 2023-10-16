import request from '@/utils/request'

// 登录方法
export function login(account, password) {
    const data = {
        account,
        password,
    }
    return request({
        url: '/login',
        headers: {
            isToken: false
        },
        method: 'post',
        data: data
    })
}


