import Vue from 'vue'
var apis = {
    signin:'/signin' , //登录接口

    findAllRoles: '/system/role/findAllRoles',//查询所有信息

    showAllPermission :'/system/permission/showAllPermission',//查询所有权限
    
    addNewRole:'/system/role/addNewRole' ,//增加新用户
    deleteRole :'/system/role/deleteRole', //删除用户

}

Vue.prototype.$apis = apis

export default apis

