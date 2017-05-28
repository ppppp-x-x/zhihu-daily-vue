<template>
  <div class="theme-container" v-if="themes">
    <div class="theme-nav-bar">
      <img :src="navBackground">
      <p class="theme-nav-bar-desc">{{themes.description}}</p>
      <div class="theme-nav-bar-divider"></div>
      <p class="theme-nav-bar-name">{{themes.name}}</p>
    </div>
    <div class="theme-list-container">\
      <router-link to="articles">
      <div class="list-item" v-for="(item, index) in stories" :index="index" @click="getThemeArticlesIndex(index)">
        <img v-if="item.images" :src="ramp + item.images[0]">
        <p>{{item.title}}</p>
      </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    created () {
      window.scrollTo(0, 0)
    },
    data () {
      return {
        ramp: 'http://read.html5.qq.com/image?src=forum&q=5&r=0&imgflag=7&imageUrl=',
        rampCounter: 0
      }
    },
    methods: {
      getThemeArticlesIndex (index) {
        this.$http.get('https://zhihu-daily.leanapp.cn/api/v1/contents/' + this.stories[index].id).then(response => {
          if (response.data.CONTENTS.images) {
            response.data.CONTENTS.image = response.data.CONTENTS.images[0]
          }
          this.$store.commit('setArticles', response.data.CONTENTS)
        }, response => {
          console.log('获取数据失败')
        })
      }
    },
    watch: {
      themes () {
      }
    },
    computed: {
      themes () {
        return this.$store.getters.getThemes
      },
      navBackground () {
        return 'http://read.html5.qq.com/image?src=forum&q=5&r=0&imgflag=7&imageUrl=' + this.$store.getters.getThemes.background
      },
      stories () {
        return this.$store.getters.getThemes.stories
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .theme-container
    .theme-nav-bar
      height 260px
      overflow hidden
      img
        width 100%
        filter brightness(.8) grayscale(.4) sepia(.2)
      .theme-nav-bar-desc
        position absolute
        top 180px
        right 20px
        width 70%
        text-align right
        font-family "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif
        font-size 20px
        font-weight bold
        line-height 25px
        color white
        text-shadow 1px 1px 10px rgba(0, 0, 0, .5)
      .theme-nav-bar-desc:after
        display block
        position absolute
        content ""
        right 0px
        bottom -20px
        width 120px
        border 2px solid #2196f3
      .theme-nav-bar-name
        position absolute
        top 265px
        right 20px
        width 70%
        text-align right
        font-family "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif
        font-size 20px
        font-weight bold
        line-height 25px
        color white
        text-shadow 1px 1px 10px rgba(0, 0, 0, .5)
    .theme-list-container
      position absolute
      top 285px
      overflow hidden
      .list-item
        display flex
        margin 15px
        height 100px
        align-items center
        background #fff
        box-shadow 0 6px 6px -3px rgba(0,0,0,.2), 0 10px 14px 1px rgba(0,0,0,.14), 0 4px 20px 3px rgba(0,0,0,.12)
        border-radius 5px
        img
          margin-left 10px
          width 80px
          height 80px
        p
          padding-left 20px
          padding-right 20px
          font-family "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif
</style>
