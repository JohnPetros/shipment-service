import { PagarmetTransactionBaseData } from './PagarmeTransactionBaseData'

export interface PagarmeTransactionResponse<TransactionType>
  extends PagarmetTransactionBaseData {
  charges: {
    last_transaction: TransactionType
  }
}
