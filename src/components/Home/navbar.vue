<template>
  <div id="navbar">
    <el-col>
      <el-menu
        default-active="1"
        unique-opened
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
         background-color="#3e454b"
        text-color="#fff"
        active-text-color="#ffd04b"
        width='100%'
        height='100%'
      >
        <el-submenu :index="(index+1)+''" v-for="(item,index) in  parmentList" :key="index" >
          <template slot="title">
            <div  @click="openChlid(item._id)">
                <i class="el-icon-location"></i>
                <span >{{item.permissionDesc}}</span>
            </div>
          </template>
          <el-menu-item-group >
            <el-menu-item :index="'1-'+(indx+1)" v-for="(itm,indx) in child" :key='indx+"u"'
            @click="pushView({name:itm.permissionName})"
            >{{itm.permissionDesc}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
  </div>
</template>

<script>
export default {
  data() {
    return {
        parmentList:[],
        childrenList:[],
        child:[],
    };
  },
    methods:{
        handleOpen(){},
        handleClose(){},
        openChlid(id){
            var childrenList  = this.childrenList;
            this.child = []
            for(var i = 0;i<childrenList.length;i++){
                if(id === childrenList[i].parentid){
                    this.child.push(childrenList[i])
                }
            }
        }
    },
    mounted() {
        var response = JSON.parse(localStorage.getItem('response')) 
        var permissions = response.permissions
        for(var i =0;i<permissions.length;i++){
            if(permissions[i].parentid == 0){
                this.parmentList.push(permissions[i])
            }else{
                this.childrenList.push(permissions[i])                 
            }
        }
    },      

};
</script>

<style lang="scss" scoped>
</style>