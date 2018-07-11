<template>
  <div class="login-container">
    <com-login></com-login>
  </div>
</template>

<script>
import comLogin from '@/base/login/login'
export default {
  data () {
    return {
      msg: 1
    }
  },
  components: {
    comLogin
  }
}
</script>

<style scoped lang="scss">
  .login-container{
    background: #283238;
    height:100vh;
    box-sizing: border-box;
    /*display:flex;*/
    /*align-items: center;*/
    /*justify-content: center;*/
  }
</style>
