<template>
  <div id="lotterylist">
    <ul id="lottery">
      <li v-for="(item,index) in allGames.games" :key="index">
        <div class="IMG" @click="lotteryView(item)">
          <img :src="'http://localhost:3000'+item.icon2">
        </div>
        <div class="TITLe">{{item.cn}}</div>
      </li>
      <li class="updata" @click="dialogFormVisible=true">
        <div class="IMG">
          <i class="el-icon-plus" style="font-size:25px"></i>
        </div>
      </li>
    </ul>
    <el-dialog title="新增彩票" :visible.sync="dialogFormVisible" width="40%" :before-close="cancel">
      <el-form label-width="100px" :model="form" :rules="rules" ref="form" status-icon>
        <el-form-item label="彩票中文名称" prop="cn">
          <el-input v-model="form.cn"></el-input>
        </el-form-item>
        <el-form-item label="彩票英文名称" prop="en">
          <el-input v-model="form.en"></el-input>
        </el-form-item>
        <el-form-item label="icons 1x" width="100px">
          <el-upload
            ref="upload"
            class="avatar-uploader"
            list-type="picture"
            action="#"
            :file-list="fileList"
            :on-change="hand"
            :auto-upload="false"
            :show-file-list="false"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="icons 2x" width="200px">
          <el-upload
            ref="upload2"
            class="avatar-uploader"
            style="width:80px;height:80px;"
            action="#"
            :file-list="fileList"
            list-type="picture"
            :on-change="hand2"
            :auto-upload="false"
            :show-file-list="false"
          >
            <img v-if="imageUrl2" :src="imageUrl2" class="avatar" style="width:80px;height:80px;">
            <i
              v-else
              class="el-icon-plus avatar-uploader-icon"
              style="width:80px;height:80px;line-height:80px"
            ></i>
          </el-upload>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel" size="mini">取 消</el-button>
        <el-button type="primary" size="mini" @click="update">上 传</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";


export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        en: "",
        cn: ""
      },
      imageUrl: "",
      imageUrl2: "",
      fileList: [],
      file1:{},
      file2:{},
      rules: {
        en: [{ required: true, message: "内容不能为空", trigger: "blur" }],
        cn: [{ required: true, message: "内容不能为空", trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapGetters(["allGames"])
  },
  mounted() {
    this.$store.dispatch("allGames");
  },
  methods: {
    update() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          var fd = new FormData();
          fd.append("file", this.file1);
          fd.append("file", this.file2);
          fd.append("en", this.form.en);
          fd.append("cn", this.form.cn);
          let config = {
            headers: { "Content-Type": "multipart/form-data" }
          };
          axios
            .post(this.$apis.addNewGame, fd, config)
            .then(resp => {
              this.action();
              this.$message({
                type: resp.data.success ? "success" : "danger",
                message: resp.data.message
              });
              if (resp.data.success) {
                this.$store.dispatch("allGames");
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    },
    action() {
      this.dialogFormVisible = false;
      (this.form.cn = ""),
        (this.form.en = ""),
        (this.imageUrl = ""),
        (this.imageUrl2 = ""),
        (this.fileList = []),
        (this.file1 = {}),
        (this.file2 = {}),
        this.$refs["form"].resetFields();
    },
    cancel() {
      this.operateConfirm("退出", this.action);
    },

    Avatar(file, w) {
      return new Promise((resolve, reject) => {
        const isJPG = file.raw.type === "image/jpeg";
        var image = new Image();
        image.src = file.url;
        var _this = this;
        image.onload = function() {
          var width = this.width;
          var height = this.height;
          if (!isJPG) {
            _this.$message.error("上传彩票图片只能是 JPG 格式!");
            resolve(true);
          } else if (width !== w && height !== w) {
            _this.$message.error("上传彩票图片不是" + w + "×" + w);
            resolve(true);
          } else {
            resolve(false);
          }
        };
      });
    },

    hand(file, fileList) {
      this.Avatar(file, 40).then(resp => {
        if (!resp) {
          this.imageUrl = file.url;
           this.file1 = file.raw
        }
      });
    },

    hand2(file, fileList) {
       this.Avatar(file, 90).then(resp => {
        if (!resp) {
          this.imageUrl2 = file.url;
          this.file2 = file.raw
        }
      });
    },

    lotteryView(item) {
      localStorage.setItem("lottery", item.en);
      this.pushView({ name: "lotteryView" });
    }
  }
};
</script>

<style lang="scss" scoped>
#lotterylist {
  height: 100%;
  width: 100%;
  padding: 20px 25px;
  box-sizing: border-box;
}
#lottery {
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  li {
    height: 120px;
    width: 100px;
    margin: 10px 5px;
    .IMG {
      margin: auto;
      height: 90px;
      width: 90px;
      text-align: center;
      line-height: 90px;
    }
    .TITLe {
      text-align: center;
      height: 20px;
      width: 100%;
      padding: 10px 0;
    }
  }
}
.updata {
  height: 120px;
  width: 100px;
  margin: 10px 5px;
  .IMG {
    margin: auto;
    height: 90px;
    width: 90px;
    text-align: center;
    line-height: 90px;
    border: 1px dashed black;
    border-radius: 3px;
  }
}
.IMG:hover {
  border-color: #409eff;
}

.avatar-uploader {
  border: 1px dashed black;
  border-radius: 6px;
  width: 40px;
  height: 40px;
  cursor: pointer;
}
.avatar-uploader :hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 20px;
  color: #8c939d;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.avatar {
  width: 40px;
  height: 40px;
  display: block;
}
</style>