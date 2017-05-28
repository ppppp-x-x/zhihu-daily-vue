import Vue from 'vue'
import home from './../components/home/home.vue'
import theme from '../components/theme/theme.vue'
import articles from './../components/articles/articles.vue'
import comments from './../components/comments/comments.vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  { path: '/home', component: home },
  { path: '/theme', component: theme },
  { path: '/articles', component: articles },
  { path: '/comments', component: comments }
]

export default new Router({
  routes
})
