import axios from 'axios'
import { MessageBox, Message } from "element-ui"
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import { BASE_URL, TIMEOUT } from './config'
//引入nprogress进度条
import nprogress from 'nprogress'
//引入nprogress进度条样式
import "nprogress/nprogress.css";
import store from '../../store'
import router from '@/router'

class PtRequest {
  constructor(baseURL, timeout = 5000) {
    this.instance = axios.create({
      baseURL,
      timeout,
    })
    //请求拦截器
    this.instance.interceptors.request.use(config => {
      store.commit('changeIsLoading', true)
      nprogress.start();
      return config
    }, err => {
      return err
    })
    //响应拦截器
    this.instance.interceptors.response.use(res => {
      store.commit('changeIsLoading', false)
      nprogress.done();

      // console.log(res)
      if (res.data.code !== 0) {
        Message({
          type: 'error',
          message: res.data.msg
        });
      }
      if (res.data.code == 1001) { //检查登录态，若登录态不合法则跳转至登录
        router.replace({ path: '/login' })
      }
      return res
    }, err => {
      if (err.response.data.code) {
        Message({
          type: 'error',
          message: err.response.data.msg
        });
      }
      return err
    })
  }

  request(config) {
    return new Promise((resolve, reject) => {
      this.instance.request(config).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }

  get(config) {
    return this.request({ ...config, method: 'get' })
  }

  post(config) {
    return this.request({ ...config, method: 'post' })
  }


  delete(config) {
    return this.request({ ...config, method: 'delete' })
  }

  put(config) {
    return this.request({ ...config, method: 'put' })
  }
}

export default new PtRequest(BASE_URL, TIMEOUT)
