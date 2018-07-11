<template>
    <div class="navmenu-container" >
        <el-menu class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
            <router-link to="/main/shop">
                <el-menu-item index="1">
                    <i class="el-icon-view"></i>
                    <span slot="title">商户管理</span>
                </el-menu-item>
            </router-link>
            <router-link to="/main/goods">
                <el-menu-item index="2">
                    <i class="el-icon-goods"></i>
                    <span slot="title">商品管理</span>
                </el-menu-item>
            </router-link>
            <router-link to="/main/order">
                <el-menu-item index="3">
                    <i class="el-icon-tickets"></i>
                    <span slot="title">订单管理</span>
                </el-menu-item>
            </router-link>
            <router-link to="/main/user">
                <el-menu-item index="4">
                    <i class="el-icon-service"></i>
                    <span slot="title">用户管理</span>
                </el-menu-item>
            </router-link>
            <router-link to="/main/banner">
                <el-menu-item index="5">
                    <i class="el-icon-picture"></i>
                    <span slot="title">商城轮播图管理</span>
                </el-menu-item>
            </router-link>
        </el-menu>
    </div>
</template>

<script>
   
</script>

<style scoped>
    a {
        text-decoration: none;
    }
    .router-link-active {
        text-decoration: none;
    }
    .navmenu-container {
        height: 100%;
        width: 180px;
        position:fixed;
        top:60px;
        left:0;
    }
    .el-menu-vertical-demo {
        height: 100%;
    }
</style>
