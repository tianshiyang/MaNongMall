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
      path: "/home",
      name: "home",
      component: () => import("@/views/HomeView.vue")
    },
    {
      path: "/about",
      name: "about",
      component: () => import("@/views/AboutView.vue")
    }]
  }, 
  {
    path: '/404',
    name: '404',
    component: () => import("@/views/404/404.vue")
  },
]
export default routes