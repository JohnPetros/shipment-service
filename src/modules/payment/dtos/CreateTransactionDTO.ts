import { CreditCard } from '@entities/CreditCard'
import { Customer } from '@entities/Customer'
import { PaymentMethod } from '@entities/PaymentMethod'
import { Product } from '@entities/Product'

export interface CreateTransactionDTO {
  customer: Customer
  products: Product[]
  creditCard?: CreditCard
  paymentMethod: PaymentMethod
}
