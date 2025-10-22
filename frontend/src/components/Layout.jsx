import React from 'react'
import { Link } from 'react-router-dom'
import { useServerStatus } from '../hooks/useServerStatus'

export default function Layout({ children }){
  const { isOnline } = useServerStatus()
  
  return (
    <div className="app font-sans-custom min-h-screen bg-gray-50">
      <header className="py-4 border-b border-gray-200 bg-white">
        <div className="container-max flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)' }}
            >
              T
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900">TMA</div>
              <div className="text-xs text-gray-500">Task Management App</div>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <nav className="hidden sm:flex items-center gap-3">
              <Link to="/tasks" className="text-gray-600 hover:text-gray-900 font-medium">Tasks</Link>
              <Link to="/login" className="text-gray-600 hover:text-gray-900 font-medium">Login</Link>
            </nav>
            <div className="rounded-full w-9 h-9 bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
              U
            </div>
          </div>
        </div>
      </header>
      
      {/* Server status indicator */}
      {!isOnline && (
        <div className="bg-yellow-50 border-b border-yellow-200 px-6 py-2">
          <div className="container-max flex items-center justify-center gap-2">
            <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="text-sm text-yellow-700 font-medium">Server is currently offline</span>
          </div>
        </div>
      )}
      
      <main className="container-max py-8">{children}</main>
    </div>
  )
}
