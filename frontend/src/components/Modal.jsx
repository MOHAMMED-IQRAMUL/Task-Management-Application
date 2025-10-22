import React from 'react'

export default function Modal({ open, onClose, children, title }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="z-10 w-full max-w-md p-6">
        <div className="card">
          {title && <h3 className="mb-3">{title}</h3>}
          {children}
          <div className="mt-4 text-right">
            <button className="btn-ghost" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}
