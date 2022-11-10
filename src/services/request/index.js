import axios from 'axios'


import { BASE_URL, TIMEOUT } from './config'
//引入nprogress进度条
import nprogress from 'nprogress'
//引入nprogress进度条样式
import "nprogress/nprogress.css";
import store from '../../store'

class PtRequest {
  constructor(baseURL, timeout = 5000) {
    this.instance = axios.create({
      baseURL,
      timeout,
      // headers: {
      //   cookie: document.cookie
      // }
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
      return res
    }, err => {
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