<template>
    <div class="main-content-container">
        <el-button type="warning" size="small" round @click="logOut" >退出登录</el-button>
        <router-view></router-view>
    </div>
</template>

<script>
import {logOut} from '@/api/http'
export default {
    data() {
        return {
            msg:''
        }
    },
    methods:{
        logOut(){
            this.$confirm('是否退出登录?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            })
            .then(() => {
                this.$message({
                type: 'success',
                message: '退出登录成功，请重新登录!'
                })
                logOut({

                })
                .then(res => {
                    console.log(res)
                    if(res.data.code ===200){
                        sessionStorage.removeItem('ifLogin')
                        this.$router.push({ path: '/login' })
                    }
   
                })
                .catch(err => {
                    console.log(err)
                })
            })
            .catch(() => {
                this.$message({
                type: 'info',
                message: '已取消退出'
                }) 
            })
        }        
   }
     
}
</script>

<style scoped>
    .main-content-container {
        height: 100%;
        width: 100%;    
        padding-left: 20px;  
        position: relative;
    }
    .el-button {
        /* margin-bottom: 10px; */
        position:fixed;
        right:10px;
        top:10px;
    }
</style>