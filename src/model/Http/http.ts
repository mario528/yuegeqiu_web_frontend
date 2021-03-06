import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import Vue from 'vue'
let httpInstance: AxiosInstance | any;
httpInstance = axios.create({
    baseURL: "",    // api 的 base_url
    timeout: 50000      // 请求超时时间
});
interface ResponseData {
    status: boolean;
    code: number;
    data?: any;
    message?: string;
}
// 请求拦截器
httpInstance.interceptors.request.use((config: AxiosRequestConfig) => {
    if (localStorage.getItem('Authorization')) {
        config.headers.Authorization = localStorage.getItem('Authorization')
    }
    return config
},(error: any)=> {
    console.error("error", error)
    return Promise.reject(error)
})
// respone拦截器
httpInstance.interceptors.response.use((res: AxiosResponse)=> {
    const data: ResponseData = res.data
    if (data.status) {
        return data.data
    }else if (data.code == 200) {
        return data.data
    }else {
        // @ts-ignore
        console.error("request error", data.msg)
        // @ts-ignore
        const message = data.msg 
        Vue.prototype.$notify.error({
            title: 'Error',
            message: message
        })
        // @ts-ignore
        return Promise.reject(message)
    }
}, (error: any) => {
    if (error.response.status == 404) {
        Vue.prototype.$notify.error({
            title: 'Error',
            message: 'Request url 404'
        })
    }
    console.error("error", error)
    return Promise.reject(error)
})

export default httpInstance;