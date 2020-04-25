const Toast = {
    showToastSuccess(message = 'Success', title = '成功') {
        // @ts-ignore
        this.$notify({
            title: title,
            message: message,
            type: 'success'
        })
    },
    showToastError (message = 'Error', title = '失败') {
        // @ts-ignore
        this.$notify.error({
            title: title,
            message: message
        });
    }
}
export default Toast