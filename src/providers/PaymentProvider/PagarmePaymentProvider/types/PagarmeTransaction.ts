export interface PagarmeTransaction {
  id: string
  transaction_type: string
  url: string
  pdf: string
  barcode: string
  acquirer_message: string
  amount: number
  status: string
  success: true
  qr_code: string
  qr_code_url: string
  expires_at: Date
  created_at: Date
}
