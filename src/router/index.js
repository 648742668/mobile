import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect:"/main",
    // component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/main',
    name: 'Main',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/main/index')
  },
  {
    path: '/category',
    name: 'Category',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/category/index')
  },
  {
    path: '/cart',
    name: 'Cart',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/cart/index')
  },
  {
    path: '/me',
    name: 'Me',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/me/index')
  },
  {
    path: '/orderDetail',
    name: 'OrderDetail',
    component: () => import('../views/me/orderDetail')
  },
  {
    path: '/comment',
    name: 'Comment',
    component: () => import('../views/me/comment')
  },
  {
    path: '/footPrint',
    name: 'FootPrint',
    component: () => import('../views/me/footPrint')
  },
  {
    path: '/favorite',
    name: 'Favorite',
    component: () => import('../views/me/favorite')
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('../views/cart/checkout')
  },
  {
    path: '/paymentWaiting',
    name: 'PaymentWaiting',
    component: () => import('../views/cart/paymentWaiting')
  },
  {
    path: '/paymentSuccess',
    name: 'PaymentSuccess',
    component: () => import('../views/cart/paymentSuccess')
  },
  {
    path: '/paymentFailure',
    name: 'PaymentFailure',
    component: () => import('../views/cart/paymentFailure')
  },
  {
    path: '/paymentWakeup',
    name: 'PaymentWakeup',
    component: () => import('../views/cart/paymentWakeup')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
