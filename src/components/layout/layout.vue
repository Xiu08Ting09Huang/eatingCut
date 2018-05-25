<template>
  <div class="layout-container">
    <ul class="nav-list">
      <li class="nav-item" @click="gotoHomePage">
        <svg-icon icon-class="user" />
        首页
      </li>
      <li class="nav-item" @click="goGoodsPage">
        <svg-icon icon-class="user" />
        展示所有订单
      </li>
      <li class="nav-item" @click="goUserListPage">
        <svg-icon icon-class="user" />
        业务员
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 1
    }
  },
  methods: {
    gotoHomePage () {
      this.$router.push({ path: '/main/home' })
    },
    goGoodsPage () {
      this.$router.push({ path: '/main/goods' })
    },
    goUserListPage () {
      this.$router.push({ path: '/main/userlist'})
    }
  }
}
</script>

<style scoped lang="scss">
  .layout-container {
    width:180px;
    height:100%;
    color:#fff;
    background: rgb(48,65,86);
    position:fixed;
    left:0;
    top:0;
    .nav-list{
      .nav-item{
        width:180px;
        height:56px;
        line-height: 56px;
        list-style:none;
        cursor:pointer;
        padding:0 20px;
        box-sizing:border-box;
      }
      .nav-item:hover{
        background: rgb(38,52,69);
      }
    }
  }
</style>
