import * as types from './mutation-types'

export const ActionSetYear = ({ commit }, payload) => {
  commit(types.SET_YEAR, payload)
}

export const ActionSetMonth = ({ commit }, payload) => {
  commit(types.SET_MONTH, payload)
}

export const ActionSetDays = ({ commit }, payload) => {
  commit(types.SET_DAYS, payload)
}

export const ActionSetDate = ({ dispatch }, payload) => {
  let year = 0
  let month = 0
  let days = []
  let date = null

  switch (typeof payload) {
    case 'object': {
      date = payload
      year = date.getFullYear()
      month = date.getMonth()
      break
    }
    default: {
      date = new Date(payload)
      year = date.getFullYear()
      month = date.getMonth()
      break
    }
  }

  dispatch('ActionSetYear', year)
  dispatch('ActionSetMonth', month)

  const countDays = new Date(year, month + 1, 0).getDate()

  days = []

  for (let i = 1; i <= countDays; i++) {
    const date = `${((month + 1).toString().length < 2) ? `0${(month + 1)}` : (month + 1)}/${(i.toString().length < 2) ? `0${i}` : i}/${year}`
    days.push({
      day: `${(i.toString().length < 2) ? `0${i}` : i}`,
      date,
      today: (new Date(new Date().toDateString()).getTime() === new Date(date).getTime()),
      events: []
    })
  }

  dispatch('ActionSetDays', days)
}
