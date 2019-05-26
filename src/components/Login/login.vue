<template>
  <div id="login">
    <img src="./Hippopx (2).jpg" id="bg">
    <div id="denglu">
      <span style="font-size:50px;color:#979695;text-align:center">可米彩票</span>
      <el-form :model="userInfo" :rules="rules" status-icon ref="userInfo">
        <el-form-item prop="accountName">
          <el-input placeholder="请输入账户" v-model="userInfo.accountName"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="请输入密码" v-model="userInfo.password"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="success" @click="login">登录</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        accountName: "",
        password: ""
      },
      rules: {
        accountName: [
          { required: true, message: "账户名不能为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    login() {
      this.$refs["userInfo"].validate(vali => {
        if (vali) {
          this.$http
            .post(this.$apis.signin, this.userInfo)
            .then(resp => {
              console.log(resp.data);
              var token = resp.data.token;
              var success = resp.data.success;
              var response =JSON.stringify(resp.data.response);
              if (success) {
                localStorage.setItem("token", token);
                localStorage.setItem("response", response);
                var query = this.$route.query;
                if (query.redirect) {
                 this.$router.push({ path: query.redirect });
                } else {
                  this.$router.push({ name: "home" });
                }
              } else {
                this.$message.error("账户或者密码错误");
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#login {
  width: 100%;
  height: 100%;
}
#bg {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}
#denglu {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
  position: fixed;
  right: 0;
  top: 0;
  height: 100%;
  width: 25%;
  background: rgba($color: #050505, $alpha: 0.6);
  box-sizing: border-box;
  padding: 0 30px;
}
</style>