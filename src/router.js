import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import( /* webpackChunkName: "home" */ '@/components/Home/home'),
      children: [
        //角色管理
        {
          path: 'RoleManage',
          name: 'RoleManage',
          component: () => import( /* webpackChunkName: "roleManage" */ '@/components/RoleManage/rolemanage'),
          children:[
            {
              path:'addRole',
              name:'addRole',
              component: () => import( /* webpackChunkName: "addRole" */ '@/components/RoleManage/addRole')
            }
          ]
        },
        //用户管理
        {
          path: 'accountManager',
          name: 'accountManager',
          component: () => import( /* webpackChunkName: "accountManager" */ '@/components/accountManager/accountmanager')
        },
        //权限管理
        {
          path: 'PermissionManage',
          name: 'PermissionManage',
          component: () => import( /* webpackChunkName: "permissionManage" */ '@/components/PermissionManage/permissionmanage')

        },
        //彩票管理
        {
          path: 'LotteryManage',
          name: 'LotteryManage',
          component: () => import( /* webpackChunkName: "lotteryManage" */ '@/components/LotteryManage/lotterymanage')
        },
        //彩票列表
        {
          path: 'LotteryList',
          name: 'LotteryList',
          component: () => import( /* webpackChunkName: "lotteryList" */ '@/components/LotteryList/lotterylist')
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import( /* webpackChunkName: "login" */ '@/components/Login/login')
    },

  ]
})