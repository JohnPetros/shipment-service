import { IPaymentProvider } from './IPaymentProvider'
import { MercadoPagoPaymentProvider } from './MercadoPagoPaymentProvider'
import { Customer } from '@entities/Customer'
import { Product } from '@entities/Product'
import { Payment } from '@entities/Payment'

export class PaymentProvider implements IPaymentProvider {
  private paymentProvider: IPaymentProvider

  constructor() {
    this.paymentProvider = new MercadoPagoPaymentProvider()
  }

  async getPayment(paymentId: string): Promise<Payment> {
    return await this.paymentProvider.getPayment(paymentId)
  }

  async checkout(customer: Customer, products: Product[]): Promise<string> {
    return await this.paymentProvider.checkout(customer, products)
  }
}
