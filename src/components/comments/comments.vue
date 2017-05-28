<template>
  <div class="comments-container">
    <div class="short-comments-container">
      <div class="short-comments-item short-comments-title-container">
        <p class="short-comments-title">短评</p>
      </div>
      <div class="short-comments-item" v-for="item in shortComments">
        <div class="short-comments-item-info">
        <img class="short-comments-avatar" :src="item.avatar">
          <p class="short-comments-author">{{item.author}}</p>
        </div>
          <p class="short-comments-content">{{item.content}}</p>
        <div class="short-comments-item-date-container">
          <p class="short-comments-item-date">2017/05/24</p>
          <div class="short-comments-item-like">
            <icon name="thumbs-o-up"></icon>
            <p>{{item.likes}}</p>
          </div>
        </div>
        <div class="short-comments-grid"></div>
      </div>
    </div>
    <div class="long-comments-container">
      <div class="long-comments-item long-comments-title-container">
        <p class="long-comments-title">长评</p>
      </div>
      <div class="long-comments-item" v-for="item in longComments">
        <div class="long-comments-item-info">
          <img class="long-comments-avatar" :src="item.avatar">
          <p class="long-comments-author">{{item.author}}</p>
        </div>
        <p class="long-comments-content">{{item.content}}</p>
        <div class="long-comments-item-date-container">
          <p class="long-comments-item-date">2017/05/24</p>
          <div class="long-comments-item-like">
            <icon name="thumbs-o-up"></icon>
            <p>{{item.likes}}</p>
          </div>
        </div>
        <div class="long-comments-grid"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    created () {
      window.scrollTo(0, 0)
    },
    methods: {},
    computed: {
      shortComments () {
        return this.$store.getters.getShortComments
      },
      longComments () {
        return this.$store.getters.getLongComments
      }
    },
    watch: {
      shortComments () {
      },
      longComments () {
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .comments-container
    background #F7F7F7
    width 100%
    .short-comments-container
      width 100%
      .short-comments-title-container
        box-shadow 0 6px 6px -3px rgba(0,0,0,.2), 0 10px 14px 1px rgba(0,0,0,.14), 0 4px 18px 3px rgba(0,0,0,.12)
      .short-comments-item
        display flex
        width 100%
        justify-content flex-start
        align-items flex-start
        flex-wrap wrap
        .short-comments-title
          padding-top 10px
          padding-left 5%
          padding-bottom 10px
          font-size 18px
          font-family "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif
        .short-comments-item-info
          display flex
          width 100%
          justify-content flex-start
          align-items center
          flex-wrap nowrap
          .short-comments-avatar
            margin-top 20px
            margin-left 2%
            width 10%
            border-radius 50%
          .short-comments-author
            padding-top 20px
            padding-left 5%
            width 83%
            font-weight bold
        .short-comments-content
          display block
          margin 0 0 !important
          padding-right 20px
          padding-bottom 20px
          padding-left 17%
          width 100%
        .short-comments-grid
          margin-top 20px
          margin-left 17%
          width 83%
          height 1px
          background #2196f3
        .short-comments-item-date-container
          display flex
          width 100%
          justify-content space-between
          align-items center
          flex-wrap nowrap
          .short-comments-item-date
            display block
            padding-left 17%
          .short-comments-item-like
            display flex
            padding-right 30px
            justify-content space-between
            align-items center
            flex-wrap nowrap
            p
              padding-left 10px
    .long-comments-container
      width 100%
      .long-comments-title-container
        box-shadow 0 6px 6px -3px rgba(0,0,0,.2), 0 10px 14px 1px rgba(0,0,0,.14), 0 4px 18px 3px rgba(0,0,0,.12)
      .long-comments-item
        display flex
        width 100%
        justify-content flex-start
        align-items flex-start
        flex-wrap wrap
        .long-comments-title
          padding-top 10px
          padding-left 5%
          padding-bottom 10px
          font-size 18px
          font-family "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif
        .long-comments-item-info
          display flex
          width 100%
          justify-content flex-start
          align-items center
          flex-wrap nowrap
          .long-comments-avatar
            margin-top 20px
            margin-left 2%
            width 10%
            border-radius 50%
          .long-comments-author
            padding-top 20px
            padding-left 5%
            width 83%
            font-weight bold
        .long-comments-content
          display block
          margin 0 0 !important
          padding-right 20px
          padding-bottom 20px
          padding-left 17%
          width 100%
        .long-comments-grid
          margin-top 20px
          margin-left 17%
          width 83%
          height 1px
          background #2196f3
        .long-comments-item-date-container
          display flex
          width 100%
          justify-content space-between
          align-items center
          flex-wrap nowrap
          .long-comments-item-date
            display block
            padding-left 17%
          .long-comments-item-like
            display flex
            padding-right 30px
            justify-content space-between
            align-items center
            flex-wrap nowrap
            p
              padding-left 10px
</style>
