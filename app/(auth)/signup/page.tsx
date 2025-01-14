import React from 'react'
import { handleSignup } from '../actions'
export default function Signup() {
  return (
    <form action={handleSignup}>
      <input name="firstName" placeholder="First Name" />
      <input name="lastName" placeholder="Last Name" />
      <input name="phoneNumber" placeholder="Phone Number" />
      <input name="password" type="password" placeholder="Password" />
      <button type="submit">Signup</button>
    </form>
  )
}