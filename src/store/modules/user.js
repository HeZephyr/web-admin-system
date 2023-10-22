import { login } from '@/api/login'
import {defineStore} from "pinia";
import {getToken, setToken} from "@/utils/auth";
import defAva from '@/assets/images/profile.png'

const useUserStore = defineStore(
    "user",
    {
        state: () => ({
            token: getToken(),
            id: '',
            name: '',
            avatar: defAva,
            roles: [],
            permissions: []
        }),
        actions: {
            login(userInfo) {
                // 获取用户的账号和密码
                const account = userInfo.account.trim()
                const password = userInfo.password
                // 创建一个 Promise 对象用于处理登录请求
                return new Promise((resolve, reject) => {
                    login(account, password).then(response => {
                        console.log(response)
                        setToken(response.rst)
                        this.token = response.rst
                        resolve()
                    }).catch(error => {
                        reject(error)
                    })
                })
            }
        }
    }
)

export default useUserStore
