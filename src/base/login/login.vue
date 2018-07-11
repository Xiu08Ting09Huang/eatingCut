<template>
  <div class="login-container">
    <el-form class="login-form" autoComplete="on"  ref="loginForm" label-position="left" onsubmit="return false;">
      <div class="title-container">
        <h3 class="title">吃相砍价后台管理系统</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
        <el-input name="username" type="text"  autoComplete="on" placeholder="请输入用户名" v-model="userName" />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>

        <el-input name="password"  :type="passwordType"  autoComplete="on" placeholder="请输入密码" v-model="userPassword"  @keyup.enter.native="userLoginBtn" />
        <!-- <input type="hidden" id="keyup"  @keyup.13="keyup"> -->

        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>

      <el-button type="primary" style="width:100%;margin-bottom:30px;" @click="userLoginBtn">登录</el-button>
    </el-form>
  </div>
</template>

<script>
import { userLogin } from "api/http";

export default {
  data() {
    return {
      passwordType: 'password',
      userName: '',
      userPassword: ''
    };
  },
  methods: {
    // 隐藏显示密码
    showPwd() {
      // console.log(123)
      if (this.passwordType === 'password') {
        this.passwordType = '';
      } else {
        this.passwordType = 'password';
      }
    },
    // 登录
    userLoginBtn() {
      // alert('999')
      userLogin({
        userName: this.userName,
        userPassword: this.userPassword
      })
        .then(res => {
          console.log(res);
          if(res.data.code == 200){
             // 将唯一标识储存起来
            sessionStorage.setItem('authorization', res.data.data.authorization);
            // 将菜单储存起来
            // sessionStorage.setItem('menus', JSON.stringify(res.data.data.menus));
            sessionStorage.setItem('ifLogin',true)
            // 页面跳转到主页面
            this.$router.push({ path: '/main/goods' });
          }else{   
            this.$alert('用户名或者密码错误')
          }

        })
        .catch(err => {
          console.log(err);
          this.$alert('用户名或者密码错误')
        });
    }
  }

};
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #2d3a4b;
$light_gray: #eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
}

</style>
