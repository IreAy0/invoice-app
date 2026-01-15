import React from 'react'
import clsx from 'clsx'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ label, error, className, ...props }: Props) {
  return (
    <label className="block">
      {label && <span className="mb-1 block text-sm text-text-soft">{label}</span>}
      <input
        {...props}
        className={clsx(
          'w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm outline-none',
          'focus-visible:focus-ring',
          'placeholder:text-gray-400',
          className
        )}
      />
      {error && <span className="mt-1 block text-xs text-danger">{error}</span>}
    </label>
  )
}