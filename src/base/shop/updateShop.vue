<template>
  <div class="userlist-container">
    <div>
    <map-component v-model="dialogVisible" @cancel="cancelMap" @map-confirm="confirmMap"></map-component>
    </div>
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
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
        <el-form-item label="商户证书" prop="license" ref="uploadlicense">
          <el-upload
            class="avatar-uploader"
            action="https://tango.heeyhome.com/cx/web/upload/uploadFile"
            :show-file-list="false"
            :on-success="handleAvatarSuccessLicense"
            :before-upload="beforeAvatarUpload">
            <img v-if="licenseUrl" :src="licenseUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        
        <el-form-item label="推荐员工号" prop="salesId">
        <el-input  v-model="ruleForm2.salesId" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商户简介" prop="introduce">
        <el-input type="textarea" :rows="3" v-model="ruleForm2.introduce"></el-input>
        </el-form-item>
          <el-form-item prop="pic" label="商户图片" ref="uploadpic"> 
            <el-upload
            class="avatar-uploader"
            action="https://tango.heeyhome.com/cx/web/upload/uploadFile"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>
      
        
        <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">确认</el-button>
        <router-link to="/main/shop"><el-button>取消</el-button></router-link>
        </el-form-item>
    </el-form>
  </div>
     
</template>

<script>
import {updateShop} from '@/api/http'
import mapComponent from '@/base/baiduMap/baiduMap'
export default {
  data() {
    // 表单校验
     var validateName = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("商户名称不能为空"));
      }
      callback();
    };
    var validateAddress = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("商户地址不能为空"));
      } else {
        callback();
      }
    };
    var checkLongitude = (rule, value, callback) => {
      // if (value==='') {
      //     return callback(new Error('商户经度不能为空'))
      // }
      setTimeout(() => {
        if (isNaN(value)) {
          callback(new Error('请输入数字值'))
        }
        else if(value < 0) {
          callback(new Error('商户经度不能为负数'))
        }
        else{
          callback();
        }
      }, 500)
    }

    var checkLatitude = (rule, value, callback) => {
      // if (value==='') {
      //     return callback(new Error('商户纬度不能为空'))
      // }
      setTimeout(() => {
        if (isNaN(value)) {
            callback(new Error('请输入数字值'))
        }
        else if(value < 0) {
            callback(new Error('商户纬度不能为负数'))
        }
        else{
            callback();
        }
      }, 500)
    }

    var checkSalesId = (rule, value, callback) => {
      if (value==='') {
        return callback(new Error('推荐员工号不能为空'))
      }
      setTimeout(() => {
        if (isNaN(value)) {
          callback(new Error('请输入数字值'))
        }
        else if(value < 0) {
          callback(new Error('推荐员工号不能为负数'))
        }
        else{
          callback();
        }
      }, 500)
    }
  
    var validateIntroduce = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入商户简介"));
      } else {
        callback();
      }
    };
    return {
      imageUrl: '',
      dialogVisible: false,
      bannerUrl1: '',
      bannerUrl2: '',
      bannerUrl3: '',
      licenseUrl: '',
      ruleForm2: {
        name: '',
        address: '',
        longitude: '',
        latitude: '',
        license: '',
        salesId: '',
        introduce: '',
        pic: '',
        bannerPic1: '',
        bannerPic2: '',
        bannerPic3: ''
      },
      rules2: {
        address: [{ validator: validateAddress, trigger: "blur" }],
        longitude: [{ validator: checkLongitude, trigger: "blur" }],
        name: [{ validator: validateName, trigger: "blur" }],
        pic: [ { required:true ,message: '图片不能为空', trigger: 'input' }],
        latitude: [{ validator: checkLatitude, trigger: "blur" }],
        salesId: [{ validator: checkSalesId,trigger:"blur"}],
        introduce: [{ validator: validateIntroduce,trigger:"blur"}],
       
        license: [{ required:true ,message: '图片不能为空', trigger: 'input' }],
     
      }
    };
  },
 
  created () {
    // 提取存在本地的数据，添加到页面中
      const editInfo = JSON.parse(sessionStorage.getItem('editInfo'))
      console.log(editInfo)
      this.ruleForm2.name = editInfo.shopName
      this.ruleForm2.address = editInfo.shopAddress
      this.ruleForm2.pic = editInfo.image
      this.imageUrl = editInfo.image
      this.ruleForm2.bannerPic1 = editInfo.image1
      this.bannerUrl1 = editInfo.image1
      this.ruleForm2.bannerPic2 = editInfo.image2
      this.bannerUrl2 = editInfo.image2
      this.ruleForm2.bannerPic3 = editInfo.image3
      this.bannerUrl3 = editInfo.image3
      this.ruleForm2.introduce = editInfo.shopIntroduce
      this.ruleForm2.latitude = editInfo.shopLatitude
      this.ruleForm2.longitude = editInfo.shopLongitude
      this.ruleForm2.level = editInfo.shopLevel
      this.ruleForm2.score = editInfo.shopScore
      this.ruleForm2.star = editInfo.shopSta
      this.ruleForm2.license = editInfo.shopLicense
      this.ruleForm2.salesId = editInfo.userSalesId
      this.id = editInfo.id
   },
  components:{
    mapComponent
  },
  methods: {
    confirmMap(center){
      this.ruleForm2.longitude = center.lng
      this.ruleForm2.latitude = center.lat
    },
    cancelMap(dialogVisible){
      this.dialogVisible = dialogVisible
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          updateShop({
            id: this.id,
            shopName: this.ruleForm2.name,
            shopAddress: this.ruleForm2.address,
            shopImage: this.ruleForm2.pic,
            shopImageOne: this.ruleForm2.bannerPic1,
            shopImageTwo: this.ruleForm2.bannerPic2,
            shopImageThree: this.ruleForm2.bannerPic3,
            shopIntroduce: this.ruleForm2.introduce,
            shopLatitude: this.ruleForm2.latitude,
            shopLongitude: this.ruleForm2.longitude,
            shopLevel: this.ruleForm2.level,
            shopScore: this.ruleForm2.score,
            shopStar: this.ruleForm2.star,
            shopLicense: this.ruleForm2.license,
            userSalesId: this.ruleForm2.salesId

          })
          .then(res => {
            console.log(res);
            if (res.data.code === 200) {
              this.$alert("商户信息更新成功");
              this.$router.push({path:'/main/shop'})
            }
            else if(res.data.code === 10002) {
              this.$alert("该商户已存在，请重新输入商户名")
            }
          });
        } else {
          console.log("error submit!!");
          this.$alert("提交添加失败，请根据提示补充未填项")
          return false;
        }
      });
    },
    beforeAvatarUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1
      if (!isLt1M) {
        this.$message.error('上传图片大小不能超过 1MB!')
      }
        return isLt1M
    },
    handleAvatarSuccess(res, file) {
      this.ruleForm2.pic = res.data
      this.imageUrl = URL.createObjectURL(file.raw)
      this.$refs.uploadpic.clearValidate()
    },
    handleAvatarSuccess1(res, file) {
      this.ruleForm2.bannerPic1 = res.data
      this.bannerUrl1 = URL.createObjectURL(file.raw)
      this.$refs.uploadbannerPic1.clearValidate()
    },
    handleAvatarSuccess2(res, file) {
      this.ruleForm2.bannerPic2 = res.data
      this.bannerUrl2 = URL.createObjectURL(file.raw)
      this.$refs.uploadbannerPic2.clearValidate()
    },
    handleAvatarSuccess3(res, file) {
      this.ruleForm2.bannerPic3 = res.data
      this.bannerUrl3 = URL.createObjectURL(file.raw)
      this.$refs.uploadbannerPic3.clearValidate()
    },
    handleAvatarSuccessLicense(res, file) {
      console.log(res.data)
      this.ruleForm2.license = res.data
      this.licenseUrl = URL.createObjectURL(file.raw)
      this.$refs.uploadlicense.clearValidate()
    },
  }
}
</script>

<style scoped>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar {
        width: 100px;
        height: 100px;
        display: block;
    }
    .demo-ruleForm {
      margin-top: 10px;
    }
</style>
