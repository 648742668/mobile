import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path:'/login',
    name:'Login',
    //登录界面路径
    component: () => import('@/views/login')
  },
  {
    path:'/search',
    name:'Search',
    component: () => import('@/views/search')
  },
  {
    path:'/search_results',
    name:'SearchResults',
    component: () => import('@/views/search_result')
  },
  {
    path:"/detail",
    name:"Detail",
    component:()=>import('@/views/detail')

  },
  {
    path: '/',
    name: 'Index',
    redirect:'/main',
    component: () => import('@/views'),
    children: [

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
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
