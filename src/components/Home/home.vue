<template>
  <div id="home">
    <div id="topBar">
      <el-button type="danger" size="mini" @click="loginOut">注销</el-button>
    </div>
    <div id="content">
      <div id="leftBar">
        <navbar></navbar>
      </div>
      <div id="rightBar">
        <transition
          name="custom-classes-transition"
          enter-active-class="animated fadeIn"
          leave-active-class="animated slideOutRight"
        >
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import navbar from "./navbar";
export default {
  components: { navbar },
  methods: {
    loginOut() {
      var action = () => {
        this.$router.push({ name: "login" });
        localStorage.clear();
      };
      this.operateConfirm("注销", action);
    }
  }
};
</script>

<style lang="scss" scoped>
#home {
  width: 100%;
  height: 100%;
}
#topBar {
  text-align: right;
  padding: 10px 5px;
  box-sizing: border-box;
  height: 8%;
  line-height: 100%;
  min-height: 40px;
  width: 100%;
  background: #f2f6fc;
}
#content {
  height: 92%;
  width: 100%;
  display: flex;
}
#leftBar {
  height: 100%;
  width: 16.5%;
  background: #3e454b;
}
#rightBar {
  height: 100%;
  width: 85%;
}
</style>