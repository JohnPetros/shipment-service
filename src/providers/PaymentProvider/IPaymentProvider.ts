import { Customer } from '@entities/Customer'
import { Product } from '@entities/Product'
import { Payment } from '@entities/Payment'
import { Transaction } from '@entities/Transaction'
import { CreateCreditCardTransactionDTO } from '@modules/payment/dtos/CreateTransactionDTO'

export interface IPaymentProvider {
  getPayment(paymentId: string): Promise<Payment>
  checkout(customer: Customer, products: Product[]): Promise<string>
  createCreditCardTransaction({
    creditCard,
    customer,
    products,
    total,
  }: CreateCreditCardTransactionDTO): Promise<Transaction>
  handleApiError(error: unknown): void
}
