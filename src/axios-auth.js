import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:9191'
})

// instance.defaults.headers.common['SOMETHING'] = 'something'

export default instance