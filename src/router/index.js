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
    redirect: '/main',
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
        component: () => import(/* webpackChunkName: "about" */ '../views/me/index'),
      },
    ]
  },
  {
    path: '/login',
    name: 'loginIndex',
    //登录界面路径
    component: () => import('@/views/login')
  },
  {
    path: '/sign',
    name: 'signIndex',
    //登录界面路径
    component: () => import('@/views/sign'),
    children: [
      {
        path: '/signForm',
        name: 'signForm',
        component: () => import('../views/sign/signForm')
      }
    ]
  },
  {
    path: '/forgetPwd',
    name: 'forgetPassword',
    component: () => import('@/views/password/forgetPassword')
  },
  ,
  {
    path: '/changePwd',
    name: 'changePassword',
    component: () => import('@/views/password/changePassword')
  },
  {
    path: '/userSetting',
    name: 'settingIndex',
    component: () => import('@/views/me/setting'),
  },
  {
    path: '/address',
    name: 'addressList',
    component: () => import('@/views/me/setting/address/index'),
  },
  {
    path: '/addressEdit',
    name: 'addressEdit',
    component: () => import('@/views/me/setting/address/edit'),
  },
  {
    path: '/comments',
    name: 'comments',
    component: () => import('@/views/comments/index'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
