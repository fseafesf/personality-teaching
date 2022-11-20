import Vue from 'vue'
import VueRouter from 'vue-router'
import cookies from 'vue-cookies'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },

  // 老师
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/common/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/common/Login.vue'),
  },
  {
    path: '/teacher/knowledge',
    name: 'tKnowledge',
    component: () => import('@/views/teacher/tKnowledge/tKnowledge.vue'),
    redirect: '/teacher/knowledge/tree',
    children: [
      {
        path: 'tree',
        component: () => import('@/views/teacher/tKnowledge/children/tKnowledgeTree.vue')
      },
      {
        path: 'contact',
        component: () => import('@/views/teacher/tKnowledge/children/tKnowledgeContact.vue')
      },
      {
        path: 'add/:id',
        component: () => import('@/views/teacher/tKnowledge/children/tAddKnowledge.vue'),
        meta: {
          hideTopBar: true,
        }
      },
      {
        path: 'edit/:id',
        component: () => import('@/views/teacher/tKnowledge/children/tEditKnowledge.vue'),
        meta: {
          hideTopBar: true,
        }
      }
    ]
  },
  {
    path: '/teacher/topic',
    name: 'tTopic',
    component: () => import('@/views/teacher/tTopic/tTopic.vue'),
    children: [
      {
        path: 'add',
        component: () => import('../views/teacher/tTopic/children/tAddTopic.vue'),
        meta: {
          isChildren: true,
        }
      },
      {
        path: 'edit/:id',
        component: () => import('../views/teacher/tTopic/children/tEditTopic.vue'),
        meta: {
          isChildren: true,
        }
      }
    ]
  },

  {
    path: '/teacher/class',
    name: 'tClass',
    component: () => import('@/views/teacher/tClass/tClass.vue'),
    children: [
      {
        path: 'classInfo',
        component: () => import('@/views/teacher/tClass/children/classInfo.vue'),
        meta: {
          isChildren: true,
        },
      }
    ]
  },
  {
    path: '/teacher/examHome',
    name: 'tExamHome',
    component: () => import('@/views/teacher/tTestPage/index'),
    redirect: '/teacher/examHome/examPaper',
    children: [
      {
        path: 'examPaper',
        name: 'tEaxmPaper',
        component: () => import('@/views/teacher/tTestPage/children/tExamPaper.vue')
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
        component: () => import('@/views/teacher/tTestPage/children/tPreview.vue'),
        meta: {
          keepAlive: true
        }
      },
      {
        path: 'release',
        name: 'tRelease',
        component: () => import('@/views/teacher/tTestPage/children/tRelease.vue')
      }
    ]
  },

  {
    path: '/teacher/review',
    name: 'tReview',
    component: () => import('@/views/teacher/tReview/tReview.vue'),
    children: [
      {
        // name: 'correctPaper',
        path: 'correctPaper',
        component: () => import('@/views/teacher/tReview/children/correctPaper.vue'),
        meta: {
          isChildren: true,
        }
      }
    ]
  },
  {
    path: '/teacher/analysis',
    name: 'tAnalysis',
    component: () => import('@/views/teacher/tAnalysis/tAnalysis.vue')
  },

  // 学生
  {
    path: '/student/home',
    name: 'sHome',
    component: () => import('@/views/student/sHome/sHome.vue')
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name != 'Login') {
    if (cookies.get("session_key")) {
      next()
    } else {
      router.replace({ path: '/login' })
    }
  } else {
    next()
  }
})


export default router
