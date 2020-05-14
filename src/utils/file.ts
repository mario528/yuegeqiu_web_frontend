/*
 * @Author: majiaao
 * @Date: 2020-05-14 02:27:41
 * @LastEditors: majiaao
 * @LastEditTime: 2020-05-14 14:51:45
 * @Description: file content
 */
class FileType {
    constructor () {
    }
    public getFilePathName (filename: string): string {
        const fileArray = filename.split(".")
        return fileArray[fileArray.length - 1]
    }
    public upLoadImage () {
        
    }
    public dataURItoBlob (dataURI: any) {
        const byteString = window.atob(dataURI.split(',')[1])
        const mimeSring = dataURI.split(',')[0].split(':')[1].split(';')[0]
        const ab = new ArrayBuffer(byteString.length)
        const ia = new Uint8Array(ab)
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i)
        }
        return new Blob([ab], {
            type: mimeSring
        })
    }
}
export default new FileType()