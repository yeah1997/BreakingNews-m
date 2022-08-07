import axios from 'axios'
import store from '@/store';
import JsonBig from 'json-bigint'

const request = axios.create({
    baseURL: 'http://toutiao.itheima.net/',
    timeout: 20000,
    transformResponse: [function (data) {
        // 对 data 进行任意转换处理
        try {
            return JsonBig.parse(data)
        }catch (err) {
            return data
        }
    }],
})

// Request Protector
// 添加请求拦截器
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const { user } = store.state

    if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`
    }

    return config
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// Response Protector

export default request