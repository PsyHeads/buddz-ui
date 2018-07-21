import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

import router from './router'
import store from './store'
import VuePassword from 'vue-password'

Vue.component(VuePassword)

axios.defaults.baseURL = 'https://vue-update.firebaseio.com'
axios.defaults.headers.get['Access-Control-Allow-Origin'] = 'http://localhost:9191'
// axios.defaults.headers.common['Authorization'] = 'fasfdsa'
axios.defaults.headers.get['Accepts'] = 'application/json'

// const reqInterceptor = axios.interceptors.request.use(config => {
//   console.log('Request Interceptor', config)
//   return config
// })
// const resInterceptor = axios.interceptors.response.use(res => {
//   console.log('Response Interceptor', res)
//   return res
// })

// axios.interceptors.request.eject(reqInterceptor)
// axios.interceptors.response.eject(resInterceptor)

new Vue({
  el: '#app',
  router,
  store,
  VuePassword,
  // components: {
   
  // },
  render: h => h(App)
})
