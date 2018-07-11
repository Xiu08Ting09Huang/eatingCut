<template>
  <div class="block">
    <el-pagination
      @current-change="handleCurrentChange"
      @prev-click="handlePrevClick"
      @next-click="handleNextClick"
      :current-page.sync="pageIndex"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default{
  props:{
    searchByPhone: Function,
    total: Number
  },

  data(){
    return{
      pageIndex: 1,
      pageSize: 20
    }
  },
 
  methods: {
    // 点击数字
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
     
      this.searchByPhone(this.phoneNumber,this.pageSize,this.pageIndex)
    },
    // 点击上一页
    handlePrevClick () {
   
      this.pageIndex--
   
      // console.log(this.pageIndex);
    },
    // 点击下一页
    handleNextClick () {
    
      this.pageIndex++
   
      // console.log(this.pageIndex);
    }
  }

}
</script>
<style>
  .el-pagination {
    padding-top: 10px;
    text-align: right;
  }
</style>
