<template>
  <md-speed-dial md-mode="scale" class="md-fab-bottom-right" md-theme="purple">
    <md-button class="md-fab"md-fab-trigger>
      <md-icon md-icon-morph><icon name="times" scale="3"></icon></md-icon>
      <md-icon><icon name="gear" scale="3"></icon></md-icon>
    </md-button>

    <md-button @click.native="goBack" class="md-fab md-primary  md-mini md-clean">
      <md-icon><icon name="angle-double-left" scale="3"></icon></md-icon>
    </md-button>

    <md-button @click.native="scrollTop" class="md-fab md-primary  md-mini md-clean">
      <md-icon><icon name="angle-double-up" scale="3"></icon></md-icon>
    </md-button>

    <md-button @click.native="changeTheme" class="md-fab md-primary  md-mini md-clean">
      <md-icon><icon name="cloud" scale="3"></icon></md-icon>
    </md-button>
  </md-speed-dial>
</template>

<script>
  export default {
    created () {
    },
    data () {
      return {}
    },
    methods: {
      scrollTop () {
        var currentScroll = document.documentElement.scrollTop || document.body.scrollTop
        if (currentScroll > 0) {
          window.requestAnimationFrame(this.scrollTop)
          window.scrollTo(0, currentScroll - (currentScroll / 5))
        }
      },
      goBack () {
        window.history.go(-1)
      },
      changeTheme () {
        this.$store.commit('setMyTheme')
      },
      changeNightTheme () {
        this.$material.setCurrentTheme('night')
//        侧边导航栏修改
        if (document.getElementsByClassName('md-sidenav-content')[0]) {
          document.getElementsByClassName('md-sidenav-content')[0].setAttribute('style', 'background: #263238; color: white')
        }
//        评论页修改
        if (document.getElementsByClassName('comments-container')[0]) {
          document.getElementsByClassName('comments-container')[0].setAttribute('style', 'background: #263238;color: #607d8b')
        }
//        过渡组件修改
        if (document.getElementsByClassName('transition')[0]) {
          document.getElementsByClassName('transition')[0].setAttribute('style', 'background: black')
        }
//        toolbar按钮修改
        document.getElementsByClassName('md-button')[4].setAttribute('style', 'background:black')
        document.getElementsByClassName('md-button')[3].setAttribute('style', 'background:black')
        document.getElementsByClassName('md-button')[2].setAttribute('style', 'background:black')
        document.getElementsByClassName('md-button')[1].setAttribute('style', 'background:black')
//        home、theme页面list下item修改
        setTimeout(function () {
          if (document.getElementsByClassName('list-item').length) {
            for (var i = 0; i < document.getElementsByClassName('list-item').length; i++) {
              document.getElementsByClassName('list-item')[i].setAttribute('style', 'background: #263238')
              document.getElementsByClassName('list-item')[i].getElementsByTagName('p')[0].setAttribute('style', 'color: #607d8b')
            }
          }
        }, 300)
//        home页面背景修改
        if (document.getElementsByClassName('home-wrapper')[0]) {
          document.getElementsByClassName('home-wrapper')[0].setAttribute('style', 'background: black')
        }
      },
      changeDaytimeTheme () {
        this.$material.setCurrentTheme('default')
//        侧边导航栏修改
        if (document.getElementsByClassName('md-sidenav-content')[0]) {
          document.getElementsByClassName('md-sidenav-content')[0].setAttribute('style', 'background: #f9f9f9; color: #607d8b')
        }
//        评论页修改
        if (document.getElementsByClassName('comments-container')[0]) {
          document.getElementsByClassName('comments-container')[0].setAttribute('style', 'background: white;color: black')
        }
//        过渡组件修改
        if (document.getElementsByClassName('transition')[0]) {
          document.getElementsByClassName('transition')[0].setAttribute('style', 'background: white')
        }
//        toolbar按钮修改
        document.getElementsByClassName('md-button')[4].setAttribute('style', 'background:#2196f3')
        document.getElementsByClassName('md-button')[3].setAttribute('style', 'background:#2196f3')
        document.getElementsByClassName('md-button')[2].setAttribute('style', 'background:#2196f3')
        document.getElementsByClassName('md-button')[1].setAttribute('style', 'background:#2196f3')
//        home、theme下list下item修改
        setTimeout(function () {
          if (document.getElementsByClassName('list-item').length) {
            for (var i = 0; i < document.getElementsByClassName('list-item').length; i++) {
              document.getElementsByClassName('list-item')[i].setAttribute('style', 'background: white')
              document.getElementsByClassName('list-item')[i].getElementsByTagName('p')[0].setAttribute('style', 'color: black')
            }
          }
        }, 300)
//        home页面修改
        if (document.getElementsByClassName('home-wrapper')[0]) {
          document.getElementsByClassName('home-wrapper')[0].setAttribute('style', 'background: #f7f7f7')
        }
      }
    },
    computed: {
      myTheme () {
        return this.$store.getters.getMyTheme
      }
    },
    watch: {
      myTheme () {
        if (this.myTheme < 0) {
          this.changeNightTheme()
        } else {
          this.changeDaytimeTheme()
        }
      },
      $route () {
        if (this.myTheme) {
          var that = this
          that.$nextTick(function () {
            if (that.myTheme < 0) {
              that.changeNightTheme()
            } else {
              that.changeDaytimeTheme()
            }
          })
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .md-speed-dial.md-fab-bottom-right.md-theme-purple.md-mode-scale.md-direction-top
      position fixed
      right 10px
      bottom 10px
      .md-icon.md-theme-purple.material-icons
        display flex
        justify-content center
        align-items center
      .md-button.md-fab.md-theme-purple
        background #2196f3
        color white
        filter opacity(.8)
        z-index 999
</style>
