import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import { useServerStatus } from '../hooks/useServerStatus'

export default function Landing() {
  const { isOnline } = useServerStatus()
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="py-4 px-6 border-b border-gray-200">
        <div className="container-max flex items-center justify-between">
          <div className="flex items-center gap-3">
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
          </div>
          
          <div className="flex items-center gap-3">
            <Link to="/login" className="btn-ghost">
              Sign in
            </Link>
            <Link to="/register">
              <Button>Get started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Server status indicator */}
      {!isOnline && (
        <div className="bg-yellow-50 border-b border-yellow-200 px-6 py-3">
          <div className="container-max flex items-center justify-center gap-2">
            <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="text-sm text-yellow-700 font-medium">Server is currently offline</span>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="container-max text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold">
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Organize
              </span>{' '}
              your tasks
              <br />
              <span className="text-gray-900">beautifully</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the most intuitive task management platform. 
              Stay organized, boost productivity, and achieve your goals with TMA.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/register">
              <Button className="px-8 py-4 text-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Get started free
              </Button>
            </Link>
            <Link to="/login" className="btn-ghost px-6 py-3 text-lg">
              Sign in to your account
            </Link>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-gray-200">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Smart Organization</h3>
              <p className="text-gray-600">
                Automatically categorize and prioritize your tasks with intelligent algorithms.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Lightning Fast</h3>
              <p className="text-gray-600">
                Built for speed with instant sync and real-time collaboration features.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Customizable</h3>
              <p className="text-gray-600">
                Adapt TaskFlow to your workflow with flexible views and personalization options.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-200 bg-gray-50">
        <div className="container-max text-center">
          <p className="text-gray-500">
            &copy; 2025 TaskFlow. Built with React and love.
          </p>
        </div>
      </footer>
    </div>
  )
}