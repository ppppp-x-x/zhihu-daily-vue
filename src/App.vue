<template>
  <div id="app">
    <div class="phone-viewport">
      <md-toolbar>
        <md-button class="md-icon-button" @click.native="toggleLeftSidenav">
          <icon name="bars"></icon>
        </md-button>
        <h2 class="md-title">知乎日报</h2>
        <h2 class="md-date">{{myDate}}</h2>
      </md-toolbar>
      <md-sidenav class="md-left" ref="leftSidenav" @open="open('Left')" @close="close('Left')">
        <md-toolbar class="md-min">
          <div class="md-toolbar-container">
            <div>
              <img class="avatar" src="./assets/user_avatar.png" alt="People">
              <p class="user_name">Harrison94pxxxxx</p>
            </div>
            <div class="back-btn" @click="toggleLeftSidenav">
              <icon name="chevron-left"></icon>
            </div>
            </md-avatar>
          </div>
        </md-toolbar>
        <div class="side-list-container">
          <router-link to="home" @click.native="toggleLeftSidenav">
            <div class="side-list-item">
              <span><icon name="home" scale="1.5"></icon><p style="padding-left: 10px">Home</p></span>
            </div>
          </router-link>
          <router-link to="theme">
            <div class="side-list-item" v-for="(item, key) in appLists" :appLists="appLists" :index="item.id"
                 @click="setTheme()">
              <span><p>{{item.name}}</p></span>
              <icon class="side-right-icon" name="plus-square-o"></icon>
            </div>
          </router-link>
        </div>
      </md-sidenav>
      <!--<div class="setting-btn">-->
      <!--<icon name="cog"></icon>-->
      <!--</div>-->
    </div>
      <router-view></router-view>
    <toolbar></toolbar>
    <transition></transition>
  </div>
</template>

<script>
  import toolbar from './components/views/toolbar.vue'
  import transition from './components/views/transition.vue'
  export default {
    name: 'app',
    created () {
      window.scrollTo(0, 0)
      this.getMyDate()
      this.$http.get('https://zhihu-daily.leanapp.cn/api/v1/themes').then(response => {
        this.appLists = response.data.THEMES.others
      }, response => {
        console.log('获取数据失败')
      })
    },
    data () {
      return {
        appLists: [],
        myDate: null
      }
    },
    methods: {
      toggleLeftSidenav () {
        this.$refs.leftSidenav.toggle()
      },
      open (ref) {
//        document.getElementsByTagName('body')[0].setAttribute('style', 'overflow:hidden')
      },
      close (ref) {
//        document.getElementsByTagName('body')[0].setAttribute('style', 'overflow:auto')
      },
      setTheme () {
        this.toggleLeftSidenav()
        let index = event.currentTarget.getAttribute('index')
        this.$http.get('https://zhihu-daily.leanapp.cn/api/v1/themes/' + index).then(response => {
          this.$store.commit('setThemes', response.data.THEMEDES)
        }, response => {
          console.log('获取数据失败')
        })
      },
      getMyDate () {
        var myDate = new Date()
        var year = myDate.getFullYear()
        var month = myDate.getMonth() + 1
        if (month < 10) {
          month = '0' + month
        }
        var date = myDate.getDate()
        if (date < 10) {
          date = '0' + date
        }
        this.myDate = year + '/' + month + '/' + date
        var nowDate = year + month + date
        this.$store.commit('setDate', nowDate)
      }
    },
    watch: {
      $route () {
        this.$store.commit('setShowTransition', 1)
        var that = this
        setTimeout(function () {
          that.$store.commit('setShowTransition', 0)
        }, 1000)
      }
    },
    components: {toolbar, transition}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    .md-toolbar
      width 100%
      .md-title
        font-family "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif
        text-shadow 1px 1px 10px rgba(0, 0, 0, .5)
      .md-date
        position absolute
        top 22px
        right 20px
        font-family "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif
        text-shadow 1px 1px 10px rgba(0, 0, 0, .5)
    .md-sidenav-content
      max-width 250px
      overflow hidden
      background #f9f9f9
      z-index 999
      .md-toolbar-container
        display flex
        height 50px
        flex-wrap nowrap
        justify-content space-between
        align-self center
        div
          display flex
          flex-wrap nowrap
          align-items center
          .avatar
            margin-left 10px
            width 50px
            height 50px
            border-radius 50%
          .user_name
            padding-left 10px
        .back-btn
          display flex
          margin-right 10px
          justify-content flex-end
          width 50px
      .control-btn
        margin-top 15px
        display flex
        justify-content center
        align-items center
        flex-wrap nowrap
        div
          display flex
          width 33%
          justify-content center
          align-items center
          flex-wrap wrap
          text-align center
          p
            width 100%
      .side-list-container
        margin-top 10px
        .side-list-item
          display flex
          height 50px
          flex-wrap nowrap
          justify-content space-between
          align-items center
          color #607d8b
          span
            display flex
            margin-left 15px
            p
              margin-top 0
              margin-bottom 0
              font-size 16px
          .side-right-icon
            margin-right 15px
</style>
