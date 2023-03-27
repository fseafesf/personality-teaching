<template>
  <div id="modal">
    <div id="modal-content">
      <h1>个性化教学系统</h1>

      <!-- 选择标签 -->
      <el-tabs v-model="activeName">
        <el-tab-pane label="学生" name="student"></el-tab-pane>
        <el-tab-pane label="教师" name="teacher"></el-tab-pane>
      </el-tabs>

      <!-- 登录输入框 -->
      <div id="login">
        <el-row class="input-line">
          <el-col :span="4"><span class="text">账号：</span></el-col>
          <el-col :span="20">
            <el-input v-model="username" placeholder="请输入账号"></el-input>
          </el-col>
        </el-row>
        <el-row class="input-line">
          <el-col :span="4"><span class="text">密码：</span></el-col>
          <el-col :span="20">
            <el-input
              v-model="password"
              placeholder="请输入密码"
              show-password
              @keyup.enter.native="sendLogin"
            ></el-input>
          </el-col>
          <el-button type="primary" id="login-btn" @click="sendLogin"
            >登录</el-button
          >
        </el-row>
      </div>

      <!-- 其它 -->

    </div>
    <div id="clock">
      <div id="time">{{ time }}</div>
      <div id="date">{{ date }}</div>
    </div>
    <div id="copyright">Copyright © 2022-11-15 All Rights Reserved</div>
  </div>
</template>

<script>
import { teacherLogin, studentLogin } from '@/services'
import { encrypt, decrypt } from '@/utils/jsencrypt'
import { setCache } from '@/utils/localstorage'
import Vue from 'vue'
import VueRouter from 'vue-router'

import { tHeaderData, sHeaderData } from '@/data/header'

Vue.use(VueRouter)

export default {
  name: 'Login',
  data() {
    return {
      activeName: 'student', // 选择登录的类型 学生|教师
      username: '',
      password: '',
      time: '',
      date: ''
    }
  },

  mounted() {
    this.$nextTick(() => {
      setInterval(this.upDateClock, 1000)
    })
  },
  methods: {
    storeuserinfo() {
      sessionStorage.setItem('username',this.username)
    },

    // 点击发起登录请求
    sendLogin() {
      if (this.username === '' || this.password === '') {
        alert('输入内容不能为空！')
      } else {
        let headerData = tHeaderData

        // 学生登录
        if (this.activeName === 'student') {
          studentLogin({
            username: this.username,
            password: encrypt(this.password)
          }).then((res) => {
            // 如果登录成功
            if (res.code === 0) {
              headerData = sHeaderData
              // 将Header数据保存到localStore中
              setCache('headerData', headerData)
              this.$store.commit('changeHeaderData', headerData)
              this.storeuserinfo()
              return this.$router.push({ path: '/student/mine' })
            }
          })
        } else {
          // 教师登录
          teacherLogin({
            username: this.username,
            password: encrypt(this.password)
          }).then((res) => {
            if (res.code == 0) {
              this.$store.commit('changeHeaderData', headerData)
              setCache('headerData', headerData)
              this.storeuserinfo()
              this.$router.replace({ path: '/home' }) //账号密码正确则成功跳转
              // console.log('pwd',encrypt(this.password));
            }
          })
        }
      }
    },
    upDateClock: function (e) {
      let d = new Date()
      let year = d.getFullYear()
      if (year < 10) {
        year = '0' + year
      }
      let mon = d.getMonth() + 1
      if (mon < 10) {
        mon = '0' + mon
      }
      let day = d.getDate()
      if (day < 10) {
        day = '0' + day
      }
      let hour = d.getHours()
      if (hour < 10) {
        hour = '0' + hour
      }
      let minute = d.getMinutes()
      if (minute < 10) {
        minute = '0' + minute
      }
      this.time = hour + ':' + minute
      this.date = year + '/' + mon + '/' + day
    }
  }
}
</script>

<style lang="less" scoped>
// 修改标签选择样式
/deep/ .el-tabs__nav-scroll {
  display: flex;
  justify-content: center;
}

#copyright {
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
}

.hide {
  visibility: hidden;
  opacity: 0;
}

#modal {
  z-index: 999;
  text-align: center;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-image: linear-gradient(to left, gray, white);
  background-size: 400%;
  animation: myanimation 10s infinite;
}

@keyframes myanimation {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

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

#login {
  width: 380px;
  // border: 1px solid black;
  position: absolute;
  left: 50%;
  top: 53%;
  transform: translate(-50%, -50%);
  margin-top: 30px;

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


#clock {
  position: absolute;
  bottom: 5%;
  right: 8%;
  text-align: center;

  #time {
    font-size: 80px;
  }

  #date {
    font-size: 35px;
  }
}
</style>
