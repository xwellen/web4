
export const validateUser = (user) => {
    return !(user.login.trim().length < 4 || user.password.trim().length < 4)
}