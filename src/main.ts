import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'

App.prototype.$axios = axios
axios.defaults.baseURL = process.env.NODE_ENV === "production" ? "https://peirato-1grqvoqd8f5730ce-1312434121.ap-shanghai.app.tcloudbase.com" : "/api"
createApp(App).mount('#app')
