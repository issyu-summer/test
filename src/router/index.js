import Vue from 'vue'
import Router from 'vue-router'
import configure from '@/components/configure'
import select from '@/components/select'
import search from '@/components/search'
import sql from '@/components/sqlcomponents'

Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/',
      name: 'configure',
      component: configure
    },
    {
      path: '/select',
      name: 'select',
      component: select
    },
    {
      path: '/sql',
      name: 'sql',
      component: sql
    },
  ]
})
