<template>
  <div id="rolemanage">
    <!-- 用户列表 -->
    <el-button size="mini" type="primary" @click="dialogFormVisible = true">新增角色</el-button>
    <el-table :data="rolelist" style="width: 99%">
      <el-table-column label="角色姓名" prop="roleName"></el-table-column>
      <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope, scope.row)">编辑角色</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除角色</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增用户弹窗 -->
    <el-dialog title="新增角色" :visible.sync="dialogFormVisible" width="30%">
      <el-form label-width="80px" :model="addForm" ref="addForm" :rules="rules">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="submitAdd" size="mini">确 定</el-button>
      </div>
      <el-tree
        :data="allrole"
        :props="defaultProps"
        show-checkbox
        ref="tree"
        @check-change="handleCheckChange"
      ></el-tree>
    </el-dialog>

    <!-- 编辑用户权限 -->
    <el-dialog title="编辑用户权限" :visible.sync="dialogFormVisible2" width="30%">
      <el-form label-width="80px" :model="updateRole">
        <el-form-item label="角色名称">
          <el-input v-model="updateRole.Name" disabled></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false" size="mini">取 消</el-button>
        <el-button type="primary" size="mini">确 定</el-button>
      </div>
      <el-tree
        :data="allrole"
        :props="defaultProps"
        show-checkbox
        ref="tree"
        @check-change="handleCheckChange"
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

      addForm: {
        roleName: "",
        roleDesc: "",
        permissions: []
      },

      updateRole: {
        Name: "",
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
  watch: {
    permissions(newVue, oldVue) {}
  },
  computed: {
    ...mapGetters(["rolelist", "allrole"])
  },
  methods: {
    //编辑用户的权限
    handleEdit(index, row) {
      this.dialogFormVisible2 = true;
      this.updateRole.Name = row.roleName 
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

    //确认新用户提交
    submitAdd() {
      this.$refs["addForm"].validate(vaild => {
        if (vaild) {
          this.post(this.$apis.addNewRole, this.addForm).then(() => {
            this.dialogFormVisible = false;
            this.$store.dispatch("rolelist");
          });
        }
      });
    }


  },
  mounted() {
    this.$store.dispatch("rolelist");
    this.$store.dispatch("allrole");
  }
};
</script>

<style lang="scss" scoped>
#rolemanage {
  height: 100%;
  width: 100%;
  padding: 10px 30px;
  box-sizing: border-box;
}
</style>