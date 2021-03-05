<template>
  <div>
    <full
      lang="pt-br"
      :date="new Date()"
      :data="{
        holidays: [
          {
            date: '03/15/2021',
            title: 'Feriado 2'
          },
          {
            date: '03/05/2021',
            title: 'Feriado 1'
          }
        ],
        events: [
          {
            init: '03/01/2021 18:00:00',
            end: '03/03/2021 12:30:00',
            title: 'Evento 1'
          },
          {
            init: '03/03/2021 18:00:00',
            end: '03/06/2021 12:30:00',
            title: 'Evento 2'
          }
        ],
        others: [
          {
            date: '03/22/2021',
            title: 'Outros'
          }
        ]
      }"
      @changeDate="changeDate($event)"
      :options="{}"
    ></full>
  </div>
</template>

<script>
import { component as full } from '@/modules/full'
export default {
  name: 'custom-calendar',
  data () {
    return {}
  },
  components: {
    full
  },
  methods: {
    changeDate (date) {
      //
    }
  }
}
</script>
