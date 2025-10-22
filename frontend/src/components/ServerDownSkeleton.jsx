import React from 'react'

export default function ServerDownSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        {/* Icon */}
        <div className="w-16 h-16 mx-auto rounded-full bg-gray-200 animate-pulse flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        {/* Title */}
        <div className="space-y-2">
          <div className="h-6 bg-gray-200 rounded animate-pulse mx-auto w-48"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse mx-auto w-64"></div>
        </div>
        
        {/* Message */}
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4 mx-auto"></div>
        </div>
        
        {/* Button placeholder */}
        <div className="h-10 bg-gray-200 rounded-lg animate-pulse w-32 mx-auto"></div>
      </div>
    </div>
  )
}

export function TaskListSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg border border-gray-200 p-4 space-y-3">
          {/* Title */}
          <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4"></div>
          
          {/* Description */}
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3"></div>
          </div>
          
          {/* Footer */}
          <div className="flex justify-between items-center">
            <div className="h-6 bg-gray-200 rounded-full animate-pulse w-16"></div>
            <div className="flex gap-2">
              <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function FormSkeleton() {
  return (
    <div className="max-w-md mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="h-8 bg-gray-200 rounded animate-pulse w-48 mx-auto"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-64 mx-auto"></div>
      </div>
      
      {/* Form Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        {/* Form fields */}
        {[...Array(2)].map((_, i) => (
          <div key={i} className="space-y-1">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
            <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded animate-pulse w-32"></div>
          </div>
        ))}
        
        {/* Button */}
        <div className="pt-2">
          <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}