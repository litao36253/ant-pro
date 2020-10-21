import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: { name: 'dashboard' },
    hideInMenu: true
  },
  {
    path: '/user',
    name: 'user',
    redirect: { name: 'user.login' },
    hideInMenu: true,
    component: { render: h => h('router-view') },
    children: [
      {
        path: 'login',
        name: 'user.login',
        component: () => import(/* webpackChunkName: "user.login" */ '../views/user/login/Login.vue')
      },
      {
        path: 'register',
        name: 'user.register',
        component: () => import(/* webpackChunkName: "user.register" */ '../views/user/register/Register.vue')
      }
    ]
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    redirect: { name: 'dashboard.analysis' },
    meta: {
      icon: 'dashboard',
      title: '仪表盘'
    },
    component: () => import(/* webpackChunkName: "basicLayout" */ '../layouts/basicLayout/BasicLayout.vue'),
    children: [
      {
        path: 'analysis',
        name: 'dashboard.analysis',
        meta: {
          title: '分析页'
        },
        component: () => import(/* webpackChunkName: "dashboard.analysis" */ '../views/dashboard/analysis/Analysis.vue')
      }
    ]
  },
  {
    path: '/403',
    name: '403',
    hideInMenu: true,
    component: () => import('../views/errorPages/403/403.vue')
  },
  {
    path: '*',
    name: '404',
    hideInMenu: true,
    component: () => import('../views/errorPages/404/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, form, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
