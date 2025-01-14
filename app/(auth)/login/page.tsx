"use client"
import React from 'react'
import { handleLogin } from '../actions'
export default function Login() {

  
  

  return (
    <form action={handleLogin}>
      <input name="phoneNumber" placeholder="Phone Number" />
      <input name="password" type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  )
}
