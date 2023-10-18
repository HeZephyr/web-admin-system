import axios from 'axios'
import { getToken } from "@/utils/auth";
import { ElMessage } from "element-plus";

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    baseURL: import.meta.env.VITE_APP_BASE_API,
    // 超时
    timeout: 5000
})
// request拦截器
service.interceptors.request.use(config => {
  // 是否需要设置token
    const isToken = (config.headers || {}).isToken === false
    if (getToken() && !isToken) {
        config.headers['Authorization'] = getToken()
    }
    return config
})
service.interceptors.response.use(response => {
    console.log(response)
    // 未设置状态码则默认成功状态
    const code = response.data.statusCode || 0
    // 获取错误信息
    const msg = response.data.msg
    if (code === 1 || code === 2) {
        // 不存在该用户或者密码错误
        ElMessage({ message: msg, type: 'error' })
        return Promise.reject(new Error(msg))
    } else {
        return Promise.resolve(response.data)
    }
})
export default service