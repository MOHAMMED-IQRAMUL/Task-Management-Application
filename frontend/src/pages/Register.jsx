import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import api from '../api'
import { useNavigate, Link } from 'react-router-dom'
import { useToast } from '../components/Toast'
import Card from '../components/Card'
import Input from '../components/Input'
import Button from '../components/Button'
import { useServerStatus } from '../hooks/useServerStatus'

const schema = z.object({ username: z.string().min(3), password: z.string().min(6) })

export default function Register() {
  const toast = useToast()
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm({ resolver: zodResolver(schema) })
  const [isLoading, setIsLoading] = useState(false)
  const { isOnline } = useServerStatus()
  
  const onSubmit = async (data) => {
    if (!isOnline) {
      toast.push('Server is currently unavailable. Please try again later.', 'error')
      return
    }
    
    setIsLoading(true)
    try {
      await api.post('/auth/register', data)
      toast.push('Account created successfully! Please sign in.', 'info')
      navigate('/login')
    } catch (err) {
      toast.push(err.response?.data?.error || 'Registration failed', 'error')
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="py-4 px-6 border-b border-gray-200">
        <div className="container-max flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)' }}
            >
              T
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">TMA</div>
              <div className="text-xs text-gray-500">Task Management App</div>
            </div>
          </Link>
          
          <div className="flex items-center gap-3">
            <span className="text-gray-600">Already have an account?</span>
            <Link to="/login" className="btn-ghost">
              Sign in
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-6">
          {/* Hero text */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Create account
              </span>
            </h1>
            <p className="text-gray-600">Join thousands of productive users</p>
          </div>
          
          <Card className="space-y-6">
            {/* Server status indicator */}
            {!isOnline && (
              <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-yellow-700">Server is currently offline</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Username</label>
                <Input {...register('username')} placeholder="Choose a unique username" />
                <p className="text-xs text-gray-500">Minimum 3 characters</p>
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <Input {...register('password')} type="password" placeholder="Create a secure password" />
                <p className="text-xs text-gray-500">Minimum 6 characters</p>
              </div>
              
              <div className="pt-2">
                <Button type="submit" className="w-full" disabled={isLoading || !isOnline}>
                  {isLoading ? (
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  )}
                  {isLoading ? 'Creating account...' : 'Create account'}
                </Button>
              </div>
            </form>
            
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}