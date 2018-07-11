<template>
    <div class="images-container">
       <el-table :data="tableData" border style="width: auto">
        <el-table-column fixed prop="id" label="序号" width="50px"></el-table-column>
        <el-table-column prop="banner1" label="轮播图1" min-width="220px" >
          <template slot-scope="scope">
            <img :src="scope.row.banner1" class="image"/>
          </template>
        </el-table-column>
        <el-table-column prop="banner2" label="轮播图2" min-width="220px">
          <template slot-scope="scope">
            <img :src="scope.row.banner2" class="image"/>
          </template>
        </el-table-column>
        <el-table-column prop="banner3" label="轮播图3" min-width="220px">
          <template slot-scope="scope">
            <img :src="scope.row.banner3" class="image"/>
          </template>
        </el-table-column> 
         <!-- <el-table-column prop="banner4" label="轮播图4" min-width="220px">
          <template slot-scope="scope">
            <img :src="scope.row.banner4" class="image"/>
          </template>
        </el-table-column> 
         <el-table-column prop="banner5" label="轮播图5" min-width="220px">
          <template slot-scope="scope">
            <img :src="scope.row.banner5" class="image"/>
          </template>
        </el-table-column>  -->
        <el-table-column fixed="right" label="操作" width="90px" >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="updateBanners(scope.row)">更新</el-button>
          </template>
        </el-table-column>
        </el-table>
    </div> 
</template>

<script>
import {bannerList} from '@/api/http'
export default {
  data() {
    return {
        tableData: [],

    }
  },

  created() {
    this.getBannerList()
  
  },
  
  methods:{
    getBannerList() {
      bannerList({

      })
      .then(res => {
        console.log(res)
        res.data.dataList.forEach(v => {
          this.tableData.push({
            id: v.id,
            banner1: v.image1,
            banner2: v.image2,    
            banner3: v.image3,  
            // banner4: v.image4, 
            // banner5: v.image5
          })
        })
            
      })
      .catch(err => {
        console.log(err)
      })
    },

      updateBanners(row) {
          console.log(row)
          this.$router.push({ path:'/main/banner/updateBanner/:'+row.id })
          sessionStorage.setItem('editInfo',JSON.stringify(row))
      }
  }
}
</script>

<style scoped>
    .image {
        height:100px;
    }
</style>
