import { PagarmeTransaction } from './PagarmeTransaction'

export interface PagarmePixTransaction extends PagarmeTransaction {
  qr_code: string
  qr_code_url: string
  updated_at: Date
}
