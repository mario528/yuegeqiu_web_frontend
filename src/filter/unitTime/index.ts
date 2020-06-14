/*
 * @Author: majiaao
 * @Date: 2020-06-14 16:31:54
 * @LastEditors: majiaao
 * @LastEditTime: 2020-06-14 22:14:13
 * @Description: file content
 */ 
import Vue from 'vue'
import TimeFormate from '@/utils/time'
Vue.filter('unitTime', (time: any) => {
    if (time.includes('T')) {
        const timeStemp = new Date(time).valueOf()
        const nowTimeStemp = new Date().valueOf()
        const time_delta = (nowTimeStemp - timeStemp) / 1000
        // 0 - 5分钟 刚刚
        // 5分钟 - 300分钟 小时
        // 300 - 14400 天
        if (time_delta > 0 && time_delta <= 5 * 60) {
            return '刚刚'
        }else if (time_delta > 5 * 60 && time_delta <= 300 * 60) {
            const date = Math.floor(time_delta / (24 * 60)) == 0 ? 1 : Math.floor(time_delta / (24 * 60))
            return date + '小时前'  
        }else if (time_delta > 300 * 60 && time_delta <= 14400 * 60) {
            const date = Math.floor(time_delta / (24 * 60 * 60)) == 0 ? 1 : Math.floor(time_delta / (24 * 60 * 60))
            return date + '天前'  
        }else {
            return new TimeFormate(new Date(timeStemp)).formateTime('YYYY-MM-DD HH:MM:SS')
        }
    }
})
