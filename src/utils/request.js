import axios from 'axios'

const service = axios.create({
  baseURL: 'http://localhost:4010/'
})


export default service