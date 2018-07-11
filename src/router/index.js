import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login'
import main from '@/components/main/main'
import goodsDetails from '@/base/goods/goodsDetails'
import goodsList from '@/base/goods/goodsList'
import addGoods from '@/base/goods/addGoods'
import updateGoods from '@/base/goods/updateGoods'
import orderList from '@/base/order/order'
import orderDetails from '@/base/order/orderDetails'
import shopList from '@/base/shop/shopList'
import addShop from '@/base/shop/addShop'
import updateShop from '@/base/shop/updateShop'
import userList from '@/base/user/userList'
import updateUserShopId from '@/base/user/updateUserShopId'
import banner from '@/base/banner/bannerList'
import updateBanner from '@/base/banner/updateBanner'
Vue.use(Router)

const router = new Router({
  routes: [
   {
    path: '/',
    redirect: '/login'
   },
   {
    path: '/login',
    component: login
   },
 
   {
    path: '/main',
    meta: {
      require: true,
    },
    component: main,
    children: [
      {
        path: 'goods',
        meta: {
          require: true,
        },
        component: goodsList
      },
      {
        path: 'goods/add',
        meta: {
          require: true,
        },
        component: addGoods
      },
      {
        path:'goods/update/:id',
        meta: {
          require: true,
        },
        component: updateGoods
      },
      {
        path: 'goods/details/:id',
        meta: {
          require: true,
        },
        component: goodsDetails
      },
      {
        path: 'order',
        meta: {
          require: true,
        },
        component: orderList
      },
      {
        path:'order/details/:id',
        meta: {
          require: true,
        },
        component:orderDetails
      },
      {
        path: 'shop',
        meta: {
          require: true,
        },
        component: shopList
      },
      {
        path: 'shop/add',
        meta: {
          require: true,
        },
        component: addShop
      },
      {
        path: 'shop/update/:id',
        meta: {
          require: true,
        },
        component: updateShop
      },
      {
        path: 'user',
        meta: {
          require: true,
        },
        component: userList
      },
      {
        path: 'user/updateShopId/:id',
        meta: {
          require: true,
        },
        component: updateUserShopId
      },
      {
        path: 'banner',
        meta: {
          require: true,
        },
        component: banner
      },
      {
        path: 'banner/updateBanner/:id',
        meta: {
          require: true,
        },
        component: updateBanner
      }
    ]
   }
  ],
  linkActiveClass: 'my-active' //覆盖默认路由高亮的类
})

router.beforeEach((to,from, next) => {
  if (to.meta.require) {
    if (!sessionStorage.getItem('ifLogin')) {
      next({
        path: '/login',
        query: {redirect: to.fullPath}  // 将跳转首页时的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  next()
})
export default router
