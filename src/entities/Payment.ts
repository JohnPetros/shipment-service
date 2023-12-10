import { Customer } from './Customer'

export type PaymentStatus = 'approved' | 'pending' | 'cancelled' | 'rejected'
export type PaymentMethod = 'credit-card' | 'ticket' | 'pix'

export type Payment = {
  id: string
  status: PaymentStatus
  paymentMethod: string
  customer: Customer
}
