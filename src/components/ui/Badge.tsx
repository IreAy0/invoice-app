import React from 'react'
import clsx from 'clsx'
import { InvoiceStatus } from '../../types'

export function StatusBadge({ status }: { status: InvoiceStatus }) {
  const map = {
    PAID: { text: 'Paid', class: 'bg-success/15 text-success' },
    OVERDUE: { text: 'Overdue', class: 'bg-danger/15 text-danger' },
    DRAFT: { text: 'Draft', class: 'bg-gray-200 text-gray-700' },
    PENDING: { text: 'Pending Payment', class: 'bg-warning/15 text-warning' }
  }
  const s = map[status]
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-pill px-2.5 py-1 text-xs font-medium',
        s.class
      )}
      aria-label={`Status: ${s.text}`}
    >
      {s.text}
    </span>
  )
}