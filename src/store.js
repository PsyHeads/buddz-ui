import Vue from 'vue'
import Vuex from 'vuex'
import axios from './axios-auth'
import globalAxios from 'axios'

import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: 'empty',
    userId: null,
    user: null,
    
    atoken:     null,
    rtoken:     null,
    scope:      null,
    expires_in: null,
  },
  mutations: {
    authUser (state, authData) {
      state.atoken     = authData.access_token
      state.rtoken     = authData.refresh_token
      state.scope      = authData.scope 
      state.expires_in = authData.expires_in
    },
    storeUser (state, user) {
      state.user = user
    },
    clearAuthData (state) {
      state.idToken = null
      state.userId = null

      state.atoken     = null
      state.rtoken     = null
      state.scope      = null
      state.expires_in = null
    }
  },
  actions: {
    setLogoutTimer ({commit}, expirationTime) {
      setTimeout(() => {
        commit('clearAuthData')
      }, expirationTime * 1000)
    },
    signup ({commit, dispatch}, userData) {
      console.log('Before posting to the new URL')
      return new Promise((resolve, reject) => {
        
        axios.post('/signup', userData)
          .then(res => {
            console.log(res)
            // commit('authUser', {
            //   token: res.data.idToken,
            //   userId: res.data.localId
            //   }
            // )
            // const now = new Date()
            // const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
            // localStorage.setItem('token', res.data.idToken)
            // localStorage.setItem('userId', res.data.localId)
            // localStorage.setItem('expirationDate', expirationDate)
            //dispatch('storeUser', authData)
            //dispatch('setLogoutTimer', res.data.expiresIn)
            resolve(res);
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })  
      })
    },
    login ({commit, dispatch}, authData) {
      console.log('Posting the data...' + authData)
      var qs = require('qs');
      axios.post('/oauth/token', 
                  qs.stringify(authData),
                  {headers : { Authorization: 'Basic YnVkZHotd2ViOmJ1ZGR6LXdlYi1zZWNyZXQ=',
                              'Content-type': 'application/x-www-form-urlencoded' }}
                //{'Authorization': 'Basic YnVkZHotd2ViOmJ1ZGR6LXdlYi1zZWNyZXQ='}
                )
        .then(res => {
          console.log(res)
          const now = new Date()
          const expirationDate = new Date(now.getTime() + res.data.expires_in * 1000)
          localStorage.setItem('atoken', res.data.access_token)
          localStorage.setItem('rtoken', res.data.refresh_token)
          localStorage.setItem('scope', res.data.scope) 
          localStorage.setItem('expirationDate', expirationDate)
          commit('authUser', res.data)
          dispatch('setLogoutTimer', res.data.expiresIn)
        })
        .catch(error => console.log(error))
    },
    tryAutoLogin ({commit}) {
      const token = localStorage.getItem('token')
      if (!token) {
        return
      }
      const expirationDate = localStorage.getItem('expirationDate')
      const now = new Date()
      if (now >= expirationDate) {
        return
      }
      const userId = localStorage.getItem('userId')
      commit('authUser', {
        token: token,
        userId: userId
      })
    },
    logout ({commit}) {
      commit('clearAuthData')
      localStorage.removeItem('expirationDate')
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      router.replace('/signin')
    },
    storeUser ({commit, state}, userData) {
      if (!state.idToken) {
        return
      }
      globalAxios.post('/users.json' + '?auth=' + state.idToken, userData)
        .then(res => console.log(res))
        .catch(error => console.log(error))
    },
    fetchUser ({commit, state}) {
      if (!state.idToken) {
        return
      }
      globalAxios.get('/users.json' + '?auth=' + state.idToken)
        .then(res => {
          console.log(res)
          const data = res.data
          const users = []
          for (let key in data) {
            const user = data[key]
            user.id = key
            users.push(user)
          }
          console.log(users)
          commit('storeUser', users[0])
        })
        .catch(error => console.log(error))
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    isAuthenticated (state) {
      console.log('state.atoken ==' + state.atoken)
      return state.atoken !== null
    }
  }
})