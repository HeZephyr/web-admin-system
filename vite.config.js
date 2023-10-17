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
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'], // 导入时可以省略的后缀名
  },
  server: {
    host: '0.0.0.0',
    port: 8080,
    open: true,
    cors: true,
    proxy: {
        '/nuaaapp': {
            target: 'http://123.56.80.53:8088',
            changeOrigin: true,
        }
    }
  },
  //fix:error:stdin>:7356:1: warning: "@charset" must be the first rule in the file
  css: {
    postcss: {
      plugins: [
        {
          postcssPlugin: 'internal:charset-removal',
          AtRule: {
            charset: (atRule) => {
              if (atRule.name === 'charset') {
                atRule.remove();
              }
            }
          }
        }
      ]
    }
  }
})
