<template>
  <div class="shop-container">
    <div>
      <router-link to="/main/shop/add" ><el-button type="primary" plain >添加商户</el-button></router-link>
      <div class="search">
        <label>商户名称：</label>
        <el-input type="text" placeholder="请输入商户名" v-model="name" style="width: 30%;"></el-input>
        <el-button type="primary" plain @click="searchByName(name,20)" >根据商户名查询商户</el-button>
        
      </div>
      <div class="search">
        <label>禁用状态：</label>
        <el-select value-key="label" v-model="value" placeholder="请选择禁用状态" style="width:30%">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary" plain @click="searchByStatus(value,20)" >根据禁用状态查询商户</el-button>
      </div>
      <el-button type="danger" plain @click="backToshopList" >清空搜索框</el-button>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column fixed prop="index" label="序号" width="50px"></el-table-column>
          <el-table-column prop="shopName" label="商户名称"></el-table-column>
          <el-table-column prop="image" label="商户图片" >
            <template slot-scope="scope">
              <img :src="scope.row.image" height="50px" class="image"/>
            </template>
          </el-table-column>
          <el-table-column prop="shopAddress" label="商户地址"></el-table-column>
          <el-table-column prop="shopLatitude" label="商户经度"></el-table-column>
          <el-table-column prop="shopLongitude" label="商户纬度"></el-table-column>
          <el-table-column prop="shopLicense" label="商户证书">
            <template slot-scope="scope">
              <img :src="scope.row.shopLicense" height="50px" class="image"/>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="shopLevel" label="商户级别"></el-table-column> -->
          <el-table-column prop="shopIntroduce" label="商户简介"></el-table-column>
          <el-table-column prop="userSalesId" label="推荐员工号"></el-table-column>
          <!-- <el-table-column prop="shopStar" label="商户星级"></el-table-column> -->
          <!-- <el-table-column prop="image1" label="轮播图1">
            <template slot-scope="scope">
              <img :src="scope.row.image1" height="50px" class="image"/>
            </template>
          </el-table-column>
          <el-table-column prop="image2" label="轮播图2">
            <template slot-scope="scope">
              <img :src="scope.row.image2" height="50px" class="image"/>
            </template>
          </el-table-column>
          <el-table-column prop="image3" label="轮播图3">
            <template slot-scope="scope">
              <img :src="scope.row.image3" height="50px" class="image"/>
            </template>
          </el-table-column> -->
         
          <el-table-column prop="yn" label="禁用状态" :formatter="ynFormat"></el-table-column>
          <el-table-column label="操作" fixed="right" width="90px">
            <template slot-scope="scope" >
              <el-button type="text" size="small" @click="gotoUserEdit(scope.row)" >更新</el-button>
              <el-button type="text" size="small" @click="delConform(scope.row)" v-show="scope.row.yn === 0" >禁用</el-button>
              <el-button type="text" size="small" @click="cancelDelConform(scope.row)" v-show="scope.row.yn ===1 ">解禁</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination :getData="getData" :total='total' v-show="allshow"></pagination>
        <sbn-pagination :searchByName="searchByName" :total='total' v-show="sbnshow"></sbn-pagination>
        <sbs-pagination :searchByStatus="searchByStatus" :total='total' v-show="sbsshow"></sbs-pagination>
      </div>
  </div>
</template>

<script>
// 展示和删除所有商户的接口
import { shopList,deleteShop } from '@/api/http'
// 引入分页
import pagination from '@/base/pagination/pagination'
import sbnPagination from '@/base/pagination/sbnPagination'
import sbsPagination from '@/base/pagination/sbsPagination'
export default {
  data() {
    return {
      tableData: [],
      total: 0,
      id: '',
      show: '',
      name: '',
      allshow: true,
      sbnshow: false,
      sbsshow: false,
      value: '',
      options: [{
          value: 0,
          label: '正常'
        }, {
          value: 1,
          label: '已禁用'
        }],
    };
  },
  components: {
    pagination,
    sbnPagination,
    sbsPagination
  },
  inject: ['reload'],
   created () {
    this.getData(this.pageIndex,20)
  },
  methods: {
    ynFormat: function(row){
      var yn = row.yn
        if (yn === 0) {
            return "正常"
        }
        else if (yn === 1) {  
            return "已禁用"
        }
    },
      // 获取列表数据
    getData(pageIndex, pageSize) {
      shopList({
        pageIndex,
        pageSize
      })
        .then(res => {
          console.log(res)
          this.tableData = []
          res.data.dataList.forEach((v, i) => {
            this.tableData.push({
              index: i+1,
              shopName: v.shopName,
              shopAddress: v.shopAddress,
              image: v.shopImage,
              image1: v.shopImageOne,
              image2: v.shopImageTwo,
              image3: v.shopImageThree,
              shopIntroduce: v.shopIntroduce,
              shopLatitude: v.shopLatitude,
              shopLongitude: v.shopLongitude,
              shopLevel: v.shopLevel,
              shopScore: v.shopScore,
              shopStar: v.shopStar,
              shopLicense: v.shopLicense,
              userSalesId: v.userSalesId,
              id: v.id,
              yn: v.yn
            });
            
          });
          // 获取总数
          this.total = res.data.objectotalNumber;
        })
        .catch(err => {
          console.log(err);
        });
    },
    searchByName(name,pageSize,pageIndex) {
      this.allshow = false
      this.sbnshow = true
      shopList({
        pageIndex,
        pageSize,
        shopName:this.name
      })
        .then(res => {
          console.log(res)
          this.tableData = []
          res.data.dataList.forEach((v, i) => {
            this.tableData.push({
              index: i+1,
              shopName: v.shopName,
              shopAddress: v.shopAddress,
              image: v.shopImage,
              image1: v.shopImageOne,
              image2: v.shopImageTwo,
              image3: v.shopImageThree,
              shopIntroduce: v.shopIntroduce,
              shopLatitude: v.shopLatitude,
              shopLongitude: v.shopLongitude,
              shopLevel: v.shopLevel,
              shopScore: v.shopScore,
              shopStar: v.shopStar,
              shopLicense: v.shopLicense,
              userSalesId: v.userSalesId,
              id: v.id,
              yn: v.yn
            });
            
          });
          // 获取总数
          this.total = res.data.objectotalNumber;
        })
        .catch(err => {
          console.log(err);
        });
    },
    searchByStatus(value,pageSize,pageIndex) {
      this.allshow = false
      this.sbsshow = true
      shopList({
        pageIndex,
        pageSize,
        yn: this.value
      })
        .then(res => {
          console.log(res)
          this.tableData = []
          res.data.dataList.forEach((v, i) => {
            this.tableData.push({
              index: i+1,
              shopName: v.shopName,
              shopAddress: v.shopAddress,
              image: v.shopImage,
              image1: v.shopImageOne,
              image2: v.shopImageTwo,
              image3: v.shopImageThree,
              shopIntroduce: v.shopIntroduce,
              shopLatitude: v.shopLatitude,
              shopLongitude: v.shopLongitude,
              shopLevel: v.shopLevel,
              shopScore: v.shopScore,
              shopStar: v.shopStar,
              shopLicense: v.shopLicense,
              userSalesId: v.userSalesId,
              id: v.id,
              yn: v.yn
            });
            
          });
          // 获取总数
          this.total = res.data.objectotalNumber;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 禁用
    delConform(row){
      console.log(row)
      this.$confirm('此操作将禁用该商户信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      })
      .then(() =>  { 
          this.$message({
              type: 'success',
              message: '禁用成功!'
          })
          deleteShop( {
              id: row.id
          }
          )  
          .then(res => {
            console.log(res)
             this.reload()
          })
          .catch(err => {
                  console.log(err)
              })     
      })
      .catch(() => {
          this.$message({
          type: 'info',
          message: '已取消禁用'
          })        
      })
    },
    // 取消禁用
    cancelDelConform(row){
      console.log(row)
      this.$confirm('此操作将解除对该商户的禁用, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      })
      .then(() =>  { 
          this.$message({
              type: 'success',
              message: '解禁成功!'
          })
          deleteShop( {
              id: row.id
          }
          )  
          .then(res => {
            console.log(res)
             this.reload()
          })
          .catch(err => {
                  console.log(err)
              })     
      })
      .catch(() => {
          this.$message({
          type: 'info',
          message: '已取消解禁'
          })        
      })
    },
    gotoUserEdit(row) {
      console.log(row)
      // 点击编辑页面跳转到编辑页面
      this.$router.push({ path:'/main/shop/update/:'+row.id });
      // 点击编辑将数据存储在浏览器
      sessionStorage.setItem("editInfo", JSON.stringify(row));
    },
    backToshopList() {
      this.allshow = true
      this.sbnshow = false
      this.sbsshow = false
      this.name = ''
      this.value = ''
      this.tableData=[]
      this.getData(this.pageIndex,20)
    },
  
  },
}
</script>

<style scoped>
  .el-button {
  margin-bottom: 10px;
  }
  .el-pagination {
    padding-top: 10px;
    text-align: right;
  }
</style>

