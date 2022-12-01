<template>
  <div id="modal">
    <div id="modal-content">
      <h1>个性化教学系统登录</h1>
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
            <el-input v-model="password" placeholder="请输入密码" show-password @keyup.enter.native="sendLogin"></el-input>
          </el-col>
          <el-button type="primary" id="login-btn" @click="sendLogin">登录</el-button>
        </el-row>
      </div>
      <div id="alert">
        当前为内部测试账号
        <p>用户名: cs / 密码:123456</p>
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
import { login } from "@/services";
import { encrypt, decrypt } from "@/utils/jsencrypt";
import { setCache } from "@/utils/localstorage";
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      time: "",
      date: "",
    };
  },


  mounted() {
    this.$nextTick(() => {
      setInterval(this.upDateClock, 1000);
    });
  },
  methods: {
    sendLogin() {
      if (this.username === "" || this.password === "") {
        alert("输入内容不能为空");
      } else {
        let navBarData = [
          {
            name: '首页',
            path: '/home'
          },
          {
            name: '知识点管理',
            path: '/teacher/knowledge',
            children: [
              {
                name: '知识点树',
                path: '/teacher/knowledge/tree',
              },
              {
                name: '知识点联系',
                path: '/teacher/knowledge/contact',
              },
              {
                // name: '添加知识点',
                path: '/teacher/knowledge/add',
              },
              {
                // name: '编辑知识点',
                path: '/teacher/knowledge/edit',
              }
            ]
          },
          {
            name: '题目管理',
            path: '/teacher/topic',
            children: [
              {
                name: '添加题目',
                path: '/teacher/topic/add',
              },
              {
                name: '编辑题目',
                path: '/teacher/topic/edit',
              }
            ]
          },
          {
            name: '班级管理',
            path: '/teacher/class',
            children: [
              {
                name: '班级信息',
                path: '/teacher/class/classInfo'
              }
            ]
          },
          {
            name: '试卷管理',
            path: '/teacher/examHome',
            children: [
              {
                name: '试卷列表',
                path: '/teacher/examHome/examPaper'
              },
              {
                name: '新增试卷',
                path: '/teacher/examHome/test'
              },
              {
                name: '预览试卷',
                path: '/teacher/examHome/preview'
              },
              {
                name: '发布试卷',
                path: '/teacher/examHome/release'
              }
            ]
          },
          {
            name: '试卷评阅',
            path: '/teacher/reviewHome',
            children: [
              {
                name: '试卷发布列表',
                path: '/teacher/reviewHome/review'
              },
              {
                name: '班级列表',
                path: '/teacher/reviewHome/correctClass'
              },
              {
                name: '学生列表',
                path: '/teacher/reviewHome/correctStudent'
              },
              {
                name: '评阅页面',
                path: '/teacher/reviewHome/correctReview'
              }
            ]
          },
          {
            name: '学情分析',
            path: '/teacher/analysis',
            children: [
              {
                name: "查看班级情况",
                path: "/teacher/analysis/classAnalysis"
              },
              {
                name: "查看个人情况",
                path: "/teacher/analysis/studentAnalysis"
              }
            ]
          }
        ]

        if (this.username === 'xs' && this.password === '123456') {
          navBarData = [
            {
              name: '个人中心',
              path: '/student/mine',
              children: [
                {
                  name: '学生班级',
                  path: '/student/class'
                },
                {
                  name: '学生作业',
                  path: '/student/task'
                },
                {
                  name: '作业答案',
                  path: '/student/answer'
                }
              ]
            }
          ]
          setCache('navBarData', navBarData)
          this.$store.commit('changenavBarData', navBarData)
          return this.$router.push({ path: "/student/mine" });
        }

        login({
          username: this.username,
          password: encrypt(this.password),
        }).then((res) => {
          console.log(res);
          if (res.code == 0) {
            this.$store.commit('changenavBarData', navBarData)
            setCache('navBarData', navBarData)
            this.$router.replace({ path: "/home" }); //账号密码正确则成功跳转
            // console.log(encrypt(this.password));
          } else {
            this.username = "";
            this.password = "";
          }
        });
      }
    },
    upDateClock: function (e) {
      let d = new Date();
      let year = d.getFullYear();
      if (year < 10) {
        year = "0" + year;
      }
      let mon = d.getMonth() + 1;
      if (mon < 10) {
        mon = "0" + mon;
      }
      let day = d.getDate();
      if (day < 10) {
        day = "0" + day;
      }
      let hour = d.getHours();
      if (hour < 10) {
        hour = "0" + hour;
      }
      let minute = d.getMinutes();
      if (minute < 10) {
        minute = "0" + minute;
      }
      this.time = hour + ":" + minute;
      this.date = year + "/" + mon + "/" + day;
    },
  },
};
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