import axios from 'axios'

const request = axios.create({
    baseURL: 'http://toutiao.itheima.net/',
    timeout: 20000
})

// Request Protector

// Response Protector
export default request