import React from 'react'
import clsx from 'clsx'

export function Spinner({ label, inline }: { label?: string; inline?: boolean }) {
  return (
    <span className={clsx('inline-flex items-center', inline ? '' : 'flex-col')}>
      <svg
        className="mr-2 h-5 w-5 animate-spin text-primary"
        xmlns="http://www.w3.org/2000/svg"
        fill="none" viewBox="0 0 24 24" aria-hidden="true"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
      </svg>
      {label && <span className="text-sm text-text-soft">{label}</span>}
    </span>
  )
}