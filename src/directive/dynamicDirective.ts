function dynamicDirectives(directivesList: string[]) {
    directivesList.forEach((item) => {
        import(`./${item}/index.ts`)
    })
}
export default dynamicDirectives