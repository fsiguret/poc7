import Vue from 'vue'
import App from './App.vue'
import store from './store';
import router from './router';
import VeeValidate from 'vee-validate';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faPlus)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false
Vue.use(VeeValidate);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
