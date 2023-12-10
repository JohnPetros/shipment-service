import { Customer } from '@entities/Customer'
import { Product } from '@entities/Product'
import { PaymentMethod } from '@entities/PaymentMethod'

export interface IPaymentProvider {
  getPaymentMethods(): Promise<PaymentMethod[]>
  checkout(customer: Customer, products: Product[]): Promise<string>
}
