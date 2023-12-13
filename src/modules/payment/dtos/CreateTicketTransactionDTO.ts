import { Customer } from '@entities/Customer'
import { Product } from '@entities/Product'

export interface CreateTicketTransactionDTO {
  customer: Customer
  products: Product[]
}
