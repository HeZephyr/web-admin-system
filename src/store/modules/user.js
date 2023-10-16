import { login } from '@/api/login'
import {defineStore} from "pinia";

const useUserStore = defineStore(
    "user",
    {
        state: () => ({

        }),
        actions: {
            login(userInfo) {
                const account = userInfo.account.trim()
                const password = userInfo.password
                return new Promise((resolve, reject) => {
                    login(account, password).then(response => {
                        const data = response.data
                        resolve(data)
                    }).catch(error => {
                        reject(error)
                    })
                })
            }
        }
    }
)

export default useUserStore
