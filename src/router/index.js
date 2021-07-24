import Vue from 'vue'
import Router from 'vue-router'
import configure from '@/components/configure'
import select from '@/components/select'

import sql from '@/components/sqlcomponents'
import add from '@/components/add'

Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/configure',
      name: 'configure',
      component: configure
    },
    {
      path: '/',
      name: 'select',
      component: select
    },
    {
      path: '/sql',
      name: 'sql',
      component: sql
    },
    {
      path: '/add',
      name: 'add',
      component: add
    },
  ]
})
