import axios from 'axios'
import { getToken } from "@/utils/auth";

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
export default service