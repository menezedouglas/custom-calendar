<template>
  <div>
    <mini
      lang="pt-br"
      :date="new Date()"
      :data="database"
      @changeDate="changeDate($event)"
      :options="{
        selectLanguage: true,
        showDate: true
      }"
    ></mini>
  </div>
</template>

<script>
import { component as mini } from './modules/mini'
export default {
  name: 'custom-calendar',
  data () {
    return {
      database: [
        {
          date: '03/15/2021',
          title: 'Feriado 2',
          type: 'holiday'
        },
        {
          date: '03/05/2021',
          title: 'Feriado 1',
          type: 'holiday'
        },
        {
          init: '03/01/2021 18:00:00',
          end: '03/03/2021 12:30:00',
          title: 'Evento 1',
          type: 'event'
        },
        {
          init: '03/03/2021 18:00:00',
          end: '03/06/2021 12:30:00',
          title: 'Evento 2',
          type: 'event'
        },
        {
          date: '03/22/2021',
          title: 'Outros',
          type: 'other'
        }
      ]
    }
  },
  components: {
    mini
  },
  methods: {
    changeDate (date) {
      //
    }
  }
}
</script>
