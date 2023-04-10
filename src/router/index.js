import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path:"/",
    component:() => import("../views/Welcome.vue")
  },
  {
    path:"/GamePage",
    component:() => import("../views/GamePage.vue")
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
