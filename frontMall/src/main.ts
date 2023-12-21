import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import "@/assets/global.css"

import App from './App.vue'
import router from './router'
import { useUserMenuStore } from "@/stores/useUserMenu"

const app = createApp(App)

app.use(createPinia())
app.use(ElementPlus, { locale: zhCn })
app.use(router)

app.mount('#app')

const store = useUserMenuStore()

// const whiteList = ['/login', '/', '/404'] // 不重定向白名单
// router.beforeEach((to, from, next) => {
//   if (!whiteList.includes(to.path) && !store.flatMenu.includes(to.path)) {
//     next("/404")
//   }
//   next()
// })
