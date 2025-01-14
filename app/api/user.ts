import instance from "."

export const getAllUsers = async () => {
    const { data } = await instance.get('/')
    return data
}
