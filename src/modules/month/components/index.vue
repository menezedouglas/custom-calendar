<template>
  <div>
      <h1>{{ month.toUpperCase() }}</h1>
      <table id="calendar"></table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'month',
  prop: ['langname'],
  data () {
    return {
      lang: [],
      month: '',
      year: '',
      days: [],
      now: new Date()
    }
  },
  methods: {
    ...mapActions('month', ['ActionSetDate']),
    ...mapGetters('month', ['getDays', 'getMonth', 'getYear']),
    ...mapActions('lang', ['ActionSetCurrent']),
    ...mapGetters('lang', ['getVars']),
    setLanguage () {
      this.ActionSetCurrent('pt-br')
      this.lang = this.getVars().default
      this.month = this.lang.months[this.getMonth() - 1]
      this.days.map(day => {
        const data = new Date(day.date)
        day.end_week = this.lang.days[data.getDay()].end_week
        day.col = data.getDay()
      })
      this.year = this.getYear().toString()
    },
    generateTable () {
      const days = this.days
      this.days = { rows: [], cols: [] }
      this.lang.days.map((weekDay, index) => {
        const col = {
          end_week: weekDay.end_week,
          name: weekDay.name
        }
        this.days.cols.push(col)
      })

      for (let r = 0; r < 6; r++) {
        var row = []
        for (let c = 0; c < 7; c++) {
          row.push('')
          if (c + 1 === 7) {
            this.days.rows.push(row)
          }
        }
      }

      let rows = 0
      days.map(data => {
        const col = new Date(data.date).getDay()
        this.days.rows[rows][col] = data.day
        if (col >= 6) rows++
      })

      console.log(this.days.rows)
    },
    setDate () {
      this.ActionSetDate(this.now)
      this.days = this.getDays()
    }
  },
  mounted () {
    this.setDate()
    this.setLanguage()
    this.generateTable()
  }
}
</script>

<style>

</style>
