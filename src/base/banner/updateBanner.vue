<template>
    <el-form :model="ruleForm2" status-icon  ref="ruleForm2" label-width="200px" class="demo-ruleForm">
      <el-form-item prop="bannerPic1" label="轮播图1" ref="uploadbannerPic1">
        <el-upload
        class="avatar-uploader"
        action="https://tango.heeyhome.com/cx/web/upload/uploadFile"
        :show-file-list="false"
        :on-success="handleAvatarSuccess1"
        :before-upload="beforeAvatarUpload">
        <img v-if="bannerUrl1" :src="bannerUrl1" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item prop="bannerPic2" label="轮播图2" ref="uploadbannerPic2">
        <el-upload
        class="avatar-uploader"
        action="https://tango.heeyhome.com/cx/web/upload/uploadFile"
        :show-file-list="false"
        :on-success="handleAvatarSuccess2"
        :before-upload="beforeAvatarUpload">
        <img v-if="bannerUrl2" :src="bannerUrl2" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item prop="bannerPic3" label="轮播图3" ref="uploadbannerPic3">
        <el-upload
        class="avatar-uploader"
        action="https://tango.heeyhome.com/cx/web/upload/uploadFile"
        :show-file-list="false"
        :on-success="handleAvatarSuccess3"
        :before-upload="beforeAvatarUpload">
        <img v-if="bannerUrl3" :src="bannerUrl3" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

       <!-- <el-form-item prop="bannerPic4" label="轮播图4" ref="uploadbannerPic4">
        <el-upload
        class="avatar-uploader"
        action="https://tango.heeyhome.com/cx/web/upload/uploadFile"
        :show-file-list="false"
        :on-success="handleAvatarSuccess4"
        :before-upload="beforeAvatarUpload">
        <img v-if="bannerUrl4" :src="bannerUrl4" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

       <el-form-item prop="bannerPic5" label="轮播图5" ref="uploadbannerPic5">
        <el-upload
        class="avatar-uploader"
        action="https://tango.heeyhome.com/cx/web/upload/uploadFile"
        :show-file-list="false"
        :on-success="handleAvatarSuccess5"
        :before-upload="beforeAvatarUpload">
        <img v-if="bannerUrl5" :src="bannerUrl5" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item> -->

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">确认</el-button>
        <router-link to="/main/banner"><el-button>取消</el-button></router-link>
      </el-form-item>

    </el-form>
</template>

<script>
import {updateBanner} from '@/api/http'
export default {
  data() {
    return{
      ruleForm2: {
        id:'',
        bannerPic1:'',
        bannerPic2:'',
        bannerPic3:'',
        // bannerPic4:'',
        // bannerPic5:'',
      },
      bannerUrl1:'',
      bannerUrl2:'',
      bannerUrl3:'',
      // bannerUrl4:'',
      // bannerUrl5:'',  
    }
  },
  created () {
  // 提取存在本地的数据，添加到页面中
    const editInfo = JSON.parse(sessionStorage.getItem('editInfo'))
    console.log(editInfo)
    this.id = editInfo.id
    this.ruleForm2.bannerPic1 = editInfo.banner1
    this.ruleForm2.bannerPic2 = editInfo.banner2
    this.ruleForm2.bannerPic3 = editInfo.banner3
    // this.ruleForm2.bannerPic4 = editInfo.banner4
    // this.ruleForm2.bannerPic5 = editInfo.banner5
    this.bannerUrl1 = editInfo.banner1
    this.bannerUrl2 = editInfo.banner2
    this.bannerUrl3 = editInfo.banner3
    // this.bannerUrl4 = editInfo.banner4
    // this.bannerUrl5 = editInfo.banner5
  },
  methods: {
    handleAvatarSuccess1(res, file) {
      console.log(res.data)
      this.ruleForm2.bannerPic1 = res.data
      this.bannerUrl1 = URL.createObjectURL(file.raw)
      this.$refs.uploadbannerPic1.clearValidate()
      },
    handleAvatarSuccess2(res, file) {
      console.log(res.data)
      this.ruleForm2.bannerPic2 = res.data
      this.bannerUrl2 = URL.createObjectURL(file.raw)
      this.$refs.uploadbannerPic2.clearValidate()
      },
    handleAvatarSuccess3(res, file) {
      console.log(res.data)
      this.ruleForm2.bannerPic3 = res.data
      this.bannerUrl3 = URL.createObjectURL(file.raw)
      this.$refs.uploadbannerPic3.clearValidate()
      },
    // handleAvatarSuccess4(res, file) {
    //   console.log(res.data)
    //   this.ruleForm2.bannerPic4 = res.data
    //   this.bannerUrl4 = URL.createObjectURL(file.raw)
    //   this.$refs.uploadbannerPic4.clearValidate()
    //   },
    // handleAvatarSuccess5(res, file) {
    //   console.log(res.data)
    //   this.ruleForm2.bannerPic5 = res.data
    //   this.bannerUrl5 = URL.createObjectURL(file.raw)
    //   this.$refs.uploadbannerPic5.clearValidate()
    //   },
    beforeAvatarUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1
      if (!isLt1M) {
          this.$message.error('上传图片大小不能超过 1MB!')
      }
      return isLt1M
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {  
          updateBanner({
            id: this.id,
            image1: this.ruleForm2.bannerPic1,
            image2: this.ruleForm2.bannerPic2,
            image3: this.ruleForm2.bannerPic3,
            image4: this.ruleForm2.bannerPic4,
            image5: this.ruleForm2.bannerPic5,
          })
          .then(res => {
            console.log(res)
            if(res.data.code === 200){
              this.$alert("商城轮播图更新成功")
            this.$router.push({path:'/main/banner'})
            }
            else{
              this.$alert("请更新商城轮播图")
            }
          })
              
        } 
        else {
          console.log('error submit!!')
          this.$alert("更新失败,请上传未更新的轮播图！")
          return false
        }
      })
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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar {
    height: 130px;
    display: block;

  }
</style>