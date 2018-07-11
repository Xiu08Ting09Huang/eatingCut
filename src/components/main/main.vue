<template>
    <div class="main-container">
        <el-container>
            <el-header><nav-header></nav-header></el-header>
            <el-container>
                <el-aside width="180px" ><nav-menu></nav-menu></el-aside>
                    <el-main><main-content></main-content></el-main>
                
            </el-container> 
        </el-container>
    </div>
</template>

<script>
    import navHeader from '@/components/layout/navHeader'
    import navMenu from '@/components/layout/navMenu'
    import mainContent from '@/components/layout/mainContent'
    
    export default {
        components: {
            navHeader,
            navMenu,
            mainContent
        }
    }
</script>

<style scoped>
    .main-container {
        width:100%;
        height:100%;
        background-color: #eee;
    }
    .el-header {
        width: 100%;
        color: #333;
        text-align: center;
        height: 60px;
        background-color:rgb(137, 171, 194);
    }
    
    .el-aside {
        background-color: #eee;
        color: #333;
        text-align: center;
        /* line-height: 180px; */
        height: 100%;
    }
    
    .el-main {
        background-color: #eee;
        color: #333;
        height: 100%;
    }
    .el-container {
        height:100%;
    }
</style>

