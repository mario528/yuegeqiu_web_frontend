/*
 * @Author: majiaao
 * @Date: 2020-05-07 22:16:38
 * @LastEditors: majiaao
 * @LastEditTime: 2020-05-22 16:52:54
 * @Description: file content
 */
// @ts-nocheck
class TimeType {
    constructor(date = new Date()) {
        this.date = date
        this.YYYYMMDD = `${this.date.getFullYear()}-${(this.date.getMonth() + 1) < 10 ? '0' + (this.date.getMonth() + 1) : this.date.getMonth() + 1}-${this._adjustLayout(this.date.getDate())}`
        this.HHMMSS = `${this._adjustLayout(this.date.getHours())}:${this._adjustLayout(this.date.getMinutes())}:${this._adjustLayout(this.date.getMinutes())}`
    }
    _adjustLayout (timeData) {
        return timeData < 10 ? '0' + timeData : timeData
    }
    formateTime(type) {
        type = type.toUpperCase()
        switch (type) {
            case 'YYYY-MM-DD':
                return this.YYYYMMDD
            case 'YYYY-MM-DD HH:MM:SS':
                return `${this.YYYYMMDD} ${this.HHMMSS}`
            default:
                throw new Error('输入参数有误')
        }
    }
    getMondayBeforeToady () {
        const week = this.date.getDay()
        if (week == 1) {
            // 当天就是周一
            return new TimeType().formateTime('YYYY-MM-DD')
        }else {
            const days = week == 0 ? 6 : week - 1
            const timeStemp = new Date().valueOf() - (days * 24 * 60 * 60 * 1000)
            return new TimeType(new Date(timeStemp)).formateTime('YYYY-MM-DD')
        }
    }
    getSundayAfterDay ( afterDays = 0 ) {
        const time = new Date().valueOf() + ( afterDays * 24 * 60 * 60 * 1000 )
        let week = new Date(time).getDay()
        week = week == 0 ? 7 : week
        const days = 7 - week
        const timeStemp = time + (days * 24 * 60 * 60 * 1000)
        return new TimeType(new Date(timeStemp)).formateTime('YYYY-MM-DD')
    }
    getNextDay(date) {
        const dateTime = new Date((new Date(date).valueOf() + (24 * 60 * 60 * 1000)));
        return new TimeType(dateTime).formateTime('YYYY-MM-DD')
    }
    generateTimeCalendar (start_time, end_time, calendar_list = []) {
        let pointer = start_time
        const todayTimeStemp = new Date(new TimeType().formateTime('YYYY-MM-DD')).valueOf()
        if (pointer == end_time) {
            calendar_list.push({
                date: pointer,
                is_weekend: [0,6].includes(new Date(pointer).getDay()),
                is_pass: new Date(pointer).valueOf() < todayTimeStemp,
                is_today: new Date(pointer).valueOf() == todayTimeStemp
            })
            return calendar_list
        }else {
            calendar_list.push({
                date: pointer,
                is_weekend: [0,6].includes(new Date(pointer).getDay()),
                is_pass:  new Date(pointer).valueOf() < todayTimeStemp,
                is_today: new Date(pointer).valueOf() == todayTimeStemp
            })
            pointer = this.getNextDay(pointer)
            return this.generateTimeCalendar(pointer, end_time, calendar_list)
        }
    }
    getNextTimesDay (date = new TimeType().formateTime('YYYY-MM-DD'), days = 7) {
        return new Date(new Date(date).valueOf() + days * 24 * 60 * 60 * 1000)
    }
}
export default TimeType