<template>
  <div id="rolemanage">
    <!-- 用户列表 -->
    <div id="add">
      <el-button size="mini" type="primary" @click="dialogFormVisible = true">新增角色</el-button>
    </div>
    <el-table :data="rolelist" style="width: 99%" border>
      <el-table-column label="角色姓名" prop="roleName" align="center" width="200"></el-table-column>
      <el-table-column label="角色描述" prop="roleDesc" align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="300">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增角色弹窗 -->
    <el-dialog title="新增角色" :visible.sync="dialogFormVisible" width="30%" :before-close="cancel">
      <el-form label-width="80px" :model="addForm" ref="addForm" :rules="rules">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel" size="mini">取 消</el-button>
        <el-button type="primary" @click="submitAdd" size="mini">新 增</el-button>
      </div>
      <el-tree
        :data="allrole"
        :props="defaultProps"
        node-key="_id"
        show-checkbox
        ref="tree"
        @check-change="handleCheckChange"
      ></el-tree>
    </el-dialog>

    <!-- 编辑角色权限 -->
    <el-dialog
      title="编辑用户权限"
      :visible.sync="dialogFormVisible2"
      width="30%"
      @opened="open"
      :before-close="cancel2"
    >
      <el-form label-width="80px" :model="updateRole">
        <el-form-item label="角色名称">
          <el-input v-model="updateRole.Name" disabled></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel2" size="mini">取 消</el-button>
        <el-button type="primary" size="mini" @click="update">更 新</el-button>
      </div>
      <el-tree
        :data="allrole"
        :props="defaultProps"
        show-checkbox
        node-key="_id"
        ref="tree"
        @check-change="handleCheckChange2"
      ></el-tree>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogFormVisible2: false,
      arr: [],
      addForm: {
        roleName: "",
        roleDesc: "",
        permissions: []
      },

      updateRole: {
        Name: "",
        id: "",
        permissions: []
      },

      rules: {
        roleName: [
          { required: true, message: "内容不能为空", trigger: "blur" }
        ],
        roleDesc: [{ required: true, message: "内容不能为空", trigger: "blur" }]
      },
      defaultProps: {
        children: "children",
        label: "permissionDesc"
      }
    };
  },
  computed: {
    ...mapGetters(["rolelist", "allrole"])
  },
  methods: {
    open() {
      // var p = [...this.allPrentRole]
      // var c = [...this.arr]
      // var a = c.filter(item=>!new Set(p).has(item))

      // this.$refs.tree.setCheckedKeys([...a])
      this.$refs.tree.setCheckedKeys([...this.arr]);
    },
    //编辑用户的权限
    handleEdit(index, row) {
      console.log(row);
      this.arr = row.permissions;
      this.dialogFormVisible2 = true;
      this.updateRole.Name = row.roleName;
      this.updateRole.id = row._id;
    },

    //删除用户
    handleDelete(index, row) {
      var action = () => {
        this.post(this.$apis.deleteRole, row);
      };
      this.operateConfirm("删除用户", action).then(() => {
        this.$store.dispatch("rolelist");
      });
    },

    //新用户设置权限
    handleCheckChange(data, checked, indeterminate) {
      var arr = this.$refs.tree.getCheckedNodes(false, true);
      var arr2 = [];
      for (var i = 0; i < arr.length; i++) {
        arr2.push(arr[i]._id);
      }
      this.addForm.permissions = arr2;
    },

    handleCheckChange2(data, checked, indeterminate) {
      var arr = this.$refs.tree.getCheckedNodes(false, true);
      var arr2 = [];
      for (var i = 0; i < arr.length; i++) {
        arr2.push(arr[i]._id);
      }
      this.updateRole.permissions = arr2;
    },

    //确认新用户提交
    submitAdd() {
      this.$refs["addForm"].validate(vaild => {
        if (vaild) {
          this.post(this.$apis.addNewRole, this.addForm).then(() => {
            this.dialogFormVisible = false;
            this.addForm.roleName = "";
            this.addForm.roleDesc = "";
            this.$store.dispatch("rolelist");
            this.$refs.tree.setCheckedKeys([]);
          });
        }
      });
    },

    //更新角色权限
    update() {
      this.post(this.$apis.updateRoleInfo, this.updateRole).then(() => {
        this.$store.dispatch("rolelist");
        this.dialogFormVisible2 = false;
      });
    },
    //取消新增角色
    cancel() {
      var action = () => {
        this.dialogFormVisible = false;
        this.addForm.roleName = "";
        this.addForm.roleDesc = "";
        this.$refs.tree.setCheckedKeys([]);
      };
      this.operateConfirm("退出", action);
    },
    //取消编辑角色
    cancel2() {
      var action = () => {
        this.dialogFormVisible2 = false;
      };
      this.operateConfirm("退出", action);
    }
  },
  mounted() {
    console.log(this.allrole);
    this.$store.dispatch("rolelist");
    this.$store.dispatch("allrole");
  }
};
</script>

<style lang="scss" scoped>
#rolemanage {
  height: 100%;
  width: 100%;
  padding: 20px 30px;
  box-sizing: border-box;
}
#add {
  margin-bottom: 10px;
}
</style>