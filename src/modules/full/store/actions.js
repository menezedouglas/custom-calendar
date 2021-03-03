import * as types from './mutation-types'

export const ActionSetData = ({ commit }, payload) => {
  commit(types.SET_DATA, payload)
}

export const ActionSetDate = ({ commit }, payload) => {
  commit(types.SET_DATE, payload)
}

export const ActionSetCurrentLanguage = ({ commit }, payload) => {
  commit(types.SET_CURRENT_LANGUAGE, payload)
}

export const ActionSetLanguageVariables = ({ commit }, payload) => {
  commit(types.SET_LANGUAGE_VARIABLES, payload)
}
