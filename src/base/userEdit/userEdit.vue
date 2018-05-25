<template>
  <div class="edit-container">
      <div>
        <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
          <el-form-item
            label="手机号"
            prop="age"
            :rules="[
      { required: true, message: '手机号不能为空'},
      { type: 'number', message: '手机号必须为数字值'}
    ]"
          >
            <el-input type="age" v-model.number="numberValidateForm.age" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('numberValidateForm')">提交</el-button>
            <el-button @click="resetForm('numberValidateForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      numberValidateForm: {
        age: ''
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  },
  mounted () {
    console.log(this.$route.params.id)
  }
}
</script>

<style scoped>
  .edit-container{
    width:100%;
    height:100%;
    background: #eee;
  }
</style>
