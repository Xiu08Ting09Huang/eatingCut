<template>
  <div class="updateshop-container">
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
      <!-- <el-form-item label="商户ID" prop="shopId">
        <el-input type="text" v-model="ruleForm2.shopId" auto-complete="off" style="width:300px;"></el-input>
      </el-form-item> -->
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

      <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm2')">确认</el-button>
      <router-link to="/main/user"><el-button>取消</el-button></router-link>
    </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {addUserShop,shopList} from '@/api/http'
export default {
  data() {
    var validateShopId = (rule, value, callback) => {
        if (this.ruleForm2.value==='') {
            callback(new Error('商户名称不能为空'))
        }
        else {
            callback()
            }
    }
  
    return {
      ruleForm2: {
        value: ''
      },
      options: [{
        value: '',
        label: '请选择商户'
        }],
      rules2:{
        shopId: [
          { validator: validateShopId, trigger: 'blur' }
        ],
    }
      }
  },
  created () {
  // 提取存在本地的数据，添加到页面中
    const editInfo = JSON.parse(sessionStorage.getItem('editInfo'))
      console.log(editInfo)
      this.ruleForm2.value = editInfo.shopId
      this.id = editInfo.id
      this.getOptions()
  },
  methods:{
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
          
        if (valid) {
          addUserShop({
            id: this.id,
            shopId: this.ruleForm2.value,
          })
          
          .then(res => {
            console.log(res)
            if(res.data.code === 200){
              this.$alert("用户商户ID更新成功")
              this.$router.push({path:'/main/user'})
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

<style scoped>

</style>
