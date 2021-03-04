import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

Vue.use(Vuex)

// eslint-disable-next-line no-new
new Vuex.Store({ modules })
