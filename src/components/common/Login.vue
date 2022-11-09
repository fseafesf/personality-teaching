<template>
  <div id="modal" :class="{ hide: isHide }">
    <div id="modal-content">
      <div id="close" class="el-icon-close" @click="toggleShowLogin"></div>
      <h1>xxx教学系统登录</h1>
      <div id="login">
        <el-row class="input-line">
          <el-col :span="4"><span class="text">账号：</span></el-col>
          <el-col :span="20"
            ><el-input v-model="username" placeholder="请输入账号"></el-input
          ></el-col>
        </el-row>
        <el-row class="input-line">
          <el-col :span="4"><span class="text">密码：</span></el-col>
          <el-col :span="20"
            ><el-input
              v-model="password"
              placeholder="请输入密码"
              show-password
            ></el-input
          ></el-col>
          <el-button type="primary" id="login-btn" @click="toggleShowLogin"
            >登录</el-button
          >
        </el-row>
      </div>
      <div id="alert">
        当前为内部测试账号
        <p>用户名: cs / 密码:123456</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      isHide: false,
    };
  },
  methods: {
    toggleShowLogin() {
      this.isHide = !this.isHide;
    },
  },
};
</script>

<style lang="less" scoped>
.hide {
  visibility: hidden;
  opacity: 0;
}
#modal {
  text-align: center;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  transform: scale(1.1);
  transition: all 0.3s ease;
  z-index: 999;
  #modal-content {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 480px;
    height: 300px;
    background-color: #ffffff;
    border-radius: 5px;
    transition: all 0.3s ease;
    padding: 25px;
    h1 {
      margin-top: 10px;
    }
  }
}
#login {
  width: 380px;
  // border: 1px solid black;
  position: absolute;
  left: 50%;
  top: 53%;
  transform: translate(-50%, -50%);
  .input-line {
    margin: 15px;
    .text {
      line-height: 40px;
    }
  }
  #login-btn {
    margin-top: 30px;
    width: 150px;
  }
}
#alert {
  text-align: center;
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 13px;
  color: #909399;
  p {
    margin: 0;
  }
}
#close {
  position: absolute;
  right: 25px;
  top: 15px;
  font-size: 25px;
  color: #909399;
  cursor: pointer;
}
</style>