"use client"
import React, { useEffect } from 'react'
import Signup from './Signup'
import Login from './Login'
import { signup, login } from '@/app/api/user'

export default function page() {
  async function loginHandler() {
    await login({
      phoneNumber: '123',
      password: '123'
    })

  } 
  useEffect(() => {
    loginHandler()
  }, [])
  return (
    <div>
      <Signup />
      <Login />
    </div>
  )
}
