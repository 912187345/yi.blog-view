// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
window.SUCCESS = 'success';
window.FAIL = 'fail';

import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import store from './store/index'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.config.productionTip = false

Vue.use(ElementUI)

import common from './common.js';
Vue.prototype.$axios = axios;
Vue.prototype.$getApi = common.getApi;
console.log(store);
const mvvm = new Vue({
  el: '#app',
  router,
  store:store,
  template: '<App/>',
  components: { App }
})
