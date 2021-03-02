import * as types from './mutation-types'

export default {
  [types.SET_DATE] (state, payload) {
    state.date = payload
  },
  [types.SET_EVENTS] (state, payload) {
    state.events = payload
  }
}
