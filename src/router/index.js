import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/common/Home.vue')
  },
  {
    path: '/teacher/knowledge',
    name: 'tKnowledge',
    component: () => import('@/views/teacher/tKnowledge/tKnowledge.vue'),
    redirect: '/teacher/knowledge/tree',
    children: [
      { path: 'tree', component: () => import('@/views/teacher/tKnowledge/children/tKnowledgeTree.vue') },
      { path: 'contact', component: () => import('@/views/teacher/tKnowledge/children/tKnowledgeContact.vue') },
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
          // hideTabBar: true
        }
      },
      {
        path: 'edit',
        // path: 'edit/:id',
        component: () => import('../views/teacher/tTopic/children/tEditTopic.vue'),
        meta: {
          isChildren: true,
          // hideTabBar: true
        }
      }
    ]
  },

  {
    path: '/teacher/class',
    name: 'tClass',
    component: () => import('@/views/teacher/tClass/tClass.vue')
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
        component: () => import('@/views/teacher/tTestPage/children/tTest.vue')
      },
      {
        path: 'preview',
        name: 'tPreview',
        component: () => import('@/views/teacher/tTestPage/children/tPreview.vue')
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

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
