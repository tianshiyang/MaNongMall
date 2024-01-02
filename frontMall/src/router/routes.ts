const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import("@/views/Login/Login.vue")
  },
  {
    path: '/',
    redirect: "/welcome",
    component: () => import("@/components/MenuLayout/MenuLayout.vue"),
    children: [
      {
        path: "/welcome",
        name: "welcome",
        component: () => import("@/views/welcome.vue")
      }, {
        path: "/menu",
        name: "menu",
        component: () => import("@/views/Settings/Menu/Menu.vue")
      }, {
        path: "/permission",
        name: "permission",
        component: () => import("@/views/Settings/Permission/Permission.vue")
      }, {
        path: "/role",
        name: "role",
        component: () => import("@/views/Settings/Role/Role.vue")
      }, {
        path: "/role-detail",
        name: "roleDetail",
        component: () => import("@/views/Settings/Role/RoleDetail.vue")
      }, {
        path: "/user",
        name: "user",
        component: () => import("@/views/Settings/User/User.vue")
      }, {
        path: "/classification-manager",
        name: "classificationManager",
        component: () => import("@/views/Classification/Classification.vue")
      }, {
        path: "/goods-list",
        name: "goodsList",
        component: () => import("@/views/Goods/GoodsList.vue")
      }]
    }, 
  {
    path: '/404',
    name: '404',
    component: () => import("@/views/404/404.vue")
  },
]
export default routes