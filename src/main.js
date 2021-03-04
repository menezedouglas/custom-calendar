import Vue from 'vue'
import App from './App.vue'
import store from './store'
import bootstrap from '@/modules/bootstrap'

import '@fortawesome/fontawesome-free/css/all.min.css'
import '@fortawesome/fontawesome-free/js/all.min.js'

// eslint-disable-next-line no-new
new Vue({
  store,
  bootstrap,
  render: h => h(App)
}).$mount('#app')
