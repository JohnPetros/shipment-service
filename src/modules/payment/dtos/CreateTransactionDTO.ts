import { CreditCard } from '@entities/CreditCard'
import { Customer } from '@entities/Customer'
import { Product } from '@entities/Product'

export interface CreateCreditCardTransactionDTO {
  customer: Customer
  products: Product[]
  creditCard: CreditCard
  total: number
}
