import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Login = () => import('../views/login')
const Main = () => import('../views/main')
const User = () => import('../views/main/children/User.vue')
const Merchant = () => import('../views/main/children/Merchant.vue')
const Terminal = () => import('../views/main/children/Terminal.vue')

const routes = [
  {
    path: '/',
    name: '/',
    component: Login
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/main',
    name: 'main',
    component: Main,
    redirect: '/main/user',
    children: [
      {
        path: 'user',
        name: 'user',
        component: User,
      },
      {
        path: 'merchant',
        name: 'merchant',
        component: Merchant,
      },
      {
        path: 'terminal',
        name: 'terminal',
        component: Terminal,
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
