<template>
  <div class="navtop-container">
      <div class="nav-wrapper">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="crumbs">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 1
    }
  }
}
</script>

<style scoped lang="scss">
  .navtop-container{
    width:100%;
    height:100px;
    background: #ddd;
    .nav-wrapper{
      padding: 20px;
      .crumbs{
        height:60px;
        line-height: 60px;
      }
    }
  }
</style>
