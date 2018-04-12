import Vue from 'vue'
import Router from 'vue-router'
import Callback from '@/components/Callback'
import Connection from '@/components/Connection'
import Patients from '@/components/Patients'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Connection',
      component: Connection,
      props: true
    },
    {
      path: '/patients',
      name: 'Patients',
      component: Patients,
      props: true
    },
    {
      path: '/callback',
      name: 'Callback',
      component: Callback,
      props: false
    }
  ]
})
