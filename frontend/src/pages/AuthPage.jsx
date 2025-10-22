import React from 'react'
import Login from './Login'
import Register from './Register'

export default function AuthPage(){
  return (
    <div className="p-6 grid grid-cols-2 gap-6">
      <div className="border p-4"><h2 className="text-lg">Login</h2><Login/></div>
      <div className="border p-4"><h2 className="text-lg">Register</h2><Register/></div>
    </div>
  )
}
