const REGEX_EMAIL = /^[0-9a-zA-Z]+([0-9a-zA-Z]*[-._+])*[0-9a-zA-Z]+@[0-9a-zA-Z]+([-.][0-9a-zA-Z]+)*([0-9a-zA-Z]*[.])[a-zA-Z]{2,6}$/
const REGEX_CAPITAL = /[A-Z]/
export const isValidEmail = (email: string) => {
    return REGEX_EMAIL.test(email) && email !== '';
}

export const isPasswordValid = (password: string) => {
    return password.length > 6 && REGEX_CAPITAL.test(password) && password !== '';
}
