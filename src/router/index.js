import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

/* layout */
import Layout from '../views/layout/Layout'

Vue.use(Router)

 /**
  * icon : the icon show in the sidebar
  * hidden : if `hidden:true` will not show in the sidebar
  * redirect : if `redirect:noredirect` will not redirct in the levelbar
  * noDropdown : if `noDropdown:true` will not has submenu in the sidebar
  * meta : `{ role: ['admin'] }`  will control the page role
  **/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    hidden: true,
    children: [{ path: 'dashboard', component: _import('dashboard/index') }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: 'Example',
  //   icon: 'zujian',
  //   children: [
  //     { path: 'index', name: 'Form', icon: 'zonghe', component: _import('page/form') }
  //   ]
  // },

  // {
  //   path: '/table',
  //   component: Layout,
  //   redirect: '/table/index',
  //   icon: 'tubiao',
  //   noDropdown: true,
  //   children: [{ path: 'index', name: 'Table', component: _import('table/index'), meta: { role: ['admin'] }}]
  // },

  {
    path: '/monitoring',
    component: Layout,
    redirect: 'noredirect',
    name: '实时监控',
    icon: 'jiankong',
    children: [
      { path: 'map', name: '地图监控', icon: 'ditu', component: _import('monitoring/Map') },
      { path: 'slamp', name: '单灯监控', icon: 'dengpao', component: _import('monitoring/SLamp') },
      { path: 'sloop', name: '回路监控', icon: 'huilu', component: _import('monitoring/SLoop') }
    ]
  },
  //设备管理
  {
    path: '/equ_manage',
    component: Layout,
    redirect: 'noredirect',
    name: '设备管理',
    icon: 'shebei',
    children: [
      { path: 'concentration', name: '集中控制器管理', icon: 'kongzhi', component: _import('equ_manage/Concentration') },
      { path: 'scontroller', name: '单灯控制器管理', icon: 'dengpao', component: _import('equ_manage/SController') },
    ]
  },
  //策略管理
  {
    path: '/strategy',
    component: Layout,
    redirect: 'noredirect',
    name: '策略管理',
    icon: 'celue',
    children: [
      { path: 'lib', name: '策略组库', icon: 'kucun', component: _import('strategy/StrategyLib') },
      { path: 'set', name: '策略设置', icon: 'setting', component: _import('strategy/StrategySet') },
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
