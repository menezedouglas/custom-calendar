<style>
  .month-arya {
    display: inline-block;
    padding: 15px 0 0 0;
    margin: 0 auto;
  }

  .calendar {
    width: 100%;
    height: 100%;
    display: inline-block !important;
  }

  .calendar thead tr th {
    font-size: 9pt;
    color: #c1c1c1;
  }

  .calendar tbody tr td {
    transition: all .1s ease-in-out;
  }

  .day-arya:hover {
    background-color: rgba(0, 0, 0, .1);
  }

  .util-day {
    font-weight: bold !important;
    color: #000 !important;
  }

  .is-today {
    color: #fff !important;
    border-radius: 100%;
    background-color: #198754;
    opacity: .5;
  }

  .day-selected {
    color: #fff !important;
  }

  .calendar tbody tr .util-day:hover {
    background: rgba(0,0,0,.1) !important;
  }

  .day-inactive {
    background: none !important;
    cursor: default !important;
  }

  .calendar-mini {
    text-align: center;
  }

  .calendar-mini .day-arya {
    width: 50px;
    height: 50px;
    font-size: 8pt;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all .1s ease-in-out;
  }

  .calendar-mini .day-end-week {
    color: #c1c1c1 !important;
  }

  .calendar-normal {
    width: auto !important;
  }

  .calendar-normal thead {
    display: none;
  }

  .calendar-normal,
  .calendar-normal tbody,
  .calendar-normal tbody tr,
  .calendar-normal tbody tr td {
    margin: 0 !important;
    padding: 0 !important;
  }

  .calendar-normal .day-arya {
    width: calc(calc(100vw - 230px) / 7) !important;
    height: calc(calc(100vh - 30px) / 6) !important;
    font-size: 12pt;
    border: 1px solid rgba(0,0,0,.1);
  }

</style>

<template>
  <div class="month-arya">
    <div class="row">
      <div class="col px-4 pb-3 pt-2">
        <div class="row">
          <div class="col-auto">
            <div
              class="btn-group btn-group-sm"
              role="group"
              aria-label="Basic example"
            >
              <button
                type="button"
                class="btn btn-sm btn-primary"
                @click="backward('year')"
              >
                <i class="fas fa-fast-backward"></i>
              </button>
              <button
                type="button"
                class="btn btn-sm btn-primary"
                @click="backward('month')"
              >
                <i class="fas fa-step-backward"></i>
              </button>
            </div>
          </div>
          <div class="col text-center">
            <h5 v-if="mode === 'mini'">{{ month.toUpperCase() }} {{ year }}</h5>
          </div>
          <div class="col-auto">
            <div
              class="btn-group btn-group-sm"
              role="group"
              aria-label="Basic example"
            >
              <button
                type="button"
                class="btn btn-sm btn-primary"
                @click="forward('month')"
              >
                <i class="fas fa-step-forward"></i>
              </button>
              <button
                type="button"
                class="btn btn-sm btn-primary"
                @click="forward('year')"
              >
                <i class="fas fa-fast-forward"></i>
              </button>
            </div>
          </div>
        </div>
        <hr class="my-2 mb-2">
      </div>
    </div>
      <table id="calendar" :class="`calendar calendar-${mode}`">
        <thead>
          <tr>
            <th
              v-for="(col, index) in table.cols"
              v-bind:key="index"
              :class="(col.end_week) ? `pb-2` : `util-day pb-2`"
            >
              {{ col.name }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, rIndex) in table.rows"
            v-bind:key="rIndex"
          >
            <td
              v-for="(data, dIndex) in row"
              v-bind:key="dIndex"
              :class="(table.cols[dIndex].end_week) ? `day-end-week` : `` "
            >
              <div
                :class="(data.today) ? `${data.styles} is-today` : data.styles"
                @click="setDay(data.day)"
              >
                {{ (data.day !== '') ? data.day : '' }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'month',
  props: ['langname', 'mode', 'date'],
  data () {
    return {
      lang: {},
      month: '',
      year: '',
      days: [],
      table: []
    }
  },
  methods: {
    ...mapActions('month', ['ActionSetDate']),
    ...mapGetters('month', ['getDays', 'getMonth', 'getYear']),
    ...mapActions('lang', ['ActionSetCurrent']),
    ...mapGetters('lang', ['getVars']),
    setLanguage () {
      this.ActionSetCurrent(this.langname)
      this.lang = this.getVars().default
      this.month = this.lang.months[this.getMonth()]
      this.year = this.getYear().toString()
    },
    generateTable (changeDay = false, day = null) {
      const days = this.days
      this.table = { rows: [], cols: [] }
      this.lang.days_small.map((weekDay, index) => {
        const col = {
          end_week: weekDay.end_week,
          name: weekDay.name
        }
        this.table.cols.push(col)
      })

      for (let r = 0; r < 6; r++) {
        var row = []
        for (let c = 0; c < 7; c++) {
          row.push('')
          if (c + 1 === 7) {
            this.table.rows.push(row)
          }
        }
      }

      let rows = 0
      days.map(data => {
        const col = new Date(data.date).getDay()
        data.styles = this.getDayStyles(data, changeDay, day)
        this.table.rows[rows][col] = data
        if (col >= 6) rows++
      })
    },
    setDate (date = null) {
      this.ActionSetDate((date) || this.date)
      this.days = this.getDays()
    },
    setDay (day) {
      const date = new Date(this.getYear(), this.getMonth(), parseInt(day))
      this.ActionSetDate(date)
      this.generateTable(true, day)
      this.$emit('changeDay', date)
    },
    isToday (day, changeDay = false, dayToChange = null) {
      var param = null

      if (changeDay) {
        if (dayToChange !== null) {
          param = new Date(this.getYear(), this.getMonth(), parseInt(dayToChange))
        } else {
          param = new Date(this.getYear(), this.getMonth(), parseInt(day))
        }
      } else {
        param = (typeof this.date === 'object') ? this.date : new Date(this.date)
      }

      const date = new Date(this.getYear(), this.getMonth(), parseInt(day))

      return (param.toDateString() === date.toDateString())
    },
    getDayStyles (data, changeDay = false, day = null) {
      const date = new Date(data.date)

      return (
        (data.day !== '')
          ? (
            (this.table.cols[date.getDay()].end_week)
              ? ((this.isToday(data.day, changeDay, day)) ? (
                (changeDay) ? 'day-arya day-selected bg-primary' : 'day-arya'
              ) : 'day-arya')
              : ((this.isToday(data.day, changeDay, day)) ? (
                (changeDay) ? 'day-arya util-day day-selected bg-primary' : 'day-arya util-day'
              ) : 'day-arya util-day')
          ) : 'day-arya day-inactive'
      )
    },
    backward (type) {
      const types = {
        month: () => {
          const month = (this.getMonth() - 1 < 0) ? 11 : this.getMonth() - 1
          const year = (this.getMonth() - 1 < 0) ? this.getYear() - 1 : this.getYear()
          const date = new Date(year, month, 1)
          this.setDate(date)
          this.setLanguage()
          this.generateTable()
          this.$emit('backwardMonth', date)
        },
        year: () => {
          const month = this.getMonth()
          const year = this.getYear() - 1
          const date = new Date(year, month, 1)
          this.setDate(date)
          this.setLanguage()
          this.generateTable()
          this.$emit('backwardYear', date)
        }
      }
      types[type]()
    },
    forward (type) {
      const types = {
        month: () => {
          const month = (this.getMonth() + 1 > 11) ? 0 : this.getMonth() + 1
          const year = (this.getMonth() + 1 > 11) ? this.getYear() + 1 : this.getYear()
          const date = new Date(year, month, 1)
          this.setDate(date)
          this.setLanguage()
          this.generateTable()
          this.$emit('forwardMonth', date)
        },
        year: () => {
          const month = this.getMonth()
          const year = this.getYear() + 1
          const date = new Date(year, month, 1)
          this.setDate(date)
          this.setLanguage()
          this.generateTable()
          this.$emit('forwardYear', date)
        }
      }
      types[type]()
    }
  },
  mounted () {
    this.setDate()
    this.setLanguage()
    this.generateTable()
  }
}
</script>
