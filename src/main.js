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
// login({
//   username: 'cs',
//   password: '123456'
// }).then(res => {
//   console.log(res)
//   let x = encrypt("123456");
//   console.log(x);
//   console.log(decrypt(x));
// })

Vue.prototype.$cookies = cookies;
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


