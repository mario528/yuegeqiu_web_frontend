/*
 * @Author: majiaao
 * @Date: 2020-05-14 14:54:31
 * @LastEditors: majiaao
 * @LastEditTime: 2020-05-14 16:43:01
 * @Description: file content
 */
class FileType {
    constructor() {}
    upload(fileUrl: any, requestPath: string, paramsData: any) {
        const formData = new FormData()
        formData.append('file', fileUrl)
        Object.keys(paramsData).forEach((item) => {
            formData.append(item, paramsData[item])
        })
        return new Promise((reslove, reject) => {
            // @ts-ignore
            this.$http.post(requestPath, formData, {
                headers: {
                    'Content-Type': 'multipart/form-date'
                }
            }).then((res: any) => {
                reslove(res)
            }).catch((err: any) => {
                reject(err)
            })
        })
    }
}
export default FileType
