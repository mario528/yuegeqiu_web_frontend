class BrowserLocation {
    constructor () {

    }
    public getLocation () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition, (error: any)=> {
                debugger
                // 基于谷歌定位服务 国内被墙 很难获得回调
            })
        }else {
            throw new Error('该浏览器不支持地理定位')
        }
    }
    public showPosition (position: any) {
        debugger
    }
}
export default BrowserLocation