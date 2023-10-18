import {handleMessage, queryAllMessages, queryAllNotReviewMessages} from "@/api/system/message";
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
                        // 传回数据
                        resolve(response)
                    }).catch(error => {
                        reject(error)
                        console.log("请求失败：", error)
                    })
                })
            },
            queryAllNotReviewMessages() {
                return new Promise((resolve, reject) => {
                    queryAllNotReviewMessages().then(response => {
                        // 传回数据
                        resolve(response)
                    }).catch(error => {
                        reject(error)
                        console.log("请求失败：", error)
                    })
                })
            },
            handleMessage(id, review) {
                return new Promise((resolve, reject) => {
                    handleMessage(id, review).then(response => {
                        // 传回数据
                        resolve()
                    }).catch(error => {
                        reject(error)
                        console.log("请求失败：", error)
                    })
                })
            }
        }
})

export default useMessageStore