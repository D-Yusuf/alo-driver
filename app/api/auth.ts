import instance from "."

export const signup = async (data: any) => {
    const { data: { token, user } } = await instance.post('/user/signup', data)
    return { token }
}

export const login = async (data: any) => {
    const { data: { token, user } } = await instance.post('/user/login', data)
    return { token }
}

