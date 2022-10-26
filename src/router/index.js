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
    component: () => import('@/views/teacher/tTopic/tTopic.vue')
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
      }
    ]
  },

  {
    path: '/teacher/review',
    name: 'tReview',
    component: () => import('@/views/teacher/tReview/tReview.vue')
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
