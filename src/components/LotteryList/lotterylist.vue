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
      <el-form label-width="100px" :model="form">
        <el-form-item label="彩票中文名称">
          <el-input v-model="form.cn"></el-input>
        </el-form-item>
        <el-form-item label="彩票英文名称">
          <el-input v-model="form.en"></el-input>
        </el-form-item>
        <el-form-item label="icons 1x" width="100px">
          <el-upload
            ref="upload"
            class="avatar-uploader"
            list-type="picture"
            :file-list="fileList"
            action="#"
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
            ref="upload"
            class="avatar-uploader"
            style="width:80px;height:80px;"
            action="#"
            :limit="2"
            list-type="picture"
            :file-list="fileList2"
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

//将图片转换成base64
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
      // 图片转base64完成后返回reader对象
      resolve(reader);
    };
    reader.onerror = reject;
  });
}

//获取图片的宽高
function getWh(file) {
  return new Promise((resolve, reject) => {
    var image = new Image();
    image.src = file.url;
    console.log(image);
    image.onload = function() {
      var width = this.width;
      var height = this.height;
      resolve({
        width,
        height
      });
    };
  });
}

//判断上传图片是否符合要求
var beforeAvatarUpload = file => {
  const isJPG = file.type === "image/jpeg";
  if (!isJPG) {
    // this.$message.error("上传彩票图片只能是 JPG 格式!");
    return false;
  }
};

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
      fileList2: []
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
      var fd = new FormData();
      fd.append("file", this.fileList[0].raw);
      fd.append("file", this.fileList2[0].raw);
      fd.append("en", this.form.en);
      fd.append("cn", this.form.cn);
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      axios
        .post(this.$apis.addNewGame, fd, config)
        .then(resp => {
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
    },
    cancel() {
      var action = () => {
        this.dialogFormVisible = false;
        this.$refs["form"].resetFields();
      };
      this.operateConfirm("退出", action);
    },

    hand(file, fileList) {
      this.fileList = fileList.slice(-1);
      this.imageUrl = file.url;
    },

    hand2(file, fileList) {
      this.fileList2 = fileList.slice(-1);
      this.imageUrl2 = file.url;
    },

    lotteryView(item){
      localStorage.setItem("lottery",item.en)
     this.pushView({name:'lotteryView'})
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