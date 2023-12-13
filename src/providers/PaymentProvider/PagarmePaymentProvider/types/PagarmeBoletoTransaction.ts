import { PagarmeTransaction } from './PagarmeTransaction'

export interface PagarmeBoletoTransaction extends PagarmeTransaction {
  url: string
  pdf: string
  barcode: string
  instructions: string
  qr_code: string
  due_at: string
  status: 'generated'
  line: string
}
