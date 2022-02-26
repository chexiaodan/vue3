import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { globalRegister } from './global'
import 'element-plus/dist/index.css'
import 'normalize.css'
import './assets/css/index.less'
import { setupStore } from './store/index'
import App from './App.vue'
import router from './router'
import store from './store'

// ts声明全局函数
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $filters: any
  }
}

const app = createApp(App)

app.use(globalRegister)
app.use(ElementPlus, {
  locale: zhCn
})
app.use(store)
setupStore()
app.use(router)

app.mount('#app')
