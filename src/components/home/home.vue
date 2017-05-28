<template>
  <div class="home-wrapper">
    <swiper :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <swiper-slide @click.native="getHomeSwiperArticles(0)">
        <router-link to="articles">
          <img v-if="swiperImgUrl[0]" :src="swiperImgUrl[0]">
          <p v-if="swiperUrl[0]">{{swiperUrl[0].title}}</p>
        </router-link>
      </swiper-slide>
      <swiper-slide @click.native="getHomeSwiperArticles(1)">
        <router-link to="articles">
          <img v-if="swiperImgUrl[1]" :src="swiperImgUrl[1]">
          <p v-if="swiperUrl[1]">{{swiperUrl[1].title}}</p>
        </router-link>
      </swiper-slide>
      <swiper-slide @click.native="getHomeSwiperArticles(2)">
        <router-link to="articles">
          <img v-if="swiperImgUrl[2]" :src="swiperImgUrl[2]">
          <p v-if="swiperUrl[2]">{{swiperUrl[2].title}}</p>
        </router-link>
      </swiper-slide>
      <swiper-slide @click.native="getHomeSwiperArticles(3)">
        <router-link to="articles">
          <img v-if="swiperImgUrl[3]" :src="swiperImgUrl[3]">
          <p v-if="swiperUrl[3]">{{swiperUrl[3].title}}</p>
        </router-link>
      </swiper-slide>
      <swiper-slide @click.native="getHomeSwiperArticles(4)">
        <router-link to="articles">
          <img v-if="swiperImgUrl[4]" :src="swiperImgUrl[4]">
          <p v-if="swiperUrl[4]">{{swiperUrl[4].title}}</p>
        </router-link>
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <div class="home-list-container">
      <router-link to="articles">
        <div class="list-item" v-for="(home, index) in homeLists" :index="index" :home="home"
             @click="getHomeArticles(index)">
          <img :src="home.images[0]">
          <p>{{home.title}}</p>
        </div>
      </router-link>
    </div>
    <loading></loading>
  </div>
</template>

<script>
  import loading from './../views/loading.vue'
  export default {
    created () {
      window.scrollTo(0, 0)
      this.getHomeSwiper()
      this.getHomeLists()
      var that = this
      setTimeout(function () {
        that.watchHeight()
      }, 1000)
    },
    data () {
      return {
        homes: [],
        swiperIndexArr: [],
        swiperImgUrlIndex: [],
        swiperImgUrl: [],
        swiperUrl: [],
        homeLists: [],
        heightCounter1: null,
        swiperOption: {
          autoplay: 2000,
          grabCursor: true,
          setWrapperSize: true,
          pagination: '.swiper-pagination'
        }
      }
    },
    methods: {
      getHomeSwiper () {
        this.$http.get('https://zhihu-daily.leanapp.cn/api/v1/last-stories').then(response => {
          this.homes = response.data.STORIES
          let swiperIndexArr = []
          let i = 0
          while (i < this.homes.top_stories.length) {
            swiperIndexArr.push(this.homes.top_stories[i])
            i++
          }
          this.swiperIndexArr = swiperIndexArr
          this.getSwiperImgUrlIndex()
        }, response => {
          console.log('获取数据失败')
        })
      },
      getSwiperImgUrlIndex () {
        for (var i = 0; i < this.swiperIndexArr.length; i++) {
          this.swiperImgUrlIndex.push(this.swiperIndexArr[i].id)
        }
        return (this.getSwiperUrl())
      },
      getSwiperUrl () {
        for (var i = 0; i < 5; i++) {
          this.$http.get('https://zhihu-daily.leanapp.cn/api/v1/contents/' + this.swiperImgUrlIndex[i]).then(response => {
            this.swiperUrl.push(response.data.CONTENTS)
            this.swiperImgUrl.push('http://read.html5.qq.com/image?src=forum&q=5&r=0&imgflag=7&imageUrl=' + response.data.CONTENTS.image.slice(0, 4) + response.data.CONTENTS.image.slice(5))
          }, response => {
            console.log('获取数据失败')
          })
        }
      },
      getHomeArticles (index) {
        this.$http.get('https://zhihu-daily.leanapp.cn/api/v1/contents/' + this.homeLists[index].id).then(response => {
          this.$store.commit('setArticles', response.data.CONTENTS)
        }, response => {
          console.log('获取数据失败')
        })
      },
      getHomeSwiperArticles (index) {
        this.$http.get('https://zhihu-daily.leanapp.cn/api/v1/contents/' + this.swiperUrl[index].id).then(response => {
          this.$store.commit('setArticles', response.data.CONTENTS)
        }, response => {
          console.log('获取数据失败')
        })
      },
      getHomeLists () {
        this.$http.get('https://zhihu-daily.leanapp.cn/api/v1/before-stories/' + this.nowDate).then(response => {
          for (let i = 0; i < response.data.STORIES.stories.length; i++) {
            response.data.STORIES.stories[i].images[0] = 'http://read.html5.qq.com/image?src=forum&q=5&r=0&imgflag=7&imageUrl=' + response.data.STORIES.stories[i].images[0]
          }
          this.homeLists = response.data.STORIES.stories
        }, response => {
          console.log('获取数据失败')
        })
      },
      watchHeight () {
        var heightCounter = 0
        this.heightCounter1 = 1
        var that = this
        var date = that.nowDate
        parseInt(date)
        setInterval(function () {
          if (window.screen.height + document.body.scrollTop > document.body.clientHeight - 3) {
            that.$store.commit('setShowLoading', 1)
            heightCounter++
            if (heightCounter > 1 && that.heightCounter1 === 1) {
              date = date - 1
              that.$http.get('https://zhihu-daily.leanapp.cn/api/v1/before-stories/' + date).then(response => {
                setTimeout(function () {
                  if (that.myTheme < 0) {
                    for (let i = 0; i < document.getElementsByClassName('list-item').length; i++) {
                      document.getElementsByClassName('list-item')[i].setAttribute('style', 'background: #263238')
                      document.getElementsByClassName('list-item')[i].getElementsByTagName('p')[0].setAttribute('style', 'color: #607d8b')
                    }
                  } else {
                    for (let i = 0; i < document.getElementsByClassName('list-item').length; i++) {
                      document.getElementsByClassName('list-item')[i].setAttribute('style', 'background: white')
                      document.getElementsByClassName('list-item')[i].getElementsByTagName('p')[0].setAttribute('style', 'color: black')
                    }
                  }
                }, 1)
                for (let i = 0; i < response.data.STORIES.stories.length; i++) {
                  response.data.STORIES.stories[i].images[0] = 'http://read.html5.qq.com/image?src=forum&q=5&r=0&imgflag=7&imageUrl=' + response.data.STORIES.stories[i].images[0]
                  that.homeLists.push(response.data.STORIES.stories[i])
                }
                that.$store.commit('setShowLoading', 0)
              }, response => {
                console.log('获取数据失败')
              })
            }
          }
        }, 1000)
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.heightCounter1 = 1
      })
    },
    beforeRouteLeave (to, from, next) {
      this.heightCounter1 = 0
      next()
    },
    computed: {
      nowDate () {
        return this.$store.getters.getDate
      },
      myTheme () {
        return this.$store.getters.getMyTheme
      }
    },
    components: { loading }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .home-wrapper
    width 100%
    background #F7F7F7
    .swiper-container
      height 240px
      .swiper-wrapper
        img
          width 100%
          filter brightness(.8) grayscale(.4) sepia(.2)
        p
          position absolute
          top 130px
          right 20px
          width 80%
          height 50px
          text-align right
          font-family "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif
          font-size 20px
          font-weight bold
          line-height 25px
          color white
          text-shadow 1px 1px 10px rgba(0, 0, 0, .5)
        p:after
          display block
          position absolute
          content ""
          right 0px
          bottom -10px
          width 120px
          border 2px solid #2196f3
      .swiper-pagination
        left 30%
    .home-list-container
      margin-top 10px
      overflow hidden
      .list-item
        display flex
        margin 15px
        height 100px
        align-items center
        background #fff
        box-shadow 0 6px 6px -3px rgba(0, 0, 0, .2), 0 10px 14px 1px rgba(0, 0, 0, .14), 0 4px 18px 3px rgba(0, 0, 0, .12)
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
