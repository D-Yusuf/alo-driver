"use client"
import React, { useEffect } from 'react'
import Signup from './Signup/page'
import Login from './Login/page'
import { getToken } from '../api/storage'
import { useRouter } from 'next/navigation'
export default function page() {
   const router = useRouter()
   useEffect(() => {
    const token = getToken()
    if (token) {
        router.push('/')
    }else{
        router.push('/auth/login')
    }
   }, [])
 
 
}
