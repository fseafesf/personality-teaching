import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { encrypt, decrypt } from './utils/jsencrypt'

import "normalize.css"
import "./assets/css/index.css"

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import cookies from 'vue-cookies'

import { login } from '@/services'

login({
  username: 'cs',
  password: 'S0V7hZspCxHtukSEgdf2lkq0voUYye7zrZ33zTln8Tats15RVQU0GRbNecyMlEyPzvgRQzFDxVNoevgWhaISJ57Kg26X6inXcSzI+9Sjw3Uk3+PJVa1ss4bMqelWsZOX8nJRC+jTpV4MKM6kdbMFYhnGP1sYdm0W7zLhR8HkvjY='
}).then(res => {
  // console.log(res)
})


Vue.prototype.$cookies = cookies;
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


