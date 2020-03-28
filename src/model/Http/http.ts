import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
let http: AxiosInstance | any;
http = axios.create({
    baseURL: "/api",    // api 的 base_url
    timeout: 50000      // 请求超时时间
});
interface ResponseData {
    status: boolean;
    code: number;
    data?: any;
    message?: string;
}
// 请求拦截器
axios.interceptors.request.use((config: AxiosRequestConfig) => {
    return config
},(error: any)=> {
    console.error("error", error)
    return Promise.reject(error)
})
// respone拦截器
axios.interceptors.response.use((res: AxiosResponse)=> {
    const data: ResponseData = res.data
    if (data.status) {
        return data
    }else if (data.code == 200) {
        return data.data
    }else {
        console.error("request error", data.message)
        return Promise.reject(data.message)
    }
}, (error: any) => {
    console.error("error", error)
    return Promise.reject(error)
})

export default http;