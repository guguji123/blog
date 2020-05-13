import Vue from 'vue'
import axios from 'axios'
import router from './router'
import store from './store'
//基础配置
axios.defaults.timeout = 5000 //超时时间
axios.defaults.baseURL = 'http://localhost:5000' // 之后在组件中不用指定完整的API地址 const path = '/tokens'

//request interceptor 自动添加 Token 到请求头 Authorization
axios.interceptors.request.use(function (config) {
    //Do something before request is sent
    const token = window.localStorage.getItem('blog-token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}` //模板字符串
    }
    return config
}, function (error) {
    // Do something with request error
    return Promise.reject(error)
})
axios.interceptors.response.use(function (response) {
    return response
}, function (error) {
    switch (error.response.status) {
        case 401:
            //清楚Token以及 已认证 等状态
            store.logoutAction()
            if (router.currentRoute.path !== '/login') {
                Vue.toasted.error('401:Authorization is failed, please login first', { icon: 'fingerprint' })
                router.replace({
                    path: '/login',
                    query: { redirect: router.currentRoute.path },
                })
            }
            break
        case 403:
            Vue.toasted.error('403: Forbidden', { icon: 'fingerprint' })
            router.back()
            break
        case 404:
            Vue.toasted.error('404: NOT FOUND', { icon: 'fingerprint' })
            router.back()
            break
        case 500:  // 根本拿不到 500 错误，因为 CORs 不会过来
            Vue.toasted.error('500: Oops... INTERNAL SERVER ERROR', { icon: 'fingerprint' })
            router.back()
            break
    }
    return Promise.reject(error)

}
)

export default axios