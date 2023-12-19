export type TransactionStatus =
  | 'approved'
  | 'pending'
  | 'cancelled'
  | 'rejected'

export type Transaction = {
  status?: TransactionStatus
  qrCode?: string
  code?: string
  expires_at?: Date
  pdf?: string
}
