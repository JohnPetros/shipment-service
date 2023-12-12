export type TransactionStatus =
  | 'approved'
  | 'pending'
  | 'cancelled'
  | 'rejected'

export type Transaction = {
  status?: TransactionStatus
  qrCode?: string
  expires_at?: Date
}
