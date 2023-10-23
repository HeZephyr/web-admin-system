import { createApp } from 'vue'

import Cookies from 'js-cookie'

import '@/utils/permission'

import ElementPlus from 'element-plus'
import locale from 'element-plus/es/locale/lang/zh-cn' // 中文语言
import 'element-plus/dist/index.css'
import '@/assets/styles/index.scss' // global css

import plugins from '@/plugins'

// svg图标
import 'virtual:svg-icons-register'
import SvgIcon from '@/components/SvgIcon'
import elementIcons from '@/components/SvgIcon/svgicon'

import { parseTime, resetForm} from '@/utils/utils'

import App from './App'
import store from './store'
import router from './router'

// 自定义分页组件
import Pagination from '@/components/Pagination'
// 自定义表格工具组件
import RightToolbar from '@/components/RightToolbar'

const app = createApp(App)

// 全局注册组件
app.use(store)
app.use(router)
app.use(elementIcons)
app.component('svg-icon', SvgIcon)
app.use(plugins)

// 全局方法挂载
app.config.globalProperties.parseTime = parseTime
app.config.globalProperties.resetForm = resetForm

// 全局组件挂载
app.component('RightToolbar', RightToolbar)
app.component('Pagination', Pagination)


// 使用element-plus 并且设置全局的大小
app.use(ElementPlus, {
    locale: locale,
    // 支持 large、default、small
    size: Cookies.get('size') || 'default'
})
app.mount('#app')
