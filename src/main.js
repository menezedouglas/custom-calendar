import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import '@/modules/bootstrap'

createApp(App).use(store).mount('#app')
