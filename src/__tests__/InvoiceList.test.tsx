import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { InvoiceList } from '../components/invoice/InvoiceList'

describe('InvoiceList', () => {
  it('renders fetched invoices', async () => {
    render(<InvoiceList />)
    expect(screen.getByText(/loading invoices/i)).toBeInTheDocument()
    await waitFor(() => expect(screen.queryByText(/loading invoices/i)).not.toBeInTheDocument())
    expect(screen.getByText(/recent invoices/i)).toBeInTheDocument()
    // At least one mocked item
    expect(screen.getAllByText(/invoice -/i).length).toBeGreaterThan(0)
  })
})