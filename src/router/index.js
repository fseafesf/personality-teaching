import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/Home.vue')
const Test = () => import('../views/Test.vue')
const Class = () => import('../views/Class.vue')
const Student = () => import('../views/Student.vue')

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
    path: '/test',
    name: 'Test',
    component: Test
  },
  {
    path: '/class',
    name: 'Class',
    component: Class
  },
  {
    path: '/student',
    name: 'Student',
    component: Student
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
