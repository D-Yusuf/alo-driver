'use server'

import { login, signup } from "../api/user"
import { saveToken } from "../api/storage"
export async function handleLogin(formData: FormData) {
    const rawFormData = Object.fromEntries(formData.entries())
    const { token } = await login(rawFormData)
    saveToken(token)

  }

export async function handleSignup(formData: FormData) {
    const rawFormData = Object.fromEntries(formData.entries())
    const { token } = await signup(rawFormData)
    saveToken(token)

  }
