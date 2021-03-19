<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap');

@import '~bootstrap/dist/css/bootstrap.min.css';

*{
  font-family: 'Roboto',sans-serif !important;
  margin: 0;
  padding: 0;
}

.mini-component {
  width: 400px;
  height: 380px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 15px;
}

</style>

<template>
  <div class="mini-component">
    <div class="row">
      <div v-if="showMonth" class="col-12">
        <month
          :langname="(lang) ? lang : `pt-br`"
          mode="mini"
          :date="date"
          @changeDay="changeDay($event)"
          @backwardMonth="changeMonthOrYear($event)"
          @backwardYear="changeMonthOrYear($event)"
          @forwardMonth="changeMonthOrYear($event)"
          @forwardYear="changeMonthOrYear($event)"
        ></month>
      </div>
      <div v-if="showDay" class="col-12 pt-4">
        <div class="row">
          <div class="col-auto">
            <button
              @click="() => { showMonth = !showMonth; showDay = !showDay }"
              class="btn btn-sm btn-primary"
              style="margin-left: 5px"
            >
              <i class="fas fa-chevron-left"></i>
            </button>
          </div>
          <div class="col px-0">
            <h5 class="py-1 px-0">Eventos para {{ day }} de {{ month }} de {{ year }}</h5>
          </div>
        </div>
        <hr class="my-2 mb-2">
        <div class="card card-markups">
          <div class="card-body">
            <div
              class="card card-markup"
              v-for="(date, index) in eventsDay"
              v-bind:key="index"
            >
              <div class="card-body">
                <div class="row">
                  <div :class="`col-auto ${getClassDate(date.type)}`">
                    <i class="fas fa-circle"></i>
                  </div>
                  <div class="col">
                    <p class="p-0 m-0" style="font-weight: bold;">{{ date.title }}</p>
                    <small class="text-muted" style="font-size: 8pt;">
                      {{ getShowDate(date) }}
                    </small>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="eventsDay.length === 0"
              class="alert alert-success"
            >
              Não há programação para o dia {{ day }}!
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { component as month } from './../../month'
import { mapActions, mapGetters } from 'vuex'
import configs from './../../../../package.json'
export default {
  name: 'mini',
  props: {
    lang: {
      required: true
    },
    date: {
      required: true
    },
    data: {
      required: false
    },
    options: {
      required: false
    }
  },
  data () {
    return {
      language: {
        components: {
          day: {
            title: ''
          }
        }
      },
      month: '',
      year: '',
      day: '',
      eventsDay: [],
      eventsMonth: [],
      configs,
      showDay: false,
      showMonth: true
    }
  },
  components: {
    month
  },
  methods: {
    ...mapGetters('day', ['getDate', 'getEvents']),
    ...mapGetters('month', ['getDays', 'getMonth', 'getYear']),
    ...mapActions('lang', ['ActionSetCurrent']),
    ...mapGetters('lang', ['getVars']),
    setLanguage (lang = null, changeDate = false, newDate = null) {
      this.ActionSetCurrent(lang || this.lang)
      this.language = this.getVars().default
      this.month = this.language.months[this.getMonth()]
      this.year = this.getYear().toString()
      this.day = ((changeDate) ? (
        (typeof newDate === 'object') ? newDate.getDate() : new Date(newDate).getDate()
      ) : (
        (typeof this.date === 'object') ? this.date.getDate() : new Date(this.date).getDate()
      ))
    },
    changeDay (date, allOfMonth = false, emit = true) {
      if (emit) {
        this.$emit('changeDate', date)
        this.showDay = true
        this.showMonth = false
      }
      this.setLanguage(this.lang, true, date)
      const showDate = {
        other: (data, param) => {
          const dataDate = new Date(data.date)
          const ref = (typeof param === 'object') ? param : new Date(param)
          if (allOfMonth) {
            if (
              dataDate.getMonth() === ref.getMonth() &&
              dataDate.getFullYear() === ref.getFullYear()
            ) {
              this.eventsMonth.push(data)
            }
          } else {
            if (
              dataDate.getDate() === ref.getDate() &&
              dataDate.getMonth() === ref.getMonth() &&
              dataDate.getFullYear() === ref.getFullYear()
            ) {
              this.eventsDay.push(data)
            }
          }
        },
        event: (data, param) => {
          const init = new Date(data.init)
          const end = new Date(data.end)
          const ref = (typeof param === 'object') ? param : new Date(param)
          if (allOfMonth) {
            if (
              (
                init.getMonth() === ref.getMonth() &&
                init.getFullYear() === ref.getFullYear()
              ) ||
              (
                end.getMonth() === ref.getMonth() &&
                end.getFullYear() === ref.getFullYear()
              )
            ) {
              this.eventsMonth.push(data)
            }
          } else {
            if (
              (
                init.getDate() <= ref.getDate() &&
                end.getDate() >= ref.getDate()
              ) &&
              (
                (
                  init.getMonth() === ref.getMonth() &&
                  init.getFullYear() === ref.getFullYear()
                ) ||
                (
                  end.getMonth() === ref.getMonth() &&
                  end.getFullYear() === ref.getFullYear()
                )
              )
            ) {
              this.eventsDay.push(data)
            }
          }
        },
        holiday: (data, param) => {
          const dataDate = new Date(data.date)
          const ref = (typeof param === 'object') ? param : new Date(param)

          if (allOfMonth) {
            if (
              dataDate.getMonth() === ref.getMonth() &&
              dataDate.getFullYear() === ref.getFullYear()
            ) {
              this.eventsMonth.push(data)
            }
          } else {
            if (
              dataDate.getDate() === ref.getDate() &&
              dataDate.getMonth() === ref.getMonth() &&
              dataDate.getFullYear() === ref.getFullYear()
            ) {
              this.eventsDay.push(data)
            }
          }
        }
      }
      if (allOfMonth) { this.eventsMonth = [] } else { this.eventsDay = [] }
      this.data.map(data => {
        showDate[data.type](data, date)
      })
    },
    getClassDate (type) {
      switch (type.toUpperCase()) {
        case 'EVENT': {
          return 'text-primary'
        }
        case 'HOLIDAY': {
          return 'text-success'
        }
        case 'OTHER': {
          return 'text-warning'
        }
        default: {
          return 'text-info'
        }
      }
    },
    getShowDate (data) {
      let date = null
      let init = null
      let end = null

      switch (data.type.toUpperCase()) {
        case 'HOLIDAY': {
          date = new Date(data.date)
          return `Em ${date.toLocaleDateString()}`
        }
        case 'EVENT': {
          init = new Date(data.init)
          end = new Date(data.end)
          return `De ${init.toLocaleDateString()} até ${end.toLocaleDateString()}`
        }
        case 'OTHER': {
          date = new Date(data.date)
          return `Em ${date.toLocaleDateString()}`
        }
      }
    },
    changeMonthOrYear (data) {
      this.changeDay(data, true, false)
    }
  },
  mounted () {
    const date = (typeof this.date === 'object') ? this.date : new Date(this.date)
    this.changeDay(date, true, false)
  }
}
</script>
