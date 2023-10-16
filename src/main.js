import { createApp } from 'vue'

import Cookies from 'js-cookie'

import ElementPlus from 'element-plus'

import '@/assets/styles/index.scss' // global css

import App from './App.vue'
import store from './store'
import router from './router'

const app = createApp(App)

// 全局注册组件
app.use(store)
app.use(router)


// 使用element-plus 并且设置全局的大小
app.use(ElementPlus, {
    // 支持 large、default、small
    size: Cookies.get('size') || 'default'
})
app.mount('#app')
