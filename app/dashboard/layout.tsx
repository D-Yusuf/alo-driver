import React from 'react'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-screen'>
      <div className='w-1/4 bg-gray-200 p-4'>
        <h1 className='text-2xl font-bold mb-4'>Dashboard</h1>
        <nav className='flex flex-col'>
          <Link href='/dashboard' className='mb-2'>Overview</Link>
          <Link href='/dashboard/appointments' className='mb-2'>Appointments</Link>
          <Link href='/dashboard/family' className='mb-2'>Family Members</Link>
        </nav>
      </div>
      <div className='flex-1 p-4'>
        {children}
      </div>
    </div>
  )
}
