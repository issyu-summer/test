import axios from 'axios'

const service = axios.create({
  baseURL: 'http://localhost:4010/widgets/config'
})

export default service
