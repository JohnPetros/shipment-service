import { Transaction } from '@entities/Transaction'
import { CreateTransactionDTO } from '@modules/payment/dtos/CreateTransactionDTO'

export interface IPaymentProvider {
  createCreditCardTransaction({
    cardToken,
    customer,
    products,
  }: Omit<CreateTransactionDTO, 'paymentMethod'>): Promise<Transaction>
  createTicketTransaction({
    customer,
    products,
  }: Omit<CreateTransactionDTO, 'paymentMethod'>): Promise<Transaction>
  createPixTransaction({
    customer,
    products,
  }: Omit<CreateTransactionDTO, 'paymentMethod'>): Promise<Transaction>
  handleApiError(error: unknown): void
}
