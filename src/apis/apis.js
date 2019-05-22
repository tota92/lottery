import Vue from 'vue'
var apis = {
    signin:'/signin' , //登录接口

    showAllPermission :'/system/permission/showAllPermission',//查询所有权限
    
    findAllRoles: '/system/role/findAllRoles',//查询角色
    addNewRole:'/system/role/addNewRole' ,//增加角色
    deleteRole :'/system/role/deleteRole', //删除角色
    updateRoleInfo:'/system/permission/updateRoleInfo',//更新角色

    findAllUsers:'/system/user/findAllUsers', //获取所有的用户
    addNewUser:'/system/user/addNewUser' //新增用户




}

Vue.prototype.$apis = apis

export default apis

