// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import VueGoodTable from 'vue-good-table'
import FullCalendar from 'vue-full-calendar'
import 'vue-good-table/dist/vue-good-table.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'fhirclient'

Vue.use(VueResource)
Vue.use(BootstrapVue)
Vue.use(VueGoodTable)
Vue.use(FullCalendar)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
