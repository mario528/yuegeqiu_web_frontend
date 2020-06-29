/*
 * @Author: majiaao
 * @Date: 2020-06-29 22:40:37
 * @LastEditors: majiaao
 * @LastEditTime: 2020-06-30 02:44:24
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
        }else if (type == '3-1') {
            return [
                {
                    left: this.canvasWidth / 2,
                    top: this.canvasHeight - 60
                },
                {
                    left: this.canvasWidth / 2,
                    top: this.canvasHeight / 4 * 2.6
                },
                {
                    left: this.canvasWidth / 2 * 0.3,
                    top: this.canvasHeight / 4 * 2.6
                },
                {
                    left: this.canvasWidth / 2 * 1.7,
                    top: this.canvasHeight / 4 * 2.6
                },
                {
                    left: this.canvasWidth / 2,
                    top: this.canvasHeight / 4 * 1.4
                },
            ]
        }else if (type == '1-2-1') {
            return [
                {
                    left: this.canvasWidth / 2,
                    top: this.canvasHeight - 60
                },
                {
                    left: this.canvasWidth / 2,
                    top: this.canvasHeight / 4 * 2.7
                },
                {
                    left: this.canvasWidth / 2 * 0.5,
                    top: this.canvasHeight / 2
                },
                {
                    left: this.canvasWidth / 2 * 1.5,
                    top: this.canvasHeight / 2
                },
                {
                    left: this.canvasWidth / 2,
                    top: this.canvasHeight / 2 * 0.6
                }
            ]
        }else if (type == '2-1-1') {
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
                    left: this.canvasWidth / 2,
                    top: this.canvasHeight / 2
                },
                {
                    left: this.canvasWidth / 2,
                    top: this.canvasHeight / 2 * 0.55
                }
            ]
        }else if (type == '3-2-1') {
            return [
                {
                    left: this.canvasWidth / 2,
                    top: this.canvasHeight - 60
                },
                {
                    left: this.canvasWidth / 2,
                    top: this.canvasHeight / 4 * 2.75
                },
                {
                    left: this.canvasWidth / 2 * 0.3,
                    top: this.canvasHeight / 4 * 2.75
                },
                {
                    left: this.canvasWidth / 2 * 1.7,
                    top: this.canvasHeight / 4 * 2.75
                },
                {
                    left: this.canvasWidth / 2 * 0.65,
                    top: this.canvasHeight / 2
                },
                {
                    left: this.canvasWidth / 2 * 1.35,
                    top: this.canvasHeight / 2
                },
                {
                    left: this.canvasWidth / 2,
                    top: this.canvasHeight / 2 * 0.65
                }
            ]
        }else if (type == '4-2-3-1') {
            return [
                {
                    left: this.canvasWidth / 2,
                    top: this.canvasHeight - 60
                },
                {
                    left: this.canvasWidth / 5 * 0.8,
                    top: this.canvasHeight / 4 * 2.85
                },
                {
                    left: this.canvasWidth / 5 * 2,
                    top: this.canvasHeight / 4 * 3.1
                },
                {
                    left: this.canvasWidth / 5 * 3,
                    top: this.canvasHeight / 4 * 3.1
                },
                {
                    left: this.canvasWidth / 5 * 4.2,
                    top: this.canvasHeight / 4 * 2.85
                },
                {
                    left: this.canvasWidth / 5 * 1.8,
                    top: this.canvasHeight / 4 * 2.35
                },
                {
                    left: this.canvasWidth / 5 * 3.2,
                    top: this.canvasHeight / 4 * 2.35
                },
                {
                    left: this.canvasWidth / 2,
                    top: this.canvasHeight / 4 * 1.7
                },
                {
                    left: this.canvasWidth / 5,
                    top: this.canvasHeight / 4 * 1.45
                },
                {
                    left: this.canvasWidth / 5 * 4,
                    top: this.canvasHeight / 4 * 1.45
                },
                {
                    left: this.canvasWidth / 2,
                    top: this.canvasHeight / 4
                }
            ]
        }else if (type == '4-3-3') {
            return [
                {
                    left: this.canvasWidth / 2,
                    top: this.canvasHeight - 60
                },
                {
                    left: this.canvasWidth / 5 * 0.8,
                    top: this.canvasHeight / 4 * 2.85
                },
                {
                    left: this.canvasWidth / 5 * 2,
                    top: this.canvasHeight / 4 * 3.1
                },
                {
                    left: this.canvasWidth / 5 * 3,
                    top: this.canvasHeight / 4 * 3.1
                },
                {
                    left: this.canvasWidth / 5 * 4.2,
                    top: this.canvasHeight / 4 * 2.85
                },
                {
                    left: this.canvasWidth / 2,
                    top: this.canvasHeight / 2 * 1.2
                },
                {
                    left: this.canvasWidth / 4,
                    top: this.canvasHeight / 2 * 0.9
                },
                {
                    left: this.canvasWidth / 4 * 3,
                    top: this.canvasHeight / 2 * 0.9
                },
                
                {
                    left: this.canvasWidth / 5,
                    top: this.canvasHeight / 4
                },
                {
                    left: this.canvasWidth / 2,
                    top: this.canvasHeight / 4
                },
                {
                    left: this.canvasWidth / 5 * 4,
                    top: this.canvasHeight / 4
                }
            ]
        }else if (type == '3-5-2') {
            return [
                {
                    left: this.canvasWidth / 2,
                    top: this.canvasHeight - 60
                },
                {
                    left: this.canvasWidth / 2,
                    top: this.canvasHeight / 4 * 3.1
                },
                {
                    left: this.canvasWidth / 2 * 0.6,
                    top: this.canvasHeight / 4 * 2.9
                },
                {
                    left: this.canvasWidth / 2 * 1.4,
                    top: this.canvasHeight / 4 * 2.9
                },
                
                {
                    left: this.canvasWidth / 2 * 0.6,
                    top: this.canvasHeight / 2 * 0.9
                },
                {
                    left: this.canvasWidth / 2 * 1.4,
                    top: this.canvasHeight / 2 * 0.9
                },
                {
                    left: this.canvasWidth / 2,
                    top: this.canvasHeight / 2 * 1.15
                },
                
                
                {
                    left: this.canvasWidth / 5 * 0.7,
                    top: this.canvasHeight / 3
                },
                {
                    left: this.canvasWidth / 5 * 4 + ( this.canvasWidth / 5 * 0.3),
                    top: this.canvasHeight / 3
                },
                {
                    left: this.canvasHeight / 3 * 0.9,
                    top: this.canvasHeight / 5
                },
                {
                    left: this.canvasHeight / 3 * 1.5,
                    top: this.canvasHeight / 5
                }
            ]
        }else if (type == '4-4-2') {
            return [
                {
                    left: this.canvasWidth / 2,
                    top: this.canvasHeight - 60
                },
            ]
        }else if (type == '5-4-1') {
            return [
                {
                    left: this.canvasWidth / 2,
                    top: this.canvasHeight - 60
                },
            ]
        }else {
            return []
        }
    }
}
export default FormationOptions