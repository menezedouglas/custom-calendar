import * as types from './mutation-types'

export default {
  [types.SET_DATE] (state, payload) {
    state.date = payload
  },
  [types.SET_DATA] (state, payload) {
    state.data = payload
  },
  [types.SET_CURRENT_LANGUAGE] (state, payload) {
    state.currentLanguage = payload
  },
  [types.SET_LANGUAGE_VARIABLES] (state, payload) {
    state.languageVariables = payload
  }
}
