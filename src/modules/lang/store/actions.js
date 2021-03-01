import * as types from './mutation-types'

export const ActionSetCurrent = ({ commit, dispatch, state }, payload) => {
  const current = state.current
  if (current === null || current !== payload) {
    commit(types.SET_CURRENT, payload)
    dispatch('ActionSetVars', payload)
  }
}

export const ActionSetVars = ({ commit }, payload) => {
  switch (payload) {
    case 'pt-br': {
      const lang = require('../languages/pt-br')
      commit(types.SET_VARS, lang)
      break
    }
  }
}
