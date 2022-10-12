import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/common/Home.vue')
const tAnalysis = () => import('../views/teacher/tAnalysis.vue')
const tClass = () => import('../views/teacher/tClass.vue')
const tKnowledge = () => import('../views/teacher/tKnowledge.vue')
const tReview = () => import('../views/teacher/tReview.vue')
const tTest = () => import('../views/teacher/tTest.vue')
const tTopic = () => import('../views/teacher/tTopic.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/teacher/analysis',
    name: 'tAnalysis',
    component: tAnalysis
  },
  {
    path: '/teacher/class',
    name: 'tClass',
    component: tClass
  },
  {
    path: '/teacher/knowledge',
    name: 'tKnowledge',
    component: tKnowledge
  },
  {
    path: '/teacher/review',
    name: 'tReview',
    component: tReview
  },
  {
    path: '/teacher/test',
    name: 'tTest',
    component: tTest
  },
  {
    path: '/teacher/topic',
    name: 'tTopic',
    component: tTopic
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
