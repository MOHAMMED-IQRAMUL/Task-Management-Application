import React from 'react'

export default function Spinner({ size = 8 }){
  return (
    <div className={`w-${size} h-${size} border-4 border-t-transparent border-blue-600 rounded-full animate-spin`} />
  )
}
