<template>
  <div class="wrapper" @mouseenter="Show" @mouseleave="Hide">
    <div id="avatar">
      <el-avatar
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      ></el-avatar>
    </div>
    <transition>
      <div id="contentouter" v-if="show">
        <div id="content">
          <div class="identity">
            <p><i class="el-icon-circle-check"></i>已登录：xx教师</p>
          </div>
          <div class="acounthandler">
            <div class="acountbtn" id="changepwd" @click="changepwd">
              <p>
                <i class="el-icon-key"></i>修改密码<i
                  class="el-icon-arrow-right"
                ></i>
              </p>
            </div>
            <div class="acountbtn" id="logout" @click="logout">
              <p>
                <i class="el-icon-turn-off"></i>退出登录<i
                  class="el-icon-arrow-right"
                ></i>
              </p>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import router from "@/router";
import cookies from "vue-cookies";
let timeID = null;
export default {
  data() {
    return {
      show: false,
    };
  },
  methods: {
    Show() {
      if (timeID !== null) {
        return;
      }
      timeID = setTimeout(() => {
        this.show = true;
        console.log(this.show);
        timeID = null;
      }, 50);
    },
    Hide() {
      if (timeID !== null) {
        clearTimeout(timeID);
      }
      timeID = setTimeout(() => {
        this.show = false;
        console.log(this.show);
        timeID = null;
      }, 100);
    },
    logout() {
      cookies.remove("session_key");
      router.push({ path: "/login" });
    },
    changepwd() {
      router.replace({ path: "/changpwd" });
    },
  },
};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.wrapper {
  position: relative;
  z-index: 999;
  #contentouter {
    position: absolute;
    top: 50px;
    left: -70px;
    padding-top: 10px;
    transition: all 0.3s;
  }
  #content {
    width: 250px;
    border: 1px solid rgb(224, 219, 219);
    box-shadow: 6px 2px 5px rgba(224, 219, 219, 0.5);
    border-radius: 10px;
    background-color: #fff;
  }
}
.identity {
  // height: 50px;
  p {
    margin: 0;
    text-align: center;
    font-size: 20px;
    line-height: 50px;
    i {
      margin-right: 5px;
      font-weight: 800;
      color: green;
    }
  }
}
#logout {
  margin-top: 20px;
}
.acounthandler {
  padding: 5px;
  border-top: 2px solid gray;
  width: 200px;
  margin: 0 auto;
  .acountbtn {
    border-radius: 10px;
    margin: 10px auto 15px;
    width: 200px;
    background-color: rgb(227, 229, 231);
    transition: all 0.5s;
    p {
      font-weight: 500;
      font-size: 16px;
      line-height: 40px;
      i {
        font-weight: 600;
        margin-right: 20px;
        margin-left: 25px;
      }
    }
  }

  #changepwd:hover {
    background-color: rgb(106, 174, 241);
    p {
      color: #fff;
    }
  }
  #logout:hover {
    background-color: rgba(235, 88, 88, 0.822);
    p {
      color: #fff;
    }
  }
}
.v-enter-active {
  transition: opacity 0.5s ease;
  animation: bounce-in 0.2s;
}
.v-leave-active {
  transition: opacity 0.3s ease;
  animation: bounce-in 0.3s reverse;
}
@keyframes bounce-in {
  0% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>