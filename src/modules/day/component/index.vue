<template>
  <div class="p-3">
    <div class="row">
      <div class="col-12">
        <h2 class="text-muted">Eventos</h2>
        <hr class="my-2 mb-3">
      </div>
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
        <div class="alert alert-success">
          Não há nada para hoje, fique tranquilo!
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'day',
  data () {
    return {}
  },
  methods: {
    ...mapActions('day', ['ActionSetDate', 'ActionSetEvents']),
    ...mapGetters('day', ['getDate', 'getEvents'])
  }
}
</script>
