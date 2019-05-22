<template>
  <div id="rolemanage">
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
        <el-button type="primary" @click="dialogFormVisible = false" size="mini">确 定</el-button>
      </div>
      <el-tree
        :data="allrole"
        :props="defaultProps"
        show-checkbox
        ref="tree"
        @check-change="handleCheckChange"
      ></el-tree>
    </el-dialog>
    {{addForm.permissions}}
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      addForm: {
        roleName: "",
        roleDesc: ""
      },
      permissions: [],
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
    permissions(newVue, oldVue) {
       console.log('newVue',newVue)
       console.log('oldVue',oldVue)
    }
  },
  computed: {
    ...mapGetters(["rolelist", "allrole"])
  },
  methods: {
    //编辑
    handleEdit(index, row) {
      console.log(index);
    },
    //删除
    handleDelete(index, row) {
      console.log(index);
      console.log(row);
    },

    handleCheckChange(data, checked, indeterminate) {
      var arr = this.$refs.tree.getCheckedNodes();

      this.permissions = arr;

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