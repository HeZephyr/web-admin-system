import { login } from '@/api/login'
import {defineStore} from "pinia";
import {getToken, setToken} from "@/utils/auth";

const useUserStore = defineStore(
    "user",
    {
        state: () => ({
            token: getToken(),
        }),
        actions: {
            login(userInfo) {
                // 获取用户的账号和密码
                const account = userInfo.account.trim()
                const password = userInfo.password
                console.log(account)
                console.log(password)
                // 创建一个 Promise 对象用于处理登录请求
                return new Promise((resolve, reject) => {
                    login(account, password).then(response => {
                        const data = response.data
                        if (data.statusCode === 0) {
                            resolve(data);
                            console.log(data);
                            // 设置token
                            setToken(data.rst);
                            console.log(data.rst);
                        } else {
                            reject(data);
                            console.log(data.msg);
                        }
                    }).catch(error => {
                        reject(error)
                        console.log("请求失败：", error)
                    })
                })
            }
        }
    }
)

export default useUserStore
