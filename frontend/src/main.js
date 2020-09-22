import Vue from 'vue'

import store from './store';
import router from './router';
import { ValidationObserver, ValidationProvider, extend, localize } from 'vee-validate';
import fr from 'vee-validate/dist/locale/fr.json';
import * as rules from 'vee-validate/dist/rules';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import App from './App.vue'


Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

localize('fr', fr);

library.add(faPlus);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
