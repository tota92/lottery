<template>
  <div id="accountManager">
    <el-button size="mini" type="primary" @click="dialogFormVisible = true">新增账户</el-button>
    <el-table :data="allUsers" style="width: 99%" border>
      {{allUsers}}
      <el-table-column label="账号名" prop="username" align="center" width="150"></el-table-column>
      <el-table-column label="角色列表" prop="roles" align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="300">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="新增用户" :visible.sync="dialogFormVisible"  width="40%">
      <el-form :model="form" label-width="80px">
        <el-form-item label="用户名" >
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" >
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="type">
          <el-checkbox-group v-model="form.roles">
            <el-checkbox v-for="(item,index) in rolelist" :key ='index' :label="item._id">{{item.roleDesc}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button  @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      dialogFormVisible: false,
      dialogTableVisible: false,
      form: {
        username: "",
        password: "",
        roles:[]
      }
    };
  },
  computed: {
    ...mapGetters(["allUsers",'rolelist'])
  },
  mounted() {
    this.$store.dispatch("allUsers");
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
</style>