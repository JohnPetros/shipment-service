import { Customer } from '@entities/Customer'
import { Product } from '@entities/Product'
import { Payment } from '@entities/Payment'

export interface IPaymentProvider {
  getPayment(paymentId: string): Promise<Payment>
  checkout(customer: Customer, products: Product[]): Promise<string>
}
