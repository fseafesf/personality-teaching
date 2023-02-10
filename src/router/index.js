import Vue from 'vue'
import VueRouter from 'vue-router'
import cookies from 'vue-cookies'
import classDetail from '@/views/teacher/tAnalysis/children/classAnalysisDetail.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },

  // 老师
  {
    path: '/home',
    name: 'tHome',
    component: () => import('@/views/teacher/tHome/tHome.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/common/Login.vue')
  },
  {
    path: '/changpwd',
    name: 'Changepwd',
    component: () => import('@/views/common/Changepwd.vue')
  },

  // 知识点
  {
    path: '/teacher/knowledge',
    name: 'tKnowledge',
    component: () => import('@/views/teacher/tKnowledge/tKnowledge.vue'),
    redirect: '/teacher/knowledge/tree',
    children: [
      {
        path: 'tree',
        component: () =>
          import('@/views/teacher/tKnowledge/children/tKnowledgeTree.vue')
      },
      {
        path: 'contact',
        component: () =>
          import('@/views/teacher/tKnowledge/children/tKnowledgeContact.vue')
      },
      {
        path: 'add/:id',
        component: () =>
          import('@/views/teacher/tKnowledge/children/tAddKnowledge.vue'),
        meta: {
          hideTopBar: true
        }
      },
      {
        path: 'edit/:id',
        component: () =>
          import('@/views/teacher/tKnowledge/children/tEditKnowledge.vue'),
        meta: {
          hideTopBar: true
        }
      }
    ]
  },

  // 题目
  {
    path: '/teacher/topic',
    name: 'tTopic',
    component: () => import('@/views/teacher/tTopic/tTopic.vue'),
    children: [
      {
        path: 'add',
        component: () =>
          import('../views/teacher/tTopic/children/tAddTopic.vue'),
        meta: {
          isChildren: true
        }
      },
      {
        path: 'edit/:id',
        component: () =>
          import('../views/teacher/tTopic/children/tEditTopic.vue'),
        meta: {
          isChildren: true
        }
      }
    ]
  },

  // 班级
  {
    path: '/teacher/class',
    name: 'tClass',
    redirect: '/teacher/class/classListing',
    component: () => import('@/views/teacher/tClass/tClass.vue'),
    children: [
      {
        path: 'classInfo/:id',
        component: () =>
          import('@/views/teacher/tClass/children/classInfo.vue'),
        meta: {
          isChildren: true
        }
      },
      {
        path: 'classListing',
        component: () =>
          import('@/views/teacher/tClass/children/class-listing.vue')
      },
      {
        path: 'unJoinStuListing',
        component: () =>
          import('@/views/teacher/tClass/children/student-listing.vue')
      }
    ]
  },

  // 试卷
  {
    path: '/teacher/examHome',
    name: 'tExamHome',
    component: () => import('@/views/teacher/tTestPage/index'),
    redirect: '/teacher/examHome/examPaper',
    children: [
      {
        path: 'examPaper',
        name: 'tEaxmPaper',
        component: () =>
          import('@/views/teacher/tTestPage/children/tExamPaper.vue')
      },
      {
        path: 'test',
        name: 'tTest',
        component: () => import('@/views/teacher/tTestPage/children/tTest.vue'),
        meta: {
          keepAlive: true
        }
      },
      {
        path: 'preview',
        name: 'tPreview',
        component: () =>
          import('@/views/teacher/tTestPage/children/tPreview.vue'),
        meta: {
          keepAlive: true
        }
      },
      {
        path: 'release',
        name: 'tRelease',
        component: () =>
          import('@/views/teacher/tTestPage/children/tRelease.vue')
      }
    ]
  },

  // 评阅
  {
    path: '/teacher/reviewHome',
    name: 'tReviewHome',
    component: () => import('@/views/teacher/tReview/index'),
    redirect: '/teacher/reviewHome/review',
    children: [
      {
        path: 'review',
        name: 'tReview',
        component: () => import('@/views/teacher/tReview/children/tReview.vue')
      },
      {
        // name: 'correctPaper',
        path: 'correctClass',
        component: () =>
          import('@/views/teacher/tReview/children/correctClass.vue'),
        meta: {
          isChildren: true
        }
      },
      {
        path: 'correctStudent',
        component: () =>
          import('@/views/teacher/tReview/children/correctStudent.vue')
      },
      {
        path: 'correctReview',
        component: () =>
          import('@/views/teacher/tReview/children/correctReview.vue')
      }
    ]
  },
  // 学情分析
  {
    path: '/teacher/analysis',
    name: 'tAnalysis',
    redirect: '/teacher/analysis/studentAnalysis',
    component: () => import('@/views/teacher/tAnalysis/tAnalysis.vue'),
    children: [
      {
        name: 'classAnalysis',
        path: 'classAnalysis',
        component: () =>
          import('@/views/teacher/tAnalysis/children/classAnalysis.vue'),
        children: [
          {
            name: 'classAnalysisDetail',
            path: 'classAnalysisDetail',
            component: classDetail,
            props($route) {
              return {
                id: $route.query.id,
                className: $route.query.className
              }
            }
          }
        ]
      },
      {
        name: 'studentAnalysis',
        path: 'studentAnalysis',
        component: () =>
          import('@/views/teacher/tAnalysis/children/studentAnalysis.vue')
      }
    ]
  },

  // 学生
  {
    path: '/student',
    redirect: '/student/mine'
  },

  // 个人中心
  {
    path: '/student/mine',
    name: 'sMine',
    component: () => import('@/views/student/sMine/sMine.vue')
  },

  // 作业页面
  {
    path: '/student/task',
    name: 'sTask',
    component: () => import('@/views/student/sMine/children/sTask.vue'),
    meta: {
      hideNavBar: true
    }
  },

  // 作业答案详情页
  {
    path: '/student/answer',
    name: 'sAnswer',
    component: () => import('@/views/student/sMine/children/sAnswer.vue'),
    meta: {
      hideNavBar: true
    }
  },

  // 学情分析
  {
    path: '/student/analysis',
    name: 'sAnalysis',
    component: () => import('@/views/student/sAnalysis')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.name != 'Login') {
//     if (cookies.get("session_key")) {
//       next()
//     } else {
//       router.replace({ path: '/login' })
//     }
//   } else {
//     next()
//   }
// })

export default router
