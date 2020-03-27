const watchWindowResize = (that: any, key: string) => {
    window.onresize = () => {
        return ((): void => {
          that[key] = document.body.clientWidth
        })()
    }
}
export {
    watchWindowResize
}