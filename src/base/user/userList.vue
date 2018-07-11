<template>
  <div class="userlist-container">
    
    <div class="search">
      <label>起止时间：</label>
      <el-date-picker type="datetime" placeholder="选择开始时间" v-model="startTime" style="width: 28%;"></el-date-picker>
      <span>-</span>
      <el-date-picker type="datetime" placeholder="选择结束时间" v-model="endTime" style="width: 28%;"></el-date-picker>
      <el-button type="primary" plain @click="searchByTime(startTime,endTime,20)" >根据起止时间查询用户</el-button>
    </div>
    <div class="search">
      <label>手机号：</label>
      <el-input type="text" placeholder="请输入用户手机号" v-model="phoneNumber" style="width: 35%;"></el-input>
      <el-button type="primary" plain @click="searchByPhone(phoneNumber,20)" >根据手机号查询用户</el-button>
     
    </div>
    <div class="search">
      <label>微信昵称：</label>
      <el-input type="text" placeholder="请输入微信昵称" v-model="name" style="width: 35%;"></el-input>
      <el-button type="primary" plain @click="searchByName(name,20)" >根据微信昵称查询用户</el-button>
    </div>
    
      <el-button type="danger" plain @click="backToUserList" >清空搜索框</el-button>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed prop="index" label="序号" width="50px"></el-table-column>
        <el-table-column fixed prop="userName" label="微信昵称"></el-table-column>
        <el-table-column fixed prop="userRealName" label="真实姓名"></el-table-column>
        <el-table-column fixed prop="userSex" label="性别" :formatter="sexFormat" ></el-table-column>
        <el-table-column fixed prop="userTelephone" label="手机号"></el-table-column>
        <el-table-column prop="userCity" label="所在城市"></el-table-column>
        <el-table-column prop="roleName" label="用户身份"></el-table-column>
        <!-- <el-table-column prop="shopId" label="商户ID" width="100px"></el-table-column> -->
        <el-table-column prop="shopName" label="商户名称"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" min-width="137px"></el-table-column>
        <el-table-column prop="updateTime" label="更新时间" min-width="137px"></el-table-column>
        
        <el-table-column label="操作" fixed="right" width="95px">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="updateUserShopId(scope.row)" >更新用户商户</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination :getData="getData" :total='total' v-show="allshow"></pagination>
      <sbt-pagination :searchByTime="searchByTime" :total='total' v-show="sbtshow"></sbt-pagination>
      <sbp-pagination :searchByPhone="searchByPhone" :total='total' v-show="sbpshow"></sbp-pagination>
      <sbn-pagination :searchByName="searchByName" :total='total' v-show="sbnshow"></sbn-pagination>
      
  </div>
</template>

<script>
import moment from 'moment'
// 展示所有用户列表接口
import {userList} from '@/api/http'
// 引入分页
import pagination from '@/base/pagination/pagination'
import sbtPagination from '@/base/pagination/sbtPagination'
import sbpPagination from '@/base/pagination/sbpPagination'
import sbnPagination from '@/base/pagination/sbnPagination'
export default {
  data () {
    return {
      tableData: [],
      total:0,
      startTime: '',
      
      endTime: '',
      phoneNumber: '',
      name: '',
      allshow: true,
      sbtshow: false,
      sbpshow: false,
      sbnshow: false,
      ruleForm2:{
      shopId: ''
      
      }
    }
    
  },
  components: {
    pagination,
    sbtPagination,
    sbpPagination,
    sbnPagination
  },
  created () {
    this.getData(this.pageIndex,20)
  },
  methods: {
    //性别显示转换
    sexFormat:function(row) {
      var sex = row.userSex
      if (sex === 1) {
          return "男"
      }
      else if (sex === 2) {  
          return "女"
      }
      else { 
          return "未知" 
      }
    },
    
    getData(pageIndex,pageSize) {
      // this.pageIndex++;
      userList({
        pageIndex,
        pageSize
      })
        .then (res => {
          console.log(res)
          // console.log(res.data.dataList[0])
          this.tableData = []
          res.data.dataList.forEach((v,i) => {
            var j=0;
            this.tableData.push({
              id: v.id,
              index: i+1,
              userName: v.userName,
              userRealName: v.userRealName==null?'--':v.userRealName,
              userSex: v.userSex,
              userTelephone: v.userTelephone==null?'--':v.userTelephone,
              roleName: v.roleList[j].roleName,
              userCity: v.userCity,
              shopId: v.shopId,
              shopName: v.shopName,
              createTime: moment(v.createdAt).format("YYYY-MM-DD HH:mm:ss"),
              updateTime: moment(v.updatedAt).format("YYYY-MM-DD HH:mm:ss")
            })
            j++
          })
          this.total = res.data.objectotalNumber
        })
        .catch(err => {
          console.log(err)
        })
    },

    searchByTime(startTime,endTime,pageSize,pageIndex){
      this.allshow = false
      this.sbtshow = true
      userList({
        pageIndex,
        pageSize,
        startTime: this.startTime,
        endTime: this.endTime
      })
        .then (res => {
          console.log(res)
          this.tableData = []
          res.data.dataList.forEach((v,i) => {
            var j=0;
            this.tableData.push({
              id: v.id,
              index: i+1,
              userName: v.userName,
              userRealName: v.userRealName,
              userSex: v.userSex,
              userTelephone: v.userTelephone,
              userCity: v.userCity,
              shopId: v.shopId,
              shopName: v.shopName,
              createTime: moment(v.createdAt).format("YYYY-MM-DD HH:mm:ss"),
              updateTime: moment(v.updatedAt).format("YYYY-MM-DD HH:mm:ss")
            })
            j++
          })
          this.total = res.data.objectotalNumber
         
        })
        .catch(err => {
          console.log(err)
        })
    },

    searchByPhone(phoneNumber,pageSize,pageIndex){
      this.allshow = false
      this.sbpshow = true
      userList({
        pageIndex,
        pageSize,
        userTelephone: this.phoneNumber 
      })
        .then (res => {
          console.log(res)
          this.tableData = []
          res.data.dataList.forEach((v,i) => {
            var j=0;
            this.tableData.push({
              id: v.id,
              index: i+1,
              userName: v.userName,
              userRealName: v.userRealName,
              userSex: v.userSex,
              userTelephone: v.userTelephone,
              userCity: v.userCity,
              shopId: v.shopId,
              shopName: v.shopName,
              createTime: moment(v.createdAt).format("YYYY-MM-DD HH:mm:ss"),
              updateTime: moment(v.updatedAt).format("YYYY-MM-DD HH:mm:ss")
            })
          })
          j++
          this.total = res.data.objectotalNumber
         
        })
        .catch(err => {
          console.log(err)
        })
    },

    searchByName(name,pageSize,pageIndex){
      this.allshow = false
      this.sbunshow = true
      
      userList({
        pageIndex:pageIndex,
        pageSize:pageSize,
        userName: name
      })
        .then (res => {
          console.log(res)
          this.tableData = []
          res.data.dataList.forEach((v,i) => {
            var j=0;
            this.tableData.push({
              id: v.id,
              index: i+1,
              userName: v.userName,
              userRealName: v.userRealName,
              userSex: v.userSex,
              userTelephone: v.userTelephone,
              userCity: v.userCity,
              shopId: v.shopId,
              shopName: v.shopName,
              createTime: moment(v.createdAt).format("YYYY-MM-DD HH:mm:ss"),
              updateTime: moment(v.updatedAt).format("YYYY-MM-DD HH:mm:ss")

            })
            j++
          })
          this.total = res.data.objectotalNumber
         
        })
        .catch(err => {
          console.log(err)
        })
    },
    backToUserList() {
      this.allshow = true
      this.sbtshow = false
      this.sbpshow = false
      this.sbnshow = false
      this.startTime = ''
      this.endTime = ''
      this.phoneNumber = ''
      this.name = ''
      this.tableData = [],
      this.getData(this.pageIndex,20)
    },
    updateUserShopId(row) {
      console.log(row)
      this.$router.push({path:'user/updateShopId/:'+row.id })
      sessionStorage.setItem('editInfo',JSON.stringify(row))
    },
  },


 
}
</script>

<style scoped>
  .el-button{
    margin-bottom: 10px;
    display: inline-block;
  }
  .el-pagination {
    padding-top: 10px;
    text-align: right;
  }
  .el-table {
    margin-top: 10px;
    font-size: 12px;
  }
  
  .search{
    margin-top:0px;
    /* padding-right: 10px; */
  }

 
</style>
