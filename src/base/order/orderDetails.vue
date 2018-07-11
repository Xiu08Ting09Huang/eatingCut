<template>
<div class="order-detail">
    <el-form :model="ruleForm2" status-icon  ref="ruleForm2" label-width="100px" class="goodsInfo">
        <el-form-item label="商品名称" prop="goodsName">
        <el-input type="text" v-model="ruleForm2.goodsName" auto-complete="off"  ></el-input>
        </el-form-item>
        <el-form-item label="商品余量" prop="goodsNumber">
        <el-input type="number" v-model="ruleForm2.goodsNumber" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="可砍次数" prop="goodsBargainNumber">
        <el-input type="number" v-model="ruleForm2.goodsBargainNumber" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="原价" prop="price">
        <el-input  type="text" v-model="ruleForm2.price" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="最低价" prop="lowPrice">
        <el-input type="text" v-model="ruleForm2.lowPrice" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="创建时间" prop="startTime" >

            <el-date-picker type="datetime" placeholder="选择创建时间" v-model="ruleForm2.startTime"  ></el-date-picker>

        </el-form-item>
        <el-form-item label="截止时间" prop="endTime" >
            <el-date-picker type="datetime" placeholder="选择截止时间" v-model="ruleForm2.endTime" ></el-date-picker>
        </el-form-item>
        <el-form-item label="更新时间" prop="updateTime" >
            <el-date-picker type="datetime" placeholder="选择更新时间" v-model="ruleForm2.updateTime" ></el-date-picker>
        </el-form-item>
        <el-form-item label="商品介绍" prop="details">
        <el-input  type="textarea" :rows="4" v-model="ruleForm2.details" style="width:35%;"></el-input>
        </el-form-item>
        
        <el-form-item label="商品图片" prop="goodsImage" ref="uploadpic" >
        
        <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
  
        </el-form-item>
      </el-form>

    <el-form :model="ruleForm" status-icon  ref="ruleForm" label-width="100px" class="shopInfo">
        <el-form-item label="商户名称" prop="shopName">
        <el-input type="text" v-model="ruleForm.shopName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商户地址" prop="address">
        <el-input  v-model="ruleForm.address" auto-complete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="商户经度" prop="longitude">
        <el-input  v-model="ruleForm.longitude" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商户纬度" prop="latitude">
        <el-input  v-model="ruleForm.latitude" auto-complete="off"></el-input>
        </el-form-item> -->
        <el-form-item label="商户证书" prop="license">
          <img v-if="licenseUrl" :src="licenseUrl" class="avatar">
        </el-form-item>
        <!-- <el-form-item label="商户级别" prop="level">
        <el-input  v-model="ruleForm.level" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商户评分" prop="score">
        <el-input  v-model="ruleForm.score" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商户星级" prop="star">
        <el-input  v-model="ruleForm.star" auto-complete="off"></el-input>
        </el-form-item> -->
        <el-form-item label="推荐员工号" prop="salesId">
        <el-input  v-model="ruleForm.salesId" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商户简介" prop="introduce">
        <el-input type="textarea" :rows="3" v-model="ruleForm.introduce" style="width:35%;"></el-input>
        </el-form-item>
        <el-form-item label="商户图片" prop="shopImage" ref="uploadpic"> 
          <img v-if="imageUrl2" :src="imageUrl2" class="avatar">
        </el-form-item>
        <el-form-item label="订单创建时间" prop="orderCreateTime">
        <el-input  v-model="ruleForm.orderCreateTime" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="订单截止时间" prop="orderEndTime">
        <el-input  v-model="ruleForm.orderEndTime" auto-complete="off"></el-input>
        </el-form-item>
         <el-form-item label="核销时间" prop="orderUseTime">
        <el-input  v-model="ruleForm.orderUseTime" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="订单状态" prop="orderStatus">
        <el-input  v-model="ruleForm.orderStatus" auto-complete="off"></el-input>
        </el-form-item>

    </el-form>
    
    <router-link to="/main/order"><el-button type="primary" plain>返回</el-button></router-link>
  </div>
</template>

<script>
export default {
  data(){
    return {
      ruleForm2: {
        goodsName: '',
        goodsNumber: '',
        details: '',
        goodsBargainNumber: '',
        price: '',
        lowPrice: '',
        goodsImage: '',
        startTime:'',
        endTime:'',
        updateTime:'',
        
      },
      ruleForm: {
        shopId: '',
        shopName: '',
        address: '',
        longitude: '',
        latitude: '',
        license: '',
        level: '',
        score: '',
        star: '',
        salesId: '',
        introduce: '',
        shopImage: '',
        orderCreateTime: '',
        orderEndTime: '',
        orderUseTime:'',
        orderStatus: ''
      },
        imageUrl1: '',
        imageUrl2: '',
        licenseUrl: '',
        id: '',
    }
  },
   created () {
  // 提取存在本地的数据，添加到页面中
    const editInfo = JSON.parse(sessionStorage.getItem('editInfo'))
    console.log(editInfo)
      this.imageUrl1 = editInfo.goods.goodsImage
      this.ruleForm2.goodsName = editInfo.goods.goodsName
      this.ruleForm2.price = editInfo.goods.goodsPrice
      this.ruleForm2.lowPrice =  editInfo.goods.goodsLowPrice
      this.ruleForm2.goodsImage = editInfo.goods.goodsImage
      this.ruleForm2.details = editInfo.goods.goodsText
      this.ruleForm2.goodsNumber = editInfo.goods.goodsNumber
      this.ruleForm2.goodsBargainNumber = editInfo.goods.goodsBargainNumber
      this.ruleForm2.bannerPic1 = editInfo.goods.goodsPictureOne
      this.ruleForm2.bannerPic2 = editInfo.goods.goodsPictureTwo
      this.ruleForm2.bannerPic3 = editInfo.goods.goodsPictureThree
      this.ruleForm2.startTime = editInfo.goods.createdAt
      this.ruleForm2.endTime = editInfo.goods.goodsBargainEndTime
      this.ruleForm2.updateTime = editInfo.goods.updatedAt
      this.ruleForm2.shopId = editInfo.goods.shopId
      this.id = editInfo.id,
      this.ruleForm.shopName = editInfo.shop.shopName
      this.ruleForm.address = editInfo.shop.shopAddress
      this.ruleForm.shopImage = editInfo.shop.shopImage
      this.imageUrl2 = editInfo.shop.shopImage
      this.ruleForm.introduce = editInfo.shop.shopIntroduce
      this.ruleForm.latitude = editInfo.shop.shopLatitude
      this.ruleForm.longitude = editInfo.shop.shopLongitude
      this.ruleForm.level = editInfo.shop.shopLevel
      this.ruleForm.score = editInfo.shop.shopScore
      this.ruleForm.star = editInfo.shop.shopStar
      this.ruleForm.license = editInfo.shop.shopLicense
      this.ruleForm.salesId = editInfo.shop.userSalesId
      this.ruleForm.orderCreateTime = editInfo.orderCreateTime
      this.ruleForm.orderEndTime = editInfo.orderEndTime
      this.ruleForm.orderUseTime = editInfo.orderUseTime
      this.ruleForm.orderStatus = this.statusFormat(editInfo.orderStatus)
    },
    methods: {
      statusFormat:function(row) {
        var status = row
        if(status === 4) {
          return "未核销"
        }
        else if(status === 5) {
          return "已核销"
        }
        else if(status === 6) {
          return "已过期"
        }
    },
    }
}
</script>

<style scoped>
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
.goodsInfo {
  float: left;
  width: 50%;
}
.shopInfo {
  float: left;
  width: 50%;
}
.el-input {
  width: 35%;
}
</style>

