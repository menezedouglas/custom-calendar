<template>
  <div>
    <month lang="pt-br"></month>
  </div>
</template>

<script>
import { component as month } from '@/modules/month'
export default {
  name: 'custom-calendar',
  data () {
    return {}
  },
  components: {
    month
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap');

*{ font-family: 'Roboto'; }
</style>
