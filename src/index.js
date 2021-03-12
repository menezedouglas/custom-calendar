import { component as fullWidthComponent } from './modules/full'
import example from './App.vue'

function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component("full-width-calendar", fullWidthComponent);
  Vue.component("example-calendar", example)
}

const plugin = {
  install
};

let GlobalVue = null;
if (typeof window !== "undefined") {
  GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
  GlobalVue = global.vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

fullWidthComponent.install = install;
example.install = install;

export default {
  fullWidthComponent,
  example
};
