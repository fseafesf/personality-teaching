<template>
  <div class="nav-bar">
    <div class="content wrap-v1">
      <template v-for="(item,index) in navBarData">
        <div class="title" :class="{ active: currentIndex === index}" @click="itemClick(index)">
          <router-link :to="item.path">{{item.name}}</router-link>
        </div>
      </template>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      navBarData: [
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
            }
          ]
        },
        {
          name: '题目管理',
          path: '/teacher/topic'
        },
        {
          name: '班级管理',
          path: '/teacher/class'
        },
        {
          name: '试卷管理',
          path: '/teacher/test'
        },
        {
          name: '试卷评阅',
          path: '/teacher/review'
        },
        {
          name: '学情分析',
          path: '/teacher/analysis'
        },
      ],
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
    }
  },
  watch: {
    $route(to, from) {
      const index = this.navBarData.findIndex(item => {
        if (!item.children) return item.path === to.path
        for (const iten of item.children) {
          if (iten.path === to.path) {
            return iten.path === to.path
          }
        }
      })
      this.currentIndex = index
    }
  }
}
</script>

<style lang="less" scoped>
.nav-bar {
  width: 100%;
  height: 50px;
  background-color: #4498EE;
  display: flex;
  justify-content: center;
  align-items: center;

  .content {
    display: flex;
    height: 100%;

    .title {
      width: 124px;
      height: 50px;
      line-height: 50px;
      cursor: pointer;

      a {
        display: block;
        width: 100%;
        height: 100%;
        text-align: center;
        color: #fff;
      }

      &.active,
      &:hover {
        background-color: #3982CE;
      }
    }
  }
}
</style>