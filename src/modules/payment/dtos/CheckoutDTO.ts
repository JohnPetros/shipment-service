import { Customer } from '@entities/Customer'
import { Product } from '@entities/Product'

export interface CheckoutDTO {
  customer: Customer
  products: Product[]
}
