import message from './message'

export default function installPlugins(app){
    // 模态框对象
    app.config.globalProperties.$modal = message
}
