import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  
  const config = loadEnv(mode,'./')
  return {
    plugins: [vue()],
    server:{
      proxy:{
        '/netease':{
          target:config.VITE_BASIC_URL,
          changeOrigin:true,
          ws:true,
          rewrite:(path)=>path.replace(/^\/netease/,'')
        },
        '/sohu':{
          target:'https://pv.sohu.com/',
          changeOrigin:true,
          ws:true,
          rewrite:(path)=>path.replace(/^\/sohu/,'')
        }
      }
  }
}})
