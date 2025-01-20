export const saveToken = (token: string) => {
    localStorage.setItem('token', token)
    return token
}

export const getToken = () => {
    return localStorage.getItem('token')
}

export const removeToken = () => {
    localStorage.removeItem('token')
}

