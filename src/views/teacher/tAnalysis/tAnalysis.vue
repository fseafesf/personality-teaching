<template>
  <el-container style="margin-top: 8px">
    <el-aside>
      <el-menu
          default-active="/teacher/analysis/studentAnalysis"
          class="el-menu-vertical-demo"
          router
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-unfold"></i>
              <span>查看班级情况</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1.1" @click="$router.push('/teacher/analysis/classAnalysis')">1班</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="/teacher/analysis/studentAnalysis">
            <i class="el-icon-user"></i>
            <span slot="title">查看个人情况</span>
          </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>   
  </el-container>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="less" scoped>
  .el-aside {
    overflow: hidden;
    height: calc(100vh - 58px);
    width: 220px !important;
    background-color: #fff;
    border-radius: 10px;
    .el-menu {
      border-right: 0px;
    }
  }
  .el-main {
    padding: 0px 14px 0px;
  }
</style>