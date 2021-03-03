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
  top: 60px;
  right: 0;
  width: calc(100% - 400px);
  padding: 22px;
  transition: all .4s ease-in-out;
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
        <month :langname="(lang) ? lang : `pt-br`" mode="mini"></month>
      </section>
    </div>
    <div class="top-bar">
      <h2 class="text-muted">Eventos</h2>
    </div>
    <div class="content">
      <day></day>
    </div>
  </div>
</template>

<script>
import { component as month } from '@/modules/month'
import { component as day } from '@/modules/day'
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
  components: {
    month,
    day
  },
  created () {
    console.log(this.lang)
  }
}
</script>
