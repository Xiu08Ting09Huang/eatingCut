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
    getData: Function, 
    total: Number
  
  },
  // props: ["getData","total"],
  data() {
    return{
      pageIndex: 1,
      pageSize:  20
    }
  },
  methods: {
    // 点击数字
    handleCurrentChange(val) {
      // console.log(pageIndex);
      this.getData(this.pageIndex ,this.pageSize)
    },
    // 点击上一页
    handlePrevClick () {
    
      this.pageIndex--
      // this.getData(this.pageIndex ,this.pageSize)
      // console.log(this.pageIndex);
    },
    // 点击下一页
    handleNextClick () {
    
      this.pageIndex++
     
    }
  },

}
</script>
<style>
  .el-pagination {
    padding-top: 10px;
    text-align: right;
  }
</style>
