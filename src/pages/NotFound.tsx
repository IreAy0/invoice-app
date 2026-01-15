import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center">
      <div className="card w-[420px] p-6 text-center">
        <h1 className="text-xl font-semibold">404 – Page not found</h1>
        <p className="mt-2 text-sm text-text-soft">The URL is invalid or the page has moved.</p>
        <Link to="/" className="mt-4 inline-block rounded-xl bg-primary px-4 py-2 font-semibold text-white">Go Home</Link>
      </div>
    </div>
  )
}