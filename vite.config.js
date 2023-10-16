import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 别名配置 在项目里可以使用 @ 表示 src 文件夹
    },
    base: './', // 设置打包路径
  }
})
