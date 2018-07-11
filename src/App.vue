<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function(){
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
body,h1,h2,h3,h4,h5,h6,ul,li,.el-table{
  margin: 0;
  padding: 0;
  font-size: 1.2vh;
}
label {
    /* color:cornflowerblue; */
    text-align: right;
    display: inline-block;
    width:100px;
  }
body,html {
  width: 100%;
  height: 100%;
}
.el-button,.el-menu-item,.el-input,.el-input__inner,label {
  font-size: 1.3vh;
}
.el-button {
  padding: 1.1vh 1.8vh;
}
.el-button--small, .el-button--small.is-round {
  font-size: 1.1vh;
  padding:0.8vh 1.4vh;
}
.el-button--text {
  padding-left: 0;
  padding-right: 0;
}
.el-table .cell {
  line-height: 2vh;
}
.el-input__inner {
  height: 3.7vh;
  line-height: 3.7vh;
  display: inline-block;
}
.search {
  display: inline-block;
  
}
</style>
