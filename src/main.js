import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import bootstrap from '@/modules/bootstrap'

import '@fortawesome/fontawesome-free/css/all.min.css'
import '@fortawesome/fontawesome-free/js/all.min.js'

const app = createApp(App)

app.use(store)
app.use(bootstrap)

app.mount('#app')
