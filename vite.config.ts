import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server:{
    port:3000,
    proxy:{
      '/netease':{
        target:'https://c.m.163.com/',
        changeOrigin:false,
        ws:true,
        rewrite:(path)=>path.replace(/^\/netease/,'')
      },
      '/sohu':{
        target:'https://pv.sohu.com/',
        changeOrigin:true,
        rewrite:(path)=>path.replace(/^\/sohu/,'')
      }
    }
  }
})
