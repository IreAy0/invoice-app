import { renderHook, act } from '@testing-library/react'
import { AuthProvider, useAuth } from '../auth/AuthContext'
import { describe, it, expect } from 'vitest'

describe('AuthContext', () => {
  it('provides default values', () => {
    const wrapper = ({ children }: any) => <AuthProvider>{children}</AuthProvider>
    const { result } = renderHook(() => useAuth(), { wrapper })
    expect(result.current.loading).toBe(true)
  })

  it('exposes methods', () => {
    const wrapper = ({ children }: any) => <AuthProvider>{children}</AuthProvider>
    const { result } = renderHook(() => useAuth(), { wrapper })
    expect(typeof result.current.login).toBe('function')
    expect(typeof result.current.signup).toBe('function')
    expect(typeof result.current.logout).toBe('function')
  })
})