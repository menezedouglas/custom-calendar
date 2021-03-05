<template>
  <div>
    <div class="row">
      <div
        class="col-12"
        v-for="(event, index) in getEvents()"
        v-bind:key="index"
      >
        <div class="card border-0 shadow">
          <div class="card-body">
            <div class="row">
              <div class="col">
                <h4 class="p-0 m-0">{{ event.title }}</h4>
              </div>
              <div class="col-auto">
                <span class="badge rounded-pill bg-primary">{{ event.type }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="alert alert-primary">
          {{ lang.components.day.messages.nothing_today }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'day',
  props: ['langname'],
  data () {
    return {
      lang: {
        components: {
          day: {
            title: '',
            messages: {
              nothing_today: ''
            }
          }
        }
      },
      month: '',
      year: ''
    }
  },
  methods: {
    ...mapActions('day', ['ActionSetDate', 'ActionSetEvents']),
    ...mapGetters('day', ['getDate', 'getEvents']),
    ...mapActions('month', ['ActionSetDate']),
    ...mapGetters('month', ['getDays', 'getMonth', 'getYear']),
    ...mapActions('lang', ['ActionSetCurrent']),
    ...mapGetters('lang', ['getVars']),
    setLanguage () {
      this.ActionSetCurrent(this.langname)
      this.lang = this.getVars().default
      this.month = this.lang.months[this.getMonth()]
      this.year = this.getYear().toString()
    }
  },
  mounted () {
    this.setLanguage()
  }
}
</script>
