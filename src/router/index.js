import Vue from 'vue'
import Router from 'vue-router'
import basic from '@/components/basic'
import ranking from '@/components/ranking'
import configure from '@/components/configure'

Vue.use(Router)

export default new Router({
  routes: [
    
    // {
    //   path: '/',
    //   name: 'ranking',
    //   component: ranking
    // },
    {
      path: '/',
      name: 'configure',
      component: configure
    }
    // {
    //   path: './basic.vue',
    //   name: 'basic',
    //   component: basic
    // }
    
  ]
})
