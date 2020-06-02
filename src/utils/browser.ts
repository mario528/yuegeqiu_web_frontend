/*
 * @Author: majiaao
 * @Date: 2020-06-02 20:07:29
 * @LastEditors: majiaao
 * @LastEditTime: 2020-06-02 20:29:12
 * @Description: file content
 */ 
const Browser = {
    isMobileEnv: function () {
        if (navigator.userAgent) {
            const matchList = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
            return (matchList != null && matchList.length != 0)
        }else return false
    }
}
export default Browser