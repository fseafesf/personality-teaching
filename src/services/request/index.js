import axios from 'axios'

import { TIMEOUT ,BASE_URL} from './config'
import store from '../../store'

class PtRequest {
  constructor(baseURL , timeout = 5000) {
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
      // console.log(store.state.isLoading);
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
}

export default new PtRequest(BASE_URL, TIMEOUT)