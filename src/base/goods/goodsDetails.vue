<template>
  <div>
    <el-form :model="ruleForm2" status-icon  ref="ruleForm2" label-width="100px" class="demo-ruleForm">
      <el-form-item label="商户ID" prop="id">
        <el-input type="text" v-model="ruleForm2.id" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="商户名称" prop="name">
        <el-input type="text" v-model="ruleForm2.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="商户地址" prop="address">
        <el-input  v-model="ruleForm2.address" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="商户经度" prop="longitude">
        <el-input  v-model="ruleForm2.longitude" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="商户纬度" prop="latitude">
        <el-input  v-model="ruleForm2.latitude" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="商户证书" prop="license">
        <img v-if="licenseUrl" :src="licenseUrl" class="avatar">
      </el-form-item>
      <!-- <el-form-item label="商户级别" prop="level">
        <el-input  v-model="ruleForm2.level" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="商户评分" prop="score">
        <el-input  v-model="ruleForm2.level" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="商户星级" prop="star">
        <el-input  v-model="ruleForm2.level" auto-complete="off"></el-input>
      </el-form-item> -->
      <el-form-item label="推荐员工号" prop="salesId">
        <el-input  v-model="ruleForm2.salesId" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="商户简介" prop="introduce">
        <el-input type="textarea" :rows="3" v-model="ruleForm2.introduce"></el-input>
      </el-form-item>
      <el-form-item prop="pic" label="商户图片" ref="uploadpic"> 
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
      </el-form-item>
    </el-form>
    <router-link to="/main/goods"><el-button type="primary" plain>返回</el-button></router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: '',
      licenseUrl: '',
      ruleForm2: {
        name: '',
        address: '',
        longitude: '',
        latitude: '',
        license: '',
        level: '',
        score: '',
        star: '',
        salesId: '',
        introduce: '',
        pic: '',
      },
    }
  },
  created () {
  // 提取存在本地的数据，添加到页面中
    const editInfo = JSON.parse(sessionStorage.getItem('editInfo'))
    console.log(editInfo)
      this.ruleForm2.id = editInfo.shopId
      this.ruleForm2.name = editInfo.shop.shopName
      this.ruleForm2.address = editInfo.shop.shopAddress,
      this.ruleForm2.pic = editInfo.shop.shopImage,
      this.imageUrl = editInfo.shop.shopImage,
      this.ruleForm2.introduce = editInfo.shop.shopIntroduce,
      this.ruleForm2.latitude = editInfo.shop.shopLatitude,
      this.ruleForm2.longitude = editInfo.shop.shopLongitude,
      // this.ruleForm2.level = editInfo.shop.shopLevel,
      // this.ruleForm2.score = editInfo.shop.shopScore,
      // this.ruleForm2.star = editInfo.shop.shopStar,
      this.ruleForm2.license = editInfo.shop.shopLicense,
      this.ruleForm2.salesId = editInfo.shop.userSalesId
      this.id = editInfo.shop.id
  },
}
</script>

<style scoped>
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>


