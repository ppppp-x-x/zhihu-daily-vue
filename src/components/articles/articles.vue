<template>
  <div class="article-container">
    <div class="article-item">
      <div class="article-nav-bar">
        <img v-if="articles.image" :src="'http://read.html5.qq.com/image?src=forum&q=5&r=0&imgflag=7&imageUrl=' + articles.image">
        <p class="article-nav-bar-title">{{articles.title}}</p>
        <p v-if="articles.image_source" class="article-nav-bar-source">——{{articles.image_source}}</p>
      </div>
      <div class="article-body" v-html="articles.body"></div>
    </div>
    <div class="article-comment-container"></div>
    <div class="article-bottom-bar-container">
      <router-link to="/comments">
      <div class="article-bottom-bar-item" @click="getComments">
        <icon name="comment-o"></icon>
      <p>{{comments.comments}}</p>
      </div>
      </router-link>
      <div class="article-bottom-bar-item">
        <icon name="heart-o"></icon>
        <p>{{comments.popularity}}</p>
      </div>
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
        comments: []
      }
    },
    methods: {
      loadCss () {
        var head = document.getElementsByTagName('head')[0]
        var linkTag = document.createElement('link')
        linkTag.id = 'dynamic-style'
        linkTag.href = this.articles.css[0].slice(0, 4) + 's' + this.articles.css[0].slice(4)
        linkTag.setAttribute('rel', 'stylesheet')
        linkTag.setAttribute('media', 'all')
        linkTag.setAttribute('type', 'text/css')
        head.appendChild(linkTag)
      },
      getComments () {
        this.$http.get('https://zhihu-daily.leanapp.cn/api/v1/contents/' + this.articles.id + '/short-comments').then(response => {
          this.$store.commit('setShortComments', response.data.COMMENTS.comments)
        }, response => {
          console.log('获取数据失败')
        })
        this.$http.get('https://zhihu-daily.leanapp.cn/api/v1/contents/' + this.articles.id + '/long-comments').then(response => {
          this.$store.commit('setLongComments', response.data.COMMENTS.comments)
        }, response => {
          console.log('获取数据失败')
        })
      }
    },
    watch: {
      articles () {
        this.loadCss()
        this.$http.get('https://zhihu-daily.leanapp.cn/api/v1/contents/extra/' + this.articles.id).then(response => {
          this.comments = response.data.DES
        }, response => {
          console.log('获取数据失败')
        })
      }
    },
    computed: {
      articles () {
        return this.$store.getters.getArticles
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .article-container
    .article-item
      .article-nav-bar
        height 270px
        overflow hidden
        img
          width 100%
          filter brightness(.8) grayscale(.4) sepia(.2)
        .article-nav-bar-title
          position absolute
          top 200px
          right 20px
          text-align right
          font-family "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif
          font-size 20px
          font-weight bold
          line-height 25px
          color white
          text-shadow 1px 1px 10px rgba(0, 0, 0, .5)
        .article-nav-bar-title:after
          display block
          position absolute
          content ""
          right 0px
          bottom -20px
          width 120px
          border 2px solid #2196f3
        .article-nav-bar-source
          position absolute
          top 285px
          right 20px
          width 70%
          text-align right
          font-family "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif
          font-size 14px
          font-weight bold
          line-height 25px
          color white
          text-shadow 1px 1px 10px rgba(0, 0, 0, .5)
    .article-body
      .main-wrap
        .headline
          .img-place-holder
            height 0px
    .article-bottom-bar-container
      display flex
      padding-right 15%
      justify-content space-around
      align-items center
      flex-wrap nowrap
      width 100%
      height 50px
      background white
      color black
      font-family "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif
      box-shadow 0 6px 6px -3px rgba(0,0,0,.2), 0 10px 14px 1px rgba(0,0,0,.14), 0 4px 20px 3px rgba(0,0,0,.12)
      .article-bottom-bar-item
        display flex
        width 60px
        justify-content space-around
        align-items center
        flex-wrap nowrap
</style>
