import * as types from './mutation-types'

export default {

  [types.SET_YEAR] (state, payload) {
    state.year = payload
  },

  [types.SET_MONTH] (state, payload) {
    state.month = payload
  },

  [types.SET_DAYS] (state, payload) {
    state.days = payload
  }

}
