import * as types from './mutation-types'

export default {
  [types.SET_CURRENT] (state, payload) {
    state.current = payload
  },
  [types.SET_VARS] (state, payload) {
    state.vars = payload
  }
}
