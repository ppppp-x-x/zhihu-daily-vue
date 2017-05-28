<template>
  <div class="transition" v-if="showTransition">
    <div class="loader-inner pacman">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
  export default {
    created () {
    },
    data () {
      return {
      }
    },
    methods: {
    },
    watch: {
    },
    computed: {
      showTransition () {
        return this.$store.getters.getShowTransition
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .transition
    position absolute
    display flex
    width 100%
    height 1000px
    top 50px
    left 0
    justify-content center
    background white
    z-index 1111
  @-webkit-keyframes pacman-balls {
    75% {
      opacity: 0.7; }

    100% {
      -webkit-transform: translate(-100px, -6.25px);
      transform: translate(-100px, -6.25px); } }

  @keyframes pacman-balls {
    75% {
      opacity: 0.7; }

    100% {
      -webkit-transform: translate(-100px, -6.25px);
      transform: translate(-100px, -6.25px); } }

  .pacman {
    position: relative;
    margin-top 250px
  }
  .pacman > div:nth-child(2) {
    -webkit-animation: pacman-balls 1s 0s infinite linear;
    animation: pacman-balls 1s 0s infinite linear; }
  .pacman > div:nth-child(3) {
    -webkit-animation: pacman-balls 1s 0.25s infinite linear;
    animation: pacman-balls 1s 0.25s infinite linear; }
  .pacman > div:nth-child(4) {
    -webkit-animation: pacman-balls 1s 0.5s infinite linear;
    animation: pacman-balls 1s 0.5s infinite linear; }
  .pacman > div:nth-child(5) {
    -webkit-animation: pacman-balls 1s 0.75s infinite linear;
    animation: pacman-balls 1s 0.75s infinite linear; }
  .pacman > div:first-of-type {
    width: 0px;
    height: 0px;
    border-right: 25px solid transparent;
    border-top: 25px solid #2196f3;
    border-left: 25px solid #2196f3;
    border-bottom: 25px solid #2196f3;
    border-radius: 25px;
  }
  .pacman > div:nth-child(2), .pacman > div:nth-child(3), .pacman > div:nth-child(4), .pacman > div:nth-child(5) {
    background-color: #2196f3;
    width: 15px;
    height: 15px;
    border-radius: 100%;
    margin: 2px;
    width: 10px;
    height: 10px;
    position: absolute;
    -webkit-transform: translate(0, -6.25px);
    -ms-transform: translate(0, -6.25px);
    transform: translate(0, -6.25px);
    top: 25px;
    left: 100px;
  }
</style>
