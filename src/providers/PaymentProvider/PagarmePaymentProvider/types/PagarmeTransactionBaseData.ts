export interface PagarmetTransactionBaseData {
  id: string
  code: string
  amount: number
  currency: string
  closed: boolean
  status: 'paid'
  created_at: string
  updated_at: string
  closed_at: string
}
