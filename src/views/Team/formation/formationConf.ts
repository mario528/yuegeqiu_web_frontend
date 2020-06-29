/*
 * @Author: majiaao
 * @Date: 2020-06-29 22:40:37
 * @LastEditors: majiaao
 * @LastEditTime: 2020-06-29 23:45:36
 * @Description: file content
 */ 
class FormationOptions {
    private canvasWidth = 0
    private canvasHeight = 0
    constructor(canvasWidth: number, canvasHeight: number, itemWidth?: number, itemHeight?: number) {
        this.canvasWidth = canvasWidth
        this.canvasHeight = canvasHeight
    }
    public getFormationOptions(mode: string, type: string) {
        if (type == '2-2') {
            return [
                {
                    left: this.canvasWidth / 2,
                    top: this.canvasHeight - 60
                },
                {
                    left: this.canvasWidth / 4,
                    top: this.canvasHeight / 4 * 2.7
                },
                {
                    left: this.canvasWidth / 4 * 3,
                    top: this.canvasHeight / 4 * 2.7
                },
                {
                    left: this.canvasWidth / 4,
                    top: this.canvasHeight / 4 * 1.2
                },
                {
                    left: this.canvasWidth / 4 * 3,
                    top: this.canvasHeight / 4 * 1.2
                }
            ]
        }else {
            return []
        }
    }
}
export default FormationOptions