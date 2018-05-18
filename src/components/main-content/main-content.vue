<template>
  <div class="main-content-container">
    <nav-top></nav-top>
    <div class="content-wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NavTop from '@/components/navtop/navtop'
export default {
  data () {
    return {
      msg: 1
    }
  },
  components: {
    NavTop
  }
}
</script>

<style scoped lang="scss">
  .main-content-container{
    margin-left:180px;
    height:100%;
    background: #eee;
    .content-wrapper{
      width:100%;
      height:calc(100% - 100px);
      padding:20px;
      box-sizing:border-box;
    }
  }
</style>
