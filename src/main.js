// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import axios from 'axios'
Vue.prototype.$http = axios

import store from './vuex/store'

import VueMaterial from 'vue-material'
Vue.use(VueMaterial)
import 'vue-material/dist/vue-material.css'

import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
Vue.component('icon', Icon)

import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)

import home from './components/home/home.vue'
import theme from './components/theme/theme.vue'
import articles from './components/articles/articles.vue'

import './assets/animate.min.css'

Vue.config.productionTip = false

Vue.material.registerTheme({
  default: {
    primary: 'blue',
    accent: 'black',
    warn: 'red',
    background: 'white'
  },
  night: {
    primary: 'black',
    accent: 'black',
    warn: 'red',
    background: 'black'
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {
    App, Icon, home, theme, articles
  }
})
router.push('/home')
