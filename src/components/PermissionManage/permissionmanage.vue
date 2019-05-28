<template>
  <div id="permission">
    <div id="add">
      <el-button type="primary" size="mini" @click="dialogTableVisible=true">新增权限</el-button>
    </div>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item
        v-for="(item,index) in allrole"
        :title="item.permissionDesc"
        :name="index"
        :key="index"
      >
        <p v-for="(ite,inde) in item.children" :key="inde+'u'">{{ite.permissionDesc}}</p>
      </el-collapse-item>
    </el-collapse>

    <el-dialog title="增加权限" :visible.sync="dialogTableVisible" width="40%"
    :before-close="cancel"
    >
      <el-form
        label-width="80px"
        size="mini"
        ref="form"
        :rules="rules"
        :model="form"
        status-icon
        class="demo-ruleForm"
      >
        <el-form-item label="权限名称" prop="permissionName">
          <el-input v-model="form.permissionName"></el-input>
        </el-form-item>
        <el-form-item label="权限描述" prop="permissionDesc">
          <el-input v-model="form.permissionDesc"></el-input>
        </el-form-item>
        <el-form-item label="父级权限">
          <el-select v-model="form.parentid" placeholder="请选择父级权限" style="width:100%">
            <el-option
              v-for="(item,index) in allrole"
              :key="index"
              :label="item.permissionDesc"
              :value="item._id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权限等级" prop="permissionLeve">
          <el-input v-model="form.permissionLeve"></el-input>
        </el-form-item>
        <el-form-item label="排列序号" prop="sortNum">
          <el-input v-model="form.sortNum"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel" size="mini">取 消</el-button>
        <el-button type="primary" @click="addPrmssion" size="mini">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      dialogTableVisible: false,
      activeNames: [],
      form: {
        permissionName: "", //权限名字
        permissionLeve: 0, //权限的等级,权限按等级来嵌套
        permissionDesc: "", //描述权限 权限的描述,主要用来给前端设置路由
        sortNum: 0, //权限的排序号,用于对各个权限之间进行排序
        parentid: "0" //父级权限的id
      },
      rules: {
        permissionName: [
          { required: true, message: "内容不能为空", trigger: "blur" }
        ],
        permissionLeve: [
          { required: true, message: "内容不能为空", trigger: "blur" }
        ],
        permissionDesc: [
          { required: true, message: "内容不能为空", trigger: "blur" }
        ],
        sortNum: [{ required: true, message: "内容不能为空", trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapGetters(["allrole"])
  },
  methods: {
    handleChange(val) {},
    addPrmssion() {
      this.$refs["form"].validate(vali => {
        if (vali) {
          this.post(this.$apis.addNewPersmission, this.form).then(() => {
            this.$refs["form"].resetFields();
            this.$store.dispatch("allrole");
            this.dialogFormVisible = false;
          });
        }
      });
    },
    cancel() {
      var action = () => {
        this.dialogTableVisible = false;
        this.$refs["form"].resetFields();
      };
      this.operateConfirm("退出", action);
    }
  },
  mounted() {
    this.$store.dispatch("allrole");
  }
};
</script>

<style lang="scss" scoped>
#permission {
  height: 100%;
  width: 100%;
  padding: 20px 30px;
  box-sizing: border-box;
}
#add {
  margin-bottom: 10px;
}
</style>