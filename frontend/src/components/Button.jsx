import React from 'react'

export default function Button({ children, className = '', ...props }) {
  return (
    <button className={`btn-primary ${className}`} {...props}>
      {children}
    </button>
  )
}
