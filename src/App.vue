<template>
  <div class="container-fluid">
    <div class="row" >
      <div class="col-auto" style="border-right: 1px solid #c1c1c1;height: 100vh;">
        <div class="row">
          <div class="col-12">
            <month langname="pt-br" mode="mini"></month>
          </div>
        </div>
      </div>
      <div class="col">
        <day></day>
      </div>
    </div>
  </div>
</template>

<script>
import { component as month } from '@/modules/month'
import { component as day } from '@/modules/day'
export default {
  name: 'custom-calendar',
  data () {
    return {}
  },
  components: {
    month,
    day
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap');

*{ font-family: 'Roboto' !important; }
</style>
