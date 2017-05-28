/**
 * Created by Administrator on 2017/5/11.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  date: null,
  homes: [],
  themes: [],
  articles: [],
  shortComments: [],
  longComments: [],
  showLoading: 0,
  showTransition: 0,
  myTheme: 1
}

const mutations = {
  setDate (state, source) {
    state.date = source
  },
  setHomes (state, source) {
    state.homes = source
  },
  setThemes (state, source) {
    state.themes = source
  },
  setArticles (state, source) {
    state.articles = source
  },
  setShortComments (state, source) {
    state.shortComments = source
  },
  setLongComments (state, source) {
    state.longComments = source
  },
  setMyTheme (state) {
    state.myTheme = -state.myTheme
  },
  setShowLoading (state, source) {
    state.showLoading = source
  },
  setShowTransition (state, source) {
    state.showTransition = source
  }
}

const getters = {
  getDate: state => {
    return state.date
  },
  getThemes: state => {
    return state.themes
  },
  getArticles: state => {
    return state.articles
  },
  getShortComments: state => {
    return state.shortComments
  },
  getLongComments: state => {
    return state.longComments
  },
  getMyTheme: state => {
    return state.myTheme
  },
  getShowLoading: state => {
    return state.showLoading
  },
  getShowTransition: state => {
    return state.showTransition
  }
}

export default new Vuex.Store({
  state,
  mutations,
  getters
})
