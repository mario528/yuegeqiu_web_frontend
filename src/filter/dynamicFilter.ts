function dynamicFilter(filterList: string[]) {
    filterList.forEach((item) => {
        import(`./${item}/index.ts`)
    })
}
export default dynamicFilter