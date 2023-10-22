import { createApp } from 'vue'

import Cookies from 'js-cookie'

import '@/utils/permission'

import ElementPlus from 'element-plus'
import locale from 'element-plus/es/locale/lang/zh-cn' // 中文语言
import 'element-plus/dist/index.css'
import '@/assets/styles/index.scss' // global css

// svg图标
import 'virtual:svg-icons-register'
import SvgIcon from '@/components/SvgIcon'
import elementIcons from '@/components/SvgIcon/svgicon'

import App from './App'
import store from './store'
import router from './router'

const app = createApp(App)

// 全局注册组件
app.use(store)
app.use(router)
app.use(elementIcons)
app.component('svg-icon', SvgIcon)


// 使用element-plus 并且设置全局的大小
app.use(ElementPlus, {
    locale: locale,
    // 支持 large、default、small
    size: Cookies.get('size') || 'default'
})
app.mount('#app')
