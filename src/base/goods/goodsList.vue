<template>
  <div class="userlist-container">  
    <div>   
      <router-link to="/main/goods/add" ><el-button type="primary" plain >添加商品</el-button></router-link>
      
      <div class="search">
        <label>商品名称：</label>
        <el-input type="text" placeholder="请输入商品名" v-model="name" style="width: 30%;"></el-input>
        <el-button type="primary" plain @click="searchByName(name,20)" >根据商品名查询商品</el-button>
        
      </div>
      <div class="search">
        <label>商品状态：</label>
        <el-select value-key="label" v-model="value" placeholder="请选择商品状态" style="width:30%">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary" plain @click="searchByStatus(value,20)" >根据商品状态查询订单</el-button>
       
      </div>
      <el-button type="danger" plain @click="backToGoodsList" >清空搜索框</el-button>
      <el-table :data="tableData" border max-height="780px" style="width: 100%">
        <el-table-column fixed prop="index" label="序号" width="50px"></el-table-column>

        <el-table-column prop="name" label="商品名称" ></el-table-column>
        
        <el-table-column prop="image" label="商品图片" >
          <template slot-scope="scope">
            <img :src="scope.row.image" height="50px" class="image"/>
          </template>
        </el-table-column>

        <el-table-column prop="goodsNumber" label="商品余量" ></el-table-column>

        <el-table-column prop="goodsBargainNumber" label="可砍次数" ></el-table-column>

        <el-table-column prop="price" label="原价"></el-table-column>

        <el-table-column prop="lowPrice" label="最低价"></el-table-column>

        <el-table-column prop="goodsStatus" label="商品状态" :formatter="statusFormat"></el-table-column>

        <el-table-column prop="startTime" label="创建时间" width="83px"></el-table-column>

        <el-table-column prop="endTime" label="截止时间" width="83px" ></el-table-column>
          
        <el-table-column prop="updateTime" label="更新时间" width="83px" ></el-table-column>

        <el-table-column prop="details" label="商品介绍" ></el-table-column>

        <!-- <el-table-column prop="shopId" label="所属商户ID" min-width="82px"></el-table-column> -->

        <el-table-column prop="shopName" label="商户名" ></el-table-column>

        <el-table-column prop="shop" label="商户详情" >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="viewDetails(scope.row)">点击查看</el-button>
          </template>
        </el-table-column>

        <el-table-column prop="image1" label="轮播图" >
          <template slot-scope="scope">
            <img :src="scope.row.image1" height="50px" class="image"/>
          </template>
        </el-table-column>

        <!-- <el-table-column prop="image2" label="轮播图2" >
          <template slot-scope="scope">
            <img :src="scope.row.image2" height="50px" class="image"/>
          </template>
        </el-table-column> -->

        <el-table-column prop="image3" label="商品详情图" >
          <template slot-scope="scope">
            <img :src="scope.row.image3" height="50px" class="image"/>
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="97px">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="updateGoods(scope.row)">更新</el-button>
            <el-button type="text" size="small" @click="delConform(scope.row)">删除</el-button>
          </template>
        </el-table-column>
    </el-table>
    <!--分页-->
      <pagination :getData="getData" :total='total' v-show="allshow"></pagination>
      <sbn-pagination :searchByName="searchByName"  :total='total' v-show="sbnshow"></sbn-pagination>
      <sbs-pagination :searchByStatus="searchByStatus" :total='total' v-show="sbsshow"></sbs-pagination>
    </div>
  </div>
</template>

<script>
  import {goodsList,deleteGoods} from '@/api/http'
  import moment from 'moment'
// 引入分页
import pagination from '@/base/pagination/pagination'
import sbnPagination from '@/base/pagination/sbnPagination'
import sbsPagination from '@/base/pagination/sbsPagination'

export default {
  data () {
    return {
      tableData: [],
      total: 0,
      id:'',
      value: '',
      name: '',
      allshow: true,
      sbnshow: false, 
      sbsshow: false,
       options: [{
          value: 1,
          label: '可砍价'
        }, {
          value: 2,
          label: '已过期'
        }],
    }
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
    statusFormat:function(row) {
        var status = row.goodsStatus
        if (status === 1) {
          return "可砍价"
        }
        else if (status === 2) {  
          return "已过期"
        }
    },
      
     // 获取列表数据
    getData (pageIndex,pageSize) {
      goodsList({
        pageIndex,
        pageSize
      })
      .then(res => {
          console.log(res)
          this.tableData = []
          
          res.data.dataList.forEach((v,i) => {
            this.tableData.push({
              index: i+1,
              id: v.id,
              name: v.goodsName,
              price: v.goodsPrice,
              lowPrice: v.goodsLowPrice,
              image: v.goodsImage,
              image1: v.goodsPictureOne,
              // image2: v.goodsPictureTwo,
              image3: v.goodsPictureThree,
              details: v.goodsText,
              goodsNumber: v.goodsNumber,
              goodsBargainNumber: v.goodsBargainNumber,
              goodsStatus: v.goodsStatus,
              shopId:v.shopId,
              shop: v.shop,
              shopName: v.shop==null?'--':v.shop.shopName,
              shopId:v.goodsShopId,
              startTime: moment(v.createdAt).format("YYYY-MM-DD HH:mm:ss"),
              endTime: moment(v.goodsBargainEndTime).format("YYYY-MM-DD HH:mm:ss"),
              updateTime: moment(v.updatedAt).format("YYYY-MM-DD HH:mm:ss"),
              // shopId: v.goodsShopId,
            })
          })
          // 获取总数
          this.total = res.data.objectotalNumber
        })
        .catch(err => {
          console.log(err)
        })
    },

    searchByName(name,pageSize,pageIndex) {
    
      this.allshow = false
      this.sbnshow = true
      this.sbsshow = false
      goodsList({
        pageIndex,
        pageSize,
        goodsName:name
      })
        .then(res => {
          console.log(res)
          this.tableData = []
          this.total = res.data.objectotalNumber
          res.data.dataList.forEach((v,i) => {
            this.tableData.push({
              index: i+1,
              id: v.id,
              name: v.goodsName,
              price: v.goodsPrice,
              lowPrice: v.goodsLowPrice,
              image: v.goodsImage,
              image1: v.goodsPictureOne,
              image2: v.goodsPictureTwo,
              image3: v.goodsPictureThree,
              details: v.goodsText,
              goodsNumber: v.goodsNumber,
              goodsBargainNumber: v.goodsBargainNumber,
              goodsStatus:v.goodsStatus,
              shop:v.shop,
              shopName: v.shop==null?'--':v.shop.shopName,
              shopId:v.goodsShopId,
              startTime: moment(v.createdAt).format("YYYY-MM-DD HH:mm:ss"),
              endTime: moment(v.goodsBargainEndTime).format("YYYY-MM-DD HH:mm:ss"),
              updateTime: moment(v.updatedAt).format("YYYY-MM-DD HH:mm:ss"),
              shopId: v.goodsShopId,
        
            })
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    searchByStatus(value,pageSize,pageIndex){
      this.allshow = false
      this.sbsshow = true
      this.sbnshow = false
      console.log(this.value)
      goodsList({
        pageIndex,
        pageSize,
        goodsStatus: this.value
      })
        .then(res => {
          console.log(res)
          this.tableData = []
          this.total = res.data.objectotalNumber
          res.data.dataList.forEach((v,i) => {
            this.tableData.push({
              index: i+1,
              id: v.id,
              name: v.goodsName,
              price: v.goodsPrice,
              lowPrice: v.goodsLowPrice,
              image: v.goodsImage,
              image1: v.goodsPictureOne,
              image2: v.goodsPictureTwo,
              image3: v.goodsPictureThree,
              details: v.goodsText,
              goodsNumber: v.goodsNumber,
              goodsBargainNumber: v.goodsBargainNumber,
              goodsStatus:v.goodsStatus,
              shop:v.shop,
              shopName: v.shop==null?'--':v.shop.shopName,
              shopId:v.goodsShopId,
              startTime: moment(v.createdAt).format("YYYY-MM-DD HH:mm:ss"),
              endTime: moment(v.goodsBargainEndTime).format("YYYY-MM-DD HH:mm:ss"),
              updateTime: moment(v.updatedAt).format("YYYY-MM-DD HH:mm:ss"),
              shopId: v.goodsShopId,
        
            })
          })
        
        })
        .catch(err => {
          console.log(err)
        })
    },
 
    delConform(row){
      console.log(row)
      this.$confirm('此操作将永久删除该商品信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      })
      .then(() =>  { 
          this.$message({
              type: 'success',
              message: '删除成功!'
          })
          deleteGoods( {
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
          message: '已取消删除'
          })        
      })
  
    },
    viewDetails(row) {
      console.log(row)
      this.$router.push({ path:'/main/goods/details/:'+row.id })
      sessionStorage.setItem('editInfo',JSON.stringify(row))
    },

    updateGoods(row) {
        console.log(row)
        this.$router.push({ path:'/main/goods/update/:'+row.id })
        sessionStorage.setItem('editInfo',JSON.stringify(row))
    },
    backToGoodsList() {
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
  .el-button{
    margin-bottom: 10px;
    margin-left: 10px;
  }
  .el-pagination {
    padding-top: 10px;
    text-align: right;
  }
  

</style>
