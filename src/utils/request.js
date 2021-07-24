import axios from 'axios'

const service = axios.create({
  baseURL: 'http://192.168.43.144:4010/'
})


export default service