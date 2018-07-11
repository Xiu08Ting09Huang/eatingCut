<template>
  <div class="goods-container">
    <div class="search" >
      <label>选择起止时间：</label>
      <el-date-picker type="datetime" placeholder="选择开始时间" v-model="startTime"  style="width: 25%;"></el-date-picker>
      <!-- <el-col class="line" :span="2">-</el-col> --><span>-</span>
      <el-date-picker type="datetime" placeholder="选择结束时间" v-model="endTime" style="width: 25%;"></el-date-picker>
      <el-button type="primary" plain @click="searchByTime(startTime,endTime,20)" >根据起止时间查询订单</el-button>
    </div>
    <div class="search">
      <label>核销状态：</label>
      <el-select value-key="label" v-model="value" placeholder="请选择核销状态" style="width:25%">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" plain @click="searchByStatus(value,20)" >根据核销状态查询订单</el-button>
      
    </div>
    <el-button type="danger" plain @click="backToOrderList" >清空搜索框</el-button>
    <el-table :data="tableData" border style="width:100%;">
          <el-table-column fixed prop="index" label="序号" width="50px"></el-table-column>

          <!-- <el-table-column prop="orderNo" label="订单编号" ></el-table-column> -->

          <el-table-column prop="goodsName" label="商品名"></el-table-column>

          <!-- <el-table-column prop="orderShopId" label="商户ID" ></el-table-column> -->

          <el-table-column prop="shopName" label="商户名" ></el-table-column>

          <el-table-column prop="userName" label="用户昵称" min-width="100px"></el-table-column>

          <el-table-column prop="orderCreateTime" label="创建时间" min-width="83px"></el-table-column>
              
          <!-- <el-table-column prop="orderEndTime" label="截止时间" min-width="83px"></el-table-column> -->

          <!-- <el-table-column prop="orderUseTime" label="核销时间" min-width="83px"></el-table-column> -->

          <el-table-column prop="orderStatus" label="订单状态" :formatter="statusFormat" ></el-table-column>

          <el-table-column fixed="right" label="操作" width="90px">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="viewDetails(scope.row)">订单详情</el-button>
          </template>
        </el-table-column>     
    
      </el-table>
    <!--分页-->
      <pagination :getData="getData"  :total='total' v-show="allshow"></pagination>
      <sbt-pagination :searchByTime="searchByTime"  :total='total' v-show="sbtshow"></sbt-pagination>
      <sbs-pagination :searchByStatus="searchByStatus" :total='total' v-show="sbsshow"></sbs-pagination>
  
</div>
</template>

<script>
import { orderList } from '@/api/http'
import moment from 'moment'
// 引入分页
import pagination from '@/base/pagination/pagination'
import sbtPagination from '@/base/pagination/sbtPagination'
import sbsPagination from '@/base/pagination/sbsPagination'
export default {
  data () {
    return {
      tableData: [],
      total:0,
      startTime:'',
      endTime:'',
      value: '',
      allshow: true,
      sbtshow: false,
      sbsshow: false,
      options: [{
          value: 4,
          label: '未核销'
        }, {
          value: 5,
          label: '已核销'
        }],
       
    }
  },
  components:{
    pagination,
    sbtPagination,
    sbsPagination
  },
  created () {
    this.getData(this.pageIndex ,20)
  },
  methods: {
    statusFormat:function(row) {
        var status = row.orderStatus
        
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
    backToOrderList() {
      this.allshow = true
      this.sbtshow = false
      this.sbsshow = false,
      this.startTime = ''
      this.endTime = ''
      this.value = ''
      this.tableData=[]
      this.getData(this.pageIndex,20)
    },
    
    //  封装列表数据
    getData (pageIndex,pageSize){
      orderList({
        pageIndex,
        pageSize
      })
        .then(res => {
          console.log(res)
          this.tableData = []
          res.data.dataList.forEach((v,i) => {
            this.tableData.push({
              index:i+1,
              id:v.id,
              orderBargainId: v.orderBargainId,//订单砍价者id
              orderGoodId: v.orderGoodId,//订单商品id
              goods:v.goods,
              orderNo: v.orderNo,//订单编号
              goodsName: v.goods==null?'--':v.goods.goodsName,
              shop: v.shop,
              orderShopId: v.orderShopId,
              shopName: v.shop==null?'--':v.shop.shopName,
              orderStatus:v.orderStatus,
              orderUseTime: v.orderUseTime ==null?'--':moment(v.orderUseTime).format("YYYY-MM-DD HH:mm:ss"),
              orderVerificationCode: v.orderVerificationCode,
              userOpenId: v.userOpenId,
              userName: v.user==null?'--':v.user.userName,
              orderCreateTime: moment(v.createdAt).format("YYYY-MM-DD HH:mm:ss"),
              orderEndTime: moment(v.orderEndTime).format("YYYY-MM-DD HH:mm:ss"),
            })
          })
          // 获取总数
          this.total = res.data.objectotalNumber
        })
        .catch(err => {
          console.log(err)
        })
    },
    searchByTime(startTime,endTime,pageSize,pageIndex){
      this.allshow = false
      this.sbtshow = true
      orderList({
        pageIndex,
        pageSize,
        startTime: this.startTime,
        endTime: this.endTime
      })
        .then(res => {
          console.log(res)
          this.tableData = []
          res.data.dataList.forEach((v,i) => {
            this.tableData.push({
              index:i+1,
              id:v.id,
              orderBargainId: v.orderBargainId,//订单砍价者id
              orderGoodId: v.orderGoodId,//订单商品id
              orderNo: v.orderNo,//订单编号
              goodsName: v.goods==null?'--':v.goods.goodsName,
              orderShopId: v.orderShopId,
              shopName: v.shop==null?'--':v.shop.shopName,
              orderStatus:v.orderStatus,
              orderUseTime: v.orderUseTime ==null?'--':moment(v.orderUseTime).format("YYYY-MM-DD HH:mm:ss"),
              orderVerificationCode: v.orderVerificationCode,
              userOpenId: v.userOpenId,
              userName: v.user==null?'--':v.user.userName,
              orderCreateTime: moment(v.createdAt).format("YYYY-MM-DD HH:mm:ss"),
              orderUpdateTime: moment(v.updatedAt).format("YYYY-MM-DD HH:mm:ss"),
              orderEndTime: moment(v.orderEndTime).format("YYYY-MM-DD HH:mm:ss")
            })
          })
          // 获取总数
          this.total = res.data.objectotalNumber
        })
        .catch(err => {
          console.log(err)
        })
    },
    searchByStatus(value,pageSize,pageIndex){
      this.allshow = false
      this.sbsshow = true
      console.log(this.value)
      orderList({
        pageIndex,
        pageSize,
        status: this.value
      })
        .then(res => {
          console.log(res)
          this.tableData = []
          res.data.dataList.forEach((v,i) => {
            this.tableData.push({
              index:i+1,
              id:v.id,
              orderBargainId: v.orderBargainId,//订单砍价者id
              orderGoodId: v.orderGoodId,//订单商品id
              orderNo: v.orderNo,//订单编号
              goodsName: v.goods==null?'--':v.goods.goodsName,
              orderShopId: v.orderShopId,
              shopName: v.shop==null?'--':v.shop.shopName,
              orderStatus:v.orderStatus,
              orderUseTime: v.orderUseTime ==null?'--':moment(v.orderUseTime).format("YYYY-MM-DD HH:mm:ss"),
              orderVerificationCode: v.orderVerificationCode,
              userOpenId: v.userOpenId,
              userName: v.user==null?'--':v.user.userName,
              orderCreateTime: moment(v.createdAt).format("YYYY-MM-DD HH:mm:ss"),
              orderUpdateTime: moment(v.updatedAt).format("YYYY-MM-DD HH:mm:ss"),
              orderEndTime: moment(v.orderEndTime).format("YYYY-MM-DD HH:mm:ss")
            })
          })
          // 获取总数
          this.total = res.data.objectotalNumber
        })
        .catch(err => {
          console.log(err)
        })
    },
    viewDetails(row) {
      console.log(row)
      this.$router.push({ path:'/main/order/details/:'+row.number })
      sessionStorage.setItem('editInfo',JSON.stringify(row))
    },
  },
      
 
  
}
</script>

<style scoped lang="scss">
  .goods-container{
    width:100%;
    height:100%;
  }
  .el-pagination {
    padding-top: 10px;
    text-align: right;
  }
  
  .el-button{
    margin-bottom: 10px;
  }
</style>
