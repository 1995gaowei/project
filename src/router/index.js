import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import User from '@/components/User'
import Jobs from '@/components/Jobs'

import Map from '@/components/Map'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Map
    },
    // {
    //   path: '/User',
    //   name: 'User',
    //   component: User
    // },
    // {
    //   path: '/Jobs',
    //   name: 'Jobs',
    //   component: Jobs
    // }
  ]
})
