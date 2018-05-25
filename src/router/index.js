import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
import Main from '@/components/main/main'
import Home from '@/components/home/home'
import Goods from 'base/goods/goods'
import UserList from '@/components/userlist/userlist'
import userEdit from 'base/userEdit/userEdit'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/main',
      component: Main,
      children: [
        {
          path: 'home',
          component: Home
        },
        {
          path: 'goods',
          component: Goods
        },
        {
          path: 'userlist',
          component: UserList
        },
        {
          path: 'userlist/edit/:id',
          component: userEdit
        }
      ]
    }
  ]
})
