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

const whiteList = ['/login', '/', '/404', '/welcome'] // 不重定向白名单
router.beforeEach(async (to, from, next) => {
  if (!store.flatMenu?.length) {
    // 如果没有flatMenu，则证明是第一次加载，第一次加载的时候，请求数据，之后便不再请求
    await store.getUserMenu()
  }
  if (!whiteList.includes(to.path) && !store.flatMenu.map(item => item.menu_path).includes(to.path)) {
    // 如果当前用户没有该路由，则跳404
    next("/404")
  }
  let title = ""
  switch (to.path) {
    case "/404":
      title = "页面找不到了"
      break
    case "/welcome":
      title = "欢迎使用"
      break
    case "login": 
      title = "登录"
      break
    default: 
      title = store.flatMenu.filter(item => item.menu_path == to.path)[0]?.menu_name || "码农商城"
  }
  next()
  document.title = title
})
