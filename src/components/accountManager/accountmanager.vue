<template>
  <div id="accountManager">
    <el-button size="mini" type="primary" @click="addUser" id ="add">新增账户</el-button>
    <el-table :data="allUsers" style="width: 99%" border>
      <el-table-column label="账号名" prop="username" align="center" width="200"></el-table-column>
      <el-table-column label="角色列表"  align="center">
          <template slot-scope="scope">
                {{scope.row.rolesName|getString}}
         </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="300">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog  :visible.sync="dialogFormVisible" width="35%"
      :before-close="cancelUser"
    >
      <div slot="title" class="dialog-title">{{istrue?'新增用户':'编辑用户'}}</div> 
      <el-form :model="form" label-width="80px" :rules="rules" ref="addform">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="roles">
          <el-checkbox-group v-model="form.roles">
            <el-checkbox
              v-for="(item,index) in rolelist"
              :key="index"
              :label="item._id"
            >{{item.roleDesc}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelUser">取 消</el-button>
        <el-button type="primary" @click="updateUser">{{istrue?'新 增':'更 新'}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      istrue:true,
      dialogFormVisible: false,
      dialogTableVisible: false,
      form: {
        username: "",
        password: "",
        roles: []
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", triggger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", triggger: "blur" }
        ],
        roles: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个角色",
            trigger: "change"
          }
        ]
      }
    };
  },
  filters:{
         getString(arr){
             var s = ""  
             for(var value of arr){
                 s += value+"," 
             } 
        return  s.slice(0,-1)
         }

  },
  methods: {
    //提交新增用户或者编辑
    updateUser() {
      if(this.istrue){
        //提交新增用户接口
        var url = this.$apis.addNewUser
      }else{
        //提交更新用户接口
        var url = this.$apis.updateUserInfo
      }
      this.$refs["addform"].validate(vali => {
        if (vali) {
          this.post(url,this.form).then(() => {
            this.$refs["addform"].resetFields();
            this.$store.dispatch("allUsers");
            this.dialogFormVisible = false;
          });
        }
      });
    },
    //退出新增或编辑
    cancelUser() {
      var action = () => {
        this.$refs["addform"].resetFields();
        this.dialogFormVisible = false;
        this.form.username = ''
        this.form.password = ''
        this.form.roles = []
      };
      this.operateConfirm("退出",action);
    },

   //删除用户
   handleDelete(index,row){
      var action = ()=> {
           this.post(this.$apis.deleteUser,row)
           this.$store.dispatch("allUsers");
           this.dialogFormVisible = false;
      }
      this.operateConfirm("删除账号",action);
  },

  //编辑用户
  handleEdit(scope,row){
    this.istrue = false
    var a ={...row}
    this.form= a
    // this.form.password = row.username
    // this.form.roles = []
    this.dialogFormVisible = true
  },
 //新增用户
  addUser(){
    this.istrue = true
   this.dialogFormVisible = true
  }

  },
  computed: {
    ...mapGetters(["allUsers", "rolelist"])
  },
  mounted() {
    this.$store.dispatch("allUsers");
    this.$store.dispatch("rolelist");
  }
};
</script>

<style lang="scss" scoped>
#accountManager {
  height: 100%;
  width: 100%;
  padding: 20px 30px;
  box-sizing: border-box;
}
#add{
  margin-bottom: 10px
}
</style>