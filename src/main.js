import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/index'
import api from './utils/api/index'

// 组件
import './components/index'

//公共样式
import './style/app.scss'

Vue.prototype.$api = api

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
