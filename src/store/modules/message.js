import { queryAllMessages }  from "@/api/system/message";
import {defineStore} from "pinia";

const useMessageStore = defineStore(
    'message',
    {
        state: () => ({
        }),
        actions: {
            queryAllMessages() {
                return new Promise((resolve, reject) => {
                    queryAllMessages().then(response => {
                        const data = response.data
                        // 传回数据
                        resolve(data)
                        console.log("请求成功：", data)
                    }).catch(error => {
                        reject(error)
                        console.log("请求失败：", error)
                    })
                })
            }
        }
})

export default useMessageStore