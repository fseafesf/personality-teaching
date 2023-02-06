<template>
  <div id="modal">
    <div id="modal-content">
      <h1>修改密码</h1>
      <div id="login">
        <el-row class="input-line">
          <el-col :span="7"><span class="text">旧密码：</span></el-col>
          <el-col :span="17">
            <el-input
              v-model="old_pwd"
              show-password
              placeholder="请输入旧密码"
            ></el-input>
          </el-col>
        </el-row>
        <el-row class="input-line">
          <el-col :span="7"><span class="text">新密码：</span></el-col>
          <el-col :span="17">
            <el-input
              v-model="new_pwd"
              show-password
              placeholder="请输入新密码"
            ></el-input>
          </el-col>
        </el-row>
        <el-row class="input-line">
          <el-col :span="7"><span class="text">确认新密码：</span></el-col>
          <el-col :span="17">
            <el-input
              v-model="check_pwd"
              show-password
              placeholder="请确认新密码"
              @keyup.enter.native="sendChange"
            ></el-input>
          </el-col>
          <el-button type="primary" id="login-btn" @click="sendChange"
            >确认修改</el-button
          >
        </el-row>
      </div>
      <div id="alert">
        请牢记新修改的密码
        <p>初始密码:123456</p>
      </div>
    </div>
    <div id="clock">
      <div id="time">{{ time }}</div>
      <div id="date">{{ date }}</div>
    </div>
    <div id="copyright">Copyright © 2022-11-15 All Rights Reserved</div>
  </div>
</template>

<script>
import { changePwd } from '@/services'
import { encrypt, decrypt } from '@/utils/jsencrypt'
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

export default {
  name: 'Changepwd',
  data() {
    return {
      old_pwd: '',
      new_pwd: '',
      check_pwd: '',
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
    sendChange() {
      if (this.old_pwd === '' || this.new_pwd === '' || this.check_pwd === '') {
        alert('输入内容不能为空!')
      } else if (this.new_pwd != this.check_pwd) {
        alert('请确认输入的新密码一致!')
        this.new_pwd = ''
        this.check_pwd = ''
      } else {
        changePwd({
          old_pwd: encrypt(this.old_pwd),
          new_pwd: encrypt(this.new_pwd)
        }).then((res) => {
          console.log(res)
          if (res.code == 0) {
            alert('修改成功!')
            this.$router.replace({ path: '/home' }) //修改成功则跳转至首页
          } else {
            alert(res.msg)
            this.old_pwd = ''
            this.new_pwd = ''
            this.check_pwd = ''
          }
        })
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

// @keyframes myanimation {
//   0% {
//     background-position: 0% 50%;
//   }

//   50% {
//     background-position: 100% 50%;
//   }

//   100% {
//     background-position: 0% 50%;
//   }
// }

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
    margin-top: 6px;
  }
}

#login {
  width: 380px;
  position: absolute;
  left: 50%;
  top: 55%;
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
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 13px;
  color: #909399;

  p {
    margin: 0;
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