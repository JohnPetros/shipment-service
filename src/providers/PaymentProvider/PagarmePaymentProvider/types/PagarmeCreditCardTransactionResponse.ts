import { PagarmeTransaction } from './PagarmeTransaction'

export interface PagarmeCreditCardTransaction extends PagarmeTransaction {
  installments: 1
  statement_descriptor: string
  updated_at: Date
  acquirer_message: string
  gateway_response: {
    code: string
    errors: string[]
  }
}
