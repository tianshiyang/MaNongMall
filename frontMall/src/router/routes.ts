const routes = [{
    path: '/login',
    name: 'login',
    component: () => import("@/views/Login/Login.vue")
  },
  {
    path: '/',
    name: 'home',
    component: () => import("@/components/MenuLayout/MenuLayout.vue"),
    children: [{
      path: "/menu",
      name: "menu",
      component: () => import("@/views/Settings/Menu/Menu.vue")
    },
    {
      path: "/permission",
      name: "permission",
      component: () => import("@/views/Settings/Permission/Permission.vue")
    }]
  }, 
  {
    path: '/404',
    name: '404',
    component: () => import("@/views/404/404.vue")
  },
]
export default routes