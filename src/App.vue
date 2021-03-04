<template>
  <div>
    <full
      lang="pt-br"
      :date="new Date()"
      :data="[]"
      @changeDate="changeDate($event)"
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
      console.log(date)
    }
  }
}
</script>
