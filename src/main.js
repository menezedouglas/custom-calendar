import '@fortawesome/fontawesome-free/css/all.min.css'
import '@fortawesome/fontawesome-free/js/all.min.js'

import Vue from 'vue'
import App from './App.vue'
import store from './store'
import bootstrap from './modules/bootstrap'

Vue.config.productionTip = false

new Vue({
  store,
  bootstrap,
  render: h => h(App)
}).$mount('#app')
