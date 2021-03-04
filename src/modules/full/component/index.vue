<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap');

@import '~bootstrap/dist/css/bootstrap.min.css';

*{
  font-family: 'Roboto',sans-serif !important;
  margin: 0;
  padding: 0;
}

#left_bar_ctrl {
  display: none;
}

#left_bar_ctrl:checked ~ .left-bar .left-bar-content {
  opacity: 0 !important;
  visibility: hidden !important;
  padding: 15px 0px !important;
}

#left_bar_ctrl:checked ~ .left-bar {
  width: 50px;
  padding: 0;
}

#left_bar_ctrl:checked ~ label>#btn_left_bar {
  left: 0 !important;
}

#left_bar_ctrl:checked ~ .top-bar {
  width: calc(100% - 50px) !important;
}

#left_bar_ctrl:checked ~ .content {
  width: calc(100% - 50px) !important;
}

#btn_left_bar {
  position: absolute;
  top: 10px;
  left: 310px;
  z-index: 100;

  width: 50px;
  height: 50px;

  color: #c1c1c1;
  cursor: pointer;
  font-size: 25pt;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: all .4s ease-in-out;
}

#btn_left_bar:hover {
  color: black;
}

.left-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 400px;
  height: 100%;
  border-right: 1px solid #c1c1c1;
  transition: all .4s ease-in-out;
}

.left-bar-content {
  padding: 15px 22px;
  opacity: 1;
  visibility: visible;
  transition: all .4s ease-in-out;
}

.top-bar {
  position: fixed;
  top: 0;
  right: 0;
  width: calc(100% - 400px);
  height: 60px;
  border-bottom: 1px solid #c1c1c1;
  padding: 10px 20px;
  transition: all .4s ease-in-out;
}

.content {
  position: fixed;
  z-index: -1;
  top: 60px;
  right: 0;
  width: calc(100% - 400px);
  padding: 22px;
  transition: all .4s ease-in-out;
}

.btn-select-language {
  font-size: 20pt !important;
  margin: 0 !important;
  padding: 0 !important;
}

.btn-select-language:hover {
  color: #0d6efd !important;
}

.btn-select-language:focus {
  outline: none !important;
  box-shadow: none !important;
}

</style>

<template>
  <div>
    <input type="checkbox" id="left_bar_ctrl">
    <label for="left_bar_ctrl">
      <div
        id="btn_left_bar"
        data-bs-toggle="tooltip"
        data-bs-placement="right"
        title="Abrir calendário"
      >
        <i class="far fa-calendar-alt"></i>
      </div>
    </label>
    <div class="left-bar">
      <section class="left-bar-content">
        <month
          :langname="(lang) ? lang : `pt-br`"
          mode="mini"
          :date="date"
          @changeDay="changeDay($event)"
        ></month>
      </section>
    </div>
    <div class="top-bar">
      <div class="row">
        <div class="col p-2">
          <h4 class="text-muted">{{ language.components.day.title }}</h4>
        </div>
        <div class="col-auto p-2">
          <small class="text-secondary">{{ day }} de {{ month }} de {{ year }}</small>
        </div>
        <div class="col-auto">
          <div class="dropdown">
            <button
              class="btn btn-select-language dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="fas fa-language"></i>
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <a
                  class="dropdown-item"
                  href="#"
                  @click="setLanguage('pt-br')"
                >
                  Português do Brasil
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <day
        :langname="(lang) ? lang : `pt-br`"
      ></day>
    </div>
  </div>
</template>

<script>
import { component as month } from '@/modules/month'
import { component as day } from '@/modules/day'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'custom-calendar',
  props: {
    lang: {
      required: true
    },
    date: {
      required: true
    },
    data: {
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
      day: ''
    }
  },
  components: {
    month,
    day
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
    changeDay (date) {
      this.$emit('changeDate', date)
      this.setLanguage(this.lang, true, date)
    }
  },
  mounted () {
    this.setLanguage()
  }
}
</script>
