import React from 'react'

export default function page({ params }: { params: { id: string } }) {
  return (
    <div>Appointment {params.id}</div>
  )
}
