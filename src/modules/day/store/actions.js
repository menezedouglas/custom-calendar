import * as types from './mutation-types'

export const ActionSetDate = ({ commit }, payload) => {
  commit(types.SET_DATE, payload)
}

export const ActionSetEvents = ({ commit }, payload) => {
  commit(types.SET_EVENTS, payload)
}
