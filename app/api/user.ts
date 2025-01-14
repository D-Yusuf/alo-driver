import instance from "./index"
import { saveToken } from "./storage"

export const signup = async (data: any) => {
    const { data: { token, user } } = await instance.post('/user/signup', data)
    saveToken(token)
    return { token, user }
}

export const login = async (data: any) => {
    const response = await instance.post('/user/login', data)
    console.log(response)
//     saveToken(token)
//     return { token, user }
}

export const getAllUsers = async () => {
    const { data } = await instance.get('/')
    return data
}
