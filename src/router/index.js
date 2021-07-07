import Vue from 'vue'
import Router from 'vue-router'
import configure from '@/components/configure'

Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/',
      name: 'configure',
      component: configure
    }
  ]
})
