import React from 'react'

export default function EmptyState({ title = 'No items', subtitle = '', action }) {
  return (
    <div className="card text-center p-8">
      <div className="mb-3">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto text-slate-300">
          <path d="M3 7h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M5 7v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <h4 className="mb-2">{title}</h4>
      {subtitle && <p className="muted mb-4">{subtitle}</p>}
      {action && <div className="mx-auto">{action}</div>}
    </div>
  )
}
