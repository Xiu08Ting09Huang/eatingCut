<template>
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
    <el-form-item label="商品名称" prop="name">
      <el-input type="text" v-model="ruleForm2.name" auto-complete="off"  ></el-input>
    </el-form-item>
    
     <el-form-item label="商品余量" prop="goodsNumber">
      <el-input type="number" v-model="ruleForm2.goodsNumber" auto-complete="off"></el-input>
    </el-form-item>
     <el-form-item label="可砍次数" prop="goodsBargainNumber">
      <el-input type="number" v-model="ruleForm2.goodsBargainNumber" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="原价" prop="price">
      <el-input  v-model="ruleForm2.price" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="最低价" prop="lowPrice">
      <el-input v-model="ruleForm2.lowPrice" auto-complete="off"></el-input>
    </el-form-item>
 
    <el-form-item label="截止时间" prop="endTime" >
        <el-date-picker type="datetime" placeholder="选择截止时间" v-model="ruleForm2.endTime" style="width: 100%;"></el-date-picker>
    </el-form-item>
    <!-- <el-form-item label="更新时间" prop="updateTime" >
        <el-date-picker type="datetime" placeholder="选择结束时间" v-model="ruleForm2.updateTime" style="width: 100%;"></el-date-picker>
    </el-form-item> -->
    <el-form-item label="商品介绍" prop="details">
      <el-input type="textarea" :rows="4" v-model="ruleForm2.details"></el-input>
    </el-form-item>
     
    <el-form-item label="商户名称" prop="shopId">
        <el-select value-key="label" v-model="ruleForm2.value" placeholder="请选择商户" @click="getOptions()" >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="商品图片" prop="pic" ref="uploadpic" >
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
    <el-form-item prop="bannerPic1" label="轮播图" ref="uploadbannerPic1">
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
        <!-- <el-form-item prop="bannerPic2" label="轮播图2" ref="uploadbannerPic2">
        <el-upload
        class="avatar-uploader"
        action="https://tango.heeyhome.com/cx/web/upload/uploadFile"
        :show-file-list="false"
        :on-success="handleAvatarSuccess2"
        :before-upload="beforeAvatarUpload">
        <img v-if="bannerUrl2" :src="bannerUrl2" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </el-form-item> -->
      <el-form-item prop="bannerPic3" label="商品详情图" ref="uploadbannerPic3">
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
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm2')">确认</el-button>
      <router-link to="/main/goods"><el-button>取消</el-button></router-link>
    </el-form-item>
  </el-form>
</template>

<script>
import {addGoods,shopList} from '@/api/http'
export default {
    data () {
      //表单校验
        var validateName = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('商品名称不能为空'));
            }else{
            callback()
            }
        }
        var checkGoodsNumber = (rule, value, callback) => {
            if (value==='') {
                return callback(new Error('商品余量不能为空'))
            }
            setTimeout(() => {
            if (isNaN(value)) {
                callback(new Error('请输入数字值'))
            }
            else if(value < 0) {
                callback(new Error('商品数量不能为负数'))
            }
            else {
                callback();
                }
            }, 500)
        }
        var validateDetails = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('商品详情不能为空'));
            }else{
            callback()
            }
        }
        var checkGoodsBargainNumber = (rule, value, callback) => {
            if (value==='') {
                return callback(new Error('可砍次数不能为空'))
            }
            setTimeout(() => {
            if (isNaN(value)) {
                callback(new Error('请输入数字值'))
            }
            else if(value < 0) {
                callback(new Error('可砍次数不能为负数'))
            }
            else{
                callback();
                }
            }, 500)
        }

        var checkPrice = (rule, value, callback) => {
            if (value==='') {
                return callback(new Error('商品原价不能为空'))
            }
            setTimeout(() => {
            if (isNaN(value)) {
                callback(new Error('请输入数字值'))
            }
            else if(value < 0) {
                callback(new Error('商品原价不能为负数'))
            }
            else{
                callback();
                }
            }, 500)
        }

        var checkLowPrice = (rule, value, callback) => {
            if (value==='') {
                return callback(new Error('商品最低价不能为空'))
            }
            setTimeout(() => {
            if (isNaN(value)) {
                callback(new Error('请输入数字值'))
            }
            else if(value < 0) {
                callback(new Error('商品最低价不能为负数'))
            }
            else{
                callback();
                }
            }, 500)
        }

        var validateEndTime = (rule, value, callback) => {
            if (this.ruleForm2.endTime==='') {
                callback(new Error('结束时间不能为空'))
            }
            else {
                callback()
                }
        }

        
        var validateShopId = (rule, value, callback) => {
            if (this.ruleForm2.value==='') {
                callback(new Error('商户名称不能为空'))
            }
            else {
                callback()
                }
        }

        var validateDetails = (rule, value, callback) => {
            if (!this.ruleForm2.details) {
                callback(new Error('商品详情不能为空'))
            }
            else {
                callback()
                }
        }

        return {
            ruleForm2: {
                name: '',
                goodsNumber: '',
                details: '',
                goodsBargainNumber: '',
                price: '',
                lowPrice: '',
                pic: '',
                // startTime:'',
                endTime:'',
                // updateTime:'',
                shopId: '',
                bannerPic1: '',
                // bannerPic2: '',
                bannerPic3: '',
                value: ''
            },
                imageUrl: '',
                bannerUrl1: '',
                // bannerUrl2: '',
                bannerUrl3: '',
                options: [{
                value: '',
                label: '请选择商户'
                }],
            rules2: {

                name: [
                    { validator: validateName, trigger: 'blur' }
                ],
                goodsNumber: [
                    { validator: checkGoodsNumber, trigger: 'blur' }
                ],
                goodsBargainNumber: [
                    { validator: checkGoodsBargainNumber, trigger: 'blur' }
                ],

                price: [
                    { validator: checkPrice, trigger: 'blur' }
                ],
                lowPrice: [
                    { validator: checkLowPrice, trigger: 'blur' }
                ],
                details: [
                    { validator: validateDetails, trigger: 'blur' }
                ],

                pic: [
                    { required:true ,message: '图片不能为空', trigger: 'input' }
                ],
                bannerPic1: [
                    { required:true ,message: '不能为空', trigger: 'input' }
                ],
                bannerPic3: [
                    { required:true ,message: '图片不能为空', trigger: 'input' }
                ],

                // startTime: [
                //     { validator:validateStartTime, trigger: 'change' }
                // ],
                endTime: [
                    { validator:validateEndTime, trigger: 'change' }
                ],
                // updateTime: [
                //     { validator:validateUpdateTime, trigger: 'change' }
                // ],
                shopId: [
                    { validator: validateShopId, trigger: 'blur' }
                ],
            }
        }


        },
    created() {
        this.getOptions()
    },

    methods: {
      getOptions() {
        shopList({
          
        })
        .then(res => {
          res.data.dataList.forEach(v => {
            this.options.push({
              value: v.id,
              label: v.shopName
            })
          })
        })
      },
      
      handleAvatarSuccess(res, file) {
        console.log(res.data)
        this.ruleForm2.pic = res.data
        this.imageUrl = URL.createObjectURL(file.raw)
        // console.log(this.imageUrl)
        this.$refs.uploadpic.clearValidate()
      },
      handleAvatarSuccess1(res, file) {
        console.log(res.data)
        this.ruleForm2.bannerPic1 = res.data
        this.bannerUrl1 = URL.createObjectURL(file.raw)
        this.$refs.uploadbannerPic1.clearValidate()
      },
      // handleAvatarSuccess2(res, file) {
      //   console.log(res.data)
      //   this.ruleForm2.bannerPic2 = res.data
      //   this.bannerUrl2 = URL.createObjectURL(file.raw)
      //   // console.log(this.bannerUrl2)
      //   this.$refs.uploadbannerPic2.clearValidate()
      // },
      handleAvatarSuccess3(res, file) {
        console.log(res.data)
        this.ruleForm2.bannerPic3 = res.data
        this.bannerUrl3 = URL.createObjectURL(file.raw)
        // console.log(this.bannerUrl3)
        this.$refs.uploadbannerPic3.clearValidate()
      },
      beforeAvatarUpload(file) {
        const isLt1M = file.size / 1024 / 1024 < 1
        if (!isLt1M) {
            this.$message.error('上传图片大小不能超过 1MB!')
        }
        return isLt1M
      },

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          // console.log(this.ruleForm2.endTime)
          if (valid) {
            addGoods({
              goodsName: this.ruleForm2.name,
              goodsPrice: +this.ruleForm2.price,
              goodsLowPrice: +this.ruleForm2.lowPrice,
              goodsImage: this.ruleForm2.pic,
              goodsText: this.ruleForm2.details,
              goodsNumber: +this.ruleForm2.goodsNumber,
              goodsBargainNumber: +this.ruleForm2.goodsBargainNumber,
              goodsBargainEndTime: this.ruleForm2.endTime, 
              goodsShopId: +this.ruleForm2.value,
              goodsPictureOne: this.ruleForm2.bannerPic1,
              // goodsPictureTwo: this.ruleForm2.bannerPic2,
              goodsPictureThree: this.ruleForm2.bannerPic3
            })
            .then(res => {
              console.log(res)
              if(res.data.code === 200){
                this.$alert("商品信息添加成功")
                this.$router.push({path:'/main/goods'})
              }
              else if(res.data.message==="名称重复，请检查后重试！"){
                this.$alert("该商户的该商品已存在,请修改")
              }
            })

          }
          else {
            console.log('error submit!!')
            this.$alert("提交添加失败，请根据提示补充未填项")
            return false
          }
        })
      },
  }


}
</script>

<style>
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
</style>



