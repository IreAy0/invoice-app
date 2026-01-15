import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '../components/ui/Button'
import { describe, it, expect, vi } from 'vitest'

describe('Button', () => {
  it('renders and handles click', async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click me</Button>)
    await userEvent.click(screen.getByRole('button', { name: /click me/i }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('shows disabled state', () => {
    render(<Button disabled>Disabled</Button>)
    const btn = screen.getByRole('button', { name: /disabled/i })
    expect(btn).toBeDisabled()
  })
})