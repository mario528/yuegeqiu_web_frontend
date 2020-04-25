const RegExp = {
    testTelePhone (phoneNumber: string): boolean {
        const regStr = /^1[3456789]\d{9}$/
        return regStr.test(phoneNumber)
    },
    testPasswordPower (password: string) {

    },

}

export default RegExp