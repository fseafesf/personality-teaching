import axios from 'axios'


import { BASE_URL, TIMEOUT } from './config'
import store from '../../store'

class PtRequest {
  constructor(baseURL, timeout = 5000) {
    this.instance = axios.create({
      baseURL,
      timeout
    })

    this.instance.interceptors.request.use(config => {
      store.commit('changeIsLoading', true)
      // console.log(store.state.isLoading);
      return config
    }, err => {
      return err
    })

    this.instance.interceptors.response.use(res => {
      store.commit('changeIsLoading', false)
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