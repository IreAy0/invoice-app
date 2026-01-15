export type InvoiceStatus = 'PAID' | 'OVERDUE' | 'DRAFT' | 'PENDING'

export interface InvoiceSummary {
  id: string
  number: string
  dueDate: string
  amount: number
  status: InvoiceStatus
}

export interface Activity {
  id: string
  actorName: string
  actorAvatarUrl?: string
  title: string
  subtitle?: string
  timestamp: string
}

export interface Party {
  name: string
  phone: string
  address: string
  email: string
}

export interface InvoiceDetailsData {
  invoiceNumber: string
  issueDate: string
  dueDate: string
  billingCurrency: string
  sender: Party
  customer: Party
  items: Array<{ name: string; qty: number; price: number; total: number }>
  subtotal: number
  discount: number
  totalDue: number
  note?: string
}