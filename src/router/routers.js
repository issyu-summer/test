import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../layout/index'
import BasicLayout from '../views/display/layout/BasicLayout.vue'
Vue.use(Router)

export const constantRouterMap = [{
  path: '/login',
  meta: {
    title: '登录',
    noCache: true
  },
  component: (resolve) => require(['@/views/login'], resolve),
  hidden: true
},
{
  path: '/404',
  component: (resolve) => require(['@/views/features/404'], resolve),
  hidden: true
},
{
  path: '/401',
  component: (resolve) => require(['@/views/features/401'], resolve),
  hidden: true
},
{
  path: '/redirect',
  component: Layout,
  hidden: true,
  children: [{
    path: '/redirect/:path*',
    component: (resolve) => require(['@/views/features/redirect'], resolve)
  }]
},
// {
//   path: '/dashboard',
//   component: Layout,
//   children: [{
//     path: 'dashboard',
//     component: (resolve) => require(['@/views/home'], resolve),
//     name: 'Dashboard',
//     meta: {
//       title: '首页',
//       icon: 'index',
//       affix: true,
//       noCache: true
//     }
//   }]
// },
// {
//   path: '/user',
//   component: Layout,
//   hidden: true,
//   redirect: 'noredirect',
//   children: [{
//     path: 'center',
//     component: (resolve) => require(['@/views/system/user/center'], resolve),
//     name: '个人中心',
//     meta: {
//       title: '个人中心'
//     }
//   }]
// },
{
  path: '/userLogin',
  name: 'UserLogin',
  meta: {
    title: '用户登录 - 展示系统',
    auth: false
  },
  component: (resolve) => require(['@/views/display/login'], resolve)
},
{
  path: '/',
  redirect: '/home'
},
{
  path: '/home',
  component: BasicLayout,
  children: [{
    path: '/home',
    name: 'Home',
    meta: {
      title: '首页 - 展示系统',
      auth: true
    },
    component: (resolve) => require(['@/views/display/home'], resolve)
  }]
},
{
  path: '/search',
  component: BasicLayout,
  children: [{
    path: '/search',
    name: 'Search',
    meta: {
      title: '检索 - 展示系统',
      breadCrumb: {
        name: 'search',
        label: '资源检索',
        level: 1
      },
      auth: true
    },
    component: (resolve) => require(['@/views/display/search'], resolve)
  }]
},
{
  path: '/list',
  component: BasicLayout,
  children: [{
    path: '/list',
    name: 'List',
    meta: {
      title: '列表 - 展示系统',
      breadCrumb: {
        name: 'list',
        label: '资源列表',
        level: 1
      },
      auth: true
    },
    component: (resolve) => require(['@/views/display/list'], resolve)
  }]
},
{
  path: '/detail',
  component: BasicLayout,
  children: [{
    path: '/detail',
    name: 'Detail',
    meta: {
      title: '详情 - 展示系统',
      breadCrumb: {
        name: 'detail',
        label: '资源详情',
        level: 1
      },
      auth: true
    },
    component: (resolve) => require(['@/views/display/detail'], resolve)
  }]
},
{
  path: '/analysis',
  component: BasicLayout,
  children: [{
    path: '/analysis',
    name: 'Analysis',
    meta: {
      title: '结果分析 - 展示系统',
      breadCrumb: {
        name: 'analysis',
        label: '结果分析',
        level: 2
      },
      auth: true
    },
    component: (resolve) => require(['@/views/display/analysis/AnalysisField.vue'], resolve),
    children: [{
      path: '/analysis/detail',
      name: 'AnalysisDetail',
      meta: {
        title: '结果分析 - 展示系统',
        breadCrumb: {
          name: 'analysis',
          label: '结果分析',
          level: 2
        },
        auth: true
      },
      component: (resolve) => require(['@/views/display/analysis/AnalysisDetail.vue'], resolve)
    }]
  }]
},
{
  path: '/report',
  component: BasicLayout,
  children: [{
    path: '/report',
    name: 'Report',
    meta: {
      title: '分析报告 - 展示系统',
      breadCrumb: {
        name: 'report',
        label: '分析报告',
        level: 1
      },
      auth: true
    },
    component: (resolve) => require(['@/views/display/report'], resolve)
  }]
},
{
  path: '/404',
  component: BasicLayout,
  children: [{
    name: '404',
    path: '/404',
    meta: {
      name: '404',
      title: '404'
    },
    component: (resolve) => require(['@/views/display/exception/404.vue'], resolve)
  }]
}
]

export default new Router({
  // mode: 'hash',
  mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
