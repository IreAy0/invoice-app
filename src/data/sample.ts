import { Activity, InvoiceDetailsData, InvoiceSummary } from '../types'

export const summaries: InvoiceSummary[] = [
  { id: '1', number: '1023494 - 2304', dueDate: '2023-05-19', amount: 1311750.12, status: 'PAID' },
  { id: '2', number: '1023494 - 2304', dueDate: '2023-05-19', amount: 1311750.12, status: 'OVERDUE' },
  { id: '3', number: '1023494 - 2304', dueDate: '2023-05-19', amount: 1311750.12, status: 'DRAFT' },
  { id: '4', number: '1023494 - 2304', dueDate: '2023-05-19', amount: 1311750.12, status: 'PENDING' }
]

export const activities: Activity[] = [
  {
    id: 'a1',
    actorName: 'You',
    title: 'Invoice creation',
    subtitle: 'Created invoice 00293434/(Olaniyi Ojo Adewale)',
    timestamp: '2026-01-12T12:05:00Z'
  },
  {
    id: 'a2',
    actorName: 'You',
    title: 'Payment Confirmed',
    subtitle: 'You manually confirmed a partial payment of $503,000.00',
    timestamp: '2026-01-12T12:20:00Z'
  },
  {
    id: 'a3',
    actorName: 'You',
    title: 'Payment Confirmed',
    subtitle: 'You manually confirmed a full payment of $6,000,000.00',
    timestamp: '2026-01-12T12:20:00Z'
  }
]

export const invoiceDetails: InvoiceDetailsData = {
  invoiceNumber: '1023494 - 2304',
  issueDate: '2023-03-30',
  dueDate: '2023-05-19',
  billingCurrency: 'USD ($)',
  sender: {
    name: 'Fabulous Enterprise',
    phone: '+389 982 231 795',
    address: '3031 Hart Ridge Road 43406 Gaines, MI',
    email: 'info@fabulousenterprise.co'
  },
  customer: {
    name: 'Olaniyi Ojo Adewale',
    phone: '+389 982 231 795',
    address: 'info@fabulousenterprise.co',
    email: 'info@fabulousenterprise.co'
  },
  items: [
    { name: 'Email Marketing', qty: 10, price: 1500, total: 15000 },
    { name: 'Video looping effect', qty: 6, price: 1110500, total: 6663000 },
    { name: 'Graphic design for emails', qty: 7, price: 2750, total: 19250 },
    { name: 'Video looping effect', qty: 6, price: 1110500, total: 6663000 }
  ],
  subtotal: 6697200,
  discount: 167430,
  totalDue: 6529770,
  note: 'Thank you for your patronage'
}