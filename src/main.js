import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import 'assets/css/globle.css'
import 'assets/icon/iconfont.css'


Vue.config.productionTip = false
Vue.prototype.$bus = new Vue();
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
